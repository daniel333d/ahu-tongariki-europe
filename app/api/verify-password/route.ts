import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 20;

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function getAllowedPasswords() {
  return (process.env.SITE_PASSWORDS || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json({ valid: false, rateLimited: true }, { status: 429 });
  }

  let payload: { password?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const submitted = typeof payload.password === "string" ? payload.password : "";
  const allowedPasswords = getAllowedPasswords();
  const isValid = allowedPasswords.length > 0 && allowedPasswords.includes(submitted);

  return NextResponse.json({ valid: isValid });
}

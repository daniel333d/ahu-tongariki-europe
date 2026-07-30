import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  sanitizeReturnPath,
  secretsMatch
} from "../../../../lib/site-auth";

export const runtime = "nodejs";

// In-memory only: resets on cold start and is not shared across serverless
// instances/regions. This is a soft deterrent against casual guessing, not a
// substitute for a real distributed rate limiter.
const attemptsByClient = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 8;

function getClientKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const current = attemptsByClient.get(clientKey);

  if (!current || current.resetAt <= now) {
    attemptsByClient.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    await delay(400 + Math.random() * 300);
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let payload: { password?: unknown; next?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const submitted = typeof payload.password === "string" ? payload.password : "";
  const nextPath = sanitizeReturnPath(typeof payload.next === "string" ? payload.next : null);

  const expectedPassword = process.env.SITE_PASSWORD;
  const secret = process.env.SITE_AUTH_SECRET;

  if (!expectedPassword || !secret) {
    console.error("[site-auth] Missing SITE_PASSWORD or SITE_AUTH_SECRET environment variable.");
    await delay(300);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const isValid = submitted.length > 0 && (await secretsMatch(secret, submitted, expectedPassword));

  if (!isValid) {
    await delay(400 + Math.random() * 300);
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    console.error("[site-auth] Failed to create session token.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true, next: nextPath });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });

  return response;
}

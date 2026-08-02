/**
 * Site-wide password gate: signed, stateless session tokens verified with
 * Web Crypto (HMAC-SHA-256), so this module works unmodified in both the
 * Edge middleware runtime and Node.js route handlers.
 *
 * Session payload embeds a fingerprint of the current SITE_PASSWORD. Rotating
 * SITE_PASSWORD therefore invalidates every previously issued session, even
 * though SITE_AUTH_SECRET (the signing key) stays the same.
 */

export const SESSION_COOKIE_NAME = "rapa_nui_access";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const RETURN_PARAM = "next";

type SessionPayload = {
  exp: number;
  fp: string;
};

function isProtectionEnabled(): boolean {
  return process.env.SITE_PROTECTION_ENABLED === "true";
}

function isPublicAccessWindowOpen(now = Date.now()): boolean {
  const rawPublicUntil = process.env.SITE_PUBLIC_UNTIL;
  if (!rawPublicUntil) {
    return false;
  }

  const publicUntil = Date.parse(rawPublicUntil);
  if (!Number.isFinite(publicUntil)) {
    return false;
  }

  return now < publicUntil;
}

function getCredentials(): { password: string; secret: string } | null {
  const password = process.env.SITE_PASSWORD;
  const secret = process.env.SITE_AUTH_SECRET;

  if (!password || !secret) {
    return null;
  }

  return { password, secret };
}

function textEncode(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return mismatch === 0;
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncode(message));
  return bufferToHex(signature);
}

/** Constant-time comparison of two secret strings via HMAC digests of equal length. */
export async function secretsMatch(secret: string, a: string, b: string): Promise<boolean> {
  const [digestA, digestB] = await Promise.all([hmacHex(secret, a), hmacHex(secret, b)]);
  return timingSafeEqual(digestA, digestB);
}

export async function createSessionToken(): Promise<string | null> {
  const credentials = getCredentials();
  if (!credentials) {
    return null;
  }

  const fingerprint = await hmacHex(credentials.secret, credentials.password);
  const payload: SessionPayload = {
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    fp: fingerprint
  };

  const payloadB64 = base64UrlEncode(textEncode(JSON.stringify(payload)));
  const signature = await hmacHex(credentials.secret, payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) {
    return false;
  }

  const credentials = getCredentials();
  if (!credentials) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return false;
  }

  const [payloadB64, signature] = parts;
  const expectedSignature = await hmacHex(credentials.secret, payloadB64);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return false;
  }

  let payload: Partial<SessionPayload>;
  try {
    payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));
  } catch {
    return false;
  }

  if (typeof payload.exp !== "number" || Date.now() > payload.exp) {
    return false;
  }

  if (typeof payload.fp !== "string") {
    return false;
  }

  const currentFingerprint = await hmacHex(credentials.secret, credentials.password);
  return timingSafeEqual(payload.fp, currentFingerprint);
}

/** Only same-site, relative paths are allowed as a post-login redirect target. */
export function sanitizeReturnPath(rawPath: string | null | undefined): string {
  if (!rawPath) {
    return "/";
  }

  if (!rawPath.startsWith("/") || rawPath.startsWith("//")) {
    return "/";
  }

  if (rawPath.startsWith("/dostep")) {
    return "/";
  }

  return rawPath;
}

export { isProtectionEnabled, isPublicAccessWindowOpen };

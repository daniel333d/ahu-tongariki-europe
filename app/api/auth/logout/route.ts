import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "../../../../lib/site-auth";

export const runtime = "nodejs";

function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}

// GET so the site owner can log out just by visiting /api/auth/logout in the browser.
export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/dostep";
  redirectUrl.search = "";
  return clearSessionCookie(NextResponse.redirect(redirectUrl));
}

export async function POST() {
  return clearSessionCookie(NextResponse.json({ ok: true }));
}

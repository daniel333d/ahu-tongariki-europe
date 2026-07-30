import { NextRequest, NextResponse } from "next/server";
import { RETURN_PARAM, SESSION_COOKIE_NAME, isProtectionEnabled, verifySessionToken } from "./lib/site-auth";

export async function middleware(request: NextRequest) {
  if (!isProtectionEnabled()) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isValid = await verifySessionToken(token);

  if (isValid) {
    return NextResponse.next();
  }

  const accessUrl = request.nextUrl.clone();
  const originalPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  accessUrl.pathname = "/dostep";
  accessUrl.search = "";
  if (originalPath && originalPath !== "/") {
    accessUrl.searchParams.set(RETURN_PARAM, originalPath);
  }

  const response = NextResponse.redirect(accessUrl);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  if (token) {
    // Stale or tampered cookie: clear it so the browser stops resending it.
    response.cookies.set(SESSION_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|dostep|api/auth|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|mjs|map|woff|woff2|ttf|otf|mp4|webm|txt|xml|json)$).*)"
  ]
};

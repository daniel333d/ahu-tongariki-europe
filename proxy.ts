import { NextRequest, NextResponse } from "next/server";
import { isLanguageCode } from "./app/i18n";

export function proxy(request: NextRequest) {
  const firstPathSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0] || "pl";
  const language = isLanguageCode(firstPathSegment) ? firstPathSegment : "pl";
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-site-language", language);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"]
};

import "./globals.css";
import { headers } from "next/headers";
import { isLanguageCode } from "./i18n";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerLanguage = requestHeaders.get("x-site-language") || "pl";
  const lang = isLanguageCode(headerLanguage) ? headerLanguage : "pl";

  return (
    <html lang={lang}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

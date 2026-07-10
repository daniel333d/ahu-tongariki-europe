import "./globals.css";
import { headers } from "next/headers";
import { Cinzel } from "next/font/google";
import { isLanguageCode } from "./i18n";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-polynesian",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerLanguage = requestHeaders.get("x-site-language") || "pl";
  const lang = isLanguageCode(headerLanguage) ? headerLanguage : "pl";

  return (
    <html lang={lang} className={cinzel.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

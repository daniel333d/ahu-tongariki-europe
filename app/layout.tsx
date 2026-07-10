import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLanguageCode } from "./i18n";

export const metadata: Metadata = {
  title: "Ahu Tongariki Europe | Przestrzeń doświadczeń",
  description:
    "Koncepcja Ahu Tongariki Europe w Bystrzycy Kłodzkiej: 15 Moai, centrum kultury, edukacji i doświadczeń turystycznych.",
  metadataBase: new URL("https://ahutongariki.pl"),
  openGraph: {
    title: "Ahu Tongariki Europe",
    description:
      "Premium presentation of Ahu Tongariki Europe: architecture, culture, education and tourism inspired by Rapa Nui heritage.",
    url: "https://ahutongariki.pl",
    siteName: "Ahu Tongariki Europe",
    type: "website"
  }
};

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

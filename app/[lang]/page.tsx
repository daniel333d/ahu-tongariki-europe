import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HomeClient from "../home-client";
import { isLanguageCode, type LanguageCode } from "../i18n";
import { getLanguageMetadata, getStructuredData } from "../seo";

type LanguagePageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "es" }, { lang: "de" }, { lang: "cs" }];
}

function normalizeLanguage(lang: string): LanguageCode {
  if (!isLanguageCode(lang) || lang === "pl") {
    notFound();
  }

  return lang;
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;
  return getLanguageMetadata(normalizeLanguage(lang));
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { lang } = await params;
  const language = normalizeLanguage(lang);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(language)) }}
      />
      <HomeClient />
    </>
  );
}

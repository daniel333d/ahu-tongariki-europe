import type { Metadata } from "next";
import { dictionaries, type LanguageCode } from "./i18n";

export const siteUrl = "https://ahutongariki.pl";

export const languagePaths: Record<LanguageCode, string> = {
  pl: "/",
  en: "/en",
  fr: "/fr",
  es: "/es",
  de: "/de",
  cs: "/cs"
};

export const languageAlternates = {
  pl: languagePaths.pl,
  en: languagePaths.en,
  fr: languagePaths.fr,
  es: languagePaths.es,
  de: languagePaths.de,
  cs: languagePaths.cs,
  "x-default": languagePaths.pl
};

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }

  return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function getLanguageMetadata(language: LanguageCode): Metadata {
  const copy = dictionaries[language];
  const canonicalPath = languagePaths[language];
  const canonical = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(copy.seo.image);

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates
    },
    openGraph: {
      title: copy.seo.title,
      description: copy.seo.description,
      url: canonical,
      siteName: copy.brand.name,
      locale: copy.seo.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: copy.hero.imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seo.title,
      description: copy.seo.description,
      images: [
        {
          url: imageUrl,
          alt: copy.hero.imageAlt
        }
      ]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}

export function getStructuredData(language: LanguageCode) {
  const copy = dictionaries[language];
  const canonical = absoluteUrl(languagePaths[language]);
  const image = absoluteUrl(copy.seo.image);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": copy.seo.structuredDataType,
        "@id": `${canonical}#tourist-attraction`,
        name: copy.seo.structuredDataName,
        description: copy.seo.description,
        url: canonical,
        image,
        inLanguage: language,
        address: {
          "@type": "PostalAddress",
          addressLocality: copy.seo.addressLocality,
          addressRegion: copy.seo.addressRegion,
          addressCountry: copy.seo.addressCountry
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: copy.brand.name,
        url: siteUrl,
        inLanguage: language,
        publisher: {
          "@id": `${siteUrl}/#organization`
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: copy.brand.name,
        url: siteUrl,
        logo: image
      }
    ]
  };
}

import type { Metadata } from "next";
import { content, imagePath, localizedPath, routes, type SiteLanguage, type SiteRoute } from "./aeromorphism-content";

export const siteUrl = "https://aeromorphism.art";

export const languagePaths: Record<SiteLanguage, string> = {
  pl: "/",
  en: "/en"
};

export const languageAlternates = {
  pl: languagePaths.pl,
  en: languagePaths.en,
  "x-default": languagePaths.pl
};

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }

  return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function getLanguageMetadata(language: SiteLanguage, route: SiteRoute = "home"): Metadata {
  const copy = content[language];
  const canonicalPath = localizedPath(language, route);
  const canonical = absoluteUrl(canonicalPath);
  const routeLabel = route === "home" ? copy.seoTitle : `${copy.nav[route]} — ${copy.title} | Daniel Nowicki`;

  return {
    title: routeLabel,
    description: copy.seoDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalPath,
      languages: {
        pl: localizedPath("pl", route),
        en: localizedPath("en", route),
        "x-default": localizedPath("pl", route)
      }
    },
    openGraph: {
      title: routeLabel,
      description: copy.seoDescription,
      url: canonical,
      siteName: copy.brand,
      locale: copy.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl(imagePath),
          width: 1200,
          height: 630,
          alt: copy.hero.imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: routeLabel,
      description: copy.seoDescription,
      images: [
        {
          url: absoluteUrl(imagePath),
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

export function getStructuredData(language: SiteLanguage, route: SiteRoute = "home") {
  const copy = content[language];
  const canonical = absoluteUrl(localizedPath(language, route));
  const image = absoluteUrl(imagePath);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#daniel-nowicki`,
        name: "Daniel Nowicki",
        url: absoluteUrl(localizedPath(language, "author")),
        description: copy.creatorLine
      },
      {
        "@type": "CreativeWork",
        "@id": `${siteUrl}/#aeromorphism`,
        name: copy.title,
        alternateName: "Aeromorphism",
        creator: {
          "@id": `${siteUrl}/#daniel-nowicki`
        },
        author: {
          "@id": `${siteUrl}/#daniel-nowicki`
        },
        dateCreated: "2026",
        description: copy.seoDescription,
        image,
        inLanguage: language
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: copy.brand,
        url: siteUrl,
        inLanguage: language,
        publisher: {
          "@id": `${siteUrl}/#daniel-nowicki`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name: copy.seoTitle,
        url: canonical,
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        about: {
          "@id": `${siteUrl}/#aeromorphism`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image
        }
      }
    ]
  };
}

export const sitemapRoutes: SiteRoute[] = ["home", ...routes.map((route) => route.key)];

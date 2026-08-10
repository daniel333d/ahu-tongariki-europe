import type { MetadataRoute } from "next";
import { localizedPath, type SiteLanguage } from "./aeromorphism-content";
import { absoluteUrl, sitemapRoutes } from "./seo";

const languages: SiteLanguage[] = ["pl", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.flatMap((route) =>
    languages.map((language) => ({
      url: absoluteUrl(localizedPath(language, route)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "home" && language === "pl" ? 1 : 0.82,
      alternates: {
        languages: {
          pl: absoluteUrl(localizedPath("pl", route)),
          en: absoluteUrl(localizedPath("en", route)),
          "x-default": absoluteUrl(localizedPath("pl", route))
        }
      }
    }))
  );
}

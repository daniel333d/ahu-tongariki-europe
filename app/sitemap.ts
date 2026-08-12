import type { MetadataRoute } from "next";
import { dictionaries, type LanguageCode } from "./i18n";
import { absoluteUrl, languageAlternates, languagePaths } from "./seo";

const languages = Object.keys(languagePaths) as LanguageCode[];

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    languages: Object.fromEntries(
      Object.entries(languageAlternates).map(([language, path]) => [language, absoluteUrl(path)])
    )
  };

  return languages.map((language) => ({
    url: absoluteUrl(languagePaths[language]),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: language === "pl" ? 1 : 0.9,
    alternates,
    images: [absoluteUrl(dictionaries[language].seo.image)]
  }));
}

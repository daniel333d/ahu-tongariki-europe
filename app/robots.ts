import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  const protectionEnabled = process.env.SITE_PROTECTION_ENABLED === "true";

  if (protectionEnabled) {
    // Whole site is behind the /dostep password gate: keep crawlers out
    // entirely. This reverts automatically once SITE_PROTECTION_ENABLED
    // is no longer "true", restoring the rules below.
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/"]
        }
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dostep"]
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}

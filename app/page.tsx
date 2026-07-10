import type { Metadata } from "next";
import HomeClient from "./home-client";
import { getLanguageMetadata, getStructuredData } from "./seo";

export const metadata: Metadata = getLanguageMetadata("pl");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData("pl")) }}
      />
      <HomeClient />
    </>
  );
}

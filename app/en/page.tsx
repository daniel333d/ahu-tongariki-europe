import type { Metadata } from "next";
import HomeClient from "../home-client";
import { getLanguageMetadata, getStructuredData } from "../seo";

export const metadata: Metadata = getLanguageMetadata("en");

export default function EnglishPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData("en")) }}
      />
      <HomeClient language="en" />
    </>
  );
}

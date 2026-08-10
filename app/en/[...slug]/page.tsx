import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HomeClient from "../../home-client";
import { routeFromSlug } from "../../aeromorphism-content";
import { getLanguageMetadata, getStructuredData } from "../../seo";

type EnglishRoutePageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: EnglishRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = routeFromSlug(slug);

  if (!route || route === "home") {
    notFound();
  }

  return getLanguageMetadata("en", route);
}

export default async function EnglishRoutePage({ params }: EnglishRoutePageProps) {
  const { slug } = await params;
  const route = routeFromSlug(slug);

  if (!route || route === "home") {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData("en", route)) }}
      />
      <HomeClient language="en" route={route} />
    </>
  );
}

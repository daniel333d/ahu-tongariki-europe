import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HomeClient from "../home-client";
import { routeFromSlug } from "../aeromorphism-content";
import { getLanguageMetadata, getStructuredData } from "../seo";

type RoutePageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug?.length === 1 && slug[0] === "en") {
    return getLanguageMetadata("en");
  }

  const route = routeFromSlug(slug);

  if (!route || route === "home") {
    notFound();
  }

  return getLanguageMetadata("pl", route);
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;

  if (slug?.length === 1 && slug[0] === "en") {
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

  const route = routeFromSlug(slug);

  if (!route || route === "home") {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData("pl", route)) }}
      />
      <HomeClient language="pl" route={route} />
    </>
  );
}

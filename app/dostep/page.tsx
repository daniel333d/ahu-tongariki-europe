import type { Metadata } from "next";
import AccessForm from "./AccessForm";

export const metadata: Metadata = {
  title: "Dostęp | Rapa Nui Park",
  description: "Strona dostępna wyłącznie dla zaproszonych osób.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default async function DostepPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <AccessForm rawNextPath={typeof next === "string" ? next : undefined} />;
}

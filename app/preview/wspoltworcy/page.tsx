import { CoCreatorsPreviewClient } from "./preview-client";

type CoCreatorsPreviewPageProps = {
  searchParams: Promise<{
    layoutDemo?: string;
  }>;
};

export default async function CoCreatorsPreviewPage({ searchParams }: CoCreatorsPreviewPageProps) {
  const params = await searchParams;
  return <CoCreatorsPreviewClient layoutDemo={params.layoutDemo === "1"} />;
}

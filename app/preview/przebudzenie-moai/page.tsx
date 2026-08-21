import type { Metadata } from "next";
import { PrzebudzenieMoaiPreviewClient } from "./preview-client";

export const metadata: Metadata = {
  title: "Preview: Przebudzenie Moai | RapaNuiPark",
  robots: {
    index: false,
    follow: false
  }
};

export default function PrzebudzenieMoaiPreviewPage() {
  return <PrzebudzenieMoaiPreviewClient />;
}

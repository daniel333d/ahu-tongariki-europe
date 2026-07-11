import type { LucideIcon } from "lucide-react";

export type FeatureCardMeta = {
  number: string;
  assetPath: string;
  icon: LucideIcon;
};

export type FeatureCardData = FeatureCardMeta & {
  title: string;
  description: string;
};

export type MasterplanCategory = "museum" | "restaurant" | "cafe" | "viewpoint" | "education" | "shop";

export type MasterplanObjectMeta = {
  id: MasterplanCategory;
  number: string;
  positionX: number;
  positionY: number;
  category: MasterplanCategory;
  assetPath: string;
};

export type MasterplanObject = MasterplanObjectMeta & {
  title: string;
  subtitle: string;
  description: string;
  estimatedVisitTime: string;
  capacity: string;
  functionLabel: string;
  accentLabel: string;
};

export type MasterplanCategory = "museum" | "restaurant" | "cafe" | "viewpoint" | "education" | "shop";

export type MasterplanObject = {
  id: MasterplanCategory;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  positionX: number;
  positionY: number;
  category: MasterplanCategory;
  estimatedVisitTime: string;
  capacity: string;
  functionLabel: string;
  accentLabel: string;
  assetPath: string;
};

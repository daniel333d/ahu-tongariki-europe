export type MoaiSilhouetteVariant = "slender" | "broad" | "weathered" | "tall" | "compact";

export type MoaiStatueData = {
  id: number;
  height: number;
  width: number;
  offsetY: number;
  rotation: number;
  hasPukao: boolean;
  silhouetteVariant: MoaiSilhouetteVariant;
};

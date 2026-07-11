import { Camera, Coffee, GraduationCap, Landmark, ShoppingBag, Utensils } from "lucide-react";
import { assets } from "../../lib/asset-paths";
import type { FeatureCardMeta } from "./types";

export const featureCardMeta: FeatureCardMeta[] = [
  { number: "01", assetPath: assets.cards.museum, icon: Landmark },
  { number: "02", assetPath: assets.cards.restaurant, icon: Utensils },
  { number: "03", assetPath: assets.cards.cafe, icon: Coffee },
  { number: "04", assetPath: assets.cards.viewpoint, icon: Camera },
  { number: "05", assetPath: assets.cards.education, icon: GraduationCap },
  { number: "06", assetPath: assets.cards.shop, icon: ShoppingBag }
];

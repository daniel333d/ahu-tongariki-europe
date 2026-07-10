import { Camera, Coffee, GraduationCap, Landmark, ShoppingBag, Utensils } from "lucide-react";
import { assets } from "../../lib/asset-paths";
import type { FeatureCardData } from "./types";

export const featureCards: FeatureCardData[] = [
  {
    number: "01",
    title: "Muzeum",
    description:
      "Przestrzeń ekspozycyjna poświęcona historii Rapa Nui, znaczeniu Moai i odkryciom archeologicznym.",
    assetPath: assets.cards.museum,
    icon: Landmark
  },
  {
    number: "02",
    title: "Restauracja",
    description:
      "Kameralne miejsce z widokiem na platformę Ahu, inspirowane kuchnią regionalną i produktami lokalnymi.",
    assetPath: assets.cards.restaurant,
    icon: Utensils
  },
  {
    number: "03",
    title: "Kawiarnia",
    description:
      "Elegancka strefa odpoczynku z tarasem, światłem zachodu słońca i spokojną atmosferą kompleksu.",
    assetPath: assets.cards.cafe,
    icon: Coffee
  },
  {
    number: "04",
    title: "Punkt widokowy",
    description: "Panorama całego założenia, Kotliny Kłodzkiej i osi widokowej prowadzącej ku posągom Moai.",
    assetPath: assets.cards.viewpoint,
    icon: Camera
  },
  {
    number: "05",
    title: "Centrum edukacyjne",
    description:
      "Warsztaty, prelekcje, projekcje i programy edukacyjne dla szkół, rodzin oraz gości międzynarodowych.",
    assetPath: assets.cards.education,
    icon: GraduationCap
  },
  {
    number: "06",
    title: "Sklep",
    description:
      "Wyselekcjonowane publikacje, modele Moai, rzemiosło i pamiątki premium związane z projektem.",
    assetPath: assets.cards.shop,
    icon: ShoppingBag
  }
];

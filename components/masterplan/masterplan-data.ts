import { assets } from "../../lib/asset-paths";
import type { MasterplanObject } from "./types";

export const masterplanObjects: MasterplanObject[] = [
  {
    id: "museum",
    number: "01",
    title: "Muzeum",
    subtitle: "Historia Rapa Nui i znaczenie Moai",
    description:
      "Nowoczesna przestrzeń ekspozycyjna prezentująca kontekst Ahu Tongariki, dziedzictwo Rapa Nui oraz archeologiczne znaczenie posągów Moai.",
    positionX: 22,
    positionY: 68,
    category: "museum",
    estimatedVisitTime: "60-90 min",
    capacity: "1200 m²",
    functionLabel: "Ekspozycja i interpretacja dziedzictwa",
    accentLabel: "Ekspozycja główna",
    assetPath: assets.buildings.museum
  },
  {
    id: "restaurant",
    number: "02",
    title: "Restauracja",
    subtitle: "Kuchnia regionalna i widok na Ahu",
    description:
      "Restauracja wpisana w krajobraz kompleksu, zaprojektowana jako spokojne miejsce spotkań z widokiem na platformę i panoramę doliny.",
    positionX: 72,
    positionY: 72,
    category: "restaurant",
    estimatedVisitTime: "75 min",
    capacity: "180 miejsc",
    functionLabel: "Gastronomia i spotkania",
    accentLabel: "Widok na Moai",
    assetPath: assets.buildings.restaurant
  },
  {
    id: "cafe",
    number: "03",
    title: "Kawiarnia",
    subtitle: "Taras, kawa i zachód słońca",
    description:
      "Kameralna strefa odpoczynku z tarasem, ciepłym światłem i perspektywą na założenie Ahu Tongariki Europe.",
    positionX: 79,
    positionY: 43,
    category: "cafe",
    estimatedVisitTime: "30-45 min",
    capacity: "70 miejsc",
    functionLabel: "Odpoczynek i taras widokowy",
    accentLabel: "Taras premium",
    assetPath: assets.buildings.cafe
  },
  {
    id: "viewpoint",
    number: "04",
    title: "Punkt widokowy",
    subtitle: "Panorama Kotliny Kłodzkiej",
    description:
      "Podwyższona platforma widokowa kierująca wzrok na oś Moai, Bystrzycę Kłodzką i rozległy krajobraz doliny.",
    positionX: 55,
    positionY: 18,
    category: "viewpoint",
    estimatedVisitTime: "20-30 min",
    capacity: "120 osób",
    functionLabel: "Obserwacja panoramy",
    accentLabel: "Najwyższy punkt",
    assetPath: assets.buildings.viewpoint
  },
  {
    id: "education",
    number: "05",
    title: "Centrum edukacyjne",
    subtitle: "Warsztaty, prelekcje i programy",
    description:
      "Miejsce edukacji historycznej i archeologicznej z salami warsztatowymi, programami dla szkół oraz spotkaniami eksperckimi.",
    positionX: 30,
    positionY: 34,
    category: "education",
    estimatedVisitTime: "45-120 min",
    capacity: "3 sale",
    functionLabel: "Edukacja i programy publiczne",
    accentLabel: "Edukacja i kultura",
    assetPath: assets.buildings.education
  },
  {
    id: "shop",
    number: "06",
    title: "Sklep",
    subtitle: "Publikacje, modele i pamiątki premium",
    description:
      "Butik muzealny z wydawnictwami, modelami Moai, rzemiosłem i starannie dobranymi pamiątkami związanymi z projektem.",
    positionX: 50,
    positionY: 84,
    category: "shop",
    estimatedVisitTime: "15-25 min",
    capacity: "300+ pozycji",
    functionLabel: "Publikacje i pamiątki premium",
    accentLabel: "Butik muzealny",
    assetPath: assets.buildings.shop
  }
];

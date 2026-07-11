import { assets } from "../../lib/asset-paths";
import type { MasterplanObjectMeta } from "./types";

export const masterplanObjectMeta: MasterplanObjectMeta[] = [
  {
    id: "museum",
    number: "01",
    positionX: 22,
    positionY: 68,
    category: "museum",
    assetPath: assets.buildings.museum
  },
  {
    id: "restaurant",
    number: "02",
    positionX: 72,
    positionY: 72,
    category: "restaurant",
    assetPath: assets.buildings.restaurant
  },
  {
    id: "cafe",
    number: "03",
    positionX: 79,
    positionY: 43,
    category: "cafe",
    assetPath: assets.buildings.cafe
  },
  {
    id: "viewpoint",
    number: "04",
    positionX: 55,
    positionY: 18,
    category: "viewpoint",
    assetPath: assets.buildings.viewpoint
  },
  {
    id: "education",
    number: "05",
    positionX: 30,
    positionY: 34,
    category: "education",
    assetPath: assets.buildings.education
  },
  {
    id: "shop",
    number: "06",
    positionX: 50,
    positionY: 84,
    category: "shop",
    assetPath: assets.buildings.shop
  }
];

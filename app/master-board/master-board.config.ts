import type { MasterBoardBlueprint } from "./types";

export const masterBoardV1: MasterBoardBlueprint = {
  version: "1.0",
  referenceAsset: {
    id: "master-board-v1",
    label: "MASTER BOARD v1.0",
    path: "/master-board/reference/master-board-v1.png",
    status: "available"
  },
  layout: {
    maxWidth: 1600,
    heroRatio: "1600 / 520",
    cardsCount: 6,
    planColumns: "2fr 1fr"
  },
  metrics: [
    { id: "location", icon: "map-pin", value: "Bystrzyca Kłodzka", label: "Dolny Śląsk, Polska" },
    { id: "area", icon: "map", value: "16 ha", label: "Powierzchnia kompleksu" },
    { id: "moai", icon: "moai", value: "15 Moai", label: "Wierna kopia Ahu Tongariki" },
    { id: "culture", icon: "landmark", value: "Centrum kultury", label: "I edukacji" },
    { id: "panorama", icon: "mountains", value: "Panorama Kotliny", label: "Kłodzkiej" }
  ],
  facilities: [
    {
      id: "museum",
      number: "01",
      titleKey: "masterBoard.facilities.museum.title",
      icon: "landmark",
      cardAsset: "/master-board/cards/museum.png",
      interiorAsset: "/master-board/interiors/museum.png",
      bulletsKey: "masterBoard.facilities.museum.bullets",
      statsKey: "masterBoard.facilities.museum.stats"
    },
    {
      id: "restaurant",
      number: "02",
      titleKey: "masterBoard.facilities.restaurant.title",
      icon: "utensils",
      cardAsset: "/master-board/cards/restaurant.png",
      interiorAsset: "/master-board/interiors/restaurant.png",
      bulletsKey: "masterBoard.facilities.restaurant.bullets",
      statsKey: "masterBoard.facilities.restaurant.stats"
    },
    {
      id: "cafe",
      number: "03",
      titleKey: "masterBoard.facilities.cafe.title",
      icon: "coffee",
      cardAsset: "/master-board/cards/cafe.png",
      interiorAsset: "/master-board/interiors/cafe.png",
      bulletsKey: "masterBoard.facilities.cafe.bullets",
      statsKey: "masterBoard.facilities.cafe.stats"
    },
    {
      id: "viewpoint",
      number: "04",
      titleKey: "masterBoard.facilities.viewpoint.title",
      icon: "camera",
      cardAsset: "/master-board/cards/viewpoint.png",
      interiorAsset: "/master-board/interiors/viewpoint.png",
      bulletsKey: "masterBoard.facilities.viewpoint.bullets",
      statsKey: "masterBoard.facilities.viewpoint.stats"
    },
    {
      id: "education-center",
      number: "05",
      titleKey: "masterBoard.facilities.educationCenter.title",
      icon: "graduation-cap",
      cardAsset: "/master-board/cards/education-center.png",
      interiorAsset: "/master-board/interiors/education-center.png",
      bulletsKey: "masterBoard.facilities.educationCenter.bullets",
      statsKey: "masterBoard.facilities.educationCenter.stats"
    },
    {
      id: "shop",
      number: "06",
      titleKey: "masterBoard.facilities.shop.title",
      icon: "shopping-bag",
      cardAsset: "/master-board/cards/shop.png",
      interiorAsset: "/master-board/interiors/shop.png",
      bulletsKey: "masterBoard.facilities.shop.bullets",
      statsKey: "masterBoard.facilities.shop.stats"
    }
  ],
  values: [
    { id: "global-attraction", icon: "globe", labelKey: "masterBoard.values.globalAttraction" },
    { id: "heritage", icon: "moai", labelKey: "masterBoard.values.heritage" },
    { id: "architecture", icon: "leaf", labelKey: "masterBoard.values.architecture" },
    { id: "education", icon: "book-open", labelKey: "masterBoard.values.education" },
    { id: "premium", icon: "star", labelKey: "masterBoard.values.premium" },
    { id: "responsibility", icon: "sprout", labelKey: "masterBoard.values.responsibility" }
  ],
  assets: [
    {
      id: "hero",
      label: "Complex sunset hero",
      path: "/master-board/hero/complex-sunset.png",
      status: "pending"
    },
    { id: "plan", label: "Complex plan", path: "/master-board/plan/complex-plan.png", status: "pending" },
    { id: "museum-card", label: "Museum card", path: "/master-board/cards/museum.png", status: "pending" },
    {
      id: "restaurant-card",
      label: "Restaurant card",
      path: "/master-board/cards/restaurant.png",
      status: "pending"
    },
    { id: "cafe-card", label: "Cafe card", path: "/master-board/cards/cafe.png", status: "pending" },
    {
      id: "viewpoint-card",
      label: "Viewpoint card",
      path: "/master-board/cards/viewpoint.png",
      status: "pending"
    },
    {
      id: "education-card",
      label: "Education center card",
      path: "/master-board/cards/education-center.png",
      status: "pending"
    },
    { id: "shop-card", label: "Shop card", path: "/master-board/cards/shop.png", status: "pending" }
  ]
};

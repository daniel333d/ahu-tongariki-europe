export type MasterBoardAssetStatus = "available" | "pending";

export type MasterBoardAsset = {
  id: string;
  label: string;
  path: string;
  status: MasterBoardAssetStatus;
};

export type MasterBoardMetric = {
  id: string;
  icon: string;
  value: string;
  label: string;
};

export type MasterBoardFacility = {
  id: string;
  number: string;
  titleKey: string;
  icon: string;
  cardAsset: string;
  interiorAsset: string;
  bulletsKey: string;
  statsKey: string;
};

export type MasterBoardValue = {
  id: string;
  icon: string;
  labelKey: string;
};

export type MasterBoardBlueprint = {
  version: "1.0";
  referenceAsset: MasterBoardAsset;
  layout: {
    maxWidth: number;
    heroRatio: string;
    cardsCount: number;
    planColumns: string;
  };
  metrics: MasterBoardMetric[];
  facilities: MasterBoardFacility[];
  values: MasterBoardValue[];
  assets: MasterBoardAsset[];
};

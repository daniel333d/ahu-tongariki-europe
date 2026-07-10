import type { MoaiStatueData } from "./types";

export const EXPECTED_MOAI_COUNT = 15;
export const EXPECTED_PUKAO_ID = 14;

export const moaiStatues: MoaiStatueData[] = [
  { id: 1, height: 72, width: 34, offsetY: 8, rotation: -2.6, hasPukao: false, silhouetteVariant: "compact" },
  { id: 2, height: 79, width: 36, offsetY: 2, rotation: -1.8, hasPukao: false, silhouetteVariant: "slender" },
  {
    id: 3,
    height: 84,
    width: 39,
    offsetY: 0,
    rotation: -1.2,
    hasPukao: false,
    silhouetteVariant: "weathered"
  },
  { id: 4, height: 91, width: 40, offsetY: -4, rotation: -0.8, hasPukao: false, silhouetteVariant: "tall" },
  { id: 5, height: 86, width: 41, offsetY: 1, rotation: -1.6, hasPukao: false, silhouetteVariant: "broad" },
  { id: 6, height: 96, width: 42, offsetY: -7, rotation: -0.4, hasPukao: false, silhouetteVariant: "tall" },
  { id: 7, height: 89, width: 38, offsetY: -1, rotation: 0.6, hasPukao: false, silhouetteVariant: "slender" },
  { id: 8, height: 101, width: 45, offsetY: -9, rotation: 0.2, hasPukao: false, silhouetteVariant: "broad" },
  {
    id: 9,
    height: 94,
    width: 40,
    offsetY: -3,
    rotation: -0.7,
    hasPukao: false,
    silhouetteVariant: "weathered"
  },
  { id: 10, height: 103, width: 43, offsetY: -10, rotation: 0.9, hasPukao: false, silhouetteVariant: "tall" },
  { id: 11, height: 98, width: 44, offsetY: -6, rotation: 1.2, hasPukao: false, silhouetteVariant: "broad" },
  {
    id: 12,
    height: 108,
    width: 47,
    offsetY: -12,
    rotation: 0.5,
    hasPukao: false,
    silhouetteVariant: "weathered"
  },
  {
    id: 13,
    height: 99,
    width: 42,
    offsetY: -5,
    rotation: -0.3,
    hasPukao: false,
    silhouetteVariant: "slender"
  },
  { id: 14, height: 112, width: 48, offsetY: -15, rotation: 0.8, hasPukao: true, silhouetteVariant: "broad" },
  {
    id: 15,
    height: 104,
    width: 45,
    offsetY: -8,
    rotation: -0.6,
    hasPukao: false,
    silhouetteVariant: "weathered"
  }
];

export function validateMoaiData(statues: MoaiStatueData[]) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (statues.length !== EXPECTED_MOAI_COUNT) {
    throw new Error(
      `MoaiPlatform requires exactly ${EXPECTED_MOAI_COUNT} Moai statues. Received ${statues.length}.`
    );
  }

  const pukaoStatues = statues.filter((statue) => statue.hasPukao);

  if (pukaoStatues.length !== 1 || pukaoStatues[0]?.id !== EXPECTED_PUKAO_ID) {
    throw new Error(`MoaiPlatform requires the only pukao to be placed on Moai #${EXPECTED_PUKAO_ID}.`);
  }
}

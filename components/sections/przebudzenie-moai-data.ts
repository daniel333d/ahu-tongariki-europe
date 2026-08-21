export type EyePosition = {
  id: string;
  x: number;
  y: number;
  width: number;
  rotation?: number;
  delay?: number;
};

export type AwakeningEvent = {
  announced: boolean;
  date?: string;
  title?: string;
};

export type AwakeningActivity = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  size: "hero" | "large" | "medium";
  order: number;
  image: string;
  altKey: string;
  visualMode?: "contain" | "cover";
  details?: string[];
};

export type AwakeningMoment = {
  id: string;
  titleKey: string;
  descriptionKey: string;
};

export type AwakeningStoryChapter = {
  id: string;
  titleKey: string;
  bodyKey: string;
};

export type AwakeningTimelineItem = {
  id: string;
  timeKey: string;
  titleKey: string;
  descriptionKey: string;
};

export const awakeningEvent: AwakeningEvent = {
  announced: false
};

export const heroEyePositions: EyePosition[] = [
  { id: "owner-eye-left", x: 35, y: 68, width: 11.2, rotation: -2, delay: 0.86 },
  { id: "owner-eye-right", x: 75, y: 66, width: 11.4, rotation: 1, delay: 1.72 }
];

export const awakeningMoments: AwakeningMoment[] = [
  {
    id: "guardians",
    titleKey: "awakening.moments.guardians.title",
    descriptionKey: "awakening.moments.guardians.description"
  },
  {
    id: "voice",
    titleKey: "awakening.moments.voice.title",
    descriptionKey: "awakening.moments.voice.description"
  },
  {
    id: "ahuLight",
    titleKey: "awakening.moments.ahuLight.title",
    descriptionKey: "awakening.moments.ahuLight.description"
  },
  {
    id: "sign",
    titleKey: "awakening.moments.sign.title",
    descriptionKey: "awakening.moments.sign.description"
  }
];

export const awakeningStoryChapters: AwakeningStoryChapter[] = [
  {
    id: "firstLook",
    titleKey: "awakening.storyChapters.firstLook.title",
    bodyKey: "awakening.storyChapters.firstLook.body"
  },
  {
    id: "memory",
    titleKey: "awakening.storyChapters.memory.title",
    bodyKey: "awakening.storyChapters.memory.body"
  },
  {
    id: "path",
    titleKey: "awakening.storyChapters.path.title",
    bodyKey: "awakening.storyChapters.path.body"
  },
  {
    id: "evening",
    titleKey: "awakening.storyChapters.evening.title",
    bodyKey: "awakening.storyChapters.evening.body"
  }
];

export const awakeningActivities: AwakeningActivity[] = [
  {
    id: "ceremony",
    titleKey: "awakening.activities.ceremony.title",
    descriptionKey: "awakening.activities.ceremony.description",
    icon: "01",
    size: "hero",
    order: 1,
    image: "/assets/przebudzenie-moai/owner-eyes-temple-horizontal.png",
    altKey: "awakening.assets.templeHorizontalAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.light", "awakening.activityDetails.sequence", "awakening.activityDetails.ceremony"]
  },
  {
    id: "trail",
    titleKey: "awakening.activities.trail.title",
    descriptionKey: "awakening.activities.trail.description",
    icon: "02",
    size: "large",
    order: 2,
    image: "/assets/przebudzenie-moai/owner-moai-five-ocean.png",
    altKey: "awakening.assets.fiveOceanAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.path", "awakening.activityDetails.symbols"]
  },
  {
    id: "stories",
    titleKey: "awakening.activities.stories.title",
    descriptionKey: "awakening.activities.stories.description",
    icon: "03",
    size: "large",
    order: 3,
    image: "/assets/przebudzenie-moai/owner-ahu-tongariki-day.png",
    altKey: "awakening.assets.ahuDayAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.narration", "awakening.activityDetails.education"]
  },
  {
    id: "feast",
    titleKey: "awakening.activities.feast.title",
    descriptionKey: "awakening.activities.feast.description",
    icon: "04",
    size: "medium",
    order: 4,
    image: "/assets/przebudzenie-moai/owner-moai-close-day.png",
    altKey: "awakening.assets.closeDayAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.hosting", "awakening.activityDetails.daylight"]
  },
  {
    id: "photos",
    titleKey: "awakening.activities.photos.title",
    descriptionKey: "awakening.activities.photos.description",
    icon: "05",
    size: "medium",
    order: 5,
    image: "/assets/przebudzenie-moai/owner-eyes-black-gold.png",
    altKey: "awakening.assets.blackGoldAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.photo", "awakening.activityDetails.goldHour"]
  },
  {
    id: "symbols",
    titleKey: "awakening.activities.symbols.title",
    descriptionKey: "awakening.activities.symbols.description",
    icon: "06",
    size: "medium",
    order: 6,
    image: "/assets/przebudzenie-moai/owner-eyes-storm-landscape.png",
    altKey: "awakening.assets.stormLandscapeAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.workshop", "awakening.activityDetails.sign"]
  },
  {
    id: "mystery",
    titleKey: "awakening.activities.mystery.title",
    descriptionKey: "awakening.activities.mystery.description",
    icon: "07",
    size: "medium",
    order: 7,
    image: "/assets/przebudzenie-moai/owner-moai-hills-close.png",
    altKey: "awakening.assets.hillsAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.clue", "awakening.activityDetails.family"]
  },
  {
    id: "light",
    titleKey: "awakening.activities.light.title",
    descriptionKey: "awakening.activities.light.description",
    icon: "08",
    size: "large",
    order: 8,
    image: "/assets/przebudzenie-moai/owner-eyes-storm-animated.gif",
    altKey: "awakening.assets.stormAnimatedAlt",
    visualMode: "contain",
    details: ["awakening.activityDetails.night", "awakening.activityDetails.finalLight"]
  }
];

export const awakeningTimeline: AwakeningTimelineItem[] = [
  {
    id: "dawn",
    timeKey: "awakening.timeline.dawn.time",
    titleKey: "awakening.timeline.dawn.title",
    descriptionKey: "awakening.timeline.dawn.description"
  },
  {
    id: "noon",
    timeKey: "awakening.timeline.noon.time",
    titleKey: "awakening.timeline.noon.title",
    descriptionKey: "awakening.timeline.noon.description"
  },
  {
    id: "afternoon",
    timeKey: "awakening.timeline.afternoon.time",
    titleKey: "awakening.timeline.afternoon.title",
    descriptionKey: "awakening.timeline.afternoon.description"
  },
  {
    id: "dusk",
    timeKey: "awakening.timeline.dusk.time",
    titleKey: "awakening.timeline.dusk.title",
    descriptionKey: "awakening.timeline.dusk.description"
  },
  {
    id: "night",
    timeKey: "awakening.timeline.night.time",
    titleKey: "awakening.timeline.night.title",
    descriptionKey: "awakening.timeline.night.description"
  }
];

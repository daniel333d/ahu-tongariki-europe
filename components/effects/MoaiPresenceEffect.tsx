"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  drift: number;
  alpha: number;
  angle: number;
  spin: number;
  depth: number;
};

type MoaiPresenceVariant = {
  src: string;
  label: string;
};

type PointSample = {
  x: number;
  y: number;
  color: string;
};

const ABSENCE_DELAY_MS = 30_000;
const ASSEMBLY_DURATION_MS = 7_000;
const MERGE_DURATION_MS = 1_800;
const FULL_FACE_HOLD_MS = 15_000;
const FADE_DURATION_MS = 1_800;
const CYCLE_DURATION_MS = ASSEMBLY_DURATION_MS + MERGE_DURATION_MS + FULL_FACE_HOLD_MS + FADE_DURATION_MS;
const VARIANT_CHANGE_MS = CYCLE_DURATION_MS + 900;
const POINTER_MOVE_THRESHOLD_PX = 12;

const MOAI_PRESENCE_VARIANTS: MoaiPresenceVariant[] = [
  {
    src: "/assets/moai-presence/moai-presence-classic.png",
    label: "Moai bez pukao"
  },
  {
    src: "/assets/moai-presence/moai-presence-pukao.png",
    label: "Moai z pukao"
  },
  {
    src: "/assets/moai-presence/moai-presence-weathered.png",
    label: "Moai zwietrzały"
  }
];

function getRandomVariantIndex() {
  return Math.floor(Math.random() * MOAI_PRESENCE_VARIANTS.length);
}

function getNextVariantIndex(currentIndex: number) {
  if (MOAI_PRESENCE_VARIANTS.length <= 1) {
    return currentIndex;
  }

  let nextIndex = getRandomVariantIndex();

  while (nextIndex === currentIndex) {
    nextIndex = getRandomVariantIndex();
  }

  return nextIndex;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function getParticleCount(width: number) {
  const cores = typeof navigator === "undefined" ? 4 : navigator.hardwareConcurrency || 4;
  const performanceFactor = cores >= 10 ? 1 : cores >= 6 ? 0.82 : 0.62;

  if (width < 640) {
    return Math.floor(10_000 * performanceFactor);
  }

  if (width < 1024) {
    return Math.floor(16_000 * performanceFactor);
  }

  if (width < 1500) {
    return Math.floor(22_000 * performanceFactor);
  }

  return Math.floor(30_000 * performanceFactor);
}

function getContainedImageRect(image: HTMLImageElement, width: number, height: number) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let targetHeight = height * (width < 640 ? 1.02 : 0.94);
  let targetWidth = targetHeight * imageRatio;
  const maxWidth = width * (width < 640 ? 1.48 : 0.88);

  if (targetWidth > maxWidth) {
    targetWidth = maxWidth;
    targetHeight = targetWidth / imageRatio;
  }

  return {
    x: (width - targetWidth) / 2,
    y: (height - targetHeight) / 2,
    width: targetWidth,
    height: targetHeight
  };
}

function collectFaceSamples(image: HTMLImageElement, width: number, height: number, particleCount: number) {
  const offscreen = document.createElement("canvas");
  const context = offscreen.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return [];
  }

  offscreen.width = width;
  offscreen.height = height;

  const rect = getContainedImageRect(image, width, height);
  context.clearRect(0, 0, width, height);
  context.drawImage(image, rect.x, rect.y, rect.width, rect.height);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const step = width < 640 ? 3 : width < 1200 ? 4 : 5;
  const candidates: PointSample[] = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const alpha = data[index + 3];
      const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

      if (alpha > 32 && luminance > 20) {
        candidates.push({
          x,
          y,
          color: `rgb(${red}, ${green}, ${blue})`
        });
      }
    }
  }

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[randomIndex]] = [candidates[randomIndex], candidates[index]];
  }

  return candidates.slice(0, particleCount);
}

function createStartPosition(width: number, height: number) {
  const side = Math.floor(Math.random() * 6);
  const depthOffset = 220 + Math.random() * 620;

  if (side === 0) {
    return { x: -depthOffset, y: Math.random() * height };
  }

  if (side === 1) {
    return { x: width + depthOffset, y: Math.random() * height };
  }

  if (side === 2) {
    return { x: Math.random() * width, y: -depthOffset };
  }

  if (side === 3) {
    return { x: Math.random() * width, y: height + depthOffset };
  }

  return {
    x: width * 0.5 + (Math.random() - 0.5) * width * 1.7,
    y: height * 0.5 + (Math.random() - 0.5) * height * 1.7
  };
}

function createParticles(samples: PointSample[], width: number, height: number, prefersReducedMotion: boolean): Particle[] {
  return samples.map((sample, index) => {
    const start = prefersReducedMotion
      ? {
          x: sample.x + (Math.random() - 0.5) * 60,
          y: sample.y + (Math.random() - 0.5) * 60
        }
      : createStartPosition(width, height);

    return {
      startX: start.x,
      startY: start.y,
      targetX: sample.x,
      targetY: sample.y,
      x: start.x,
      y: start.y,
      color: sample.color,
      size: prefersReducedMotion ? 0.75 + Math.random() * 0.9 : 0.38 + Math.random() * 0.95,
      delay: prefersReducedMotion ? Math.random() * 0.14 : Math.random() * 0.42 + (index / samples.length) * 0.32,
      drift: (Math.random() - 0.5) * 54,
      alpha: 0.62 + Math.random() * 0.38,
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 1.4,
      depth: Math.random()
    };
  });
}

function drawVolcanicBackground(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const gradient = context.createRadialGradient(width * 0.5, height * 0.42, height * 0.08, width * 0.5, height * 0.46, height * 0.72);

  gradient.addColorStop(0, "rgba(51, 39, 31, 0.72)");
  gradient.addColorStop(0.45, "rgba(8, 14, 18, 0.94)");
  gradient.addColorStop(1, "rgba(1, 5, 8, 1)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.12;
  context.fillStyle = "rgba(200, 164, 90, 0.55)";

  for (let index = 0; index < 80; index += 1) {
    const x = (Math.sin(index * 12.989 + time * 0.00012) * 43758.5453) % 1;
    const y = (Math.sin(index * 78.233 + time * 0.00009) * 24634.6345) % 1;

    context.beginPath();
    context.arc(Math.abs(x) * width, Math.abs(y) * height, 0.75, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

function drawStoneParticle(
  context: CanvasRenderingContext2D,
  particle: Particle,
  size: number,
  faceProgress: number
) {
  const shimmer = 0.88 + Math.sin(faceProgress * Math.PI * 8 + particle.drift) * 0.08;
  const radiusX = Math.max(0.22, size * (0.42 + particle.depth * 0.1) * shimmer);
  const radiusY = Math.max(0.2, size * (0.34 + Math.abs(Math.sin(particle.drift)) * 0.08));

  context.beginPath();
  context.ellipse(
    particle.x,
    particle.y,
    radiusX,
    radiusY,
    particle.angle + particle.spin * faceProgress * 0.35,
    0,
    Math.PI * 2
  );
  context.fill();
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  elapsed: number,
  prefersReducedMotion: boolean
) {
  const assemblyDuration = prefersReducedMotion ? ASSEMBLY_DURATION_MS * 1.2 : ASSEMBLY_DURATION_MS;
  const faceProgress = clamp(elapsed / assemblyDuration, 0, 1);
  const mergeProgress = clamp((elapsed - assemblyDuration) / MERGE_DURATION_MS, 0, 1);
  const holdProgress = clamp((elapsed - assemblyDuration - MERGE_DURATION_MS) / FULL_FACE_HOLD_MS, 0, 1);
  const fadeProgress = clamp((elapsed - assemblyDuration - MERGE_DURATION_MS - FULL_FACE_HOLD_MS) / FADE_DURATION_MS, 0, 1);
  const globalAlpha = fadeProgress > 0 ? 1 - easeOutCubic(fadeProgress) : 1;
  const lightX = width * (0.28 + holdProgress * 0.18);
  const lightGradient = context.createLinearGradient(lightX - width * 0.18, 0, lightX + width * 0.14, height);

  lightGradient.addColorStop(0, "rgba(255, 216, 149, 0)");
  lightGradient.addColorStop(0.5, "rgba(255, 204, 128, 0.2)");
  lightGradient.addColorStop(1, "rgba(255, 216, 149, 0)");

  context.save();
  context.globalCompositeOperation = "screen";

  for (const particle of particles) {
    const localProgress = clamp((faceProgress - particle.delay) / (1 - particle.delay), 0, 1);
    const easedProgress = easeInOutCubic(localProgress);
    const stormProgress = clamp(faceProgress / 0.18, 0, 1);
    const stormFade = 1 - clamp((faceProgress - 0.18) / 0.42, 0, 1) * 0.55;
    const arc = Math.sin(easedProgress * Math.PI) * particle.drift;
    const depthScale = prefersReducedMotion ? 1 : 1 + (1 - easedProgress) * (0.55 + particle.depth * 0.9);

    particle.x = particle.startX + (particle.targetX - particle.startX) * easedProgress + arc * 0.32;
    particle.y = particle.startY + (particle.targetY - particle.startY) * easedProgress - arc * 0.22;

    const revealAlpha = clamp(localProgress * 1.5, 0, 1);
    const stormAlpha = stormProgress * stormFade * clamp(1.05 - localProgress * 0.65, 0, 1);
    const stableAlpha = faceProgress >= 1 ? 0.9 + Math.sin(holdProgress * Math.PI * 2 + particle.drift) * 0.04 : revealAlpha;
    const mergeFade = mergeProgress > 0 ? 1 - easeOutCubic(mergeProgress) * 0.92 : 1;
    const alpha = particle.alpha * Math.max(stormAlpha, stableAlpha) * globalAlpha * mergeFade;

    if (alpha <= 0.01) {
      continue;
    }

    context.globalAlpha = alpha;
    context.fillStyle = particle.color;

    const size = particle.size * depthScale;

    drawStoneParticle(context, particle, size, faceProgress);
  }

  context.globalAlpha = 0.28 * globalAlpha;
  context.fillStyle = lightGradient;
  context.fillRect(0, 0, width, height);
  context.restore();
}

function drawRealisticMoaiSurface(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  elapsed: number,
  prefersReducedMotion: boolean
) {
  const assemblyDuration = prefersReducedMotion ? ASSEMBLY_DURATION_MS * 1.2 : ASSEMBLY_DURATION_MS;
  const mergeProgress = clamp((elapsed - assemblyDuration) / MERGE_DURATION_MS, 0, 1);
  const holdProgress = clamp((elapsed - assemblyDuration - MERGE_DURATION_MS) / FULL_FACE_HOLD_MS, 0, 1);
  const fadeProgress = clamp((elapsed - assemblyDuration - MERGE_DURATION_MS - FULL_FACE_HOLD_MS) / FADE_DURATION_MS, 0, 1);
  const surfaceAlpha = easeOutCubic(mergeProgress) * (fadeProgress > 0 ? 1 - easeOutCubic(fadeProgress) : 1);

  if (surfaceAlpha <= 0.01) {
    return;
  }

  const rect = getContainedImageRect(image, width, height);
  const parallaxX = Math.sin(holdProgress * Math.PI * 2) * width * 0.008;
  const parallaxY = Math.cos(holdProgress * Math.PI * 2) * height * 0.006;
  const lightX = width * (0.32 + holdProgress * 0.2);
  const lightGradient = context.createLinearGradient(lightX - width * 0.18, 0, lightX + width * 0.1, height);

  lightGradient.addColorStop(0, "rgba(255, 216, 155, 0)");
  lightGradient.addColorStop(0.5, "rgba(255, 214, 151, 0.2)");
  lightGradient.addColorStop(1, "rgba(255, 216, 155, 0)");

  context.save();
  context.globalAlpha = surfaceAlpha;
  context.drawImage(image, rect.x + parallaxX, rect.y + parallaxY, rect.width, rect.height);
  context.globalCompositeOperation = "screen";
  context.globalAlpha = surfaceAlpha * 0.42;
  context.fillStyle = lightGradient;
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = "source-over";
  context.globalAlpha = surfaceAlpha;

  const vignette = context.createRadialGradient(width * 0.5, height * 0.48, height * 0.18, width * 0.5, height * 0.5, height * 0.7);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(0.62, "rgba(0, 0, 0, 0.08)");
  vignette.addColorStop(1, "rgba(1, 5, 8, 0.86)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
  context.restore();
}

export function MoaiPresenceEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const cycleStartRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const lastPointerPositionRef = useRef<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    setVariantIndex(getRandomVariantIndex());
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  useEffect(() => {
    function markActivity() {
      lastActivityRef.current = Date.now();
      setIsActive(false);
    }

    function handlePointerMove(event: PointerEvent) {
      const previousPosition = lastPointerPositionRef.current;

      if (!previousPosition) {
        lastPointerPositionRef.current = { x: event.clientX, y: event.clientY };
        return;
      }

      const distance = Math.hypot(event.clientX - previousPosition.x, event.clientY - previousPosition.y);

      if (distance >= POINTER_MOVE_THRESHOLD_PX) {
        lastPointerPositionRef.current = { x: event.clientX, y: event.clientY };
        markActivity();
      }
    }

    const inactivityCheck = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current >= ABSENCE_DELAY_MS) {
        setIsActive(true);
      }
    }, 500);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", markActivity, { passive: true });
    window.addEventListener("keydown", markActivity);
    window.addEventListener("wheel", markActivity, { passive: true });
    window.addEventListener("touchstart", markActivity, { passive: true });

    return () => {
      window.clearInterval(inactivityCheck);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", markActivity);
      window.removeEventListener("keydown", markActivity);
      window.removeEventListener("wheel", markActivity);
      window.removeEventListener("touchstart", markActivity);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const rotationTimer = window.setInterval(() => {
      setVariantIndex((currentIndex) => getNextVariantIndex(currentIndex));
    }, VARIANT_CHANGE_MS);

    return () => {
      window.clearInterval(rotationTimer);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    let isCancelled = false;
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });

    if (!context) {
      return;
    }

    const activeCanvas = canvas;
    const activeContext = context;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    async function prepareAndAnimate() {
      const image = await createImage(MOAI_PRESENCE_VARIANTS[variantIndex].src);

      if (isCancelled) {
        return;
      }

      imageRef.current = image;

      const resize = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.15);
        const width = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
        const height = Math.max(1, Math.floor(window.innerHeight * pixelRatio));

        activeCanvas.width = width;
        activeCanvas.height = height;
        activeCanvas.style.width = "100vw";
        activeCanvas.style.height = "100dvh";
        activeContext.setTransform(1, 0, 0, 1, 0, 0);
        activeContext.scale(pixelRatio, pixelRatio);

        const logicalWidth = window.innerWidth;
        const logicalHeight = window.innerHeight;
        const samples = collectFaceSamples(image, Math.floor(logicalWidth), Math.floor(logicalHeight), getParticleCount(logicalWidth));

        particlesRef.current = createParticles(samples, logicalWidth, logicalHeight, prefersReducedMotion);
        cycleStartRef.current = performance.now();
      };

      resize();
      window.addEventListener("resize", resize);

      const render = (time: number) => {
        if (isCancelled) {
          window.removeEventListener("resize", resize);
          return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const elapsed = (time - cycleStartRef.current) % CYCLE_DURATION_MS;

        activeContext.clearRect(0, 0, width, height);
        drawVolcanicBackground(activeContext, width, height, time);
        drawParticles(activeContext, particlesRef.current, width, height, elapsed, prefersReducedMotion);
        drawRealisticMoaiSurface(activeContext, image, width, height, elapsed, prefersReducedMotion);

        animationFrameRef.current = window.requestAnimationFrame(render);
      };

      animationFrameRef.current = window.requestAnimationFrame(render);
    }

    void prepareAndAnimate();

    return () => {
      isCancelled = true;

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isActive, prefersReducedMotion, variantIndex]);

  return (
    <div
      aria-hidden="true"
      data-moai-screensaver={isActive ? "active" : "idle"}
      className={`pointer-events-none fixed inset-0 z-[95] h-[100dvh] w-screen overflow-hidden bg-[#02070c] transition-opacity duration-1000 ease-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas ref={canvasRef} className="block h-[100dvh] w-screen" />
    </div>
  );
}

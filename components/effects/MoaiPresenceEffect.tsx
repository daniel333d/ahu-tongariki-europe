"use client";

import { useEffect, useRef, useState } from "react";

type MoaiPresenceVariant = {
  src: string;
  label: string;
};

type FragmentParticle = {
  x: number;
  y: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
  rotation: number;
  spin: number;
  color: string;
};

type ParticleScene = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  moaiCanvas: HTMLCanvasElement;
  wordCanvas: HTMLCanvasElement;
  fragments: FragmentParticle[];
  width: number;
  height: number;
};

const ABSENCE_DELAY_MS = 30_000;
const WORD_HOLD_MS = 1_200;
const SHATTER_DURATION_MS = 5_200;
const IMAGE_REVEAL_DURATION_MS = 3_200;
const IMAGE_HOLD_MS = 9_000;
const IMAGE_FADE_MS = 2_800;
const CYCLE_DURATION_MS = WORD_HOLD_MS + SHATTER_DURATION_MS + IMAGE_REVEAL_DURATION_MS + IMAGE_HOLD_MS + IMAGE_FADE_MS;
const VARIANT_CHANGE_MS = CYCLE_DURATION_MS;
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
    label: "Moai zwietrzaly"
  },
  {
    src: "/assets/moai-presence/moai-presence-ko-te-riku.png",
    label: "Ko Te Riku ze zrekonstruowanymi oczami"
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

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function getContainedImageRect(image: HTMLImageElement, width: number, height: number) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let targetHeight = height * (width < 640 ? 0.9 : 0.82);
  let targetWidth = targetHeight * imageRatio;
  const maxWidth = width * (width < 640 ? 1.22 : 0.68);

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

function createMaskedMoai(image: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = width;
  canvas.height = height;

  if (!context) {
    return canvas;
  }

  const rect = getContainedImageRect(image, width, height);

  context.clearRect(0, 0, width, height);
  context.drawImage(image, rect.x, rect.y, rect.width, rect.height);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const alpha = data[index + 3];
    const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const maskAlpha = clamp((luminance - 10) / 50, 0, 1);

    data[index] = Math.round(red * 1.12 + 10);
    data[index + 1] = Math.round(green * 1.08 + 8);
    data[index + 2] = Math.round(blue * 1.02 + 4);
    data[index + 3] = Math.round(alpha * maskAlpha);
  }

  context.putImageData(imageData, 0, 0);

  return canvas;
}

function drawAjourMoaiWord(context: CanvasRenderingContext2D, width: number, height: number) {
  const fontSize = Math.min(width * 0.33, height * 0.42);
  const letters = ["M", "O", "A", "I"];
  const letterSpacing = fontSize * 0.08;
  const letterScaleX = 0.62;
  const letterWidth = fontSize * letterScaleX;
  const wordWidth = letters.length * letterWidth + (letters.length - 1) * letterSpacing;
  const startX = width / 2 - wordWidth / 2 + letterWidth / 2;
  const centerY = height / 2;

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `700 ${fontSize}px Georgia, 'Times New Roman', serif`;
  context.lineJoin = "round";
  context.lineWidth = Math.max(3, fontSize * 0.018);
  context.strokeStyle = "#f1cf72";

  letters.forEach((letter, index) => {
    const x = startX + index * (letterWidth + letterSpacing);

    context.save();
    context.translate(x, centerY);
    context.scale(letterScaleX, 1.08);
    context.strokeText(letter, 0, 0);
    context.restore();
  });

  context.save();
  context.globalAlpha = 0.18;
  context.fillStyle = "#c99b32";

  letters.forEach((letter, index) => {
    const x = startX + index * (letterWidth + letterSpacing);

    context.save();
    context.translate(x, centerY);
    context.scale(letterScaleX, 1.08);
    context.fillText(letter, 0, 0);
    context.restore();
  });

  context.restore();
}

function createWordCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  if (!context) {
    return canvas;
  }

  context.clearRect(0, 0, width, height);
  drawAjourMoaiWord(context, width, height);

  return canvas;
}

function collectWordFragments(width: number, height: number, wordCanvas: HTMLCanvasElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = width;
  canvas.height = height;

  if (!context) {
    return [];
  }

  context.clearRect(0, 0, width, height);
  context.drawImage(wordCanvas, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const step = width < 700 ? 4 : 3;
  const fragments: FragmentParticle[] = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3];

      if (alpha < 44 || Math.random() < 0.22) {
        continue;
      }

      const angle = Math.atan2(y - height / 2, x - width / 2) + (Math.random() - 0.5) * 1.2;
      const distance = Math.max(width, height) * (0.45 + Math.random() * 0.95);
      const warm = 204 + Math.random() * 48;
      const gold = 154 + Math.random() * 70;

      fragments.push({
        x,
        y,
        endX: x + Math.cos(angle) * distance,
        endY: y + Math.sin(angle) * distance + (Math.random() - 0.5) * height * 0.34,
        size: width < 700 ? 1.1 + Math.random() * 1.7 : 0.85 + Math.random() * 1.55,
        delay: Math.random() * 0.34,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 3.2,
        color: `rgb(${Math.round(warm)}, ${Math.round(gold)}, ${Math.round(66 + Math.random() * 44)})`
      });
    }
  }

  return fragments;
}

function createParticleScene(mount: HTMLDivElement, image: HTMLImageElement, width: number, height: number) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    return null;
  }

  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.display = "block";
  canvas.style.height = "100dvh";
  canvas.style.width = "100vw";
  context.scale(pixelRatio, pixelRatio);
  mount.appendChild(canvas);

  const wordCanvas = createWordCanvas(width, height);

  return {
    canvas,
    context,
    moaiCanvas: createMaskedMoai(image, width, height),
    wordCanvas,
    fragments: collectWordFragments(width, height, wordCanvas),
    width,
    height
  };
}

function disposeParticleScene(scene: ParticleScene | null) {
  scene?.canvas.remove();
}

function drawBackground(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.72);

  gradient.addColorStop(0, "rgba(7, 16, 23, 1)");
  gradient.addColorStop(0.58, "rgba(3, 9, 15, 1)");
  gradient.addColorStop(1, "rgba(1, 4, 8, 1)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function drawWordShatter(scene: ParticleScene, elapsed: number, prefersReducedMotion: boolean) {
  const { context, moaiCanvas, wordCanvas, fragments, width, height } = scene;
  const shatterStart = prefersReducedMotion ? 500 : WORD_HOLD_MS;
  const shatterProgress = clamp((elapsed - shatterStart) / SHATTER_DURATION_MS, 0, 1);
  const revealProgress = clamp((elapsed - WORD_HOLD_MS - SHATTER_DURATION_MS * 0.42) / IMAGE_REVEAL_DURATION_MS, 0, 1);
  const fadeProgress = clamp((elapsed - WORD_HOLD_MS - SHATTER_DURATION_MS - IMAGE_REVEAL_DURATION_MS - IMAGE_HOLD_MS) / IMAGE_FADE_MS, 0, 1);
  const revealOpacity = easeInOutCubic(revealProgress) * (1 - easeInOutCubic(fadeProgress));
  const fragmentIntro = easeInOutCubic(clamp(shatterProgress / 0.1, 0, 1));
  const fragmentOpacity = fragmentIntro * (1 - easeOutCubic(shatterProgress * 0.72)) * (1 - easeInOutCubic(fadeProgress));

  drawBackground(context, width, height);

  const stableWordOpacity = (1 - easeInOutCubic(clamp(shatterProgress / 0.34, 0, 1))) * (1 - easeInOutCubic(fadeProgress));

  if (stableWordOpacity > 0) {
    context.save();
    context.globalCompositeOperation = "lighter";
    context.globalAlpha = stableWordOpacity;
    context.drawImage(wordCanvas, 0, 0, width, height);
    context.restore();
  }

  if (revealOpacity > 0) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = revealOpacity * 0.96;
    context.drawImage(moaiCanvas, 0, 0, width, height);
    context.restore();
  }

  context.save();
  context.globalCompositeOperation = "lighter";

  for (let index = 0; index < fragments.length; index += 1) {
    const fragment = fragments[index];
    const localProgress = clamp((shatterProgress - fragment.delay) / Math.max(0.001, 1 - fragment.delay), 0, 1);
    const easedLocal = easeOutCubic(localProgress);
    const turbulence = Math.sin(elapsed * 0.004 + fragment.rotation) * 32 * localProgress;
    const x = fragment.x + (fragment.endX - fragment.x) * easedLocal + turbulence;
    const y = fragment.y + (fragment.endY - fragment.y) * easedLocal + Math.cos(elapsed * 0.003 + fragment.rotation) * 20 * localProgress;
    const alpha = clamp((1 - easedLocal * 0.92) * fragmentOpacity, 0, 1);
    const size = fragment.size * (1 + easedLocal * 2.6);

    context.save();
    context.translate(x, y);
    context.rotate(fragment.rotation + fragment.spin * easedLocal);
    context.globalAlpha = alpha;
    context.fillStyle = fragment.color;
    context.fillRect(-size / 2, -size / 2, size, size * (0.7 + localProgress * 0.6));
    context.restore();
  }

  context.restore();

  if (shatterProgress > 0 && shatterProgress < 0.9) {
    context.save();
    context.globalCompositeOperation = "lighter";
    context.globalAlpha = 0.18 * (1 - shatterProgress);

    const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.42);
    glow.addColorStop(0, "rgba(226, 170, 72, 0.48)");
    glow.addColorStop(0.42, "rgba(184, 126, 48, 0.18)");
    glow.addColorStop(1, "rgba(184, 126, 48, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
    context.restore();
  }
}

export function MoaiPresenceEffect() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const particleSceneRef = useRef<ParticleScene | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cycleStartRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const lastPointerPositionRef = useRef<{ x: number; y: number } | null>(null);
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

      disposeParticleScene(particleSceneRef.current);
      particleSceneRef.current = null;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    let isCancelled = false;
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    async function prepareAndAnimate() {
      const image = await createImage(MOAI_PRESENCE_VARIANTS[variantIndex].src);

      if (isCancelled || !mount) {
        return;
      }

      const createScene = () => {
        disposeParticleScene(particleSceneRef.current);
        particleSceneRef.current = createParticleScene(
          mount,
          image,
          Math.max(1, Math.floor(window.innerWidth)),
          Math.max(1, Math.floor(window.innerHeight))
        );
        cycleStartRef.current = performance.now();
      };

      createScene();
      window.addEventListener("resize", createScene);

      const render = (time: number) => {
        if (isCancelled) {
          window.removeEventListener("resize", createScene);
          return;
        }

        const particleScene = particleSceneRef.current;

        if (!particleScene) {
          return;
        }

        const elapsed = Math.min(time - cycleStartRef.current, CYCLE_DURATION_MS - 1);

        drawWordShatter(particleScene, elapsed, prefersReducedMotion);
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

      disposeParticleScene(particleSceneRef.current);
      particleSceneRef.current = null;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isActive, prefersReducedMotion, variantIndex]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      data-moai-screensaver={isActive ? "active" : "idle"}
      className={`pointer-events-none fixed inset-0 z-[95] h-[100dvh] w-screen overflow-hidden bg-[#02070c] transition-opacity duration-1000 ease-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

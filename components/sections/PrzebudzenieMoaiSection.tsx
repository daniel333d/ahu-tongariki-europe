"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../app/i18n-provider";
import { BrandBackdrop } from "../brand/BrandBackdrop";
import { ImageWatermark } from "../brand/ImageWatermark";
import {
  awakeningActivities,
  awakeningEvent,
  awakeningMoments,
  awakeningStoryChapters,
  awakeningTimeline,
  awakeningTransformationStates,
  transformationNightImages,
  type NightVisualTone
} from "./przebudzenie-moai-data";

function SectionKicker({ children }: { children: string }) {
  return <p className="section-kicker text-gold">{children}</p>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const AWAKENING_STORM_VIDEO = {
  webm: "/assets/przebudzenie-moai/owner-eyes-storm-animated.webm",
  mp4: "/assets/przebudzenie-moai/owner-eyes-storm-animated.mp4",
  poster: "/assets/przebudzenie-moai/owner-eyes-storm-animated-poster.webp"
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function AwakeningStormVideo({ alt, className }: { alt: string; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNearViewport = useInView(containerRef, { once: true, margin: "0px 0px 600px 0px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldPlayVideo = isNearViewport && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldPlayVideo || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    video.load();
    video.play().catch(() => {
      // Autoplay can be rejected by the browser; the poster frame remains visible.
    });
  }, [shouldPlayVideo]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {shouldPlayVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={AWAKENING_STORM_VIDEO.poster}
          aria-label={alt}
          className={`h-full w-full ${className}`}
        >
          <source src={AWAKENING_STORM_VIDEO.webm} type="video/webm" />
          <source src={AWAKENING_STORM_VIDEO.mp4} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={AWAKENING_STORM_VIDEO.poster}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 630px, 100vw"
          className={className}
        />
      )}
    </div>
  );
}

function Hero() {
  const { text } = useI18n();

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#02070c] text-white">
      <Image
        src="/assets/przebudzenie-moai/owner-eyes-temple-horizontal-optimized.webp"
        alt={text("awakening.heroAlt")}
        fill
        sizes="100vw"
        className="scale-[1.03] object-cover object-center opacity-78"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,12,0.96),rgba(2,7,12,0.76)_34%,rgba(2,7,12,0.32)_68%,rgba(2,7,12,0.58)),radial-gradient(circle_at_62%_48%,rgba(184,150,72,0.13),transparent_36%)]" />
      <div className="awakening-light absolute inset-0 opacity-65" aria-hidden="true" />
      <div className="awakening-fog absolute inset-x-0 bottom-0 h-1/2 opacity-70" aria-hidden="true" />
      <div className="relative z-30 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-6 py-28 sm:px-10">
        <div className="max-w-4xl">
          <SectionKicker>{text("awakening.kicker")}</SectionKicker>
          <h1 className="mt-5 max-w-[12ch] text-balance font-serif text-[clamp(3.5rem,8vw,6.9rem)] font-semibold leading-[0.93] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
            {text("awakening.title")}
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-[clamp(1.8rem,3.4vw,3.15rem)] font-semibold leading-tight text-gold">
            {text("awakening.subtitle")}
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">{text("awakening.lead")}</p>
          <p className="mt-8 border-l border-gold/60 pl-5 font-serif text-2xl font-semibold text-white">
            {text("awakening.rareLine")}
          </p>
        </div>
        <div className="mt-14">
          <a
            href="#przebudzenie-manifest"
            className="inline-flex min-h-12 items-center justify-center border border-gold/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label={text("awakening.scrollAria")}
          >
            {text("awakening.scrollCue")}
          </a>
        </div>
      </div>
    </section>
  );
}

function Manifest() {
  const { text } = useI18n();

  return (
    <section id="przebudzenie-manifest" className="relative overflow-hidden bg-[#071018] px-6 py-24 text-white sm:px-10 sm:py-32">
      <BrandBackdrop />
      <Reveal className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <SectionKicker>{text("awakening.manifest.kicker")}</SectionKicker>
          <h2 className="mt-5 max-w-3xl text-balance font-serif text-[clamp(2.65rem,5.4vw,5rem)] font-semibold leading-[1] [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
            {text("awakening.manifest.title")}
          </h2>
        </div>
        <div className="border-l border-gold/55 pl-6 text-lg leading-8 text-white/76 sm:text-xl">
          <p>{text("awakening.manifest.body")}</p>
          <p className="mt-8 font-serif text-2xl font-semibold leading-tight text-[#f7e6bd] sm:text-3xl">
            {text("awakening.manifest.freeRule")}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function StoryChapters() {
  const { text } = useI18n();

  return (
    <section className="bg-[#02080d] px-6 py-24 text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-16">
            <SectionKicker>{text("awakening.story.kicker")}</SectionKicker>
            <h2 className="mt-5 max-w-3xl text-balance font-serif text-[clamp(2.55rem,5.2vw,4.9rem)] font-semibold leading-[1.02]">
              {text("awakening.story.title")}
            </h2>
            <p className="mt-7 text-lg leading-8 text-white/70 sm:text-xl">{text("awakening.story.body")}</p>
          </div>
          <div className="divide-y divide-white/12 border-y border-white/12">
            {awakeningStoryChapters.map((chapter, index) => (
              <article key={chapter.id} className="grid gap-5 py-8 sm:grid-cols-[76px_1fr] sm:py-10">
                <span className="font-serif text-4xl font-semibold text-gold/78">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {text(chapter.titleKey)}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-white/70">{text(chapter.bodyKey)}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParkAwakens() {
  const { text } = useI18n();

  return (
    <section className="bg-[#02080d] px-6 py-24 text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-4xl">
          <SectionKicker>{text("awakening.moments.kicker")}</SectionKicker>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.45rem,5.2vw,4.7rem)] font-semibold leading-[1.02] [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
            {text("awakening.moments.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/72 sm:text-xl">{text("awakening.moments.body")}</p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {awakeningMoments.map((moment, index) => (
            <Reveal key={moment.id} className="border border-white/12 bg-white/[0.035] p-6 backdrop-blur">
              <span className="font-serif text-3xl font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-white">{text(moment.titleKey)}</h3>
              <p className="mt-5 leading-7 text-white/68">{text(moment.descriptionKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const transformationStoryFrames: Array<{
  tone: NightVisualTone;
  titleKey: string;
  bodyKey: string;
  className: string;
  imageClassName: string;
}> = [
  {
    tone: "rowBlue",
    titleKey: "awakening.transformation.story.rowBlue.title",
    bodyKey: "awakening.transformation.story.rowBlue.body",
    className: "lg:col-span-7",
    imageClassName: "aspect-[16/9]"
  },
  {
    tone: "closeBlue",
    titleKey: "awakening.transformation.story.closeBlue.title",
    bodyKey: "awakening.transformation.story.closeBlue.body",
    className: "lg:col-span-5",
    imageClassName: "aspect-[4/5]"
  },
  {
    tone: "rowEmerald",
    titleKey: "awakening.transformation.story.rowEmerald.title",
    bodyKey: "awakening.transformation.story.rowEmerald.body",
    className: "lg:col-span-6",
    imageClassName: "aspect-[16/11]"
  },
  {
    tone: "winterBlue",
    titleKey: "awakening.transformation.story.winterBlue.title",
    bodyKey: "awakening.transformation.story.winterBlue.body",
    className: "lg:col-span-6",
    imageClassName: "aspect-[16/11]"
  },
  {
    tone: "singleEmerald",
    titleKey: "awakening.transformation.story.singleEmerald.title",
    bodyKey: "awakening.transformation.story.singleEmerald.body",
    className: "lg:col-span-5",
    imageClassName: "aspect-[4/5]"
  },
  {
    tone: "gateBlue",
    titleKey: "awakening.transformation.story.gateBlue.title",
    bodyKey: "awakening.transformation.story.gateBlue.body",
    className: "lg:col-span-7",
    imageClassName: "aspect-[16/9]"
  }
];

function TransformationChapter() {
  const { text } = useI18n();
  const activeState =
    awakeningTransformationStates.find((state) => state.id === "night") ?? awakeningTransformationStates[0];

  return (
    <section
      id="przebudzenie-transformacja"
      className="awakening-transformation relative overflow-hidden bg-[#071018] px-6 py-24 text-white sm:px-10 sm:py-32"
      data-state="night"
    >
      <BrandBackdrop />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-5xl">
          <SectionKicker>{text("awakening.transformation.kicker")}</SectionKicker>
          <h2 className="mt-5 max-w-4xl text-balance font-serif text-[clamp(2.55rem,5.2vw,5rem)] font-semibold leading-[1]">
            {text("awakening.transformation.title")}
          </h2>
          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/74 sm:text-xl">
            {text("awakening.transformation.lead")}
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-8 xl:grid-cols-[0.84fr_1.16fr] xl:items-start">
          <div className="border-l border-gold/45 pl-6 sm:pl-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{text(activeState.nameKey)}</p>
            <h3 className="mt-4 max-w-2xl text-balance font-serif text-[clamp(2.35rem,4.2vw,4.5rem)] font-semibold leading-[1.02]">
              {text(activeState.headlineKey)}
            </h3>
          </div>

          <div className="border-t border-white/14 pt-7 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
            <p className="whitespace-pre-line text-lg leading-8 text-white/74">{text(activeState.bodyKey)}</p>
            <p className="mt-7 text-base leading-7 text-[#f7e6bd]/86 sm:text-lg">{text(activeState.detailKey)}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {transformationStoryFrames.map((frame, index) => (
            <Reveal
              key={frame.tone}
              className={`group overflow-hidden border border-white/14 bg-[#02080d] shadow-[0_28px_80px_rgba(0,0,0,0.28)] ${frame.className}`}
            >
              <div className={`relative overflow-hidden bg-[#02080d] ${frame.imageClassName}`}>
                <Image
                  src={transformationNightImages[frame.tone]}
                  alt={text("awakening.transformation.visualAlt")}
                  fill
                  sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.015]"
                  style={{ objectPosition: "50% 50%" }}
                />
                <ImageWatermark />
              </div>
              <div className="p-6 sm:p-8 lg:p-9">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-3xl font-semibold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-white/12" />
                </div>
                <h4 className="mt-5 max-w-xl text-balance font-serif text-[clamp(2rem,3.4vw,3.6rem)] font-semibold leading-[1.02] text-white">
                  {text(frame.titleKey)}
                </h4>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  {text(frame.bodyKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 border border-gold/30 bg-[#091013] p-7 sm:p-9">
          <div className="grid gap-7 lg:grid-cols-[0.7fr_1fr] lg:items-center">
            <div>
              <p className="font-serif text-3xl font-semibold leading-tight text-gold">
                {text("awakening.transformation.summary.night")}
              </p>
            </div>
            <p className="text-lg leading-8 text-white/72">{text("awakening.transformation.summary.body")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ActivityGrid() {
  const { text } = useI18n();

  return (
    <section id="plan-przebudzenia" className="bg-[#071018] px-6 py-24 text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-4xl">
          <SectionKicker>{text("awakening.activities.kicker")}</SectionKicker>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.5rem,5.5vw,5.2rem)] font-semibold leading-[1]">
            {text("awakening.activities.title")}
          </h2>
        </Reveal>
        <div className="mt-14 grid auto-rows-[minmax(430px,auto)] gap-5 lg:grid-cols-6">
          {awakeningActivities
            .sort((first, second) => first.order - second.order)
            .map((activity) => {
              const spanClass =
                activity.size === "hero"
                  ? "lg:col-span-6 lg:grid-cols-[1.15fr_0.85fr]"
                  : activity.size === "large"
                    ? "lg:col-span-3"
                    : "lg:col-span-2";
              const titleClass =
                activity.size === "hero"
                  ? "text-[clamp(2.4rem,4.4vw,4.3rem)]"
                  : "text-[clamp(2.05rem,2.7vw,3rem)]";
              const imageSizes =
                activity.size === "hero"
                  ? "(min-width: 1024px) 740px, 100vw"
                  : activity.size === "large"
                    ? "(min-width: 1024px) 630px, 100vw"
                    : "(min-width: 1024px) 415px, 100vw";
              const imageClassName = `transition duration-700 group-hover:scale-[1.02] ${
                activity.visualMode === "cover" ? "object-cover" : "object-contain p-4"
              }`;
              const isAnimated = activity.image.endsWith(".gif");

              return (
                <Reveal
                  key={activity.id}
                  className={`group grid overflow-hidden border border-white/14 bg-[#02080d] shadow-[0_28px_80px_rgba(0,0,0,0.32)] ${spanClass}`}
                >
                  <div className="relative flex aspect-[16/9] min-h-0 items-center justify-center overflow-hidden bg-[#071018] lg:aspect-auto lg:min-h-[250px]">
                    {isAnimated ? (
                      <AwakeningStormVideo alt={text(activity.altKey)} className={imageClassName} />
                    ) : (
                      <Image
                        src={activity.image}
                        alt={text(activity.altKey)}
                        fill
                        sizes={imageSizes}
                        className={imageClassName}
                      />
                    )}
                    <ImageWatermark />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,13,0.02),rgba(2,8,13,0.12)),radial-gradient(circle_at_50%_96%,rgba(184,150,72,0.12),transparent_42%)]" />
                  </div>
                  <div className="flex min-h-[260px] min-w-0 flex-col justify-between p-7 sm:p-9">
                    <div>
                      <span className="font-serif text-4xl font-semibold text-gold/85">{activity.icon}</span>
                      <h3 className={`mt-6 text-balance font-serif font-semibold leading-[1.03] text-white [hyphens:auto] [overflow-wrap:anywhere] ${titleClass}`}>
                        {text(activity.titleKey)}
                      </h3>
                      <p className="mt-6 text-lg leading-8 text-white/72">{text(activity.descriptionKey)}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const { text } = useI18n();

  return (
    <section className="bg-[#02080d] px-6 py-24 text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-4xl">
          <SectionKicker>{text("awakening.timeline.kicker")}</SectionKicker>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.45rem,5vw,4.8rem)] font-semibold leading-[1.02]">
            {text("awakening.timeline.title")}
          </h2>
        </Reveal>
        <div className="relative mt-16 grid gap-5 lg:grid-cols-5">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent lg:block" />
          {awakeningTimeline.map((item, index) => (
            <Reveal key={item.id} className="relative border border-white/12 bg-white/[0.035] p-6">
              <span className="flex h-12 w-12 items-center justify-center border border-gold/65 bg-[#02080d] font-serif text-2xl font-semibold text-gold">
                {index + 1}
              </span>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-gold">{text(item.timeKey)}</p>
              <h3 className="mt-3 text-xl font-bold leading-tight text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal] xl:text-2xl">
                {text(item.titleKey)}
              </h3>
              <p className="mt-5 leading-7 text-white/66">{text(item.descriptionKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finale() {
  const { text } = useI18n();
  const eventLabel = awakeningEvent.announced
    ? awakeningEvent.title ?? awakeningEvent.date ?? text("awakening.final.announcedFallback")
    : text("awakening.final.eventPending");

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#02070c] px-6 py-24 text-white sm:px-10">
      <Image
        src="/assets/przebudzenie-moai/owner-eyes-storm-night-optimized.webp"
        alt={text("awakening.assets.stormNightAlt")}
        fill
        sizes="100vw"
        className="object-cover object-center opacity-72"
      />
      <ImageWatermark className="opacity-[0.1] sm:opacity-[0.13]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,12,0.92),rgba(2,7,12,0.52)_52%,rgba(2,7,12,0.78)),radial-gradient(circle_at_50%_28%,rgba(184,150,72,0.16),transparent_32%)]" />
      <Reveal className="relative z-10 mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-end">
        <SectionKicker>{text("awakening.final.kicker")}</SectionKicker>
        <h2 className="mt-5 max-w-4xl text-balance font-serif text-[clamp(3rem,6.4vw,6rem)] font-semibold leading-[0.98]">
          {text("awakening.final.title")}
        </h2>
        <p className="mt-7 max-w-2xl font-serif text-3xl font-semibold leading-tight text-gold sm:text-4xl">
          {text("awakening.final.subtitle")}
        </p>
        <p className="mt-5 text-lg leading-8 text-white/72 sm:text-xl">{eventLabel}</p>
      </Reveal>
    </section>
  );
}

function LastLook() {
  const { text } = useI18n();

  return (
    <section className="bg-[#071018] px-6 py-24 text-white sm:px-10 sm:py-32">
      <Reveal className="mx-auto grid max-w-7xl gap-10 border-y border-white/12 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <SectionKicker>{text("awakening.lastLook.kicker")}</SectionKicker>
          <h2 className="mt-5 max-w-4xl text-balance font-serif text-[clamp(2.45rem,5vw,4.8rem)] font-semibold leading-[1.02]">
            {text("awakening.lastLook.title")}
          </h2>
        </div>
        <p className="border-l border-gold/55 pl-6 text-lg leading-8 text-white/74 sm:text-xl">
          {text("awakening.lastLook.body")}
        </p>
      </Reveal>
    </section>
  );
}

export function PrzebudzenieMoaiSection() {
  return (
    <div id="przebudzenie-moai" className="awakening-section multilingual-layout bg-[#02080d] text-white">
      <style jsx global>{`
        .awakening-light {
          background:
            radial-gradient(circle at 50% 22%, rgba(244, 239, 229, 0.17), transparent 26%),
            linear-gradient(118deg, transparent 12%, rgba(184, 150, 72, 0.12) 42%, transparent 68%);
          animation: awakeningLight 8s ease-in-out infinite alternate;
        }

        .awakening-fog {
          background:
            radial-gradient(ellipse at 35% 80%, rgba(244, 239, 229, 0.12), transparent 52%),
            radial-gradient(ellipse at 70% 90%, rgba(184, 150, 72, 0.1), transparent 45%);
          filter: blur(22px);
          transform: translate3d(0, 0, 0);
          animation: awakeningFog 11s ease-in-out infinite alternate;
        }

        .awakening-status {
          opacity: 0;
          animation: awakeningStatus 0.8s ease-out 3.35s forwards;
        }

        @keyframes awakeningLight {
          from {
            opacity: 0.48;
            transform: translate3d(-1%, 0, 0);
          }
          to {
            opacity: 0.75;
            transform: translate3d(1%, -1%, 0);
          }
        }

        @keyframes awakeningFog {
          from {
            opacity: 0.46;
            transform: translate3d(-2%, 1%, 0) scale(1);
          }
          to {
            opacity: 0.72;
            transform: translate3d(2%, -1%, 0) scale(1.03);
          }
        }

        @keyframes awakeningStatus {
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .awakening-section *,
          .awakening-section *::before,
          .awakening-section *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }

          .awakening-status {
            opacity: 0.92;
          }
        }
      `}</style>
      <Hero />
      <Manifest />
      <StoryChapters />
      <ParkAwakens />
      <TransformationChapter />
      <ActivityGrid />
      <Timeline />
      <LastLook />
      <Finale />
    </div>
  );
}

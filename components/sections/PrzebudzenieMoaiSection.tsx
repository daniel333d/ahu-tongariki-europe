"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "../../app/i18n-provider";
import {
  awakeningActivities,
  awakeningEvent,
  awakeningMoments,
  awakeningStoryChapters,
  awakeningTimeline,
  awakeningTransformationStates,
  heroEyePositions,
  transformationNightImages,
  type EyePosition,
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

function MoaiEyesOverlay({ eyes }: { eyes: EyePosition[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      {eyes.map((eye) => (
        <span
          key={eye.id}
          className="awakening-eye absolute block aspect-[2.25/1] rounded-[50%] border border-ivory/15 bg-ivory/18 shadow-[0_0_22px_rgba(244,239,229,0.14)]"
          style={
            {
              left: `${eye.x}%`,
              top: `${eye.y}%`,
              width: `${eye.width}%`,
              "--eye-delay": `${eye.delay ?? 0}s`,
              transform: `translate(-50%, -50%) rotate(${eye.rotation ?? 0}deg)`
            } as React.CSSProperties
          }
        >
          <span className="absolute left-[58%] top-[34%] block aspect-square w-[13%] rounded-full bg-white/35 blur-[1px]" />
        </span>
      ))}
    </div>
  );
}

function Hero() {
  const { text } = useI18n();

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#02070c] text-white">
      <Image
        src="/assets/przebudzenie-moai/owner-eyes-temple-horizontal.png"
        alt={text("awakening.heroAlt")}
        fill
        priority
        sizes="100vw"
        className="scale-[1.03] object-cover object-center opacity-78"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,12,0.96),rgba(2,7,12,0.76)_34%,rgba(2,7,12,0.32)_68%,rgba(2,7,12,0.58)),radial-gradient(circle_at_62%_48%,rgba(184,150,72,0.13),transparent_36%)]" />
      <div className="awakening-light absolute inset-0 opacity-65" aria-hidden="true" />
      <div className="awakening-fog absolute inset-x-0 bottom-0 h-1/2 opacity-70" aria-hidden="true" />
      <MoaiEyesOverlay eyes={heroEyePositions} />
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
    <section id="przebudzenie-manifest" className="bg-[#071018] px-6 py-24 text-white sm:px-10 sm:py-32">
      <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
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

function getInitialNightTone(): NightVisualTone {
  if (typeof window === "undefined") {
    return "rowBlue";
  }

  const tone = new URLSearchParams(window.location.search).get("nightTone");
  if (
    tone === "closeBlue" ||
    tone === "rowEmerald" ||
    tone === "winterBlue" ||
    tone === "singleEmerald" ||
    tone === "gateBlue"
  ) {
    return tone;
  }

  return "rowBlue";
}

function TransformationChapter() {
  const { text } = useI18n();
  const [nightTone, setNightTone] = useState<NightVisualTone>(getInitialNightTone);
  const activeState =
    awakeningTransformationStates.find((state) => state.id === "night") ?? awakeningTransformationStates[0];
  const visualImage = transformationNightImages[nightTone];

  return (
    <section
      id="przebudzenie-transformacja"
      className="awakening-transformation bg-[#071018] px-6 py-24 text-white sm:px-10 sm:py-32"
      data-state="night"
      data-night-tone={nightTone}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-5xl">
          <SectionKicker>{text("awakening.transformation.kicker")}</SectionKicker>
          <h2 className="mt-5 max-w-4xl text-balance font-serif text-[clamp(2.55rem,5.2vw,5rem)] font-semibold leading-[1]">
            {text("awakening.transformation.title")}
          </h2>
          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/74 sm:text-xl">
            {text("awakening.transformation.lead")}
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-8 xl:grid-cols-[1.12fr_0.88fr] xl:items-stretch">
          <div className="relative min-h-[420px] overflow-hidden border border-white/14 bg-[#02080d] shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:min-h-[560px]">
            <Image
              key={nightTone}
              src={visualImage}
              alt={text("awakening.transformation.visualAlt")}
              fill
              sizes="(min-width: 1280px) 58vw, 100vw"
              className="transformation-base object-cover"
              style={{ objectPosition: "50% 50%" }}
              loading="eager"
            />
            <div className="absolute left-5 top-5 z-30 border border-gold/60 bg-[#02080d]/76 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-gold backdrop-blur sm:left-7 sm:top-7">
              {text(activeState.labelKey)}
            </div>
          </div>

          <div className="flex flex-col justify-between border border-white/14 bg-[#02080d] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] sm:p-9 lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{text(activeState.nameKey)}</p>
              <h3 className="mt-4 text-balance font-serif text-[clamp(2.35rem,4.2vw,4.5rem)] font-semibold leading-[1.02]">
                {text(activeState.headlineKey)}
              </h3>
              <p className="mt-7 whitespace-pre-line text-lg leading-8 text-white/74">{text(activeState.bodyKey)}</p>
              <p className="mt-7 border-l border-gold/55 pl-5 text-base leading-7 text-[#f7e6bd]/86 sm:text-lg">
                {text(activeState.detailKey)}
              </p>

              {activeState.quoteKey ? (
                <p className="mt-8 font-serif text-3xl font-semibold leading-tight text-white">
                  {text(activeState.quoteKey)}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3" aria-label={text("awakening.transformation.nightToneAria")}>
                {(["rowBlue", "rowEmerald", "closeBlue", "winterBlue", "singleEmerald", "gateBlue"] as const).map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setNightTone(tone)}
                    className={`min-h-11 border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                      nightTone === tone
                        ? "border-gold bg-gold text-navy"
                        : "border-white/16 text-white/64 hover:border-gold/60 hover:text-gold"
                    }`}
                  >
                    {text(`awakening.transformation.nightTones.${tone}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-white/12 pt-8">
              <p className="font-serif text-3xl font-semibold leading-tight text-gold">
                {text("awakening.transformation.summary.night")}
              </p>
              <p className="mt-5 text-lg leading-8 text-white/68">{text("awakening.transformation.summary.body")}</p>
            </div>
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

              return (
                <Reveal
                  key={activity.id}
                  className={`group grid overflow-hidden border border-white/14 bg-[#02080d] shadow-[0_28px_80px_rgba(0,0,0,0.32)] ${spanClass}`}
                >
                  <div className="relative flex aspect-[16/9] min-h-0 items-center justify-center overflow-hidden bg-[#071018] lg:aspect-auto lg:min-h-[250px]">
                    <Image
                      src={activity.image}
                      alt={text(activity.altKey)}
                      fill
                      sizes={activity.size === "hero" ? "100vw" : "(min-width: 1024px) 48vw, 100vw"}
                      className={`transition duration-700 group-hover:scale-[1.02] ${
                        activity.visualMode === "cover" ? "object-cover" : "object-contain p-4"
                      }`}
                      loading="eager"
                    />
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
        src="/assets/przebudzenie-moai/owner-eyes-storm-night.png"
        alt={text("awakening.assets.stormNightAlt")}
        fill
        sizes="100vw"
        className="object-cover object-center opacity-72"
        loading="eager"
      />
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

        .awakening-eye {
          opacity: 0;
          transform-origin: center;
          animation:
            awakeningOpen 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards,
            awakeningBlink 11s ease-in-out infinite;
          animation-delay: var(--eye-delay), calc(var(--eye-delay) + 5.5s);
        }

        .awakening-status {
          opacity: 0;
          animation: awakeningStatus 0.8s ease-out 3.35s forwards;
        }

        @keyframes awakeningOpen {
          0% {
            opacity: 0;
            clip-path: inset(50% 0 50% 0);
          }
          100% {
            opacity: 0.92;
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes awakeningBlink {
          0%,
          71%,
          73%,
          100% {
            clip-path: inset(0 0 0 0);
          }
          72% {
            clip-path: inset(45% 0 45% 0);
          }
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

          .awakening-eye,
          .awakening-status {
            opacity: 0.92;
            clip-path: inset(0 0 0 0);
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

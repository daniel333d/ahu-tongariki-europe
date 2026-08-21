"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "../../app/i18n-provider";
import {
  awakeningActivities,
  awakeningEvent,
  awakeningMoments,
  awakeningTimeline,
  heroEyePositions,
  type EyePosition
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
        <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            href="#przebudzenie-manifest"
            className="inline-flex min-h-12 items-center justify-center border border-gold/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label={text("awakening.scrollAria")}
          >
            {text("awakening.scrollCue")}
          </a>
          <span className="awakening-status text-sm font-bold uppercase tracking-[0.18em] text-white/72">
            {text("awakening.started")}
          </span>
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
                      unoptimized={activity.image.endsWith(".gif")}
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
                    {activity.details ? (
                      <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                        {activity.details.map((detail) => (
                          <span
                            key={detail}
                            className="border border-gold/30 bg-gold/5 px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-gold/86"
                          >
                            {text(detail)}
                          </span>
                        ))}
                      </div>
                    ) : null}
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
        unoptimized
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
        <Link
          href="/#kontakt"
          className="mt-10 inline-flex min-h-12 w-fit items-center justify-center border border-gold/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {text("awakening.final.cta")}
        </Link>
        {/* TODO: connect to event notifications */}
      </Reveal>
    </section>
  );
}

function AssetPreview() {
  const { text } = useI18n();
  const assets = [
    {
      src: "/assets/przebudzenie-moai/owner-eyes-temple-wide.png",
      alt: "awakening.assets.templeWideAlt"
    },
    {
      src: "/assets/przebudzenie-moai/owner-eyes-temple-close.png",
      alt: "awakening.assets.templeCloseAlt"
    },
    {
      src: "/assets/przebudzenie-moai/owner-eyes-purple-animated.gif",
      alt: "awakening.assets.purpleAnimatedAlt",
      animated: true
    }
  ];

  return (
    <section id="warstwa-wizualna" className="bg-[#071018] px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker>{text("awakening.assetReview.kicker")}</SectionKicker>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          {text("awakening.assetReview.title")}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {assets.map((asset) => (
            <div key={asset.src} className="relative overflow-hidden border border-white/12 bg-[#02080d]">
              <img
                src={asset.src}
                alt={text(asset.alt)}
                className="h-80 w-full bg-[#02080d] object-contain p-2"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrzebudzenieMoaiSection({ showAssetPreview = false }: { showAssetPreview?: boolean }) {
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
      <ParkAwakens />
      <ActivityGrid />
      <Timeline />
      <Finale />
      {showAssetPreview ? <AssetPreview /> : null}
    </div>
  );
}

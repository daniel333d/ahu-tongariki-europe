"use client";

import { motion } from "framer-motion";
import { Aperture, ArrowRight, Camera, Eye, FlameKindling, Landmark, Moon, MountainSnow, Snowflake, Sparkles, Telescope } from "lucide-react";
import Link from "next/link";
import { type CSSProperties } from "react";
import { BrandBackdrop } from "../brand/BrandBackdrop";
import { ImageWatermark } from "../brand/ImageWatermark";
import { AssetImage } from "../common/AssetImage";
import { useI18n } from "../../app/i18n-provider";

const WINTER_HERO_IMAGE = "/assets/winter/winter-hero-snow-moai-row.webp";
const WINTER_CONTEXT_IMAGE = "/assets/winter/winter-two-worlds-five-moai.webp";
const WINTER_FINAL_IMAGE = "/assets/winter/winter-guardians-side-snow.jpg";
const WINTER_STORY_IMAGES = [
  "/assets/winter/winter-landscape-first-light-snow-optimized.webp",
  "/assets/winter/winter-blue-hour-koteriku.jpeg",
  "/assets/winter/winter-first-light-gateway.webp"
] as const;
const WINTER_SECTION_BRIGHTNESS = "brightness(1.08)";

const storyIcons = [Snowflake, FlameKindling, MountainSnow];
const experienceIcons = [Eye, Moon, Camera, FlameKindling, Landmark];
const potentialIcons = [Sparkles, Aperture, Telescope];
const visitorSilhouettes = [
  { height: 30, width: 7, head: 5, stance: 13, tone: "#f7f2e8" },
  { height: 34, width: 8, head: 5, stance: 14, tone: "#fff8eb" },
  { height: 23, width: 6, head: 4, stance: 10, tone: "#f1eadf" }
];

function brightenWinterImage(filter?: string) {
  return filter ? `${WINTER_SECTION_BRIGHTNESS} ${filter}` : WINTER_SECTION_BRIGHTNESS;
}

function FadeBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WinterImagePanel({
  alt,
  label,
  className = "",
  overlay = "bg-[linear-gradient(90deg,rgba(6,16,31,0.78),rgba(6,16,31,0.12)_58%,rgba(6,16,31,0.16))]",
  objectPosition = "object-[58%_center]",
  imageFit = "object-cover",
  filter,
  showVisitors = false,
  src = WINTER_HERO_IMAGE
}: {
  alt: string;
  label?: string;
  className?: string;
  overlay?: string;
  objectPosition?: string;
  imageFit?: string;
  filter?: string;
  showVisitors?: boolean;
  src?: string;
}) {
  return (
    <div className={`border-white/12 relative overflow-hidden rounded-lg border bg-navy shadow-architectural ${className}`}>
      <AssetImage
        src={src}
        alt={alt}
        fill
        className={`${imageFit} ${objectPosition}`}
        sizes="(min-width: 1024px) 820px, 100vw"
        style={{ filter: brightenWinterImage(filter) } as CSSProperties}
      />
      <ImageWatermark />
      <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />
      {showVisitors ? <WinterScaleVisitors /> : null}
      {label ? (
        <div className="absolute left-5 top-5 border border-gold/35 bg-navy/64 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
          {label}
        </div>
      ) : null}
    </div>
  );
}

function WinterScaleVisitors() {
  return (
    <div className="absolute bottom-[8%] left-[42%] z-10 flex items-end gap-3 sm:left-[46%]" aria-hidden="true">
      {visitorSilhouettes.map((visitor, index) => (
        <div
          key={index}
          className="relative shrink-0 drop-shadow-[0_2px_5px_rgba(0,0,0,0.92)]"
          style={{
            height: `${visitor.height + visitor.head + 3}px`,
            width: `${visitor.stance}px`
          }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full ring-[0.5px] ring-black/55"
            style={{ height: `${visitor.head}px`, width: `${visitor.head}px`, backgroundColor: visitor.tone }}
          />
          <span
            className="absolute left-1/2 top-[6px] -translate-x-1/2 rounded-t-[42%] ring-[0.5px] ring-black/45"
            style={{
              height: `${Math.round(visitor.height * 0.62)}px`,
              width: `${visitor.width}px`,
              backgroundColor: visitor.tone
            }}
          />
          <span
            className="absolute left-1/2 top-[12px] h-px -translate-x-1/2"
            style={{ width: `${visitor.stance}px`, backgroundColor: visitor.tone }}
          />
          <span
            className="absolute bottom-0 rounded-b-full ring-[0.5px] ring-black/45"
            style={{
              height: `${Math.round(visitor.height * 0.36)}px`,
              width: `${Math.max(2, Math.round(visitor.width * 0.34))}px`,
              left: `calc(50% - ${Math.max(3, Math.round(visitor.width * 0.44))}px)`,
              backgroundColor: visitor.tone
            }}
          />
          <span
            className="absolute bottom-0 rounded-b-full ring-[0.5px] ring-black/45"
            style={{
              height: `${Math.round(visitor.height * 0.36)}px`,
              width: `${Math.max(2, Math.round(visitor.width * 0.34))}px`,
              left: `calc(50% + ${Math.max(1, Math.round(visitor.width * 0.12))}px)`,
              backgroundColor: visitor.tone
            }}
          />
        </div>
      ))}
    </div>
  );
}

function WinterSeasonShift() {
  const { copy } = useI18n();
  const winter = copy.winter;

  return (
    <FadeBlock className="mt-20">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="section-kicker">{winter.comparison.kicker}</p>
          <h3 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {winter.comparison.title}
          </h3>
        </div>
        <p className="text-white/72 border-l border-gold/55 pl-6 text-lg leading-8">
          {winter.comparison.body}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="border-white/12 rounded-lg border bg-white/[0.035] p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{winter.comparison.summerLabel}</p>
          <p className="mt-5 font-serif text-3xl font-semibold leading-tight text-white">{winter.comparison.summerAlt}</p>
        </div>
        <div className="border-gold/35 rounded-lg border bg-gold/[0.08] p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{winter.comparison.winterLabel}</p>
          <p className="mt-5 font-serif text-3xl font-semibold leading-tight text-white">{winter.comparison.winterAlt}</p>
        </div>
      </div>
    </FadeBlock>
  );
}

function WinterDayRhythm() {
  const { copy } = useI18n();
  const winter = copy.winter;

  return (
    <FadeBlock className="mt-24 rounded-lg border border-white/12 bg-white/[0.035] p-7 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="section-kicker">{winter.times.kicker}</p>
          <h3 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] text-white">
            {winter.times.title}
          </h3>
        </div>
        <p className="text-white/72 border-l border-gold/55 pl-6 text-lg leading-8">{winter.times.body}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {winter.times.items.map((item) => (
          <article
            key={item.id}
            className="border-white/12 min-h-[230px] rounded-lg border bg-navy/55 p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{item.label}</p>
            <h4 className="mt-5 font-serif text-2xl font-semibold leading-tight text-white">{item.title}</h4>
            <p className="mt-5 text-sm leading-7 text-white/66">{item.description}</p>
          </article>
        ))}
      </div>
    </FadeBlock>
  );
}

export function WinterExperienceSection() {
  const { copy } = useI18n();
  const winter = copy.winter;

  return (
    <section
      id="rapa-nui-zima"
      className="relative overflow-hidden bg-[#06101f] text-white"
      aria-label={winter.ariaLabel}
    >
      <div className="relative min-h-[92vh] overflow-hidden">
        <AssetImage
          src={WINTER_HERO_IMAGE}
          alt={winter.hero.imageAlt}
          fill
          className="object-cover object-[58%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,20,0.88)_0%,rgba(3,10,20,0.58)_34%,rgba(3,10,20,0.1)_72%),linear-gradient(180deg,rgba(3,10,20,0.14),rgba(3,10,20,0.16)_48%,rgba(3,10,20,0.86)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.26)_0_1px,transparent_1px),radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.18)_0_1px,transparent_1px)] [background-size:120px_120px,180px_180px] motion-reduce:opacity-20"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] items-center px-6 py-24 lg:px-10">
          <FadeBlock className="max-w-[46rem] [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
            <p className="section-kicker">{winter.hero.kicker}</p>
            <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(3.3rem,7.4vw,7.4rem)] font-semibold leading-[0.92] text-white">
              {winter.hero.title}
            </h2>
            <p className="mt-8 max-w-xl font-serif text-[clamp(1.7rem,3.2vw,3.05rem)] font-semibold leading-tight text-gold">
              {winter.hero.claim}
            </p>
            <p className="text-white/84 mt-6 max-w-2xl text-[clamp(1.08rem,1.75vw,1.55rem)] leading-9">{winter.hero.subclaim}</p>
            <p className="text-white/62 mt-10 inline-flex border-l border-gold/60 pl-5 text-sm leading-7">
              {winter.hero.disclaimer}
            </p>
          </FadeBlock>
        </div>
      </div>

      <div className="relative px-6 py-24 sm:py-28 lg:px-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,164,90,0.1),transparent_28%),linear-gradient(180deg,rgba(6,16,31,1),rgba(2,8,13,1))]"
          aria-hidden="true"
        />
        <BrandBackdrop />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-center">
            <FadeBlock>
              <p className="section-kicker">{winter.twoWorlds.kicker}</p>
              <h2 className="mt-5 max-w-[12ch] font-serif text-[clamp(2.25rem,4.1vw,4.15rem)] font-semibold leading-[1.02] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
                {winter.twoWorlds.title}
              </h2>
              <div className="text-white/72 mt-8 space-y-6 text-lg leading-9">
                {winter.twoWorlds.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-8 border-l border-gold/55 pl-6 text-base leading-8 text-gold/86">
                {winter.twoWorlds.note}
              </p>
            </FadeBlock>
            <FadeBlock>
              <WinterImagePanel
                alt={winter.twoWorlds.imageAlt}
                label={winter.twoWorlds.imageLabel}
                className="min-h-[520px]"
                objectPosition="object-center"
                filter="brightness(0.92) saturate(0.9) contrast(1.03)"
                src={WINTER_CONTEXT_IMAGE}
              />
            </FadeBlock>
          </div>

          <WinterSeasonShift />

          <div className="mt-24 space-y-14">
            <FadeBlock>
              <p className="section-kicker">{winter.story.kicker}</p>
              <h3 className="mt-5 max-w-4xl text-balance font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
                {winter.story.title}
              </h3>
            </FadeBlock>

            {winter.story.items.map((item, index) => {
              const Icon = storyIcons[index] ?? Snowflake;
              const isReversed = index % 2 === 1;
              const storyImage = WINTER_STORY_IMAGES[index] ?? WINTER_CONTEXT_IMAGE;
              const storyImageFit = index > 0 ? "object-contain" : "object-cover";

              return (
                <FadeBlock
                  key={item.title}
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isReversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <WinterImagePanel
                    src={storyImage}
                    alt={item.alt}
                    label={item.imageLabel}
                    className="min-h-[440px] bg-[linear-gradient(180deg,rgba(244,239,229,0.08),rgba(6,16,31,0.72))] sm:min-h-[540px]"
                    overlay={index > 0 ? "bg-[linear-gradient(180deg,rgba(6,16,31,0.02),rgba(6,16,31,0.22))]" : item.overlay}
                    objectPosition={index === 1 ? "object-center" : index === 2 ? "object-center" : item.objectPosition}
                    imageFit={storyImageFit}
                    filter={index === 0 ? "brightness(0.94) saturate(0.92) contrast(1.03)" : index === 1 ? "brightness(0.9) saturate(0.88) contrast(1.05)" : "brightness(0.92) saturate(0.9) contrast(1.03)"}
                  />
                  <div className="border-white/12 rounded-lg border bg-white/[0.035] p-7 sm:p-10 lg:p-12">
                    <Icon className="text-gold" size={32} aria-hidden="true" />
                    <h4 className="mt-6 font-serif text-[clamp(2rem,3.8vw,3.35rem)] font-semibold leading-[1.05] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
                      {item.title}
                    </h4>
                    <p className="text-white/72 mt-6 text-lg leading-9">{item.body}</p>
                  </div>
                </FadeBlock>
              );
            })}
          </div>

          <WinterDayRhythm />

          <FadeBlock className="mt-24">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="section-kicker">{winter.experiences.kicker}</p>
                <h3 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.35rem)] font-semibold leading-[1.05] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
                  {winter.experiences.title}
                </h3>
              </div>
              <p className="text-white/72 border-l border-gold/55 pl-6 text-lg leading-8">
                {winter.experiences.intro}
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {winter.experiences.items.map((item, index) => {
                const Icon = experienceIcons[index] ?? Snowflake;

                return (
                  <article
                    key={item.title}
                    className={`border-white/12 flex min-h-[270px] flex-col rounded-lg border bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.055] md:min-h-[250px] xl:col-span-2 ${index > 2 ? "xl:col-span-3" : ""}`}
                  >
                    <Icon className="text-gold" size={28} aria-hidden="true" />
                    <h4 className="mt-6 font-serif text-[clamp(1.45rem,1.7vw,1.8rem)] font-semibold leading-tight text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
                      {item.title}
                    </h4>
                    <p className="text-white/66 mt-4 text-sm leading-7">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </FadeBlock>

          <FadeBlock className="mt-24 rounded-lg border border-gold/35 bg-[linear-gradient(135deg,rgba(200,164,90,0.1),rgba(255,255,255,0.035))] p-7 sm:p-10 lg:p-12">
            <p className="section-kicker">{winter.potential.kicker}</p>
            <h3 className="mt-5 max-w-4xl font-serif text-[clamp(2rem,4.4vw,4.4rem)] font-semibold leading-[1.05] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
              {winter.potential.title}
            </h3>
            <div className="text-white/72 mt-8 grid gap-6 text-lg leading-9 lg:grid-cols-2">
              {winter.potential.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {winter.potential.indicators.map((indicator, index) => {
                const Icon = potentialIcons[index] ?? Sparkles;

                return (
                  <div key={indicator} className="border-white/12 flex min-h-24 items-center gap-4 border bg-navy/40 p-5">
                    <Icon className="text-gold shrink-0" size={24} aria-hidden="true" />
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">{indicator}</p>
                  </div>
                );
              })}
            </div>
          </FadeBlock>

          <FadeBlock className="mt-24">
            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-navy shadow-architectural">
              <div className="grid lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative z-10 flex flex-col justify-center bg-[linear-gradient(135deg,rgba(3,10,20,0.98),rgba(3,10,20,0.9)_58%,rgba(15,31,53,0.84))] p-7 sm:p-10 lg:p-12">
                  <p className="section-kicker">{winter.final.kicker}</p>
                  <h3 className="mt-5 whitespace-pre-line font-serif text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[1.02] text-white [hyphens:none] [overflow-wrap:normal] [word-break:normal]">
                    {winter.final.title}
                  </h3>
                  <p className="text-white/78 mt-6 text-xl leading-9">{winter.final.body}</p>
                  <Link
                    href="/#noce-ahu-tongariki"
                    className="stable-action mt-10 inline-flex min-h-12 items-center gap-3 border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-navy transition hover:bg-sand focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
                  >
                    {winter.final.cta}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
                <div className="relative min-h-[560px] bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(8,17,30,1),rgba(3,10,20,1))] lg:min-h-full">
                  <AssetImage
                    src={WINTER_FINAL_IMAGE}
                    alt={winter.final.imageAlt}
                    fill
                    className="object-contain object-center"
                    sizes="(min-width: 1024px) 780px, 100vw"
                    style={{ filter: "brightness(0.9) saturate(0.9) contrast(1.04)" } as CSSProperties}
                  />
                  <ImageWatermark />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,20,0.38),rgba(3,10,20,0.02)_48%,rgba(3,10,20,0.16)),linear-gradient(180deg,rgba(3,10,20,0.03),rgba(3,10,20,0.28))]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </FadeBlock>

        </div>
      </div>
    </section>
  );
}

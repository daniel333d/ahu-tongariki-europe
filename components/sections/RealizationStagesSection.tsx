"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../../app/i18n-provider";
import { BrandBackdrop } from "../brand/BrandBackdrop";
import { ImageWatermark } from "../brand/ImageWatermark";

type StageId = "stage1" | "stage2" | "stage3";
type StageTwoCardKey = "amphitheater" | "model" | "discoveryCenter" | "viewTower" | "pavilion";

const stageTwoCardMeta: Array<{
  key: StageTwoCardKey;
  number: string;
  image: string;
  className: string;
  imageFrameClassName: string;
}> = [
  {
    key: "amphitheater",
    number: "02.1",
    image: "/assets/realization-stages/etap-2-amfiteatr.webp",
    className: "lg:col-span-6",
    imageFrameClassName: "aspect-[3/1]"
  },
  {
    key: "model",
    number: "02.2",
    image: "/assets/realization-stages/etap-2-makieta.webp",
    className: "lg:col-span-6",
    imageFrameClassName: "aspect-[3/1]"
  },
  {
    key: "discoveryCenter",
    number: "02.3",
    image: "/assets/realization-stages/etap-2-te-tokanga.webp",
    className: "lg:col-span-7",
    imageFrameClassName: "aspect-[16/11]"
  },
  {
    key: "viewTower",
    number: "02.4",
    image: "/assets/realization-stages/etap-2-wieza-moai-nowe-tlo.png",
    className: "lg:col-span-5",
    imageFrameClassName: "aspect-[9/18]"
  },
  {
    key: "pavilion",
    number: "02.5",
    image: "/assets/realization-stages/etap-2-pawilon-rapanuipark.webp",
    className: "lg:col-span-12",
    imageFrameClassName: "aspect-[3/2]"
  }
];

const StageOnePresentationViewer = dynamic(
  () => import("./StageOnePresentationViewer").then((mod) => mod.StageOnePresentationViewer),
  { ssr: false }
);

function StageHeader({
  kicker,
  title,
  lead,
  body
}: {
  kicker: string;
  title: string;
  lead: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{kicker}</p>
      <h2 className="mt-4 text-balance font-serif text-[clamp(2.35rem,5.8vw,5.1rem)] font-semibold leading-[1.02] text-white">
        {title}
      </h2>
      <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-[#f7e6bd] sm:text-2xl">{lead}</p>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{body}</p>
    </div>
  );
}

function StageOne() {
  const { copy } = useI18n();
  const t = copy.realizationStages.stage1;
  const [isPresentationOpen, setPresentationOpen] = useState(false);

  return (
    <div>
      <StageHeader kicker={t.kicker} title={t.title} lead={t.lead} body={t.body} />
      <figure className="mx-auto mt-12 max-w-6xl overflow-hidden border border-gold/35 bg-[#07111a] shadow-[0_34px_100px_rgba(0,0,0,0.42)]">
        <div className="relative aspect-[4/3] w-full bg-black sm:aspect-[16/10]">
          <Image
            src="/assets/realization-stages/etap-1-plan.webp"
            alt={t.planImageAlt}
            fill
            priority
            sizes="(min-width: 1280px) 1120px, 100vw"
            className="object-cover"
          />
          <ImageWatermark />
          <span className="absolute left-4 top-4 border border-gold/45 bg-black/58 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f7e6bd] backdrop-blur sm:left-6 sm:top-6">
            {t.planBadge}
          </span>
        </div>
        <figcaption className="border-t border-gold/25 bg-[#08131d] px-5 py-5 text-center text-sm font-semibold leading-7 text-[#f7e6bd] sm:text-base">
          {t.planCaption}
        </figcaption>
      </figure>
      <article className="mx-auto mt-8 grid max-w-6xl overflow-hidden border border-white/12 bg-[#07111a] shadow-[0_28px_80px_rgba(0,0,0,0.34)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{t.presentation.eyebrow}</p>
          <h3 className="mt-5 text-balance font-serif text-[clamp(2rem,4.4vw,4.2rem)] font-semibold leading-[1.02] text-white">
            {t.presentation.title}
          </h3>
          <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">{t.presentation.lead}</p>
          <button
            type="button"
            onClick={() => setPresentationOpen(true)}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 border border-gold/65 bg-gold px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#02080d] transition hover:bg-[#f7e6bd] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-auto"
            aria-haspopup="dialog"
          >
            {t.presentation.openButton}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">{t.presentation.meta}</p>
        </div>
        <button
          type="button"
          onClick={() => setPresentationOpen(true)}
          className="group relative min-h-[260px] bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:min-h-[360px] lg:min-h-[430px]"
          aria-label={t.presentation.openAria}
        >
          <Image
            src="/assets/realization-stage-1/cover.webp"
            alt={t.presentation.coverAlt}
            fill
            sizes="(min-width: 1280px) 660px, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <ImageWatermark />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,13,0.04),rgba(2,8,13,0.3)_52%,rgba(2,8,13,0.72))]" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 border-t border-gold/35 pt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f7e6bd]">
            <span>{t.presentation.stageLabel}</span>
            <span>{t.presentation.slideCount}</span>
          </div>
        </button>
      </article>
      <StageOnePresentationViewer isOpen={isPresentationOpen} onClose={() => setPresentationOpen(false)} />
    </div>
  );
}

function StageTwo() {
  const { copy } = useI18n();
  const t = copy.realizationStages.stage2;
  const cards = t.cards;

  return (
    <div>
      <div className="mx-auto mb-14 max-w-3xl text-center" aria-hidden="true">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">{t.miniTimeline.stage1Label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{t.miniTimeline.stage1Title}</p>
          </div>
          <div className="mx-auto h-14 w-px bg-gradient-to-b from-transparent via-gold to-transparent sm:h-px sm:w-24 sm:bg-gradient-to-r" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{t.miniTimeline.stage2Label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{t.miniTimeline.stage2Title}</p>
          </div>
        </div>
      </div>
      <StageHeader kicker={t.kicker} title={t.title} lead={t.lead} body={t.body} />
      <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-12">
        {stageTwoCardMeta.map((meta) => {
          const card = cards[meta.key];
          const details = "details" in card ? card.details : undefined;
          return (
            <article
              key={meta.number}
              className={`group overflow-hidden border border-white/12 bg-[#07111a] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-gold/45 ${meta.className}`}
            >
              <div
                className={
                  meta.className === "lg:col-span-12"
                    ? "grid h-full lg:grid-cols-[1.25fr_0.75fr]"
                    : "flex h-full flex-col"
                }
              >
                <div className={`relative bg-black ${meta.imageFrameClassName}`}>
                  <Image
                    src={meta.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1280px) 620px, 100vw"
                    className="object-contain transition duration-700 group-hover:scale-[1.015]"
                  />
                  <ImageWatermark />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/26 via-transparent to-black/10" />
                  <span className="absolute left-5 top-5 border border-gold/50 bg-black/56 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f7e6bd] backdrop-blur">
                    {meta.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div>
                    <h3 className="text-balance font-serif text-[clamp(1.75rem,3.1vw,2.75rem)] font-semibold leading-[1.05] text-white">
                      {card.title}
                    </h3>
                    {"subtitle" in card && card.subtitle ? (
                      <p className="mt-3 text-lg font-semibold leading-7 text-[#f7e6bd]">{card.subtitle}</p>
                    ) : null}
                    <p className="mt-5 text-base leading-8 text-white/70">{card.body}</p>
                  </div>
                  {details ? (
                    <div className="mt-8 grid gap-3 pt-7 sm:grid-cols-2">
                      {details.map((detail) => (
                        <span
                          key={detail}
                          className="border-l border-gold/55 bg-white/[0.025] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#f7e6bd]"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mx-auto mt-12 max-w-4xl text-center">
        <h3 className="text-balance font-serif text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.05] text-[#f7e6bd]">
          {t.closing.title}
        </h3>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{t.closing.body}</p>
      </div>
    </div>
  );
}

function StageThree() {
  const { copy } = useI18n();
  const t = copy.realizationStages.stage3;

  return (
    <div className="mx-auto max-w-5xl py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{t.kicker}</p>
      <h2 className="mt-4 text-balance font-serif text-[clamp(2.35rem,5.8vw,5.1rem)] font-semibold leading-[1.02] text-white">
        {t.title}
      </h2>
      <div className="mx-auto mt-9 inline-flex border border-gold/40 bg-gold/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f7e6bd]">
        {t.badge}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/72">{t.body}</p>
    </div>
  );
}

export function RealizationStagesSection() {
  const { copy, language } = useI18n();
  const t = copy.realizationStages;
  const [activeStage, setActiveStage] = useState<StageId>("stage1");

  const tabs: Array<{ id: StageId; label: string; title: string }> = [
    { id: "stage1", label: t.tabs.stage1.label, title: t.tabs.stage1.title },
    { id: "stage2", label: t.tabs.stage2.label, title: t.tabs.stage2.title },
    { id: "stage3", label: t.tabs.stage3.label, title: t.tabs.stage3.title }
  ];

  return (
    <section
      id="kolejne-kompleksy"
      aria-label={t.ariaLabel}
      className="overflow-x-hidden bg-[#02080d] text-white"
      style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
    >
      <div className="relative isolate px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(184,150,72,0.18),transparent_34%),linear-gradient(180deg,#07111a_0%,#02080d_48%,#07111a_100%)]" />
        <BrandBackdrop className="-z-10 opacity-80" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{t.kicker}</p>
          <h1
            lang={language}
            className="mx-auto mt-5 max-w-4xl text-balance font-serif text-[clamp(2.65rem,6.6vw,6.4rem)] font-semibold leading-[0.96] text-white"
            style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "auto" }}
          >
            {t.title}
          </h1>
          <p className="mt-7 text-xl font-semibold leading-8 text-[#f7e6bd] sm:text-2xl">{t.subtitle}</p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{t.body}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3" role="tablist" aria-label={t.tabsAriaLabel}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeStage;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStage(tab.id)}
                className={`relative min-h-[92px] border px-5 py-5 text-left transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? "border-gold/85 bg-gold/12 text-white shadow-[0_0_34px_rgba(184,150,72,0.12)]"
                    : "border-white/12 bg-white/[0.035] text-white/68 hover:border-gold/45 hover:text-white"
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.24em] text-gold">{tab.label}</span>
                <span className="mt-2 block font-serif text-xl font-semibold leading-tight">{tab.title}</span>
              </button>
            );
          })}
        </div>
        <div className="mx-auto mt-14 max-w-7xl">
          {activeStage === "stage1" ? <StageOne /> : null}
          {activeStage === "stage2" ? <StageTwo /> : null}
          {activeStage === "stage3" ? <StageThree /> : null}
        </div>
      </div>
    </section>
  );
}

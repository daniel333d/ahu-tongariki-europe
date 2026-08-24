"use client";

import Image from "next/image";
import { useState } from "react";

type StageId = "stage1" | "stage2" | "stage3";

type StageTwoCard = {
  number: string;
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
  body: string;
  details?: string[];
  className: string;
  imageFrameClassName: string;
};

const tabs: Array<{ id: StageId; label: string; title: string }> = [
  { id: "stage1", label: "Etap I", title: "Fundament" },
  { id: "stage2", label: "Etap II", title: "Życie miejsca" },
  { id: "stage3", label: "Etap III", title: "Pełna wizja" }
];

const stageTwoCards: StageTwoCard[] = [
  {
    number: "02.1",
    title: "Amfiteatr Rapa Nui",
    image: "/assets/realization-stages/etap-2-amfiteatr.webp",
    alt: "Koncepcja Amfiteatru Rapa Nui w drugiej fazie RapaNuiPark.",
    body:
      "Kameralna przestrzeń wydarzeń, opowieści i wieczornych spotkań. Amfiteatr ma umożliwiać prezentacje, koncerty kameralne, projekcje, spotkania edukacyjne i programy artystyczne związane z kulturą Rapa Nui.",
    className: "lg:col-span-6",
    imageFrameClassName: "aspect-[3/1]"
  },
  {
    number: "02.2",
    title: "Rapa Nui w jednym spojrzeniu",
    subtitle: "Monumentalna makieta wyspy",
    image: "/assets/realization-stages/etap-2-makieta.webp",
    alt: "Monumentalna makieta wyspy Rapa Nui jako atrakcja edukacyjna RapaNuiPark.",
    body:
      "Przestrzenna makieta ma pozwalać zobaczyć Rapa Nui jako całość: wulkany, linię brzegową, najważniejsze Ahu, miejsca historyczne oraz relację krajobrazu i kultury.",
    className: "lg:col-span-6",
    imageFrameClassName: "aspect-[3/1]"
  },
  {
    number: "02.3",
    title: "Centrum Odkryć — Te Tokanga",
    subtitle: "Stanowisko archeologiczne jako centrum opowieści.",
    image: "/assets/realization-stages/etap-2-te-tokanga.webp",
    alt: "Centrum Odkryć z leżącym Te Tokanga jako częścią stanowiska archeologicznego.",
    body:
      "Centrum Odkryć ma przenieść odwiedzających w przestrzeń archeologii i badań nad monumentalnymi Moai. W centrum znajduje się leżący Te Tokanga, przedstawiony jako część stanowiska archeologicznego.",
    details: [
      "rekonstrukcja wykopu",
      "Rano Raraku",
      "powstawanie Moai",
      "techniki obróbki kamienia",
      "transport Moai",
      "badania i dokumentacja",
      "konserwacja",
      "multimedia i edukacja"
    ],
    className: "lg:col-span-7",
    imageFrameClassName: "aspect-[16/11]"
  },
  {
    number: "02.4",
    title: "Wieża Widokowa Moai",
    subtitle: "RapaNuiPark z zupełnie innej perspektywy.",
    image: "/assets/realization-stages/etap-2-wieza-moai-nowe-tlo.png",
    alt: "Koncepcja Wieży Widokowej Moai z platformą obserwacyjną i Sky Café.",
    body:
      "Monumentalna wieża inspirowana formą Moai ma stać się jedną z najbardziej rozpoznawalnych dominant RapaNuiPark. Sky Café znajduje się na poziomie widokowym wieży.",
    className: "lg:col-span-5",
    imageFrameClassName: "aspect-[9/18]"
  },
  {
    number: "02.5",
    title: "Pawilon Rapa Nui",
    subtitle: "Centrum życia RapaNuiPark.",
    image: "/assets/realization-stages/etap-2-pawilon-rapanuipark.webp",
    alt: "Plansza koncepcyjna Pawilonu Rapa Nui z muzeum, restauracją, galerią, Visitor Center i ścieżkami.",
    body:
      "Niski, pierścieniowy pawilon ma skupiać Muzeum Rapa Nui, Restaurację Rapa Nui, Galerię RapaNuiPark i Visitor Center. Ścieżki i krajobraz łączą atrakcje w jeden system zwiedzania.",
    className: "lg:col-span-12",
    imageFrameClassName: "aspect-[3/2]"
  }
];

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
  return (
    <div>
      <StageHeader
        kicker="Etap I"
        title="Fundament"
        lead="Powstaje przestrzenny i symboliczny rdzeń RapaNuiPark."
        body="Pierwsza faza realizacji tworzy podstawowy układ przestrzenny RapaNuiPark oraz jego najważniejsze monumentalne zespoły. To etap, który określa skalę, charakter krajobrazowy i rozpoznawalność całego przedsięwzięcia."
      />
      <figure className="mx-auto mt-12 max-w-6xl overflow-hidden border border-gold/35 bg-[#07111a] shadow-[0_34px_100px_rgba(0,0,0,0.42)]">
        <div className="relative aspect-[4/3] w-full bg-black sm:aspect-[16/10]">
          <Image
            src="/assets/realization-stages/etap-1-plan.webp"
            alt="Plansza Etapu I pokazująca podstawowy układ przestrzenny RapaNuiPark."
            fill
            priority
            sizes="(min-width: 1280px) 1120px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 border border-gold/45 bg-black/58 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f7e6bd] backdrop-blur sm:left-6 sm:top-6">
            Plan Etapu I
          </span>
        </div>
        <figcaption className="border-t border-gold/25 bg-[#08131d] px-5 py-5 text-center text-sm font-semibold leading-7 text-[#f7e6bd] sm:text-base">
          Pierwsza faza realizacji wyznacza przestrzenny i symboliczny fundament RapaNuiPark.
        </figcaption>
      </figure>
    </div>
  );
}

function StageTwo() {
  return (
    <div>
      <div className="mx-auto mb-14 max-w-3xl text-center" aria-hidden="true">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">Etap I</p>
            <p className="mt-1 text-lg font-semibold text-white">Powstaje miejsce.</p>
          </div>
          <div className="mx-auto h-14 w-px bg-gradient-to-b from-transparent via-gold to-transparent sm:h-px sm:w-24 sm:bg-gradient-to-r" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Etap II</p>
            <p className="mt-1 text-lg font-semibold text-white">Miejsce zaczyna żyć.</p>
          </div>
        </div>
      </div>
      <StageHeader
        kicker="Etap II"
        title="Życie miejsca"
        lead="Miejsce zaczyna żyć."
        body="Druga faza rozwija monumentalny fundament RapaNuiPark o przestrzenie, które pozwalają zatrzymać się tutaj na dłużej: odkrywanie, edukację, wydarzenia, gastronomię, obserwację, spotkania i odpoczynek."
      />
      <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-12">
        {stageTwoCards.map((card) => (
          <article
            key={card.number}
            className={`group overflow-hidden border border-white/12 bg-[#07111a] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-gold/45 ${card.className}`}
          >
            <div
              className={
                card.className === "lg:col-span-12"
                  ? "grid h-full lg:grid-cols-[1.25fr_0.75fr]"
                  : "flex h-full flex-col"
              }
            >
              <div className={`relative bg-black ${card.imageFrameClassName}`}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1280px) 620px, 100vw"
                  className="object-contain transition duration-700 group-hover:scale-[1.015]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/26 via-transparent to-black/10" />
                <span className="absolute left-5 top-5 border border-gold/50 bg-black/56 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f7e6bd] backdrop-blur">
                  {card.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div>
                  <h3 className="text-balance font-serif text-[clamp(1.75rem,3.1vw,2.75rem)] font-semibold leading-[1.05] text-white">
                    {card.title}
                  </h3>
                  {card.subtitle ? <p className="mt-3 text-lg font-semibold leading-7 text-[#f7e6bd]">{card.subtitle}</p> : null}
                  <p className="mt-5 text-base leading-8 text-white/70">{card.body}</p>
                </div>
                {card.details ? (
                  <div className="mt-8 grid gap-3 pt-7 sm:grid-cols-2">
                    {card.details.map((detail) => (
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
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-4xl text-center">
        <h3 className="text-balance font-serif text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.05] text-[#f7e6bd]">
          Miejsce zaczyna żyć.
        </h3>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          Druga faza nadaje monumentalnej przestrzeni funkcje, które pozwalają doświadczać RapaNuiPark przez wiele godzin — poznawać, obserwować, odpoczywać, uczestniczyć w wydarzeniach i wracać o różnych porach dnia oraz roku.
        </p>
      </div>
    </div>
  );
}

function StageThree() {
  return (
    <div className="mx-auto max-w-5xl py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Etap III</p>
      <h2 className="mt-4 text-balance font-serif text-[clamp(2.35rem,5.8vw,5.1rem)] font-semibold leading-[1.02] text-white">
        Pełna wizja
      </h2>
      <div className="mx-auto mt-9 inline-flex border border-gold/40 bg-gold/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f7e6bd]">
        W opracowaniu
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/72">
        Trzecia faza rozwinie RapaNuiPark do jego docelowej skali. Szczegółowy zakres tej części projektu zostanie przedstawiony w kolejnym etapie opracowania.
      </p>
    </div>
  );
}

export function RealizationStagesSection() {
  const [activeStage, setActiveStage] = useState<StageId>("stage1");

  return (
    <section
      id="kolejne-kompleksy"
      aria-label="Etapy realizacji RapaNuiPark"
      className="overflow-x-hidden bg-[#02080d] text-white"
      style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
    >
      <div className="relative isolate px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(184,150,72,0.18),transparent_34%),linear-gradient(180deg,#07111a_0%,#02080d_48%,#07111a_100%)]" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">Plan rozwoju</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-[clamp(2.65rem,6.6vw,6.4rem)] font-semibold leading-[0.96] text-white">
            Etapy realizacji RapaNuiPark
          </h1>
          <p className="mt-7 text-xl font-semibold leading-8 text-[#f7e6bd] sm:text-2xl">
            Trzy etapy. Jedna monumentalna wizja.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
            RapaNuiPark został pomyślany jako przedsięwzięcie rozwijane etapowo. Każda kolejna faza rozszerza możliwości miejsca, zachowując wartość wcześniejszych realizacji.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3" role="tablist" aria-label="Etapy realizacji">
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

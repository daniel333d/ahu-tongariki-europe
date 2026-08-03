"use client";

import { ArrowRight, Bird, Compass, Landmark, Waves } from "lucide-react";
import Link from "next/link";
import { useI18n } from "../../app/i18n-provider";
import { AssetImage } from "../common/AssetImage";

type FutureComplexVisualProps = {
  variant: "akivi" | "anakena" | "orongo";
  alt: string;
};

function FutureComplexVisual({ variant, alt }: FutureComplexVisualProps) {
  const isAkivi = variant === "akivi";
  const isOrongo = variant === "orongo";

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/12 bg-navy shadow-architectural sm:min-h-[440px]">
      <AssetImage
        src={
          isAkivi
            ? "/assets/future-complexes/ahu-akivi-seven-moai.png"
            : isOrongo
              ? "/assets/future-complexes/orongo-birdman-village.png"
              : "/assets/future-complexes/anakena-moai-beach.png"
        }
        alt={alt}
        fill
        className={`object-cover ${isAkivi ? "object-[46%_center]" : isOrongo ? "object-[50%_center]" : "object-[44%_center]"}`}
        style={{ filter: "brightness(1.625)" }}
        sizes="(min-width: 1024px) 640px, 100vw"
      />
      <div
        className={`absolute inset-0 ${
          isAkivi
            ? "bg-[linear-gradient(180deg,rgba(4,12,24,0.24),rgba(4,12,24,0.7)),linear-gradient(90deg,rgba(4,12,24,0.52),rgba(4,12,24,0.08)_58%)]"
            : "bg-[linear-gradient(180deg,rgba(5,15,28,0.2),rgba(5,15,28,0.72)),linear-gradient(90deg,rgba(5,15,28,0.34),rgba(5,15,28,0.08)_55%)]"
        }`}
        aria-hidden="true"
      />
      {!isAkivi && !isOrongo ? <Waves className="absolute bottom-[23%] left-8 text-white/55" size={48} aria-hidden="true" /> : null}
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,rgba(25,22,15,0.28),rgba(12,10,7,0.86))]" aria-hidden="true" />
      <div className="absolute left-5 top-5 rounded border border-gold/35 bg-navy/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
        {isAkivi ? "Ahu Akivi" : isOrongo ? "Orongo" : "Anakena"}
      </div>
    </div>
  );
}

export function FutureHeritageComplexesSection() {
  const { copy } = useI18n();
  const section = copy.futureComplexes;
  const icons = [Landmark, Waves, Bird];

  return (
    <section id="kolejne-kompleksy" className="relative overflow-hidden bg-[#06101f] px-6 py-28 text-white sm:py-32 lg:px-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(200,164,90,0.13),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#06101f,#02080d)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="section-kicker">{section.kicker}</p>
            <h2 className="mt-5 max-w-4xl text-balance font-serif text-[clamp(2.4rem,5vw,5.2rem)] font-semibold leading-[0.98] text-white">
              {section.title}
            </h2>
          </div>
          <div className="border-l border-gold/55 pl-6 text-lg leading-9 text-white/72 sm:pl-7 sm:text-xl">
            {section.intro}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {section.items.map((item, index) => {
            const Icon = icons[index] ?? Landmark;
            const variant = index === 0 ? "akivi" : index === 1 ? "anakena" : "orongo";

            return (
              <article
                key={item.title}
                className="group overflow-hidden rounded-lg border border-white/12 bg-white/[0.035] shadow-architectural transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.055]"
              >
                <FutureComplexVisual variant={variant} alt={item.imageAlt} />
                <div className="p-7 sm:p-9">
                  <div className="flex items-center gap-4">
                    <Icon className="shrink-0 text-gold" size={30} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold/80">{item.label}</p>
                      <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">{item.body}</p>
                  <ul className="mt-7 grid gap-3 text-sm font-semibold uppercase tracking-[0.13em] text-white/72">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center gap-3">
                        <span className="h-px w-7 bg-gold/70" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 rounded-lg border border-gold/30 bg-[linear-gradient(135deg,rgba(200,164,90,0.1),rgba(255,255,255,0.035))] p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-5">
            <Compass className="mt-1 shrink-0 text-gold" size={32} aria-hidden="true" />
            <p className="max-w-4xl text-lg leading-8 text-white/76">{section.note}</p>
          </div>
          <Link
            href="#kontakt"
            className="stable-action inline-flex min-h-12 items-center justify-center gap-3 border border-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
            aria-label={section.ctaAria}
          >
            {section.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

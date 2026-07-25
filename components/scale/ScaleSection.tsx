"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useI18n } from "../../app/i18n-provider";

type ScaleMode = "monumental" | "comparison" | "heights";

const visitorSilhouettes = [
  { height: 28, width: 7, head: 5, stance: 14 },
  { height: 31, width: 8, head: 5, stance: 15 },
  { height: 22, width: 6, head: 4, stance: 12 },
  { height: 33, width: 8, head: 5, stance: 16 },
  { height: 27, width: 7, head: 5, stance: 14 },
  { height: 30, width: 8, head: 5, stance: 15 },
  { height: 18, width: 5, head: 4, stance: 10 },
  { height: 29, width: 7, head: 5, stance: 14 }
];

function ScaleVisitor({
  visitor,
  className = "",
  style
}: {
  visitor: (typeof visitorSilhouettes)[number];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      data-scale-visitor
      aria-hidden="true"
      className={`relative shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] ${className}`}
      style={{
        height: `${visitor.height + visitor.head + 3}px`,
        width: `${visitor.stance}px`,
        ...style
      }}
    >
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[#f7efdc] ring-[0.5px] ring-black/50"
        style={{ height: `${visitor.head}px`, width: `${visitor.head}px` }}
      />
      <span
        className="absolute left-1/2 top-[6px] -translate-x-1/2 rounded-t-[42%] bg-[#f2e7cf] ring-[0.5px] ring-black/45"
        style={{ height: `${Math.round(visitor.height * 0.62)}px`, width: `${visitor.width}px` }}
      />
      <span
        className="absolute left-1/2 top-[12px] h-px -translate-x-1/2 bg-[#f2e7cf]"
        style={{ width: `${visitor.stance}px` }}
      />
      <span
        className="absolute bottom-0 rounded-b-full bg-[#f2e7cf] ring-[0.5px] ring-black/45"
        style={{
          height: `${Math.round(visitor.height * 0.36)}px`,
          width: `${Math.max(2, Math.round(visitor.width * 0.36))}px`,
          left: `calc(50% - ${Math.max(3, Math.round(visitor.width * 0.44))}px)`
        }}
      />
      <span
        className="absolute bottom-0 rounded-b-full bg-[#f2e7cf] ring-[0.5px] ring-black/45"
        style={{
          height: `${Math.round(visitor.height * 0.36)}px`,
          width: `${Math.max(2, Math.round(visitor.width * 0.36))}px`,
          left: `calc(50% + ${Math.max(1, Math.round(visitor.width * 0.12))}px)`
        }}
      />
    </div>
  );
}

export function ScaleSection() {
  const { copy } = useI18n();
  const [mode, setMode] = useState<ScaleMode>("monumental");
  const [reduceMotion, setReduceMotion] = useState(false);
  const scale = copy.scale;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section id="poczuj-skale" className="relative overflow-hidden bg-[#092035] px-6 py-28 text-white sm:py-32 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(200,164,90,0.16),transparent_32%),linear-gradient(180deg,#0a243a_0%,#06111d_100%)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
          <div>
            <p className="section-kicker">{scale.kicker}</p>
            <h2 className="mt-5 max-w-xl text-balance font-serif text-[2.75rem] font-semibold leading-[1.02] text-white sm:text-6xl">
              {scale.title}
            </h2>
            <p className="mt-6 max-w-xl font-serif text-2xl leading-tight text-gold sm:text-3xl">
              {scale.subtitle}
            </p>
            <p className="text-white/68 mt-7 max-w-xl text-base leading-8 sm:text-lg">{scale.intro}</p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end" role="tablist" aria-label={scale.modesLabel}>
            {(["monumental", "comparison", "heights"] as const).map((modeKey) => (
              <button
                key={modeKey}
                type="button"
                role="tab"
                aria-selected={mode === modeKey}
                onClick={() => setMode(modeKey)}
                className={`border px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition duration-300 sm:px-5 ${
                  mode === modeKey
                    ? "border-gold bg-gold text-navy"
                    : "border-white/20 bg-white/[0.04] text-white/70 hover:border-gold/65 hover:text-gold"
                }`}
              >
                {scale.modes[modeKey]}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-lg border border-white/12 bg-[#02080d] shadow-architectural sm:mt-16">
          {/* Final photography can replace this shared panorama without changing the section structure. */}
          <div className="relative min-h-[520px] sm:min-h-[650px] lg:min-h-[720px]">
            <Image
              src="/assets/hero/scale-hero-clean.webp"
              alt={scale.imageAlt}
              fill
              className="object-cover object-[54%_center] brightness-[1.35] contrast-[1.03] saturate-[1.08] sm:object-center"
              sizes="(min-width: 1024px) 1400px, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,13,0.16)_0%,rgba(2,8,13,0)_42%,rgba(2,8,13,0.2)_100%),linear-gradient(90deg,rgba(2,8,13,0.12),transparent_55%)]" />

            <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between gap-4 sm:left-10 sm:right-10 sm:top-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f4318] drop-shadow-[0_1px_1px_rgba(255,255,255,0.28)]">
                {scale.visualKicker}
              </span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[#22313c] drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)] sm:inline">
                {scale.viewLabel}
              </span>
            </div>

            <AnimatePresence>
              {mode === "heights" ? (
                <motion.div
                  key="heights"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  className="absolute inset-x-6 top-20 z-10 max-w-sm sm:left-10 sm:top-24"
                >
                  <div className="border-l border-[#6b4a19] bg-[#fff4d8]/12 px-5 py-2 text-sm font-semibold leading-8 text-[#22313c] shadow-[0_12px_30px_rgba(2,8,13,0.12)] backdrop-blur-[1px] sm:text-base">
                    <p><span className="text-[#6b4a19]">{scale.heightLabels.human}</span> — {scale.heightValues.human}</p>
                    <p><span className="text-[#6b4a19]">{scale.heightLabels.moai}</span> — {scale.heightValues.moai}</p>
                    <p><span className="text-[#6b4a19]">{scale.heightLabels.tallMoai}</span> — {scale.heightValues.tallMoai}</p>
                    <p><span className="text-[#6b4a19]">{scale.heightLabels.pukao}</span> — {scale.heightValues.pukao}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 sm:px-10 sm:pb-10">
              <div className="relative flex items-end justify-center gap-2 sm:gap-4">
                <AnimatePresence>
                  {mode === "comparison" ? (
                    <>
                      <motion.div
                        aria-hidden="true"
                        initial={reduceMotion ? false : { opacity: 0, scaleY: 0.92 }}
                        animate={{ opacity: 0.72, scaleY: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, scaleY: 0.92 }}
                        transition={{ duration: reduceMotion ? 0 : 0.32 }}
                        className="absolute bottom-0 left-1/2 hidden h-[180px] w-px origin-bottom -translate-x-[190px] bg-gold sm:block"
                      />
                      {visitorSilhouettes.map((visitor, index) => (
                        <motion.div
                          key={index}
                          aria-hidden="true"
                          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                          transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : index * 0.035 }}
                          className="relative shrink-0"
                        >
                          <ScaleVisitor visitor={visitor} />
                        </motion.div>
                      ))}
                    </>
                  ) : null}
                </AnimatePresence>
              </div>
              <motion.div
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, scaleX: 0.94 }}
                animate={{ opacity: mode === "comparison" ? 0.82 : 0, scaleX: mode === "comparison" ? 1 : 0.94 }}
                transition={{ duration: reduceMotion ? 0 : 0.32 }}
                className="mx-auto mt-2 h-px w-full max-w-xl origin-center bg-gold"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-px bg-white/12 sm:grid-cols-3">
          {[
            [scale.tiles.humanValue, scale.tiles.humanLabel],
            [scale.tiles.moaiValue, scale.tiles.moaiLabel],
            [scale.tiles.panoramaValue, scale.tiles.panoramaLabel]
          ].map(([value, label]) => (
            <div key={value} className="bg-[#06101f] px-6 py-6 sm:px-7">
              <p className="font-serif text-3xl font-semibold text-gold">{value}</p>
              <p className="text-white/62 mt-2 text-sm leading-6">{label}</p>
            </div>
          ))}
        </div>

        <p className="border-white/12 mt-12 border-t pt-10 font-serif text-2xl font-semibold leading-tight text-white sm:mt-14 sm:pt-12 sm:text-4xl">
          {scale.closing}
        </p>
      </div>
    </section>
  );
}

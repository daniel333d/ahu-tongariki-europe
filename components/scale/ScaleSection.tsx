"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useI18n } from "../../app/i18n-provider";

type ScaleMode = "monumental" | "comparison" | "heights";

type ScaleSectionProps = {
  previewEnhanced?: boolean;
};

const visitorSilhouettes = [
  { height: 20, width: 5, head: 4, stance: 10, tone: "#f7f2e8" },
  { height: 22, width: 6, head: 4, stance: 11, tone: "#fff8eb" },
  { height: 15, width: 4, head: 3, stance: 8, tone: "#f1eadf" },
  { height: 23, width: 6, head: 4, stance: 11, tone: "#fff8eb" },
  { height: 19, width: 5, head: 4, stance: 10, tone: "#f7f2e8" },
  { height: 21, width: 6, head: 4, stance: 11, tone: "#fff8eb" },
  { height: 13, width: 4, head: 3, stance: 8, tone: "#f1eadf" },
  { height: 22, width: 6, head: 4, stance: 11, tone: "#fff8eb" }
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
      className={`relative shrink-0 drop-shadow-[0_2px_5px_rgba(0,0,0,0.92)] ${className}`}
      style={{
        height: `${visitor.height + visitor.head + 3}px`,
        width: `${visitor.stance}px`,
        ...style
      }}
    >
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full ring-[0.5px] ring-black/55"
        style={{ height: `${visitor.head}px`, width: `${visitor.head}px`, backgroundColor: visitor.tone }}
      />
      <span
        className="absolute left-1/2 top-[5px] -translate-x-1/2 rounded-t-[42%] ring-[0.5px] ring-black/45"
        style={{
          height: `${Math.round(visitor.height * 0.62)}px`,
          width: `${visitor.width}px`,
          backgroundColor: visitor.tone
        }}
      />
      <span
        className="absolute left-1/2 top-[10px] h-px -translate-x-1/2"
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
  );
}

function ScaleModeButtons({
  mode,
  setMode,
  compact = false
}: {
  mode: ScaleMode;
  setMode: (mode: ScaleMode) => void;
  compact?: boolean;
}) {
  const { copy } = useI18n();
  const scale = copy.scale;

  return (
    <div
      className={`flex flex-wrap gap-2 ${compact ? "" : "lg:justify-end"}`}
      role="tablist"
      aria-label={scale.modesLabel}
    >
      {(["monumental", "comparison", "heights"] as const).map((modeKey) => (
        <button
          key={modeKey}
          type="button"
          role="tab"
          aria-selected={mode === modeKey}
          aria-pressed={mode === modeKey}
          onClick={() => setMode(modeKey)}
          className={`min-h-11 border px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 sm:px-5 ${
            mode === modeKey
              ? "border-gold bg-gold text-navy"
              : "border-white/20 bg-white/[0.04] text-white/70 hover:border-gold/65 hover:text-gold"
          }`}
        >
          {scale.modes[modeKey]}
        </button>
      ))}
    </div>
  );
}

function ScaleVisualPanel({
  mode,
  reduceMotion,
  compact = false
}: {
  mode: ScaleMode;
  reduceMotion: boolean;
  compact?: boolean;
}) {
  const { copy } = useI18n();
  const scale = copy.scale;

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#02080d] shadow-architectural">
      <div className={`relative ${compact ? "min-h-[320px] sm:min-h-[420px] lg:min-h-[430px]" : "min-h-[520px] sm:min-h-[650px] lg:min-h-[720px]"}`}>
        <Image
          src="/assets/hero/scale-hero-clean.webp"
          alt={scale.imageAlt}
          fill
          className="object-cover object-[54%_center] brightness-[1.32] contrast-[1.04] saturate-[1.08] sm:object-center"
          sizes={compact ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 1400px, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,13,0.12)_0%,rgba(2,8,13,0)_44%,rgba(2,8,13,0.18)_100%),linear-gradient(90deg,rgba(2,8,13,0.1),transparent_58%)]" />

        <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between gap-4 sm:left-8 sm:right-8 sm:top-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f4318] drop-shadow-[0_1px_1px_rgba(255,255,255,0.32)]">
            {scale.visualKicker}
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[#22313c] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] sm:inline">
            {scale.viewLabel}
          </span>
        </div>

        <AnimatePresence>
          {mode === "heights" ? (
            <motion.div
              key="heights"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              className="absolute inset-x-5 top-16 z-10 max-w-sm sm:left-8 sm:top-20"
            >
              <div className="border-l border-[#6b4a19] bg-[#fff4d8]/18 px-5 py-2 text-sm font-semibold leading-8 text-[#142431] shadow-[0_12px_30px_rgba(2,8,13,0.16)] backdrop-blur-[1px] sm:text-base">
                <p>
                  <span className="text-[#6b4a19]">{scale.heightLabels.human}</span> - {scale.heightValues.human}
                </p>
                <p>
                  <span className="text-[#6b4a19]">{scale.heightLabels.moai}</span> - {scale.heightValues.moai}
                </p>
                <p>
                  <span className="text-[#6b4a19]">{scale.heightLabels.tallMoai}</span> - {scale.heightValues.tallMoai}
                </p>
                <p>
                  <span className="text-[#6b4a19]">{scale.heightLabels.pukao}</span> - {scale.heightValues.pukao}
                </p>
              </div>
              <div className="mt-4 hidden h-[190px] max-w-[15rem] border-l border-gold/70 border-t border-dashed border-t-gold/45 sm:block" aria-hidden="true" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 sm:px-10 sm:pb-10">
          <div className="relative flex items-end justify-center gap-3 sm:gap-5">
            <AnimatePresence>
              {mode === "comparison" ? (
                <>
                  {visitorSilhouettes.map((visitor, index) => (
                    <motion.div
                      key={`${mode}-${index}`}
                      aria-hidden="true"
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.04 }}
                    >
                      <ScaleVisitor visitor={visitor} />
                    </motion.div>
                  ))}
                  <motion.div
                    className="ml-2 border-l border-gold/70 pl-3 text-xs font-bold uppercase tracking-[0.12em] text-[#142431] drop-shadow-[0_1px_1px_rgba(255,255,255,0.42)]"
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                  >
                    {scale.humanHeight}
                  </motion.div>
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
  );
}

export function ScaleSection({ previewEnhanced = false }: ScaleSectionProps) {
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
        {previewEnhanced ? (
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
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
            <div>
              <ScaleVisualPanel mode={mode} reduceMotion={reduceMotion} compact />
              <div className="mt-4">
                <ScaleModeButtons mode={mode} setMode={setMode} compact />
              </div>
            </div>
          </div>
        ) : (
          <>
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
              <ScaleModeButtons mode={mode} setMode={setMode} />
            </div>
            <div className="mt-14 sm:mt-16">
              <ScaleVisualPanel mode={mode} reduceMotion={reduceMotion} />
            </div>
          </>
        )}

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

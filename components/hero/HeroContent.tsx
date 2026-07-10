"use client";

import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import { HeroCTA } from "./HeroCTA";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[620px] pt-2 lg:pt-0 2xl:max-w-[560px] 2xl:-translate-y-4"
    >
      <div className="mb-5 flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#d3ad5d] sm:text-xs 2xl:mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#c8a45a]/50 text-[#c8a45a]">
          <Landmark className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>Ahu Tongariki Europe</span>
      </div>

      <h1 className="max-w-[590px] font-serif text-5xl font-semibold uppercase leading-[0.9] tracking-[0.01em] text-[#d9b461] sm:text-6xl md:text-7xl lg:text-[5.5rem] 2xl:text-[3.75rem]">
        PRZESTRZEŃ
        <br />
        DOŚWIADCZEŃ
      </h1>

      <p className="mt-5 max-w-[640px] text-xs font-medium uppercase tracking-[0.16em] text-[#d7b56a] sm:text-sm lg:text-base 2xl:mt-6 2xl:text-sm">
        ARCHITEKTURA INSPIROWANA KRAJOBRAZEM RAPA NUI
      </p>

      <p className="text-white/88 mt-5 max-w-[450px] text-sm leading-7 sm:text-base 2xl:mt-4 2xl:max-w-[420px] 2xl:text-sm 2xl:leading-6">
        Monumentalna historia Rapa Nui spotyka się z nowoczesną architekturą i naturą Kotliny Kłodzkiej,
        tworząc miejsce wyjątkowe w skali świata.
      </p>

      <HeroCTA />
    </motion.div>
  );
}

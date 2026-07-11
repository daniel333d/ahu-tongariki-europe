"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, GalleryVerticalEnd, Layers3, Tag, Users } from "lucide-react";
import { useI18n } from "../../app/i18n-provider";
import { AssetImage } from "../common/AssetImage";
import type { MasterplanObject } from "./types";

type MasterplanDetailsProps = {
  object: MasterplanObject;
};

export function MasterplanDetails({ object }: MasterplanDetailsProps) {
  const { copy } = useI18n();
  const details = copy.experience.masterplanDetails;

  return (
    <aside className="border-white/10 bg-[#061017]/82 relative overflow-hidden rounded-xl border p-5 shadow-[0_28px_80px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a45a]/55 to-transparent" />
      <motion.div
        key={object.id}
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-h-[42px] items-baseline gap-4">
          <motion.span
            initial={{ textShadow: "0 0 0 rgba(200,164,90,0)" }}
            animate={{ textShadow: "0 0 22px rgba(200,164,90,0.5)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl text-[#d9b461]"
          >
            {object.number}
          </motion.span>
          <h3 className="font-serif text-3xl font-semibold uppercase tracking-[0.04em] text-[#d9b461]">
            {object.title}
          </h3>
        </div>

        <div className="relative mt-5 h-[132px] overflow-hidden rounded-md border border-white/10">
          <AssetImage src={object.assetPath} alt="" fill sizes="420px" className="object-cover" />
        </div>

        <div className="mt-4 flex min-h-[28px] flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c8a45a]/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#f2d184]">
            <Tag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {details.categoryLabels[object.category]}
          </span>
          <span className="text-white/52 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
            <Layers3 className="h-4 w-4 text-[#c8a45a]" strokeWidth={1.5} aria-hidden="true" />
            {object.accentLabel}
          </span>
        </div>

        <p className="text-white/48 mt-5 min-h-[16px] text-xs font-semibold uppercase tracking-[0.16em]">
          {object.subtitle}
        </p>

        <div
          className="mt-8 h-px bg-gradient-to-r from-[#c8a45a]/55 via-white/10 to-transparent"
          data-asset={object.assetPath}
        />

        <p className="text-white/76 mt-5 text-sm leading-7">{object.description}</p>

        <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-white/55 text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
            {details.functionLabel}
          </p>
          <p className="mt-3 font-serif text-xl text-[#d9b461]">{object.functionLabel}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4 border-y border-white/10 py-4">
          <div>
            <Clock className="mb-2 h-5 w-5 text-[#c8a45a]" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-serif text-lg text-[#d9b461]">{object.estimatedVisitTime}</p>
            <p className="text-white/46 mt-1 text-[0.66rem] uppercase tracking-[0.14em]">{details.visitTimeLabel}</p>
          </div>
          <div>
            <Users className="mb-2 h-5 w-5 text-[#c8a45a]" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-serif text-lg text-[#d9b461]">{object.capacity}</p>
            <p className="text-white/46 mt-1 text-[0.66rem] uppercase tracking-[0.14em]">{details.capacityLabel}</p>
          </div>
          <div>
            <GalleryVerticalEnd
              className="mb-2 h-5 w-5 text-[#c8a45a]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-serif text-lg text-[#d9b461]">{object.accentLabel}</p>
            <p className="text-white/46 mt-1 text-[0.66rem] uppercase tracking-[0.14em]">{details.characterLabel}</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-4 rounded-md border border-[#c8a45a]/70 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f2d184] transition-colors duration-[250ms] hover:border-[#f2d184] hover:bg-[#c8a45a]/10 lg:py-3"
        >
          {details.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </motion.div>
    </aside>
  );
}

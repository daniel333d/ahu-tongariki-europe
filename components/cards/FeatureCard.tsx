"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../../app/i18n-provider";
import { AssetImage } from "../common/AssetImage";
import type { FeatureCardData } from "./types";

type FeatureCardProps = {
  card: FeatureCardData;
};

export function FeatureCard({ card }: FeatureCardProps) {
  const { copy } = useI18n();
  const Icon = card.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative flex h-full min-h-[285px] min-w-[250px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(12,22,30,0.9),rgba(3,9,14,0.96))] shadow-[0_28px_80px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-[border-color,box-shadow] duration-[250ms] hover:border-[#c8a45a]/55 hover:shadow-[0_28px_80px_rgba(0,0,0,0.56),0_0_30px_rgba(200,164,90,0.1),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-w-0 2xl:min-h-[330px]"
      data-asset={card.assetPath}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a45a]/55 to-transparent opacity-40 transition-opacity duration-[250ms] group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_0%,rgba(200,164,90,0.16),transparent_34%)] opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100" />

      <div className="relative h-[160px] shrink-0 overflow-hidden border-b border-white/10 2xl:h-[196px]">
        <div className="absolute inset-0 origin-bottom scale-[1.35]">
          <AssetImage
            src={card.assetPath}
            alt=""
            fill
            sizes="(min-width: 1536px) 16vw, (min-width: 768px) 33vw, 280px"
            className="object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(2,8,13,0.5)_100%)]" />
        <div className="absolute inset-0 bg-[#c8a45a]/0 transition-colors duration-[250ms] group-hover:bg-[#c8a45a]/[0.06]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col bg-white/[0.025] backdrop-blur-sm">
        <div className="flex items-center gap-2.5 px-4 pt-2.5">
          <span className="font-serif text-base text-[#d9b461] 2xl:text-lg">{card.number}</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-[#c8a45a]/30 text-[#c8a45a] transition-colors duration-[250ms] group-hover:border-[#c8a45a]/70 2xl:h-9 2xl:w-9">
            <Icon className="h-4 w-4 2xl:h-[18px] 2xl:w-[18px]" strokeWidth={1.45} aria-hidden="true" />
          </span>
          <h3 className="flex-1 truncate text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-[250ms] group-hover:text-[#d9b461] 2xl:text-[0.78rem]">
            {card.title}
          </h3>
        </div>

        <p className="text-white/70 px-4 pb-2 pt-1.5 text-[0.68rem] leading-4 2xl:text-[0.7rem] 2xl:leading-[1.05rem]">
          {card.description}
        </p>

        <button
          type="button"
          className="mt-auto flex items-center justify-between gap-2 border-t border-white/10 px-4 py-4 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#c8a45a]/85 transition-colors duration-[250ms] hover:text-[#f1cd7a] lg:py-2.5"
        >
          {copy.experience.cards.ctaLabel}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-[250ms] group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#c8a45a]/0 via-[#c8a45a]/45 to-[#c8a45a]/0 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100" />
    </motion.article>
  );
}

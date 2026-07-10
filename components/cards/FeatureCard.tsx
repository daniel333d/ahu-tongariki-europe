"use client";

import { motion } from "framer-motion";
import { AssetImage } from "../common/AssetImage";
import type { FeatureCardData } from "./types";

type FeatureCardProps = {
  card: FeatureCardData;
};

export function FeatureCard({ card }: FeatureCardProps) {
  const Icon = card.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full min-h-[200px] min-w-[250px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(12,22,30,0.9),rgba(3,9,14,0.96))] shadow-[0_24px_70px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-colors duration-300 hover:border-[#c8a45a]/55 hover:shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_28px_rgba(200,164,90,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-w-0 2xl:h-[238px]"
      data-asset={card.assetPath}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a45a]/55 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(200,164,90,0.16),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative h-[124px] overflow-hidden border-b border-white/10 2xl:h-[145px]">
        <AssetImage
          src={card.assetPath}
          alt=""
          fill
          sizes="(min-width: 1536px) 16vw, (min-width: 768px) 33vw, 280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgba(2,8,13,0.42)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[54px] items-center gap-3 px-5 pt-3 2xl:min-h-[50px] 2xl:px-4 2xl:pt-3">
        <span className="font-serif text-lg text-[#d9b461]">{card.number}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#c8a45a]/30 text-[#c8a45a] transition-colors duration-300 group-hover:border-[#c8a45a]/70 2xl:h-9 2xl:w-9">
          <Icon className="h-5 w-5 2xl:h-4 2xl:w-4" strokeWidth={1.45} aria-hidden="true" />
        </span>
        <h3 className="flex-1 text-sm font-semibold uppercase tracking-[0.12em] text-white 2xl:text-[0.78rem]">
          {card.title}
        </h3>
      </div>

      <p className="text-white/72 relative z-10 px-5 pb-4 pt-2 text-[0.72rem] leading-4 2xl:px-4 2xl:pb-3 2xl:text-[0.68rem] 2xl:leading-[1rem]">
        {card.description}
      </p>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#c8a45a]/0 via-[#c8a45a]/45 to-[#c8a45a]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
}

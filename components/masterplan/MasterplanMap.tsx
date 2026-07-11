"use client";

import { motion } from "framer-motion";
import { assets } from "../../lib/asset-paths";
import { AssetImage } from "../common/AssetImage";
import { masterplanObjects } from "./masterplan-data";
import { MasterplanMarker } from "./MasterplanMarker";
import type { MasterplanObject } from "./types";

type MasterplanMapProps = {
  activeId: MasterplanObject["id"];
  onSelect: (id: MasterplanObject["id"]) => void;
};

export function MasterplanMap({ activeId, onSelect }: MasterplanMapProps) {
  const activeObject = masterplanObjects.find((object) => object.id === activeId) ?? masterplanObjects[0];

  return (
    <div
      className="relative min-h-[380px] overflow-hidden rounded-xl border border-white/10 bg-[#061017] shadow-[0_28px_80px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_1px_rgba(217,180,97,0.12)] 2xl:min-h-[340px]"
      data-asset={assets.masterplan.aerial}
    >
      <AssetImage
        src={assets.masterplan.aerial}
        alt=""
        fill
        loading="eager"
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="scale-[0.94] object-cover brightness-[1.16] contrast-[0.94] saturate-[1] blur-[1.8px]"
      />

      {/* soft gallery light + depth vignette (also quiets the baked-in mockup digits) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_28%_18%,rgba(255,244,214,0.1),transparent_42%),linear-gradient(180deg,rgba(2,8,13,0.02),rgba(2,8,13,0.26)_100%)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent" />

      {/* crisp path lines drawn over the model for legibility */}
      <div className="bg-[#d9b461]/60 pointer-events-none absolute inset-x-[8%] top-[28%] h-px rotate-[-6deg] shadow-[0_0_18px_rgba(217,180,97,0.4)]" />
      <div className="pointer-events-none absolute inset-x-[13%] top-[53%] h-px rotate-[8deg] bg-[repeating-linear-gradient(90deg,rgba(217,180,97,0.58)_0_10px,transparent_10px_16px)] shadow-[0_0_16px_rgba(217,180,97,0.3)]" />

      {/* subtle spotlight that glides to the active object */}
      <motion.div
        className="pointer-events-none absolute z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(241,205,122,0.34)_0%,rgba(200,164,90,0.14)_46%,transparent_72%)]"
        animate={{ left: `${activeObject.positionX}%`, top: `${activeObject.positionY}%` }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {masterplanObjects.map((object) => (
        <MasterplanMarker
          key={object.id}
          object={object}
          isActive={object.id === activeId}
          onSelect={onSelect}
        />
      ))}

      <div className="bg-[#02080d]/78 text-white/66 absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/12 px-4 py-3 text-[0.65rem] uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
        <span className="text-[#d9b461]">Platforma Ahu jako centrum planu</span>
        <span>Ścieżki piesze · zieleń · tarasy · punkty widokowe</span>
      </div>
    </div>
  );
}

"use client";

import { useI18n } from "../../app/i18n-provider";
import type { MasterplanObject } from "./types";

type MasterplanMarkerProps = {
  object: MasterplanObject;
  isActive: boolean;
  onSelect: (id: MasterplanObject["id"]) => void;
};

export function MasterplanMarker({ object, isActive, onSelect }: MasterplanMarkerProps) {
  const { copy } = useI18n();

  return (
    <button
      type="button"
      className={[
        "absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-serif text-sm font-semibold leading-none transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "bg-[#050b10]/90 shadow-[0_14px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md",
        isActive
          ? "scale-110 border-[#f1cd7a] text-[#f1cd7a] shadow-[0_0_36px_rgba(241,205,122,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] ring-4 ring-[#c8a45a]/25"
          : "border-[#c8a45a]/40 text-[#d9b461] hover:scale-105 hover:border-[#f1cd7a] hover:text-[#f1cd7a] hover:shadow-[0_0_22px_rgba(217,180,97,0.28)]"
      ].join(" ")}
      style={{ left: `${object.positionX}%`, top: `${object.positionY}%` }}
      onClick={() => onSelect(object.id)}
      aria-pressed={isActive}
      aria-label={`${copy.experience.masterplanMarker.ariaLabelPrefix}: ${object.title}`}
    >
      {object.number}
    </button>
  );
}

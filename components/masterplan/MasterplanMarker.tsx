import type { MasterplanObject } from "./types";

type MasterplanMarkerProps = {
  object: MasterplanObject;
  isActive: boolean;
  onSelect: (id: MasterplanObject["id"]) => void;
};

export function MasterplanMarker({ object, isActive, onSelect }: MasterplanMarkerProps) {
  return (
    <button
      type="button"
      className={[
        "absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-sm font-semibold transition duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "bg-[#050b10]/88 shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-md",
        isActive
          ? "border-[#f1cd7a] text-[#f1cd7a] shadow-[0_0_34px_rgba(200,164,90,0.36)] ring-4 ring-[#c8a45a]/20 after:absolute after:inset-[-8px] after:animate-ping after:rounded-full after:border after:border-[#c8a45a]/45"
          : "border-[#c8a45a]/42 text-[#d9b461] hover:border-[#f1cd7a] hover:text-[#f1cd7a]"
      ].join(" ")}
      style={{ left: `${object.positionX}%`, top: `${object.positionY}%` }}
      onClick={() => onSelect(object.id)}
      aria-pressed={isActive}
      aria-label={`Pokaż szczegóły: ${object.title}`}
    >
      {object.number}
    </button>
  );
}

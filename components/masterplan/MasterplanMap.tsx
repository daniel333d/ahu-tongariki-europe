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
  return (
    <div
      className="relative min-h-[380px] overflow-hidden rounded-lg border border-white/10 bg-[#061017] shadow-[0_30px_90px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.04)] 2xl:min-h-[340px]"
      data-asset={assets.masterplan.aerial}
    >
      <AssetImage
        src={assets.masterplan.aerial}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="scale-[0.92] object-cover brightness-[1.14] contrast-[1.12] saturate-[1.06]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(217,180,97,0.16),transparent_36%),linear-gradient(180deg,rgba(2,8,13,0),rgba(2,8,13,0.14))]" />
      <div className="bg-[#d9b461]/46 pointer-events-none absolute inset-x-[8%] top-[28%] h-px rotate-[-6deg] shadow-[0_0_16px_rgba(217,180,97,0.34)]" />
      <div className="pointer-events-none absolute inset-x-[13%] top-[53%] h-px rotate-[8deg] bg-[repeating-linear-gradient(90deg,rgba(217,180,97,0.46)_0_10px,transparent_10px_16px)] shadow-[0_0_14px_rgba(217,180,97,0.24)]" />

      {masterplanObjects.map((object) => (
        <MasterplanMarker
          key={object.id}
          object={object}
          isActive={object.id === activeId}
          onSelect={onSelect}
        />
      ))}

      <div className="bg-[#02080d]/72 text-white/62 absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 px-4 py-3 text-[0.65rem] uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
        <span className="text-[#d9b461]">Platforma Ahu jako centrum planu</span>
        <span>Ścieżki piesze · zieleń · tarasy · punkty widokowe</span>
      </div>
    </div>
  );
}

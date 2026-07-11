"use client";

import { useMemo, useState } from "react";
import { useI18n } from "../../app/i18n-provider";
import { MasterplanDetails } from "./MasterplanDetails";
import { MasterplanMap } from "./MasterplanMap";
import { masterplanObjectMeta } from "./masterplan-data";
import type { MasterplanObject } from "./types";

export function MasterplanSection() {
  const { copy } = useI18n();
  const [activeId, setActiveId] = useState<MasterplanObject["id"]>("museum");

  const masterplanObjects: MasterplanObject[] = useMemo(
    () =>
      masterplanObjectMeta.map((meta, index) => ({
        ...meta,
        ...copy.experience.masterplanObjects[index]
      })),
    [copy]
  );

  const activeObject = useMemo(
    () => masterplanObjects.find((object) => object.id === activeId) ?? masterplanObjects[0],
    [activeId, masterplanObjects],
  );

  const legend = copy.experience.masterplanSection.legend;

  return (
    <section
      className="bg-[#02080d] px-6 pb-8 pt-5 text-white sm:px-10 lg:px-12 xl:px-16 2xl:pb-7 2xl:pt-4"
      aria-label={copy.experience.masterplanSection.ariaLabel}
    >
      <div className="mx-auto grid max-w-[1920px] gap-6 lg:grid-cols-[250px_minmax(0,1fr)_420px] 2xl:gap-7">
        <div className="rounded-lg border border-white/0 pt-3 2xl:pt-2">
          <p className="font-serif text-3xl font-semibold uppercase leading-tight text-[#d9b461] sm:text-4xl 2xl:text-[2.15rem]">
            {copy.experience.masterplanSection.titleLine1}
            <br />
            {copy.experience.masterplanSection.titleLine2}
          </p>
          <p className="mt-7 text-sm leading-7 text-white/78 2xl:mt-6 2xl:text-[0.82rem] 2xl:leading-6">
            {copy.experience.masterplanSection.intro}
          </p>
          <div className="mt-8 space-y-4 text-sm text-white/76 2xl:mt-7 2xl:space-y-3 2xl:text-[0.82rem]">
            <div className="flex items-center gap-4">
              <span className="flex h-4 w-8 shrink-0 items-center">
                <span className="h-px w-8 bg-[#d9b461]" />
              </span>
              <span>{legend.mainPaths}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-4 w-8 shrink-0 items-center">
                <span className="h-px w-8 border-t border-dashed border-[#d9b461]" />
              </span>
              <span>{legend.walkingPaths}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-4 w-8 shrink-0 items-center justify-center text-[#d9b461]">▸</span>
              <span>{legend.entrances}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-4 w-8 shrink-0 items-center justify-center">
                <span className="h-4 w-4 rounded-full bg-[#496d38]" />
              </span>
              <span>{legend.greenZones}</span>
            </div>
          </div>
        </div>

        <MasterplanMap objects={masterplanObjects} activeId={activeId} onSelect={setActiveId} />
        <MasterplanDetails object={activeObject} />
      </div>
    </section>
  );
}

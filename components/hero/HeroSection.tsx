"use client";

import { useI18n } from "../../app/i18n-provider";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroInfoPanel } from "./HeroInfoPanel";
import { HeroOverlay } from "./HeroOverlay";

const MOAI_COUNT = 15;
const PUKAO_POSITION_FROM_LEFT = 14;

export function HeroSection() {
  const { copy } = useI18n();
  const ariaLabel = copy.experience.hero.ariaLabel
    .replace("{count}", String(MOAI_COUNT))
    .replace("{position}", String(PUKAO_POSITION_FROM_LEFT));

  return (
    <section
      className="relative min-h-[470px] overflow-hidden bg-[#02080d] text-white lg:h-[47vw] lg:max-h-[640px] 2xl:h-[36vw] 2xl:max-h-[490px]"
      aria-label={ariaLabel}
      data-moai-count={MOAI_COUNT}
      data-pukao-position-from-left={PUKAO_POSITION_FROM_LEFT}
    >
      <HeroBackground />
      <HeroOverlay />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1920px] flex-col justify-between px-6 py-7 sm:px-10 lg:px-12 xl:px-16">
        <div className="flex items-start justify-between gap-10">
          <HeroContent />
          <HeroInfoPanel variant="desktop" />
        </div>

        <HeroInfoPanel variant="mobile" />
      </div>
    </section>
  );
}

export default HeroSection;

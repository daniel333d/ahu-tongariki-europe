"use client";

import { useI18n } from "../../app/i18n-provider";
import { FeatureCard } from "./FeatureCard";
import { featureCardMeta } from "./feature-data";
import type { FeatureCardData } from "./types";

export function FeatureCards() {
  const { copy } = useI18n();
  const cards: FeatureCardData[] = featureCardMeta.map((meta, index) => ({
    ...meta,
    title: copy.experience.cards.items[index].title,
    description: copy.experience.cards.items[index].description
  }));

  return (
    <section
      className="bg-[#02080d] px-6 pb-3 pt-8 text-white sm:px-10 lg:px-12 xl:px-16 2xl:pb-4"
      aria-label={copy.experience.cards.ariaLabel}
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="-mx-6 flex snap-x items-stretch gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 2xl:grid-cols-6 2xl:gap-4 [&::-webkit-scrollbar]:hidden">
          {cards.map((card) => (
            <div key={card.number} className="snap-center md:h-full md:snap-none">
              <FeatureCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

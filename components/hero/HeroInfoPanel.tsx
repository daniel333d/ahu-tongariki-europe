"use client";

import { motion } from "framer-motion";
import { BookOpen, Landmark, Map, MapPin, Mountain } from "lucide-react";

type HeroInfoPanelProps = {
  variant: "desktop" | "mobile";
};

const infoItems = [
  {
    icon: MapPin,
    title: "BYSTRZYCA KŁODZKA",
    description: "DOLNY ŚLĄSK, POLSKA"
  },
  {
    icon: Map,
    title: "16 HA",
    description: "POWIERZCHNIA KOMPLEKSU"
  },
  {
    icon: Landmark,
    title: "15 MOAI",
    description: "WIERNA KOPIA AHU TONGARIKI Z WYSPY WIELKANOCNEJ"
  },
  {
    icon: BookOpen,
    title: "CENTRUM KULTURY",
    description: "I EDUKACJI"
  },
  {
    icon: Mountain,
    title: "PANORAMA KOTLINY",
    description: "KŁODZKIEJ"
  }
];

export function HeroInfoPanel({ variant }: HeroInfoPanelProps) {
  if (variant === "desktop") {
    return (
      <motion.aside
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#061017]/82 hidden w-[300px] shrink-0 rounded-xl border border-white/10 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.46)] backdrop-blur-xl lg:block xl:w-[320px]"
        aria-label="Najważniejsze informacje o projekcie"
      >
        <div className="divide-y divide-white/10">
          {infoItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                <Icon className="mt-1 h-7 w-7 shrink-0 text-[#c8a45a]" strokeWidth={1.4} aria-hidden="true" />
                <div>
                  <h2 className="font-serif text-base font-semibold uppercase tracking-[0.08em] text-[#d9b461]">
                    {item.title}
                  </h2>
                  <p className="text-white/78 mt-1 text-xs font-medium uppercase leading-5 tracking-[0.08em]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.45 }}
      className="bg-[#061017]/72 mt-16 grid gap-3 rounded-xl border border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:grid-cols-2 lg:hidden"
      aria-label="Najważniejsze informacje o projekcie"
    >
      {infoItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <Icon className="mt-1 h-5 w-5 shrink-0 text-[#c8a45a]" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h2 className="font-serif text-sm font-semibold uppercase tracking-[0.08em] text-[#d9b461]">
                {item.title}
              </h2>
              <p className="text-white/76 mt-1 text-[0.68rem] font-medium uppercase leading-4 tracking-[0.06em]">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

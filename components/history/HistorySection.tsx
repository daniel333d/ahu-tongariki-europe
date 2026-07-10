"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AssetImage } from "../common/AssetImage";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export function HistorySection() {
  return (
    <section id="historia" className="bg-[#02080d] px-6 py-16 text-white sm:px-10 lg:px-12 xl:px-16">
      <div className="mx-auto grid max-w-[1920px] items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] 2xl:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[620px]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d9b461]">
            Historia Ahu Tongariki
          </p>

          <h2 className="mt-5 font-serif text-4xl font-semibold uppercase leading-[0.96] tracking-[0.01em] text-[#d9b461] sm:text-5xl 2xl:text-[3.65rem]">
            Dziedzictwo
            <br />
            zapisane w kamieniu
          </h2>

          <div className="mt-7 h-px w-20 bg-[#d9b461]" />

          <div className="text-white/76 mt-10 space-y-5 text-sm leading-7 2xl:text-[0.95rem] 2xl:leading-8">
            <p>
              Ahu Tongariki to monumentalna platforma ceremonialna na Rapa Nui, znana z piętnastu Moai
              ustawionych na jednej osi krajobrazu. Należy do najważniejszych miejsc dziedzictwa Wyspy
              Wielkanocnej.
            </p>
            <p>
              Kompleks stał się symbolem Rapa Nui, ponieważ łączy pamięć przodków, kunszt dawnych
              budowniczych, rytuał oraz wyjątkową relację człowieka z krajobrazem. Piętnaście Moai tworzy
              największą ceremonialną platformę wyspy i pozostaje punktem odniesienia dla projektu Ahu
              Tongariki Europe w Bystrzycy Kłodzkiej.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <motion.a
              href="#historia"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#02080d]/42 inline-flex min-h-[52px] items-center justify-center gap-4 rounded-md border border-[#c8a45a]/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#f2d184] shadow-[0_20px_60px_rgba(0,0,0,0.36)] backdrop-blur-md transition hover:border-[#f2d184] hover:bg-[#c8a45a]/10"
            >
              Poznaj historię
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Ahu%20Tongariki%2C%20Rapa%20Nui"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="border-white/12 text-white/78 inline-flex min-h-[52px] items-center justify-center gap-4 rounded-md border bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:border-[#c8a45a]/55 hover:text-[#f2d184]"
            >
              Zobacz oryginalne Ahu Tongariki
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#071018]/86 relative min-h-[390px] overflow-hidden rounded-lg border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.04)] lg:mx-10 2xl:mx-12 2xl:min-h-[455px]"
        >
          <AssetImage
            src="/ahu-tongariki-hero.png"
            alt="Ahu Tongariki z piętnastoma posągami Moai o zachodzie słońca"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover brightness-[0.92] contrast-[1.08] saturate-[0.96]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,13,0.16),rgba(2,8,13,0)_42%),linear-gradient(180deg,rgba(2,8,13,0)_62%,rgba(2,8,13,0.58)_100%)]" />
          <div className="bg-[#02080d]/68 text-white/62 absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-lg border border-white/10 px-5 py-4 text-[0.68rem] uppercase tracking-[0.16em] backdrop-blur-md">
            <span className="text-[#d9b461]">15 Moai</span>
            <span>Rapa Nui jako punkt odniesienia projektu</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

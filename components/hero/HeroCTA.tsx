"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroCTA() {
  return (
    <motion.a
      href="#kompleks"
      whileHover={{ y: -2, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className="bg-[#02080d]/42 mt-2 inline-flex items-center gap-4 rounded-md border border-[#c8a45a]/70 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f2d184] shadow-[0_20px_60px_rgba(0,0,0,0.36)] backdrop-blur-md transition-colors duration-[250ms] hover:border-[#f2d184] hover:bg-[#c8a45a]/10 lg:py-3"
    >
      POZNAJ CAŁY KOMPLEKS
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </motion.a>
  );
}

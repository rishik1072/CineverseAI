"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.84, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-4"
    >
      <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-rose-500 via-fuchsia-500 to-cyan-400 shadow-2xl shadow-fuchsia-500/40">
        <motion.span
          className="absolute inset-0 bg-white/30"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
        <Sparkles className="relative h-8 w-8 text-white" />
      </span>
      <span className="text-4xl font-black tracking-tight text-white md:text-6xl">
        CineVerse <span className="text-gradient-neon">AI</span>
      </span>
    </motion.div>
  );
}

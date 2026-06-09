"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedLogo } from "@/components/brand/animated-logo";

export function CinematicLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#03040a]"
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,.35),transparent_28rem),radial-gradient(circle_at_80%_50%,rgba(34,211,238,.22),transparent_28rem)]" />
          <div className="absolute inset-0 spotlight-grid opacity-30" />
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 28 }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute h-1 w-1 rounded-full bg-cyan-200/60"
                style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%` }}
                animate={{ y: [-12, 18, -12], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + (index % 6) * 0.22, repeat: Infinity, delay: index * 0.05 }}
              />
            ))}
          </div>
          <div className="relative flex flex-col items-center gap-8">
            <AnimatedLogo />
            <div className="h-1 w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Initializing cinematic graph</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

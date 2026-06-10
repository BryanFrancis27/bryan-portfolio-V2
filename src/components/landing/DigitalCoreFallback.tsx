"use client";

import { motion, useReducedMotion } from "framer-motion";

export function DigitalCoreFallback({ entering = false }: { entering?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <motion.div
        className="absolute inset-3 rounded-full border border-white/[0.1] shadow-[0_0_46px_rgb(255_255_255_/_0.08)]"
        animate={reduceMotion ? { rotate: 0, scale: 1, opacity: 0.72 } : { rotate: 360, scale: [0.96, 1.08, 0.96], opacity: [0.48, 0.84, 0.48] }}
        transition={{ duration: 8.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-9 rounded-full border border-dashed border-white/[0.13] shadow-[0_0_34px_rgb(255_255_255_/_0.07)]"
        animate={reduceMotion ? { rotate: 0, scale: 1, opacity: 0.62 } : { rotate: -360, scale: [1.02, 1.15, 1.02], opacity: [0.38, 0.74, 0.38] }}
        transition={{ duration: 11.6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut", delay: 0.7 }}
      />
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(255_255_255_/_0.16)_0%,rgb(219_234_254_/_0.1)_36%,transparent_70%)] blur-xl sm:h-[25rem] sm:w-[25rem]"
        animate={reduceMotion ? { scale: 1, opacity: 0.52 } : { scale: [0.94, 1.08, 0.98, 1.12, 0.94], opacity: [0.34, 0.58, 0.42, 0.64, 0.34] }}
        transition={{ duration: 7.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-64 w-64 rounded-full border border-white/[0.09] bg-white/[0.055] shadow-[0_0_88px_rgb(255_255_255_/_0.16)] blur-[1px] sm:h-80 sm:w-80"
        animate={reduceMotion ? { scale: 1, opacity: 0.42 } : { scale: [1, 1.08, 1.02, 1.1, 1], opacity: [0.28, 0.54, 0.38, 0.58, 0.28] }}
        transition={{ duration: 6.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative h-72 w-48 bg-[linear-gradient(120deg,rgb(255_255_255_/_0.2),rgb(34_34_37_/_0.78)_24%,rgb(5_5_6_/_0.98)_50%,rgb(23_23_26_/_0.84)_76%,rgb(255_255_255_/_0.12))] shadow-metal-glow [clip-path:polygon(50%_0%,76%_10%,91%_42%,72%_86%,50%_100%,28%_86%,9%_42%,24%_10%)] sm:h-96 sm:w-64"
        animate={{
          boxShadow: entering
            ? "0 0 140px rgb(245 245 245 / 0.22)"
            : reduceMotion
              ? "0 0 74px rgb(245 245 245 / 0.1)"
              : [
                  "0 0 58px rgb(245 245 245 / 0.08)",
                  "0 0 100px rgb(245 245 245 / 0.15)",
                  "0 0 58px rgb(245 245 245 / 0.08)",
                ],
        }}
        transition={{ duration: entering ? 0.7 : 6.2, repeat: entering || reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_18%,rgb(255_255_255_/_0.32),transparent_17%),radial-gradient(circle_at_36%_44%,rgb(255_255_255_/_0.16),transparent_11%)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/48 via-white/12 to-white/22" />
        <div className="absolute left-[12%] top-[42%] h-px w-[76%] bg-gradient-to-r from-transparent via-white/24 to-transparent" />
        <div className="absolute left-[24%] top-[11%] h-[75%] w-px rotate-[14deg] bg-gradient-to-b from-white/24 via-white/8 to-transparent" />
        <div className="absolute right-[24%] top-[11%] h-[75%] w-px rotate-[-14deg] bg-gradient-to-b from-white/18 via-white/6 to-transparent" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(105deg,transparent_0,transparent_47%,rgb(255_255_255_/_0.18)_49%,transparent_51%,transparent_100%)] [background-size:22px_100%]" />
      </motion.div>
    </div>
  );
}

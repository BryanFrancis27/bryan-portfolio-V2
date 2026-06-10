"use client";

import { motion, useReducedMotion } from "framer-motion";

const shardLines = [
  "left-[14%] top-[27%] h-px w-28 rotate-[-18deg]",
  "right-[10%] top-[36%] h-px w-32 rotate-[14deg]",
  "left-[20%] bottom-[29%] h-px w-24 rotate-[13deg]",
  "right-[18%] bottom-[24%] h-px w-28 rotate-[-16deg]",
];

const glyphs = [
  "left-[28%] top-[18%]",
  "right-[24%] top-[25%]",
  "left-[19%] bottom-[21%]",
  "right-[30%] bottom-[16%]",
];

export function DigitalCoreFallback({ entering = false }: { entering?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <motion.div
        className="absolute inset-3 rounded-[42%] border border-white/[0.08]"
        animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={{ duration: 46, repeat: reduceMotion ? 0 : Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-12 rounded-[36%] border border-dashed border-white/[0.14]"
        animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
        transition={{ duration: 58, repeat: reduceMotion ? 0 : Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-20 rounded-full border border-white/[0.08]"
        animate={reduceMotion ? { scale: 1, opacity: 0.38 } : { scale: [1, 1.08, 1], opacity: [0.2, 0.48, 0.2] }}
        transition={{ duration: 6.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-24 rounded-full bg-white/[0.045] blur-2xl"
        animate={{
          opacity: entering ? 0.8 : reduceMotion ? 0.42 : [0.28, 0.52, 0.28],
          scale: entering ? 1.3 : reduceMotion ? 1 : [1, 1.08, 1],
        }}
        transition={{ duration: entering ? 0.7 : 5.8, repeat: entering || reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      />

      {shardLines.map((line) => (
        <span key={line} className={`glyph-line absolute ${line} opacity-60`} />
      ))}

      {glyphs.map((position, index) => (
        <motion.span
          key={position}
          className={`absolute ${position} h-3 w-3 border-l border-t border-white/30`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: reduceMotion ? 0.34 : [0.18, 0.62, 0.18],
            rotate: index % 2 === 0 ? 45 : -45,
          }}
          transition={{ delay: index * 0.3, duration: 4.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="scan-line relative h-72 w-52 overflow-hidden border border-white/[0.18] bg-[linear-gradient(135deg,rgb(255_255_255_/_0.28),rgb(96_96_96_/_0.26)_16%,rgb(15_15_15_/_0.96)_43%,rgb(3_3_3_/_0.99)_72%,rgb(229_231_235_/_0.18))] shadow-metal-glow [clip-path:polygon(50%_0%,78%_11%,92%_42%,75%_88%,50%_100%,22%_88%,8%_42%,22%_11%)] sm:h-96 sm:w-72"
        animate={{
          boxShadow: entering
            ? "0 0 150px rgb(245 245 245 / 0.26)"
            : reduceMotion
              ? "0 0 76px rgb(245 245 245 / 0.1)"
              : [
                  "0 0 64px rgb(245 245 245 / 0.08)",
                  "0 0 108px rgb(245 245 245 / 0.16)",
                  "0 0 64px rgb(245 245 245 / 0.08)",
                ],
        }}
        transition={{ duration: entering ? 0.7 : 6.4, repeat: entering || reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255_/_0.36),transparent_18%),radial-gradient(circle_at_31%_39%,rgb(255_255_255_/_0.16),transparent_10%),radial-gradient(circle_at_68%_45%,rgb(255_255_255_/_0.14),transparent_12%)]" />
        <div className="absolute inset-[1px] bg-[linear-gradient(105deg,transparent_0%,rgb(255_255_255_/_0.18)_18%,transparent_34%,transparent_62%,rgb(255_255_255_/_0.1)_76%,transparent_100%)] [clip-path:inherit]" />
        <div className="absolute inset-5 border border-white/[0.08] [clip-path:polygon(50%_2%,74%_14%,86%_42%,72%_82%,50%_96%,28%_82%,14%_42%,26%_14%)]" />
        <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-white/[0.075] blur-xl" />
        <div className="absolute left-1/2 top-12 h-[78%] w-px -translate-x-1/2 bg-gradient-to-b from-white/45 via-white/10 to-transparent" />
        <div className="absolute left-[30%] top-[18%] h-[68%] w-px rotate-[18deg] bg-gradient-to-b from-white/24 via-white/8 to-transparent" />
        <div className="absolute right-[30%] top-[18%] h-[68%] w-px rotate-[-18deg] bg-gradient-to-b from-white/24 via-white/8 to-transparent" />
        <div className="absolute left-1/2 top-[45%] h-px w-36 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent sm:w-48" />
        <div className="absolute bottom-[14%] left-1/2 h-20 w-36 -translate-x-1/2 border-t border-white/18 sm:w-48" />
        <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 288 384">
          <path d="M144 18 205 58 239 165 205 326 144 366 83 326 49 165 83 58Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M144 18 144 366M83 58 205 326M205 58 83 326M49 165H239" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
          <path d="M144 82 184 128 171 258 144 303 117 258 104 128Z" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        </svg>
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(110deg,transparent_0,transparent_48%,rgb(255_255_255_/_0.2)_49%,transparent_51%,transparent_100%)] [background-size:18px_100%]" />
      </motion.div>
    </div>
  );
}

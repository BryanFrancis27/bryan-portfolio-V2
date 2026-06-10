"use client";

import { motion } from "framer-motion";

export type BootStatus = "pending" | "loading" | "complete";

export function BootSequenceRow({
  index,
  label,
  status,
}: {
  index: number;
  label: string;
  status: BootStatus;
}) {
  const isLoading = status === "loading";
  const isComplete = status === "complete";

  return (
    <motion.li
      className={[
        "relative flex items-center gap-3 overflow-hidden border-l px-3 py-2 font-mono text-xs transition-colors duration-300",
        isComplete
          ? "border-white/35 bg-white/[0.038] text-zinc-200"
          : isLoading
            ? "border-white/45 bg-white/[0.055] text-white shadow-[0_0_34px_rgb(245_245_245_/_0.08)]"
            : "border-white/[0.08] bg-white/[0.012] text-zinc-600",
      ].join(" ")}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
    >
      {isLoading ? (
        <motion.span
          className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/[0.105] to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.95, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ) : null}

      <span className={isComplete || isLoading ? "text-white/90" : "text-white/30"}>
        [{String(index + 1).padStart(2, "0")}]
      </span>
      <motion.span
        className="relative flex-1"
        animate={isLoading ? { opacity: [0.68, 1, 0.76, 1] } : { opacity: 1 }}
        transition={isLoading ? { duration: 1.05, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      >
        {label}
      </motion.span>
      <span
        className={[
          "relative h-2 w-2 rounded-full border",
          isComplete
            ? "border-white/60 bg-white/70"
            : isLoading
              ? "border-white/80 bg-white shadow-[0_0_18px_rgb(255_255_255_/_0.45)]"
              : "border-white/18 bg-transparent",
        ].join(" ")}
        aria-hidden="true"
      />
    </motion.li>
  );
}

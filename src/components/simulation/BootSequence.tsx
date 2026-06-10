"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { BootSequenceRow, type BootStatus } from "@/components/simulation/BootSequenceRow";

const bootItems = [
  "MEMORY ARCHITECTURE ONLINE",
  "PRODUCT SYSTEMS INDEXED",
  "EXPERIENCE MATRIX SYNCHRONIZED",
  "IDENTITY SIGNAL VERIFIED",
  "COMMAND CENTER READY",
];

const systemStates = [
  "INITIALIZING CORE...",
  "SYNCING MEMORY...",
  "INDEXING PRODUCT SYSTEMS...",
  "VERIFYING SIGNAL...",
  "OPENING COMMAND LAYER...",
  "BOOT COMPLETE",
];

export function BootSequence({ onComplete }: { onComplete?: () => void }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const initialDelay = reduceMotion ? 120 : 900;
    const rowDelay = reduceMotion ? 80 : 420;
    const finalDelay = reduceMotion ? 80 : 300;

    bootItems.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setActiveIndex(index);
        }, initialDelay + index * rowDelay),
      );
    });

    timers.push(
      window.setTimeout(() => {
        setActiveIndex(bootItems.length);
      }, initialDelay + bootItems.length * rowDelay),
    );

    timers.push(
      window.setTimeout(() => {
        setBootComplete(true);
        onComplete?.();
      }, initialDelay + bootItems.length * rowDelay + finalDelay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onComplete, reduceMotion]);

  const progress = useMemo(() => {
    if (bootComplete) return 100;
    if (activeIndex < 0) return 6;
    if (activeIndex >= bootItems.length) return 92;
    return Math.min(88, ((activeIndex + 0.52) / bootItems.length) * 100);
  }, [activeIndex, bootComplete]);

  const systemState = bootComplete
    ? systemStates[systemStates.length - 1]
    : activeIndex < 0
      ? systemStates[0]
      : systemStates[Math.min(activeIndex + 1, systemStates.length - 2)];

  function getStatus(index: number): BootStatus {
    if (activeIndex > index || bootComplete) return "complete";
    if (activeIndex === index) return "loading";
    return "pending";
  }

  return (
    <div
      className={[
        "alien-panel scan-line rounded-lg border p-5 backdrop-blur transition-shadow duration-500",
        bootComplete
          ? "border-white/[0.14] shadow-[0_0_52px_rgb(245_245_245_/_0.055)]"
          : "border-white/[0.08] shadow-[0_0_44px_rgb(245_245_245_/_0.035)]",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            System Awakening
          </p>
          <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-zinc-500">
            {systemState}
          </p>
        </div>
        <motion.span
          className="font-mono text-xs uppercase tracking-[0.14em] text-white"
          animate={bootComplete ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
          transition={bootComplete ? { duration: 0.2 } : { duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
        >
          Verified Signal
        </motion.span>
      </div>
      <ol className="space-y-3">
        {bootItems.map((item, index) => (
          <BootSequenceRow key={item} index={index} label={item} status={getStatus(index)} />
        ))}
      </ol>
      <div className="mt-4 h-px overflow-hidden bg-white/[0.08]">
        <motion.div
          className="h-full bg-gradient-to-r from-white/20 via-white/80 to-white/20"
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { DigitalCoreFallback } from "@/components/landing/DigitalCoreFallback";

const DigitalCore3D = dynamic(() => import("@/components/landing/DigitalCore3D"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
}

export function DigitalConsciousnessCore({ entering = false }: { entering?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglReady(supportsWebGL());
  }, []);

  return (
    <motion.div
      className="relative mx-auto flex h-[22rem] w-full max-w-[23rem] items-center justify-center overflow-visible [perspective:900px] sm:h-[31rem] sm:max-w-[31rem]"
      animate={entering ? { scale: 1.06, opacity: 1 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      aria-label="Digital Consciousness Core animation"
    >
      <div
        className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_48%_42%,rgb(255_255_255_/_0.18),transparent_18%),radial-gradient(circle_at_40%_52%,rgb(255_255_255_/_0.08),transparent_34%)] opacity-0 blur-3xl motion-safe:animate-[core-halo-reveal_4.2s_ease-out_forwards]"
        aria-hidden="true"
      />

      {webglReady === null ? null : webglReady ? (
        <DigitalCore3D entering={entering} reduceMotion={Boolean(reduceMotion)} />
      ) : (
        <DigitalCoreFallback entering={entering} />
      )}

      <div className="absolute bottom-7 border border-white/12 bg-black/60 px-4 py-2 font-mono text-[0.63rem] uppercase tracking-[0.22em] text-zinc-300 opacity-0 backdrop-blur motion-safe:animate-[core-label-reveal_4.2s_ease-out_forwards] motion-reduce:opacity-100 sm:bottom-8">
        Digital Consciousness Core
      </div>
    </motion.div>
  );
}

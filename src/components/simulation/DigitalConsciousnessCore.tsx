"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { DigitalCoreFallback } from "@/components/simulation/DigitalCoreFallback";

const DigitalCore3D = dynamic(() => import("@/components/simulation/DigitalCore3D"), {
  ssr: false,
  loading: () => <DigitalCoreFallback />,
});

function supportsWebGL() {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
}

export function DigitalConsciousnessCore({ entering = false }: { entering?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    setWebglReady(supportsWebGL());
  }, []);

  return (
    <motion.div
      className="relative mx-auto flex h-[23rem] w-[23rem] items-center justify-center [perspective:900px] sm:h-[31rem] sm:w-[31rem]"
      animate={entering ? { scale: 1.08, opacity: 1 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      aria-label="Digital Consciousness Core animation"
    >
      <div
        className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_35%_20%,rgb(255_255_255_/_0.14),transparent_18%),radial-gradient(circle_at_65%_70%,rgb(255_255_255_/_0.08),transparent_22%)] blur-3xl"
        aria-hidden="true"
      />

      {webglReady ? (
        <DigitalCore3D entering={entering} reduceMotion={Boolean(reduceMotion)} />
      ) : (
        <DigitalCoreFallback entering={entering} />
      )}

      <div className="absolute bottom-8 border border-white/12 bg-black/55 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-zinc-300 backdrop-blur">
        Digital Consciousness Core
      </div>
    </motion.div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SimulationEntryButton({
  onEnter,
  disabled = false,
}: {
  onEnter: () => void;
  disabled?: boolean;
}) {
  const router = useRouter();

  function handleEnter() {
    if (disabled) return;

    onEnter();
    window.setTimeout(() => {
      router.push("/command-center");
    }, 1050);
  }

  return (
    <button
      type="button"
      onClick={handleEnter}
      disabled={disabled}
      aria-disabled={disabled}
      className={buttonVariants({
        size: "lg",
        className:
          "min-w-64 font-mono uppercase tracking-[0.12em] disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-zinc-600 disabled:shadow-none",
      })}
    >
      {disabled ? "Awaiting System Ready" : "Enter Command Center"}
      <motion.span
        animate={disabled ? { x: 0, opacity: 0.45 } : { x: [0, 4, 0], opacity: 1 }}
        transition={disabled ? { duration: 0.2 } : { duration: 1.55, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ArrowRight className="h-4 w-4" />
      </motion.span>
    </button>
  );
}

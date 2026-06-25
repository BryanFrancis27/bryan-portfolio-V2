"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import bryanOsLogo from "@/assets/Portfolio-v2-logo.png";
import { BootSequence } from "@/components/simulation/BootSequence";
import { DigitalConsciousnessCore } from "@/components/landing/DigitalConsciousnessCore";
import { FloatingNavigation } from "@/components/layout/FloatingNavigation";
import { SimulationEntryButton } from "@/components/simulation/SimulationEntryButton";
import { SystemBackground } from "@/components/shared/SystemBackground";
import { useCallback, useState } from "react";

export function SimulationLanding() {
  const [entering, setEntering] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const handleBootComplete = useCallback(() => setIsReady(true), []);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden bg-background px-4 pb-24 pt-5 text-foreground sm:px-6 lg:px-8 lg:pb-5">
      <SystemBackground />
      <FloatingNavigation />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.026] to-transparent"
          animate={{ y: ["-46%", "126%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-x-10 top-24 h-px glyph-line opacity-30" />
        <div className="absolute inset-x-20 bottom-16 h-px glyph-line opacity-20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[112rem] flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.08] py-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label="BryanOS home"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/[0.035] shadow-metal-glow transition duration-300">
              <Image
                src={bryanOsLogo}
                alt=""
                className="h-full w-full object-cover"
                sizes="48px"
                priority
                aria-hidden="true"
              />
            </span>
          </Link>
          <span className="border-l border-white/18 pl-3 font-mono text-xs uppercase tracking-[0.16em] text-white">
            {isReady ? "Active" : "Waking"}
          </span>
        </header>

        <section className="grid min-w-0 flex-1 items-center gap-10 py-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] 2xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="min-w-0 space-y-6 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted-foreground">
                System Activation Sequence
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
                BryanOS
              </h1>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.22em] text-zinc-300">
                Artificial Intelligence Operating System
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                Software Engineer, Full Stack Developer, Product Builder, and AI-powered Product Workflows
              </p>
            </motion.div>

            <BootSequence onComplete={handleBootComplete} />

            <div className="flex flex-wrap items-center gap-3">
              <SimulationEntryButton onEnter={() => setEntering(true)} disabled={!isReady || entering} />
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {isReady ? "Command center ready" : "Awaiting core synchronization"}
              </span>
            </div>
          </div>

          <div className="relative flex min-w-0 flex-col items-center overflow-visible">
            <DigitalConsciousnessCore entering={entering} />
            <div className="mx-auto grid w-full max-w-md gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-2">
              <span className="border-t border-white/[0.09] bg-white/[0.018] px-3 py-2">
                Core Sync: Stable <span className="ml-2 text-emerald-300/80">&bull;</span>
              </span>
              <span className="border-t border-white/[0.09] bg-white/[0.018] px-3 py-2">
                Access: Verified <span className="ml-2 text-emerald-300/80">&bull;</span>
              </span>
            </div>
          </div>
        </section>
      </div>

      {entering ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="h-72 w-72 border border-white/25 bg-white/[0.08] [clip-path:polygon(50%_0%,86%_18%,100%_50%,86%_82%,50%_100%,14%_82%,0_50%,14%_18%)]"
            initial={{ scale: 0.35, opacity: 0.48, rotate: 0 }}
            animate={{ scale: 4.4, opacity: 0, rotate: 32 }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute h-px w-2/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <p className="absolute font-mono text-sm uppercase tracking-[0.2em] text-white">
            OPENING COMMAND CENTER...
          </p>
        </motion.div>
      ) : null}
    </main>
  );
}

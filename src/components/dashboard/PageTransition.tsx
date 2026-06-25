"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { getNavigationDirection, type NavigationDirection } from "@/data/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();
  const direction = useMemo(
    () => getNavigationDirection(previousPathname.current, pathname),
    [pathname],
  );

  useEffect(() => {
    previousPathname.current = pathname;
  }, [pathname]);

  const variants = reduceMotion ? reducedMotionVariants : directionalVariants;

  return (
    <div className="relative w-full min-w-0 overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reduceMotion ? 0.08 : 0.34,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full min-w-0 will-change-transform"
          style={{ backfaceVisibility: "hidden" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const horizontalOffset: Record<NavigationDirection, number> = {
  forward: 32,
  backward: -32,
  neutral: 0,
};

const directionalVariants: Variants = {
  enter: (direction: NavigationDirection) => ({
    opacity: direction === "neutral" ? 0 : 0.72,
    x: horizontalOffset[direction],
    filter: direction === "neutral" ? "blur(4px)" : "blur(2px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: NavigationDirection) => ({
    opacity: direction === "neutral" ? 0 : 0.72,
    x: -horizontalOffset[direction],
    filter: direction === "neutral" ? "blur(4px)" : "blur(2px)",
  }),
};

const reducedMotionVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

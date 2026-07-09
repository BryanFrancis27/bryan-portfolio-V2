"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? reducedMotionVariants : directionalVariants;

  return (
    <div className="relative w-full min-w-0 overflow-x-clip">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            scale: { duration: reduceMotion ? 0.08 : 0.68, delay: reduceMotion ? 0 : 0.1, ease: [0.32, 0, 0.2, 1] },
            y: { duration: reduceMotion ? 0.08 : 0.68, delay: reduceMotion ? 0 : 0.1, ease: [0.32, 0, 0.2, 1] },
            opacity: { duration: reduceMotion ? 0.08 : 0.46, delay: reduceMotion ? 0 : 0.1, ease: "easeIn" },
          }}
          className="w-full min-w-0 transform-gpu [will-change:transform,opacity]"
          style={{ backfaceVisibility: "hidden", transformOrigin: "50% 0%" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const directionalVariants: Variants = {
  enter: {
    opacity: 0.84,
    scale: 0.975,
    y: 10,
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 1.012,
    y: -6,
  },
};

const reducedMotionVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

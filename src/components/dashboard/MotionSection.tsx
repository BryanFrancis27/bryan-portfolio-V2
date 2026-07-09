"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MotionSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.08 : 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

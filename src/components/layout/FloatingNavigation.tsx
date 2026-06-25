"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function FloatingNavigation() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-3 bottom-3 z-40 flex justify-center lg:inset-x-auto lg:bottom-auto lg:left-5 lg:top-1/2 lg:-translate-y-1/2"
    >
      <div className="alien-panel flex max-w-full gap-1 overflow-visible rounded-lg border border-white/[0.09] bg-background/72 p-1.5 shadow-metal-glow backdrop-blur-xl lg:flex-col">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-transparent text-muted-foreground transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.045] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:h-12 lg:w-12",
                isActive &&
                  "border-white/18 bg-white/[0.065] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.05)]",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="floating-nav-active"
                  className="absolute bottom-1 left-2 right-2 h-0.5 rounded-full bg-white lg:bottom-2 lg:left-1 lg:right-auto lg:top-2 lg:h-auto lg:w-0.5"
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  aria-hidden="true"
                />
              ) : null}
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/[0.1] bg-background/92 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white opacity-0 shadow-metal-glow backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:bottom-auto lg:left-full lg:mb-0 lg:ml-3 lg:translate-x-0">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>,
    document.body,
  );
}

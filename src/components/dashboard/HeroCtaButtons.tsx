"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroCta = {
  label: string;
  loadingLabel: string;
  href: string;
  variant?: "default" | "outline";
  icon: typeof ArrowRight;
};

const heroCtas: HeroCta[] = [
  {
    label: "Inspect Systems",
    loadingLabel: "Opening Systems",
    href: "/systems",
    icon: ArrowRight,
  },
  {
    label: "Open Contact Channel",
    loadingLabel: "Opening Channel",
    href: "/contact",
    variant: "outline",
    icon: Mail,
  },
];

export function HeroCtaButtons() {
  const router = useRouter();
  const [loadingHref, setLoadingHref] = useState<string | null>(null);

  function handleNavigate(href: string) {
    if (loadingHref) return;

    setLoadingHref(href);
    window.setTimeout(() => {
      router.push(href);
    }, 620);
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3" aria-busy={loadingHref ? "true" : undefined}>
      {heroCtas.map((cta) => {
        const Icon = cta.icon;
        const isLoading = loadingHref === cta.href;
        const isDisabled = Boolean(loadingHref);

        return (
          <button
            key={cta.href}
            type="button"
            onClick={() => handleNavigate(cta.href)}
            disabled={isDisabled}
            aria-label={isLoading ? cta.loadingLabel : cta.label}
            className={cn(
              buttonVariants({ variant: cta.variant, size: "lg" }),
              "relative min-w-[13.75rem] overflow-hidden font-mono uppercase tracking-[0.1em] disabled:opacity-100",
              isDisabled && !isLoading && "opacity-55",
            )}
          >
            {isLoading ? (
              <motion.span
                className="absolute inset-y-0 left-0 w-1/2 bg-white/16"
                initial={{ x: "-100%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 0.72, ease: "easeInOut" }}
                aria-hidden="true"
              />
            ) : null}
            <span className="relative z-10 inline-flex min-w-0 items-center gap-2">
              <span>{isLoading ? cta.loadingLabel : cta.label}</span>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

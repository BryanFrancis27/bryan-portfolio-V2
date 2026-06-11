"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Contact, Gauge, History, Layers3, UserRoundCog } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Command Center", href: "/command-center", icon: Gauge },
  { label: "System Registry", href: "/systems", icon: Layers3 },
  { label: "Foundation Timeline", href: "/timeline", icon: History },
  { label: "Experience Matrix", href: "/experience", icon: UserRoundCog },
  { label: "Contact Channel", href: "/contact", icon: Contact },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      className="-mx-1 flex min-w-0 gap-1.5 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      aria-label="Primary navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-transparent px-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground transition duration-300 hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive && "border-white/18 bg-white/[0.055] text-white shadow-[inset_0_-1px_0_rgb(255_255_255_/_0.34)]",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

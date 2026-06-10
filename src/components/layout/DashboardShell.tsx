import Link from "next/link";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { SystemBackground } from "@/components/shared/SystemBackground";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <SystemBackground />
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link
            href="/command-center"
            className="group flex items-center gap-3"
            aria-label="BryanOS Command Center"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/16 bg-white/[0.035] font-mono text-xs font-semibold text-white shadow-metal-glow">
              BOS
            </span>
            <div>
              <p className="font-semibold text-white">BryanOS</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                AI Operating System
              </p>
            </div>
          </Link>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="hidden items-center gap-2 border-l border-white/14 pl-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 sm:flex">
              <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
              BryanOS Active
            </div>
            <DashboardNav />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

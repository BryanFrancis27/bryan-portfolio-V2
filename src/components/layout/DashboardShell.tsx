import Image from "next/image";
import Link from "next/link";
import bryanOsLogo from "@/assets/Portfolio-v2-logo.png";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { SystemBackground } from "@/components/shared/SystemBackground";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SystemBackground />
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[112rem] flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between xl:px-10 2xl:px-12">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label="BryanOS home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/16 bg-white/[0.035] shadow-metal-glow transition duration-300 group-hover:border-white/30">
              <Image
                src={bryanOsLogo}
                alt=""
                className="h-full w-full object-cover"
                sizes="40px"
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-white transition duration-300 group-hover:text-zinc-200">BryanOS</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                AI Operating System
              </p>
            </div>
          </Link>
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
            <div className="hidden items-center gap-2 border-l border-white/14 pl-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 sm:flex">
              <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
              BryanOS Active
            </div>
            <DashboardNav />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[112rem] min-w-0 px-4 py-6 sm:px-6 sm:py-8 xl:px-10 2xl:px-12">
        {children}
      </main>
    </div>
  );
}

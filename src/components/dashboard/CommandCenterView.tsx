import Link from "next/link";
import { RadioTower, ShieldCheck } from "lucide-react";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { CommandCenterCard } from "@/components/dashboard/CommandCenterCard";
import { HeroCtaButtons } from "@/components/dashboard/HeroCtaButtons";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MotionSection } from "@/components/dashboard/MotionSection";
import { SystemStatusBadge } from "@/components/dashboard/SystemStatusBadge";
import { activityPoints, currentFocus, metrics, recentActivity } from "@/data/metrics";
import { systems } from "@/data/systems";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "System Registry", href: "/systems", description: "BryanOS and LunarLedger files" },
  { label: "Foundation Timeline", href: "/timeline", description: "Education and training path" },
  { label: "Experience Matrix", href: "/experience", description: "Professional operating history" },
  { label: "Contact Channel", href: "/contact", description: "Verified communication links" },
];

export function CommandCenterView() {
  return (
    <div className="w-full min-w-0 space-y-8">
      <MotionSection className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)] 2xl:grid-cols-[minmax(0,1.6fr)_minmax(24rem,0.4fr)]">
        <section className="scan-line alien-panel min-w-0 rounded-lg border border-white/[0.08] p-6 backdrop-blur md:p-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <SystemStatusBadge status="ACTIVE" />
            <span className="border-l border-white/16 pl-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
              Operational Intelligence Interface
            </span>
          </div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            BryanOS Command Center
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
            Bryan Encarnacion
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
            Operational Intelligence Interface
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Software Engineer
          </p>
          <HeroCtaButtons />
        </section>

        <aside className="alien-panel min-w-0 rounded-lg border border-white/[0.08] p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                System Status
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">System Status</h2>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/14 bg-white/[0.035] text-white">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {systems.map((system) => (
              <div
                key={system.name}
                className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-white/[0.018] px-1 py-3"
              >
                <div className="min-w-0">
                  <span className="font-medium text-white">{system.name}</span>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {system.name === "LunarLedger" ? "Personal project" : "Artificial operating system"}
                  </p>
                </div>
                <SystemStatusBadge status={system.status} />
              </div>
            ))}
          </div>
        </aside>
      </MotionSection>

      <section className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] 2xl:grid-cols-[minmax(24rem,0.75fr)_minmax(0,1.25fr)]">
        <CommandCenterCard label="Active Build Cycle" title="Current Focus">
          <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
            {currentFocus.map((item) => (
              <li key={item} className="flex gap-3">
                <RadioTower className="mt-1 h-4 w-4 shrink-0 text-zinc-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CommandCenterCard>

        <CommandCenterCard label="Signal Activity" title="Recent Signals">
          <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {recentActivity.map((item) => (
                <li key={item} className="border-l border-white/[0.12] bg-white/[0.018] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
            <ActivityChart data={activityPoints} />
          </div>
        </CommandCenterCard>
      </section>

      <section className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "alien-panel rounded-lg border border-white/[0.08] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/20",
            )}
          >
            <p className="font-semibold text-white">{link.label}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

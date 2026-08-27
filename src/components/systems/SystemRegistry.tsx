"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eye, MonitorOff } from "lucide-react";
import { useRef, useState } from "react";
import { SystemStatusBadge } from "@/components/dashboard/SystemStatusBadge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { System } from "@/types/dashboard";

interface SystemRegistryProps {
  systems: System[];
}

export function SystemRegistry({ systems }: SystemRegistryProps) {
  const [selectedId, setSelectedId] = useState(systems[0]?.id ?? "");
  const viewerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  if (systems.length === 0) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        No personal systems are currently registered.
      </Card>
    );
  }

  const selectedSystem = systems.find((system) => system.id === selectedId) ?? systems[0];

  function selectSystem(id: string) {
    if (id === selectedSystem.id) {
      return;
    }

    viewerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    setSelectedId(id);
  }

  return (
    <section
      className="grid min-w-0 gap-4 desktop-tall:h-[calc(100svh-17.75rem)] desktop-tall:grid-cols-[minmax(13rem,0.28fr)_minmax(0,0.72fr)] desktop-tall:gap-6"
      aria-label="Personal project catalog"
    >
      <aside className="min-w-0 desktop-tall:h-full" aria-label="Project Catalog">
        <Card className="flex h-full min-w-0 flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">
                Project Catalog
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {systems.length.toString().padStart(2, "0")} registered systems
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-zinc-200" aria-hidden="true" />
          </div>

          <div className="flex min-w-0 gap-2 overflow-x-auto p-2 [scrollbar-width:thin] desktop-tall:flex-1 desktop-tall:flex-col desktop-tall:overflow-x-hidden desktop-tall:overflow-y-auto">
            {systems.map((system, index) => {
              const isSelected = system.id === selectedSystem.id;

              return (
                <button
                  key={system.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectSystem(system.id)}
                  className={cn(
                    "group relative min-h-20 w-[min(17rem,78vw)] shrink-0 snap-start rounded-md border px-4 py-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background desktop-tall:min-h-0 desktop-tall:w-full",
                    isSelected
                      ? "border-white/24 bg-white/[0.075] text-white"
                      : "border-white/[0.06] bg-white/[0.018] text-zinc-400 hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-zinc-200",
                  )}
                >
                  <span
                    className={cn(
                      "absolute bottom-3 left-0 top-3 w-px transition-colors",
                      isSelected ? "bg-white" : "bg-transparent group-hover:bg-white/20",
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-[0.62rem] tracking-[0.12em] text-zinc-600">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-current">{system.name}</span>
                      <span className="mt-1 block text-xs leading-5 text-zinc-500 group-hover:text-zinc-400">
                        {system.type}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </aside>

      <Card
        ref={viewerRef}
        className="min-w-0 overflow-hidden desktop-tall:h-full desktop-tall:overflow-y-auto desktop-tall:[scrollbar-width:thin]"
        aria-label={`${selectedSystem.name} Registry Viewer`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.article
            key={selectedSystem.id}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0.72, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0"
          >
            <ProjectPreview system={selectedSystem} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-7">
              <header className="flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Registry Viewer / {selectedSystem.id}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    {selectedSystem.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{selectedSystem.type}</p>
                </div>

                {selectedSystem.projectUrl ? (
                  <a
                    href={selectedSystem.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${selectedSystem.name} project`}
                    className={cn(buttonVariants({ variant: "outline" }), "min-h-11 shrink-0")}
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    View Project
                  </a>
                ) : null}
              </header>

              <section className="grid gap-4 border-b border-white/[0.07] pb-6 md:grid-cols-[minmax(10rem,0.3fr)_minmax(0,0.7fr)]">
                <RegistryField label="Status">
                  <SystemStatusBadge status={selectedSystem.status} />
                </RegistryField>
                <RegistryField label="Purpose">
                  <p className="text-sm leading-6 text-zinc-300">{selectedSystem.purpose}</p>
                </RegistryField>
              </section>

              <RegistrySection title="Description">
                <p className="max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {selectedSystem.description}
                </p>
              </RegistrySection>

              <RegistrySection title="Stack">
                <div className="flex flex-wrap gap-2">
                  {selectedSystem.stack.map((tool) => (
                    <Badge key={tool} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </RegistrySection>

              <RegistrySection title="Signals">
                <div className="grid gap-5 xl:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-zinc-500">
                      Engineering Signal
                    </p>
                    <SignalList items={selectedSystem.signals} />
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-zinc-500">
                      Operational Scope
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSystem.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </RegistrySection>

              <RegistrySection title="Key Contributions" className="pb-2">
                <SignalList items={selectedSystem.contributions} subdued />
              </RegistrySection>
            </div>
          </motion.article>
        </AnimatePresence>
      </Card>
    </section>
  );
}

function ProjectPreview({ system }: { system: System }) {
  return (
    <div className="border-b border-white/[0.07] bg-black/35 p-3 sm:p-4">
      <div className="overflow-hidden rounded-md border border-white/[0.09] bg-[#050505]">
        <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] px-3" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
          <span className="ml-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-zinc-600">
            Visual feed
          </span>
        </div>

        {system.image && system.imageAlt ? (
          <div className="relative aspect-video w-full bg-zinc-950">
            <Image
              src={system.image}
              alt={system.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="dashboard-grid flex aspect-video min-h-48 w-full flex-col items-center justify-center px-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-md border border-white/[0.1] bg-white/[0.025] text-zinc-500">
              <MonitorOff className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
              Preview feed unavailable
            </p>
            <p className="mt-2 max-w-md text-xs leading-5 text-zinc-600">
              No registered screenshot is available for {system.name}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function RegistryField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      {children}
    </div>
  );
}

function RegistrySection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-white/[0.07] pb-6", className)}>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
        {title}
      </h3>
      {children}
    </section>
  );
}

function SignalList({ items, subdued = false }: { items: string[]; subdued?: boolean }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={cn("mt-3 h-px w-4 shrink-0", subdued ? "bg-zinc-600" : "bg-zinc-300")}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

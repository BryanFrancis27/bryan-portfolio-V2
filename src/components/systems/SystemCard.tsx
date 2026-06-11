import { ServerCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemStatusBadge } from "@/components/dashboard/SystemStatusBadge";
import type { System } from "@/types/dashboard";

export function SystemCard({ system }: { system: System }) {
  return (
    <Card className="scan-line h-full transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-white/14 bg-white/[0.035] text-white">
              <ServerCog className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              [ {system.name} ]
            </p>
            <CardTitle className="text-xl text-white">{system.type}</CardTitle>
          </div>
          <SystemStatusBadge status={system.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 border-y border-white/[0.06] py-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:grid-cols-2">
          <div>
            <p className="text-zinc-500">Status</p>
            <p className="mt-1 text-zinc-200">{system.status}</p>
          </div>
          <div>
            <p className="text-zinc-500">Purpose</p>
            <p className="mt-1 normal-case leading-5 tracking-normal text-zinc-300">{system.purpose}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{system.description}</p>
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {system.stack.map((tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            Signals
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {system.signals.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-px w-4 shrink-0 bg-zinc-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {system.highlights.map((tool) => (
            <Badge key={tool} variant="secondary">
              {tool}
            </Badge>
          ))}
        </div>
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            Key Contributions
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {system.contributions.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-px w-4 shrink-0 bg-zinc-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

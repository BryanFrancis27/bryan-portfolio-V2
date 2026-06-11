import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Metric } from "@/types/dashboard";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card className="transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
      <CardHeader className="pb-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {metric.label}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex min-w-0 flex-wrap items-end justify-between gap-4">
          <p className="font-mono text-4xl font-semibold text-white">{metric.value}</p>
          <span className="border-l border-white/16 pl-2 font-mono text-xs text-zinc-300">
            {metric.trend}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{metric.detail}</p>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function LoadingPanel({ label = "Loading Route" }: { label?: string }) {
  return (
    <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]">
      <Card className="scan-line">
        <CardHeader className="border-b border-white/[0.06]">
          <div className="h-3 w-36 rounded bg-white/10" />
          <div className="h-8 w-2/3 rounded bg-white/10" />
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-3/4 rounded bg-white/10" />
          <div className="grid min-w-0 gap-3 pt-4 sm:grid-cols-3">
            <div className="h-20 border border-white/[0.08] bg-white/[0.018]" />
            <div className="h-20 border border-white/[0.08] bg-white/[0.018]" />
            <div className="h-20 border border-white/[0.08] bg-white/[0.018]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            {label}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-px w-5 bg-white" aria-hidden="true" />
            Module synchronization in progress
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-12 border border-white/[0.08] bg-white/[0.018]" />
          <div className="h-12 border border-white/[0.08] bg-white/[0.018]" />
          <div className="h-12 border border-white/[0.08] bg-white/[0.018]" />
        </CardContent>
      </Card>
    </section>
  );
}

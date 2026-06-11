import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TimelineEvent as TimelineEventType } from "@/types/dashboard";

export function TimelineEvent({ event }: { event: TimelineEventType }) {
  return (
    <article className="relative min-w-0 pl-8">
      <span className="absolute left-0 top-2 h-3 w-3 border border-white/45 bg-background shadow-metal-glow" />
      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default" className="font-mono tracking-[0.14em]">
              {event.period}
            </Badge>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{event.label}</p>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-white">{event.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{event.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.signals.map((signal) => (
              <Badge key={signal} variant="secondary">
                {signal}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

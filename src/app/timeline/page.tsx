import { DashboardShell } from "@/components/layout/DashboardShell";
import { TimelineEvent } from "@/components/timeline/TimelineEvent";
import { timelineEvents } from "@/data/timeline";

export default function TimelinePage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <section className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
            Foundation Timeline
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">How Bryan Was Built</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Education, applied training, and technical milestones that formed Bryan&apos;s full-stack product direction.
          </p>
        </section>
        <section className="relative space-y-6 before:absolute before:left-1.5 before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-white/30 before:via-white/10 before:to-transparent">
          {timelineEvents.map((event) => (
            <TimelineEvent key={`${event.period}-${event.title}`} event={event} />
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}

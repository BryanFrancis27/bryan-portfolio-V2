import { FoundationHelixTimeline } from "@/components/timeline/FoundationHelixTimeline";
import { timelineEvents } from "@/data/timeline";

export default function TimelinePage() {
  return (
    <div className="w-full min-w-0 space-y-8">
      <section className="max-w-5xl">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
          Foundation Timeline
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">How Bryan Was Built</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Education, applied training, and technical milestones that formed Bryan&apos;s full-stack product direction.
        </p>
      </section>
      <FoundationHelixTimeline events={timelineEvents} />
    </div>
  );
}

import { FoundationHelixTimeline } from "@/components/timeline/FoundationHelixTimeline";
import { timelineEvents } from "@/data/timeline";

export default function TimelinePage() {
  return (
    <div className="w-full min-w-0">
      <section className="flex min-h-[calc(100svh-7.5rem)] max-w-5xl flex-col justify-center pb-16">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
            Foundation Timeline
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">How Bryan Was Built</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            Education, applied training, and technical milestones that formed Bryan&apos;s full-stack product direction.
          </p>
        </div>
        <div
          className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500"
          aria-hidden="true"
        >
          <span className="h-px w-12 bg-white/18" />
          <span>Scroll to formation sequence</span>
        </div>
      </section>
      <FoundationHelixTimeline events={timelineEvents} />
    </div>
  );
}

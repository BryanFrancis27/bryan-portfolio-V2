"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  createHelixAnchors,
  createHelixPath,
  createHelixRungs,
} from "@/lib/helix-path";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types/dashboard";

const HELIX_WIDTH = 320;
const ROW_HEIGHT = 330;
const HELIX_SAMPLES = 96;

export function FoundationHelixTimeline({ events }: { events: TimelineEvent[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 35%"],
  });
  const activePathLength = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(Math.max(latest, 0), 1);
    const nextIndex = Math.round(clamped * Math.max(events.length - 1, 0));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const geometry = useMemo(() => {
    const height = events.length * ROW_HEIGHT;
    const cycles = Math.max(events.length - 1, 1) * 0.72;
    const base = {
      width: HELIX_WIDTH,
      height,
      amplitude: 58,
      cycles,
      samples: HELIX_SAMPLES,
      phase: -Math.PI / 2,
    };

    return {
      height,
      primary: createHelixPath(base),
      secondary: createHelixPath({ ...base, phase: base.phase + Math.PI }),
      rungs: createHelixRungs(base, events.length * 5),
      anchors: createHelixAnchors(
        events.map((event) => event.id),
        base,
      ),
    };
  }, [events]);

  const progressPathLength = reduceMotion ? 1 : activePathLength;

  return (
    <section
      ref={sectionRef}
      className="relative isolate max-w-7xl overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.012] px-3 py-8 shadow-dashboard-card sm:px-5 md:px-6 lg:px-8"
      aria-label="Foundation timeline formation sequence"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        aria-hidden="true"
      >
        <div className="absolute inset-0 dashboard-grid opacity-45" />
        <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />
        <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative">
        <HelixSvg
          anchors={geometry.anchors}
          activeIndex={activeIndex}
          height={geometry.height}
          primaryPath={geometry.primary.path}
          progressPathLength={progressPathLength}
          rungs={geometry.rungs}
          secondaryPath={geometry.secondary.path}
        />

        <ol className="relative z-10 space-y-8 md:space-y-0">
          {events.map((event, index) => (
            <TimelineMilestone
              event={event}
              index={index}
              isActive={index === activeIndex}
              isComplete={index < activeIndex}
              key={event.id}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function HelixSvg({
  anchors,
  activeIndex,
  height,
  primaryPath,
  progressPathLength,
  rungs,
  secondaryPath,
}: {
  anchors: ReturnType<typeof createHelixAnchors>;
  activeIndex: number;
  height: number;
  primaryPath: string;
  progressPathLength: number | MotionValue<number>;
  rungs: ReturnType<typeof createHelixRungs>;
  secondaryPath: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-1 top-0 h-full w-16 overflow-visible md:left-1/2 md:w-56 md:-translate-x-1/2 lg:w-64"
      preserveAspectRatio="none"
      viewBox={`0 0 ${HELIX_WIDTH} ${height}`}
    >
      <defs>
        <linearGradient id="helix-active" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0.35" />
          <stop offset="52%" stopColor="rgb(167 139 250)" stopOpacity="0.88" />
          <stop offset="100%" stopColor="rgb(96 165 250)" stopOpacity="0.58" />
        </linearGradient>
      </defs>

      {rungs.map((rung, index) => (
        <line
          key={rung.id}
          x1={rung.start.x}
          x2={rung.end.x}
          y1={rung.start.y}
          y2={rung.end.y}
          className={cn(
            "stroke-white/10",
            index % 3 === 0 ? "stroke-white/16" : "stroke-white/8",
          )}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <path
        d={secondaryPath}
        fill="none"
        className="stroke-white/14"
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={primaryPath}
        fill="none"
        className="stroke-white/24"
        strokeLinecap="round"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={primaryPath}
        fill="none"
        stroke="url(#helix-active)"
        strokeLinecap="round"
        strokeWidth="4"
        style={{ pathLength: progressPathLength }}
        vectorEffect="non-scaling-stroke"
      />

      {anchors.map((anchor, index) => {
        const isActive = index === activeIndex;
        const isComplete = index < activeIndex;

        return (
          <g key={anchor.id} transform={`translate(${anchor.x} ${anchor.y})`}>
            <circle
              r="18"
              className={cn(
                "fill-background stroke-white/18 transition-colors duration-300",
                isComplete && "stroke-white/32",
                isActive && "fill-white/10 stroke-violet-200/80",
              )}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              r={isActive ? "5.5" : "4"}
              className={cn(
                "fill-zinc-400 transition-all duration-300",
                isComplete && "fill-zinc-200",
                isActive && "fill-white",
              )}
            />
            <path
              d="M -10 0 H 10 M 0 -10 V 10"
              className={cn("stroke-white/18", isActive && "stroke-violet-100/70")}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

function TimelineMilestone({
  event,
  index,
  isActive,
  isComplete,
  reduceMotion,
}: {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
  isComplete: boolean;
  reduceMotion: boolean | null;
}) {
  const isLeft = index % 2 === 0;

  return (
    <li
      className="relative grid min-h-[21rem] grid-cols-[3.25rem_minmax(0,1fr)] items-center md:grid-cols-[minmax(0,1fr)_minmax(8rem,15rem)_minmax(0,1fr)]"
      aria-current={isActive ? "step" : undefined}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-7 top-1/2 h-px w-7 origin-left bg-gradient-to-r from-white/35 to-transparent transition duration-500 md:left-auto md:w-[calc(50%-7rem)]",
          isActive && "from-violet-200/90 shadow-metal-glow",
          isComplete && "from-white/55",
          isLeft
            ? "md:right-1/2 md:mr-12 md:origin-right md:bg-gradient-to-l"
            : "md:left-1/2 md:ml-12 md:origin-left md:bg-gradient-to-r",
        )}
      />

      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 18, x: isLeft ? -18 : 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={cn(
          "col-start-2 min-w-0 md:col-start-3",
          isLeft && "md:col-start-1",
        )}
      >
        <Card
          className={cn(
            "transition duration-500 focus-within:border-white/28 hover:border-white/20",
            isActive && "border-violet-200/35 bg-white/[0.045] shadow-metal-glow",
            isComplete && !isActive && "border-white/[0.12]",
          )}
        >
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="default" className="font-mono tracking-[0.14em]">
                {event.period}
              </Badge>
              <Badge variant="secondary" className="font-mono tracking-[0.14em]">
                {event.sequence}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
                {event.category} / {event.status}
              </p>
              <h2 className="text-xl font-semibold leading-tight text-white">{event.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{event.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {event.signals.map((signal, signalIndex) => (
                <motion.div
                  key={signal}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: signalIndex * 0.04,
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                >
                  <Badge variant="secondary">{signal}</Badge>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-zinc-500">
              <span className={cn("h-px w-8 bg-white/18", isActive && "bg-violet-200/70")} />
              <span>{event.label}</span>
            </div>
          </CardContent>
        </Card>
      </motion.article>
    </li>
  );
}

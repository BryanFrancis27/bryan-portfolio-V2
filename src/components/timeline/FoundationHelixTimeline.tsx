"use client";

import type { CSSProperties } from "react";
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
  createHelixPathThroughAnchors,
  createHelixPath,
  createHelixRungs,
} from "@/lib/helix-path";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types/dashboard";

const HELIX_WIDTH = 320;
const ROW_HEIGHT = 480;
const HELIX_SAMPLES = 112;
const HELIX_VERTICAL_PADDING = 80;

export function FoundationHelixTimeline({ events }: { events: TimelineEvent[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 62%", "end 38%"],
  });
  const activePathLength = useTransform(scrollYProgress, [0, 0.88], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(Math.max(latest, 0), 1);
    const nextIndex =
      clamped < 0.04 ? -1 : Math.min(events.length - 1, Math.floor(clamped * events.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const geometry = useMemo(() => {
    const rowHeight = ROW_HEIGHT;
    const height = events.length * rowHeight;
    const cycles = Math.max(events.length / 2, 1);
    const samples = Math.max(events.length * 32 + 1, HELIX_SAMPLES);
    const base = {
      width: HELIX_WIDTH,
      height,
      amplitude: 72,
      cycles,
      samples,
      phase: -Math.PI,
    };

    const anchors = createHelixAnchors(
      events.map((event) => event.id),
      base,
    );

    return {
      height,
      totalHeight: height + HELIX_VERTICAL_PADDING * 2,
      primaryPath: createHelixPathThroughAnchors({
        anchors,
        width: HELIX_WIDTH,
        topPadding: HELIX_VERTICAL_PADDING,
        bottomPadding: 0,
      }),
      secondary: createHelixPath({ ...base, phase: base.phase + Math.PI }),
      rungs: createHelixRungs(base, events.length * 5),
      anchors,
    };
  }, [events]);

  const progressPathLength = reduceMotion ? 1 : activePathLength;

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-visible pb-32 pt-4 md:pb-40 md:pt-8"
      aria-label="Foundation timeline formation sequence"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-7 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent md:left-1/2" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative">
        <HelixSvg
          anchors={geometry.anchors}
          activeIndex={activeIndex}
          height={geometry.height}
          primaryPath={geometry.primaryPath}
          progressPathLength={progressPathLength}
          rungs={geometry.rungs}
          secondaryPath={geometry.secondary.path}
          totalHeight={geometry.totalHeight}
        />

        <ol
          className="relative z-10 space-y-0"
          style={{ "--timeline-row-height": `${ROW_HEIGHT}px` } as CSSProperties}
        >
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
  totalHeight,
}: {
  anchors: ReturnType<typeof createHelixAnchors>;
  activeIndex: number;
  height: number;
  primaryPath: string;
  progressPathLength: number | MotionValue<number>;
  rungs: ReturnType<typeof createHelixRungs>;
  secondaryPath: string;
  totalHeight: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-1 top-0 w-16 overflow-visible md:left-1/2 md:w-72 md:-translate-x-1/2 lg:w-80 xl:w-96"
      preserveAspectRatio="none"
      style={{
        height: totalHeight,
        top: -HELIX_VERTICAL_PADDING,
      }}
      viewBox={`0 ${-HELIX_VERTICAL_PADDING} ${HELIX_WIDTH} ${totalHeight}`}
    >
      <defs>
        <linearGradient id="helix-active" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(244 244 245)" stopOpacity="0.28" />
          <stop offset="52%" stopColor="rgb(255 255 255)" stopOpacity="0.82" />
          <stop offset="100%" stopColor="rgb(161 161 170)" stopOpacity="0.45" />
        </linearGradient>
        <filter id="helix-active-glow" x="-40%" y="-10%" width="180%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.94 0 1 0 0 0.94 0 0 1 0 0.96 0 0 0 0.45 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
        className="stroke-white/55"
        strokeLinecap="round"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={primaryPath}
        fill="none"
        stroke="url(#helix-active)"
        strokeLinecap="round"
        strokeWidth="4"
        filter="url(#helix-active-glow)"
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
                isActive && "fill-white/10 stroke-white/80",
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
              className={cn("stroke-white/18", isActive && "stroke-white/70")}
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
      className="relative grid min-h-[var(--timeline-row-height)] grid-cols-[3.25rem_minmax(0,1fr)] items-center md:grid-cols-[minmax(0,1fr)_minmax(8rem,16rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(10rem,18rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(12rem,20rem)_minmax(0,1fr)]"
      aria-current={isActive ? "step" : undefined}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-7 top-1/2 h-px w-7 origin-left bg-gradient-to-r from-white/35 to-transparent transition duration-500 md:left-auto md:w-[calc(50%-8rem)] xl:w-[calc(50%-10rem)]",
          isActive && "from-white/85 shadow-metal-glow",
          isComplete && "from-white/55",
          isLeft
            ? "md:right-1/2 md:mr-14 md:origin-right md:bg-gradient-to-l xl:mr-20"
            : "md:left-1/2 md:ml-14 md:origin-left md:bg-gradient-to-r xl:ml-20",
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
            isActive && "border-white/35 bg-white/[0.045] shadow-metal-glow",
            isComplete && !isActive && "border-white/[0.12]",
          )}
        >
          <CardContent className="space-y-3 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="default" className="font-mono tracking-[0.14em]">
                {event.period}
              </Badge>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-zinc-500">
                {event.label}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                {event.title}
              </h2>
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

            <span className={cn("block h-px w-8 bg-white/18", isActive && "bg-white/70")} />
          </CardContent>
        </Card>
      </motion.article>
    </li>
  );
}

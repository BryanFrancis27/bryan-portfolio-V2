export interface HelixPathOptions {
  width: number;
  height: number;
  amplitude: number;
  cycles: number;
  samples: number;
  phase?: number;
}

export interface HelixPoint {
  x: number;
  y: number;
  depth: number;
}

export interface HelixRung {
  id: string;
  start: HelixPoint;
  end: HelixPoint;
}

export interface HelixAnchor {
  id: string;
  x: number;
  y: number;
  depth: number;
  side: "left" | "right";
}

export interface HelixAnchorPathOptions {
  anchors: HelixAnchor[];
  width: number;
  topPadding: number;
  bottomPadding: number;
}

function getHelixPoint(
  index: number,
  options: Required<HelixPathOptions>,
): HelixPoint {
  const progress = index / Math.max(options.samples - 1, 1);
  return getHelixPointAtProgress(progress, options);
}

function getHelixPointAtProgress(
  progress: number,
  options: Required<HelixPathOptions>,
): HelixPoint {
  const angle = progress * options.cycles * Math.PI * 2 + options.phase;
  const centerX = options.width / 2;

  return {
    x: centerX + Math.sin(angle) * options.amplitude,
    y: progress * options.height,
    depth: Math.cos(angle),
  };
}

export function createHelixPath(options: HelixPathOptions): {
  path: string;
  points: HelixPoint[];
} {
  const resolvedOptions: Required<HelixPathOptions> = {
    ...options,
    phase: options.phase ?? 0,
  };

  const points = Array.from({ length: resolvedOptions.samples }, (_, index) =>
    getHelixPoint(index, resolvedOptions),
  );

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");

  return { path, points };
}

export function createHelixRungs(options: HelixPathOptions, count: number): HelixRung[] {
  const phase = options.phase ?? 0;
  const baseOptions: Required<HelixPathOptions> = { ...options, phase };
  const oppositeOptions: Required<HelixPathOptions> = {
    ...options,
    phase: phase + Math.PI,
  };

  return Array.from({ length: count }, (_, index) => {
    const sampleIndex = Math.round((index / Math.max(count - 1, 1)) * (options.samples - 1));

    return {
      id: `rung-${index}`,
      start: getHelixPoint(sampleIndex, baseOptions),
      end: getHelixPoint(sampleIndex, oppositeOptions),
    };
  });
}

export function createHelixAnchors(
  ids: string[],
  options: HelixPathOptions,
): HelixAnchor[] {
  const phase = options.phase ?? 0;
  const baseOptions: Required<HelixPathOptions> = { ...options, phase };
  const oppositeOptions: Required<HelixPathOptions> = {
    ...options,
    phase: phase + Math.PI,
  };

  return ids.map((id, index) => {
    const progress = (index + 0.5) / ids.length;
    const side = index % 2 === 0 ? "left" : "right";
    const basePoint = getHelixPointAtProgress(progress, baseOptions);
    const oppositePoint = getHelixPointAtProgress(progress, oppositeOptions);
    const point =
      side === "left"
        ? basePoint.x < oppositePoint.x
          ? basePoint
          : oppositePoint
        : basePoint.x > oppositePoint.x
          ? basePoint
          : oppositePoint;

    return {
      id,
      x: point.x,
      y: point.y,
      depth: point.depth,
      side,
    };
  });
}

export function createHelixPathThroughAnchors({
  anchors,
  width,
  topPadding,
  bottomPadding,
}: HelixAnchorPathOptions): string {
  if (anchors.length === 0) {
    return "";
  }

  const centerX = width / 2;
  const start = {
    x: centerX,
    y: anchors[0].y - topPadding,
  };
  const points =
    bottomPadding > 0
      ? [
          start,
          ...anchors,
          {
            x: centerX,
            y: anchors[anchors.length - 1].y + bottomPadding,
          },
        ]
      : [start, ...anchors];

  return points
    .map((point, index) => {
      if (index === 0) {
        return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
      }

      const previous = points[index - 1];
      const controlY = previous.y + (point.y - previous.y) / 2;

      return [
        "C",
        previous.x.toFixed(2),
        controlY.toFixed(2),
        point.x.toFixed(2),
        controlY.toFixed(2),
        point.x.toFixed(2),
        point.y.toFixed(2),
      ].join(" ");
    })
    .join(" ");
}

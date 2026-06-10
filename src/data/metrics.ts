import type { ActivityPoint, Metric } from "@/types/dashboard";

export const metrics: Metric[] = [
  {
    label: "Memory Modules",
    value: "02",
    detail: "BryanOS and LunarLedger",
    trend: "system registry",
  },
  {
    label: "Knowledge Base",
    value: "06",
    detail: "Frontend, backend, database, tools, product, AI",
    trend: "full stack",
  },
  {
    label: "Experience Matrix",
    value: "LIVE",
    detail: "SportsPilotAI and eduClaaS work indexed",
    trend: "resume verified",
  },
  {
    label: "Active Build Cycle",
    value: "AIOS",
    detail: "Artificial Intelligence Operating System redesign",
    trend: "active build",
  },
];

export const activityPoints: ActivityPoint[] = [
  { label: "Plan", systems: 1, features: 3 },
  { label: "Build", systems: 2, features: 6 },
  { label: "Ship", systems: 2, features: 4 },
  { label: "Refine", systems: 2, features: 5 },
];

export const currentFocus = [
  "Refining BryanOS as an artificial intelligence operating system.",
  "Keeping resume-backed content concise, accurate, and easy to scan.",
  "Presenting personal systems separately from professional company work.",
];

export const recentActivity = [
  "System registry limited to BryanOS and LunarLedger.",
  "Experience matrix indexed SportsPilotAI and eduClaaS responsibilities.",
  "Monochrome command interface activated.",
];

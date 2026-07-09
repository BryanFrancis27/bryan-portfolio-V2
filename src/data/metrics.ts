import type { ActivityPoint, Metric } from "@/types/dashboard";

export const metrics: Metric[] = [
  {
    label: "Memory Modules",
    value: "03",
    detail: "BryanOS, LunarLedger, and AutoCare+",
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
  { label: "Build", systems: 3, features: 6 },
  { label: "Ship", systems: 3, features: 4 },
  { label: "Refine", systems: 3, features: 5 },
];

export const currentFocus = [
  "Refining BryanOS as an artificial intelligence operating system.",
  "Keeping resume-backed content concise, accurate, and easy to scan.",
  "Presenting personal systems separately from professional company work.",
];

export const recentActivity = [
  "System registry expanded with AutoCare+ capstone system.",
  "Experience matrix indexed SportsPilotAI and eduClaaS responsibilities.",
  "Monochrome command interface activated.",
];

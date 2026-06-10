import type { System } from "@/types/dashboard";

export const systems: System[] = [
  {
    name: "BryanOS",
    status: "ACTIVE",
    type: "ARTIFICIAL OPERATING SYSTEM",
    purpose: "Portfolio simulation layer and personal engineering interface.",
    description:
      "A cinematic AI operating system experience for presenting Bryan's engineering memory, systems, and professional signal.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    contributions: [
      "Designed the portfolio as an artificial intelligence operating system.",
      "Separated content into typed static data files.",
      "Built reusable simulation, registry, timeline, and contact modules.",
    ],
    highlights: [
      "Simulation landing experience",
      "Command Center interface",
      "System registry",
      "Experience matrix",
    ],
    signals: [
      "Digital Consciousness Core",
      "Monochrome operating shell",
      "Resume-verified content",
      "Route loading states",
    ],
  },
  {
    name: "LunarLedger",
    status: "PERSONAL PROJECT",
    type: "PERSONAL PRODUCT SYSTEM",
    purpose: "Personal budget management application for salary planning and spending analysis.",
    description:
      "A personal finance and budgeting application focused on weekly salary management, payable tracking, and spending analysis.",
    stack: ["React 19", "Vite", "Tailwind CSS", "Chart.js", "FullCalendar"],
    contributions: [
      "Built planner and insights workflows separating financial management from analytical reporting.",
      "Implemented interactive financial visualizations and calendar-based planning.",
      "Developed budgeting utilities for safe-to-spend analysis, cumulative expenses, and forecasting.",
    ],
    highlights: [
      "Weekly salary management",
      "Payable tracking",
      "Spending analysis",
      "Budget forecasting",
    ],
    signals: [
      "Personal project",
      "Financial planning workflow",
      "Chart and calendar views",
      "Utility-driven budgeting",
    ],
  },
];

import type { LucideIcon } from "lucide-react";

export type SystemStatus = "ACTIVE" | "PRODUCTION" | "PERSONAL PROJECT" | "ARCHIVED";

export interface Metric {
  label: string;
  value: string;
  detail: string;
  trend: string;
}

export interface ActivityPoint {
  label: string;
  systems: number;
  features: number;
}

export interface System {
  name: string;
  status: SystemStatus;
  type: string;
  purpose: string;
  description: string;
  stack: string[];
  contributions: string[];
  highlights: string[];
  signals: string[];
}

export interface SkillGroup {
  category: string;
  tools: string[];
}

export interface TimelineEvent {
  period: string;
  title: string;
  label: string;
  description: string;
  signals: string[];
}

export interface QuickLink {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface ContactChannel {
  label: string;
  href: string;
  detail: string;
}

export interface ExperienceRole {
  role: string;
  company: string;
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  systems?: string[];
}

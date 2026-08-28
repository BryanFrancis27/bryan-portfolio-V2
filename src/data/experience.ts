import type { ExperienceRole } from "@/types/dashboard";

export const experienceRoles: ExperienceRole[] = [
  {
    role: "Software Engineer",
    company: "SportsPilotAI",
    period: "December 2025 - Present",
    summary:
      "Develops and maintains AI-powered SaaS platforms with full-stack product responsibilities.",
    responsibilities: [
      "Develop and maintain AI-powered SaaS platforms, contributing to the full software development lifecycle from requirements gathering and solution planning to implementation, testing, and deployment.",
      "Build and enhance scalable web applications through frontend development, backend services, database design, and API integrations that support intelligent, data-driven workflows.",
      "Collaborate with engineers and stakeholders across multiple projects to deliver features, solve technical challenges, and ensure seamless system integration.",
      "Present completed work and technical progress, clearly communicating solutions and implementation details to team members and project leads.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Firebase", "Firestore"],
    // systems: ["RecruitAssistAI", "ParentAssistAI"],
  },
  {
    role: "PHP Developer - Technology Associate",
    company: "eduClaaS Pte. Ltd. (Singapore)",
    period: "November 2024 - December 2025",
    summary:
      "Contributed to web application development and maintenance within an applied software engineering program.",
    responsibilities: [
      "Implemented frontend and backend functionality for internal and client-facing applications.",
      "Worked on testing, debugging, deployment, and collaborative Git/GitHub development workflows.",
      "Contributed to an AI-powered conversational marketing application using Laravel and API integrations.",
    ],
    technologies: ["PHP", "Laravel", "JavaScript", "HTML", "CSS", "MySQL", "Git", "GitHub"],
    systems: ["Conversational Marketing AI Application"],
  },
];

export const operatingModes = [
  "Builds product interfaces around workflow clarity, reporting, and responsive user experience.",
  "Works across React, Next.js, TypeScript, Firebase, Firestore, PHP, Laravel, and MySQL.",
  "Keeps implementation grounded in testing, debugging, deployments, and collaborative Git workflows.",
];

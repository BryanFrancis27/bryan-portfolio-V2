import type { TimelineEvent } from "@/types/dashboard";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "product-direction",
    period: "Current",
    category: "Product Direction",
    title: "Full Stack Product Direction (Software Engineer)",
    label: "React, Next.js, TypeScript, Firebase, Firestore",
    description:
      "Expanded into AI-powered SaaS platform work, real-time synchronization, role-based access control, and product-focused interfaces.",
    signals: ["React", "Next.js", "TypeScript", "Firebase"],
    status: "ACTIVE_LAYER",
    sequence: "FOUNDATION_04",
  },
  {
    id: "professional-web-base",
    period: "2024-2025",
    category: "Professional Base",
    title: "Professional Web Application Base (Technical Developer)",
    label: "PHP, Laravel, JavaScript, HTML, CSS, MySQL",
    description:
      "Strengthened frontend and backend implementation through real web application maintenance, testing, debugging, and deployment workflows.",
    signals: ["PHP", "Laravel", "JavaScript", "MySQL"],
    status: "PRODUCTION_BASE",
    sequence: "FOUNDATION_03",
  },
  {
    id: "educlaas-lithan",
    period: "Program",
    category: "Applied Training",
    title: "EduCLaaS / Lithan Formation",
    label: "Industry-accredited software engineering program",
    description:
      "Built software engineering discipline through collaborative web application work, Git workflows, and applied product assignments.",
    signals: ["GitHub workflows", "Laravel", "MySQL", "Applied software practice"],
    status: "TRAINING_LAYER",
    sequence: "FOUNDATION_02",
  },
  {
    id: "bsit-software-engineering",
    period: "2023-2027",
    category: "Academic Foundation",
    title: "BSIT Software Engineering",
    label: "University of Cebu + EduCLaaS Lithan",
    description:
      "Bachelor of Science in Information Technology, major in Software Engineering. Expected graduation: 2027.",
    signals: ["Software engineering major", "Academic foundation", "Applied degree in progress"],
    status: "BASE_LAYER",
    sequence: "FOUNDATION_01",
  },
];

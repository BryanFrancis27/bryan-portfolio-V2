import type { SkillGroup } from "@/types/dashboard";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    tools: ["React 19", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Framer Motion"],
  },
  {
    category: "Backend",
    tools: ["Firebase", "Firestore", "REST APIs", "PHP", "Laravel", "API integrations"],
  },
  {
    category: "Database",
    tools: ["Firestore", "Firebase Authentication", "MySQL", "Supabase", "Data modeling"],
  },
  {
    category: "Tools",
    tools: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vercel"],
  },
  {
    category: "Product Engineering",
    tools: ["Responsive UI", "Reporting systems", "Notifications", "Workflow management", "Role-based access control"],
  },
  {
    category: "AI / Automation",
    tools: ["Gemini AI", "GitHub Copilot", "ChatGPT", "Claude AI", "AI prompt engineering"],
  },
];

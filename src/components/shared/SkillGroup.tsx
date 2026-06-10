import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillGroup as SkillGroupType } from "@/types/dashboard";

export function SkillGroup({ group }: { group: SkillGroupType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-white">{group.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-1">
          {group.tools.map((tool) => (
            <li key={tool} className="border-l border-white/[0.12] bg-white/[0.018] px-3 py-2">
              {tool}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

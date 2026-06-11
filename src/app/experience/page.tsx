import { CommandCenterCard } from "@/components/dashboard/CommandCenterCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SkillGroup } from "@/components/shared/SkillGroup";
import { Badge } from "@/components/ui/badge";
import { experienceRoles, operatingModes } from "@/data/experience";
import { skillGroups } from "@/data/skills";

export default function ExperiencePage() {
  return (
    <DashboardShell>
      <div className="w-full min-w-0 space-y-8">
        <section className="max-w-5xl">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
            Experience Matrix
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Professional Operating Record</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Resume-verified roles, responsibilities, tools, and product engineering strengths.
          </p>
        </section>

        <CommandCenterCard label="Operating Profile" title="How Bryan Builds">
          <ul className="grid min-w-0 gap-3 md:grid-cols-3">
            {operatingModes.map((mode) => (
              <li
                key={mode}
                className="border-l border-white/[0.12] bg-white/[0.018] p-4 text-sm leading-6 text-muted-foreground"
              >
                {mode}
              </li>
            ))}
          </ul>
        </CommandCenterCard>

        <section className="grid min-w-0 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {experienceRoles.map((role) => (
            <CommandCenterCard
              key={`${role.company}-${role.role}`}
              label={role.period}
              title={`${role.role} / ${role.company}`}
            >
              <div className="space-y-5">
                <p className="text-sm leading-6 text-muted-foreground">{role.summary}</p>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-zinc-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {role.systems ? (
                  <div className="flex flex-wrap gap-2">
                    {role.systems.map((system) => (
                      <Badge key={system} variant="secondary">
                        {system}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {role.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CommandCenterCard>
          ))}
        </section>

        <section className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {skillGroups.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}

import { SystemCard } from "@/components/systems/SystemCard";
import { systems } from "@/data/systems";

export default function SystemsPage() {
  return (
    <div className="w-full min-w-0 space-y-8">
      <section className="max-w-5xl">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
          System Registry
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Classified Product Systems</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Bryan&apos;s personal systems shown as operating files. Company work stays in the Experience Matrix.
        </p>
      </section>
      <section className="grid min-w-0 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        {systems.map((system) => (
          <SystemCard key={system.name} system={system} />
        ))}
      </section>
    </div>
  );
}

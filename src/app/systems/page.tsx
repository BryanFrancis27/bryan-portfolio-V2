import { SystemRegistry } from "@/components/systems/SystemRegistry";
import { systems } from "@/data/systems";

export default function SystemsPage() {
  return (
    <div className="w-full min-w-0 space-y-7">
      <section className="max-w-5xl">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
          System Registry
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Classified Product Systems</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Bryan&apos;s personal systems shown as operating files. Company work stays in the Experience Matrix.
        </p>
      </section>
      <SystemRegistry systems={systems} />
    </div>
  );
}

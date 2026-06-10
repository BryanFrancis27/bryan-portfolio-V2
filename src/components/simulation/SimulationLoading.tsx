export function SimulationLoading() {
  return (
    <main className="dashboard-grid flex min-h-screen items-center justify-center bg-background px-4">
      <section className="scan-line alien-panel w-full max-w-md rounded-lg border border-white/[0.08] p-6 backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
          BryanOS
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Initializing AI Operating System</h1>
        <div className="mt-6 space-y-3">
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="h-3 w-4/5 rounded bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/10" />
        </div>
        <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
          <span className="h-px w-5 bg-white" aria-hidden="true" />
          Loading simulation...
        </div>
      </section>
    </main>
  );
}

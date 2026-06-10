export function SystemBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div className="dashboard-grid absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/[0.045] blur-3xl" />
      <div className="absolute bottom-[-18rem] right-[-10rem] h-[36rem] w-[36rem] rounded-full bg-zinc-400/[0.04] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_42%,rgb(0_0_0_/_0.82)_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgb(255_255_255_/_0.14)_1px,transparent_1px)] [background-size:116px_116px]" />
      <div className="absolute inset-x-0 top-0 h-1/2 animate-[system-scan_8s_linear_infinite] bg-gradient-to-b from-transparent via-white/[0.032] to-transparent" />
      <div className="absolute left-[8%] top-[18%] h-px w-[28rem] rotate-[-18deg] glyph-line opacity-35" />
      <div className="absolute bottom-[18%] right-[4%] h-px w-[24rem] rotate-[16deg] glyph-line opacity-25" />
    </div>
  );
}

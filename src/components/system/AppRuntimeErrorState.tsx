export function AppRuntimeErrorState({ error }: { error: Error }) {
  const message = error.message?.trim() || "Unknown runtime error";
  const origin = typeof window !== "undefined" ? window.location.origin : "this deployment";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.78_0.13_195_/_0.08),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-surface/80 backdrop-blur-sm p-8 shadow-2xl shadow-black/40">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-amber-300">
          Runtime error
        </div>

        <h1 className="text-xl font-semibold mb-2">This deployment hit a runtime error</h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          The app crashed while starting in the browser. Use the details below to inspect the exact
          error.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 space-y-3">
          <div>
            <div className="text-[12px] font-medium text-foreground mb-2">Current origin</div>
            <pre className="overflow-x-auto font-mono text-[12px] text-accent">{origin}</pre>
          </div>

          <div>
            <div className="text-[12px] font-medium text-foreground mb-2">Browser error</div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12px] text-amber-200">
              {message}
            </pre>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/"
            className="inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}

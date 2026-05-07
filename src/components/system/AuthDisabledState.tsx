import { Link } from "@tanstack/react-router";

export function AuthDisabledState({
  title = "Sign in isn't configured for this deployment",
  description = "This build is missing VITE_PRIVY_APP_ID, so Privy auth cannot start yet.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.78_0.13_195_/_0.08),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-surface/80 backdrop-blur-sm p-8 shadow-2xl shadow-black/40">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-amber-300">
          Auth setup required
        </div>
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        <div className="mt-6 rounded-xl border border-border bg-background/60 p-4">
          <div className="text-[12px] font-medium text-foreground mb-2">Set this in Vercel Project Settings → Environment Variables</div>
          <pre className="overflow-x-auto font-mono text-[12px] text-accent">VITE_PRIVY_APP_ID=&lt;your_privy_app_id&gt;</pre>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Back to home
          </Link>
          <a
            href="https://dashboard.privy.io/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-[13px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Open Privy dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { buildUserFromWallet, setUser } from "@/lib/auth";
import { connectPhantom, getPhantomProvider } from "@/lib/wallet";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const phantomInstalled = Boolean(getPhantomProvider());

  async function handleConnect() {
    setConnecting(true);
    setError(null);

    try {
      const address = await connectPhantom();
      setUser(buildUserFromWallet(address));
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect Phantom wallet");
    } finally {
      setConnecting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.78_0.13_195_/_0.08),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-10">
          <div className="relative h-6 w-6">
            <div className="absolute inset-0 rounded-sm border border-accent/60" />
            <div className="absolute inset-1 bg-accent/80 rounded-[2px]" />
          </div>
          <span className="font-medium tracking-tight text-[15px]">Astro</span>
          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-mono tracking-wider text-muted-foreground border border-border rounded">
            x402
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur-sm p-8 shadow-2xl shadow-black/40">
          <h1 className="text-xl font-semibold mb-1">Connect Phantom</h1>
          <p className="text-sm text-muted-foreground mb-7">
            Sign in with your Solana wallet. No Privy, email, or embedded wallet required.
          </p>

          <button
            onClick={handleConnect}
            disabled={connecting || !phantomInstalled}
            className="w-full h-11 rounded-lg bg-accent text-background text-[13px] font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2.5"
          >
            {connecting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Connecting…
              </>
            ) : (
              <>
                <span className="text-base">◎</span>
                Connect Phantom
              </>
            )}
          </button>

          {!phantomInstalled && (
            <a
              href="https://phantom.app/download"
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex h-10 items-center justify-center rounded-lg border border-border text-[13px] text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Install Phantom Wallet
            </a>
          )}

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-[12px] text-red-300">
              {error}
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-border/60">
            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Phantom wallet authentication
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-muted-foreground mt-6">
          Don't have an account?{" "}
          <a href="/#waitlist" className="text-accent/80 hover:text-accent transition-colors">
            Request access →
          </a>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles, LayoutDashboard } from "lucide-react";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ToolLoginCTAProps {
  slug: string;
  toolName: string;
}

export function ToolLoginCTA({ slug, toolName }: ToolLoginCTAProps) {
  const { session, isLoading } = useSupabaseSession();
  const [signingIn, setSigningIn] = useState(false);

  if (isLoading) return null;

  // Logged-in: show a subtle "track your usage" link
  if (session) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <LayoutDashboard className="w-3.5 h-3.5" />
        <span>Signed in as {session.user.user_metadata?.full_name ?? session.user.email}</span>
        <span>·</span>
        <Link href="/dashboard" className="text-foreground underline-offset-2 hover:underline">
          View usage →
        </Link>
      </div>
    );
  }

  async function handleSignIn() {
    setSigningIn(true);
    try {
      const supabase = createClient();
      const next = `/free-tools/${slug}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) setSigningIn(false);
    } catch {
      setSigningIn(false);
    }
  }

  return (
    <div
      className={cn(
        "mt-6 rounded-2xl border border-dashed border-blue-300 dark:border-blue-800",
        "bg-blue-50/60 dark:bg-blue-950/30 px-5 py-4",
        "flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
      )}
    >
      <div className="flex items-start gap-3 flex-1">
        <span className="mt-0.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 p-2 shrink-0">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Get 10× more daily uses — completely free
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sign in with Google to unlock higher daily limits for {toolName} and all 14 tools.
            No password, no credit card — 5 seconds and you&apos;re in.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignIn}
        disabled={signingIn}
        className={cn(
          "shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
          "bg-white dark:bg-neutral-900 border border-border shadow-sm",
          "hover:bg-accent disabled:opacity-60"
        )}
      >
        {signingIn ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        {signingIn ? "Signing in…" : "Sign in with Google"}
      </button>
    </div>
  );
}

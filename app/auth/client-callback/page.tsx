"use client";

/**
 * Client-portal magic-link callback.
 * Wrapped in Suspense because useSearchParams() requires it in Next.js 16.
 */

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, Loader2, Mail, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

interface AuthError {
  code: string;
  description: string;
}

function parseHashError(): AuthError | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  const p = new URLSearchParams(hash);
  const code = p.get("error_code") ?? p.get("error") ?? "";
  if (!code) return null;
  return {
    code,
    description: p.get("error_description")?.replace(/\+/g, " ") ?? "Authentication failed.",
  };
}

/* ─── Inner component (uses useSearchParams) ────────────────────────────── */

function ClientCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<"loading" | "error">("loading");
  const [authError, setAuthError] = useState<AuthError | null>(null);

  // Carry the intended destination onto the manual-login fallback so an expired
  // or reused magic link (e.g. an invoice link opened days later) still lands
  // the client on the exact page after they sign in.
  const next = searchParams.get("next") ?? "/client/dashboard";
  const loginHref =
    next && next !== "/client/dashboard"
      ? `/client/login?next=${encodeURIComponent(next)}`
      : "/client/login";

  useEffect(() => {
    // Hash fragment - Supabase puts otp_expired etc. here (client-side only)
    const hashErr = parseHashError();
    if (hashErr) {
      setAuthError(hashErr);
      setPhase("error");
      return;
    }

    const supabase = createClient();

    // Implicit flow: admin-generated magic links (generateLink) return the
    // session as tokens in the URL hash - `#access_token=...&refresh_token=...`
    // - NOT as a PKCE `?code=`. The @supabase/ssr browser client is PKCE-shaped
    // and does not auto-consume these, so set the session explicitly. Without
    // this every fresh magic link fails with "no valid sign-in code".
    const hashParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.hash.slice(1))
        : new URLSearchParams();
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");
    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setAuthError({ code: error.name, description: error.message });
            setPhase("error");
          } else {
            router.replace(next);
          }
        });
      return;
    }

    // PKCE flow: OAuth / links that come back with a `?code=`.
    const code = searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          setAuthError({ code: error.name, description: error.message });
          setPhase("error");
        } else {
          router.replace(next);
        }
      });
      return;
    }

    // No token or code - already signed in?
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace(next);
      } else {
        setAuthError({
          code: "no_code",
          description: "No valid sign-in code found. The link may be incomplete.",
        });
        setPhase("error");
      }
    });
  }, [router, searchParams, next]);

  if (phase === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isExpired =
    authError?.code === "otp_expired" ||
    authError?.description?.toLowerCase().includes("expired") ||
    authError?.description?.toLowerCase().includes("invalid");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm">

        <div className="flex justify-center">
          <div
            className={cn(
              "grid h-14 w-14 place-items-center rounded-2xl",
              isExpired ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600",
            )}
          >
            <AlertCircle className="h-7 w-7" />
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold tracking-tight">
            {isExpired ? "Sign-in link expired" : "Sign-in failed"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isExpired
              ? "This link has already been used or has expired. Links are single-use and valid for 1 hour."
              : (authError?.description ?? "Something went wrong with the sign-in link.")}
          </p>
        </div>

        <div className="space-y-3">
          {isExpired && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[13px] text-amber-700 dark:text-amber-400">
              <p className="font-medium">What to do next</p>
              <p className="mt-0.5 text-[12px] opacity-80">
                Ask your project contact (Smit) to send a fresh signing link - it takes
                just a few seconds from the admin panel.
              </p>
            </div>
          )}

          <a
            href="mailto:business.smitp@gmail.com?subject=Re-send%20contract%20signing%20link&body=Hi%20Smit%2C%20my%20contract%20signing%20link%20has%20expired.%20Could%20you%20please%20send%20a%20new%20one%3F%20Thank%20you."
            className={cn(buttonVariants({ variant: "default" }), "w-full gap-2")}
          >
            <Mail className="h-4 w-4" />
            Email Smit for a new link
          </a>

          <Link
            href={loginHref}
            className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
          >
            <RefreshCw className="h-4 w-4" />
            Go to sign-in page
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && authError && (
          <p className="text-center font-mono text-[10px] text-muted-foreground/50">
            {authError.code}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Page - wraps inner in Suspense (required by Next.js 16) ─────────────── */

export default function ClientCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ClientCallbackInner />
    </Suspense>
  );
}

"use client";

/**
 * Client-portal magic-link callback.
 *
 * This page is the redirect_to target for Supabase magic links sent to
 * project clients (contract signing, etc.).  We need a CLIENT component here
 * because Supabase puts its error information in the URL hash fragment
 * (`#error=otp_expired…`) which the server Route Handler at /auth/callback
 * can never read.
 *
 * Flow:
 *   SUCCESS  → /auth/client-callback?code=<pkce>&next=/client/contract
 *              exchanges code for session → redirects to `next`
 *
 *   FAILURE  → /auth/client-callback?next=…#error=access_denied&error_code=otp_expired…
 *              reads hash → shows a clear "link expired" page with next steps
 */

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, Loader2, Mail, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Phase = "loading" | "error" | "done";

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

export default function ClientCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("loading");
  const [authError, setAuthError] = useState<AuthError | null>(null);

  useEffect(() => {
    const next = searchParams.get("next") ?? "/client/dashboard";
    const code = searchParams.get("code");

    // Hash fragment (client-side only) — Supabase puts errors here
    const hashErr = parseHashError();
    if (hashErr) {
      setAuthError(hashErr);
      setPhase("error");
      return;
    }

    const supabase = createClient();

    if (code) {
      // PKCE flow — exchange code for session
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

    // No code — check if there's already a live session (e.g. user is already signed in)
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
  }, [router, searchParams]);

  /* ── Loading ─────────────────────────────────────────────────────────── */
  if (phase === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  /* ── Error ───────────────────────────────────────────────────────────── */
  const isExpired =
    authError?.code === "otp_expired" ||
    authError?.description?.toLowerCase().includes("expired") ||
    authError?.description?.toLowerCase().includes("invalid");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm">

        {/* Icon */}
        <div className="flex justify-center">
          <div
            className={cn(
              "grid h-14 w-14 place-items-center rounded-2xl",
              isExpired
                ? "bg-amber-500/10 text-amber-600"
                : "bg-red-500/10 text-red-600",
            )}
          >
            <AlertCircle className="h-7 w-7" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold tracking-tight">
            {isExpired ? "Sign-in link expired" : "Sign-in failed"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isExpired
              ? "This link has already been used or has expired. Links are single-use and valid for 1 hour."
              : authError?.description ?? "Something went wrong with the sign-in link."}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {isExpired && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[13px] text-amber-700 dark:text-amber-400">
              <p className="font-medium">What to do next</p>
              <p className="mt-0.5 text-[12px] opacity-80">
                Ask your project contact (Smit) to send a fresh signing link from the admin
                panel. It takes just a few seconds.
              </p>
            </div>
          )}

          <a
            href="mailto:business.smitp@gmail.com?subject=Re-send%20contract%20signing%20link&body=Hi%20Smit%2C%20my%20contract%20signing%20link%20has%20expired.%20Could%20you%20please%20send%20a%20new%20one%3F%20Thank%20you."
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full gap-2",
            )}
          >
            <Mail className="h-4 w-4" />
            Email Smit for a new link
          </a>

          <Link
            href="/client/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full gap-2",
            )}
          >
            <RefreshCw className="h-4 w-4" />
            Go to sign-in page
          </Link>
        </div>

        {/* Debug info (dev) */}
        {process.env.NODE_ENV === "development" && authError && (
          <p className="text-center font-mono text-[10px] text-muted-foreground/50">
            {authError.code}
          </p>
        )}
      </div>
    </div>
  );
}

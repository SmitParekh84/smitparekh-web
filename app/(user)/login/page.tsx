"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Zap, History, TrendingUp, ShieldCheck, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BENEFITS = [
  {
    icon: Zap,
    title: "10× more uses per day",
    desc: "Logged-in users get far higher quotas on every tool.",
  },
  {
    icon: History,
    title: "Usage history",
    desc: "See exactly how many times you've used each tool, today and all-time.",
  },
  {
    icon: TrendingUp,
    title: "Personal dashboard",
    desc: "Track your remaining quota at a glance and jump straight to any tool.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & private",
    desc: "Only your email is stored. No passwords, no spam — just Google sign-in.",
  },
];

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(next);
    });
  }, [router, next]);

  async function handleGoogleSignIn() {
    setSigningIn(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) setSigningIn(false);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel – benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 flex-col justify-between">
        <div>
          <Link href="/" className="text-white/80 text-sm hover:text-white transition-colors">
            ← smitparekh.co.in
          </Link>
        </div>
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-3">
              Get 10× more tool uses
              <br />
              with one click.
            </h1>
            <p className="text-white/70 text-lg">
              Sign in with Google to unlock higher quotas, usage history, and a personal dashboard.
            </p>
          </div>
          <ul className="space-y-5">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex gap-4 items-start">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <b.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">{b.title}</p>
                  <p className="text-sm text-white/70 mt-0.5">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-white/40 text-xs">No ads. No spam. Only your email is stored.</p>
      </div>

      {/* Right panel – sign-in card */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        {/* Mobile back link */}
        <Link
          href="/free-tools"
          className="self-start text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 lg:hidden"
        >
          ← Back to free tools
        </Link>

        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Access your personal dashboard and higher usage limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Button
              className="w-full gap-2"
              variant="outline"
              size="lg"
              onClick={handleGoogleSignIn}
              disabled={signingIn}
            >
              {signingIn ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {signingIn ? "Redirecting…" : "Continue with Google"}
            </Button>

            {/* Mobile benefits summary */}
            <div className="lg:hidden rounded-lg border bg-muted/40 p-4 space-y-2 mt-2">
              {BENEFITS.slice(0, 2).map((b) => (
                <div key={b.title} className="flex gap-2 items-start text-sm">
                  <b.icon className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                  <span className="text-muted-foreground">{b.title}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              By signing in you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Link
          href="/free-tools"
          className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
        >
          ← Continue without signing in
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

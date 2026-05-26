"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuroraBackground } from "@/components/ui/aurora-background";

function ClientLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/client/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(next);
      else setChecking(false);
    });
  }, [router, next]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace(next);
    } catch {
      toast.error("Invalid credentials", "Check your email and password.");
      setSubmitting(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <AuroraBackground className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-xl shadow-black/5">
          <div className="px-6 pt-8 pb-6 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-400 mx-auto">
              <Image src="/Smit-Logo.svg" alt="Smit Parekh" width={28} height={28} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Client Portal</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sign in to view your project and requirements
              </p>
            </div>
          </div>

          <div className="h-px bg-border/60 mx-6" />

          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="w-full gap-2 mt-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="px-6 pb-6">
            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              Invited but haven&apos;t set up your account? Use the link in your invitation email.
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Smit Parekh · Client Portal
        </p>
      </div>
    </AuroraBackground>
  );
}

export default function ClientLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ClientLoginContent />
    </Suspense>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Loader2, Lock, Eye, EyeOff, ArrowLeft, ShieldAlert } from "lucide-react";

function isAdminRole(role?: string | null) {
  return role === "admin" || role === "superadmin";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const login = useLogin();

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && isAdminRole(data.session.user.app_metadata?.role)) {
        router.replace("/admin");
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await login.mutateAsync({ email, password });
      if (isAdminRole(result.user?.role)) {
        router.replace("/admin");
      } else {
        await createClient().auth.signOut();
        toast.error(
          "Access denied",
          "This account does not have admin access.",
        );
      }
    } catch {
      toast.error("Invalid credentials", "Check your email and password.");
    }
  }

  return (
    <AuroraBackground className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">

        {/* Back to site */}
        <div className="w-full max-w-sm mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>
        </div>

        {/* Card */}
        <div
          className="w-full max-w-sm rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-xl shadow-black/5 transition-all duration-500"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)" }}
        >
          {/* Header */}
          <div className="px-6 pt-8 pb-6 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 mx-auto">
              <Lock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Admin Access</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Restricted to authorized personnel only
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60 mx-6" />

          {/* Form */}
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
                  placeholder="admin@smitparekh.co.in"
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
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={login.isPending}
                className="w-full gap-2 mt-2"
              >
                {login.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign In Securely
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Security notice */}
          <div className="px-6 pb-6">
            <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20 px-3.5 py-3">
              <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unauthorized access attempts are logged and may result in permanent IP ban.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Smit Parekh · Admin Portal
        </p>
      </div>
    </AuroraBackground>
  );
}

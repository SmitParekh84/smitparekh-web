"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";

function isAdminRole(role?: string | null) {
  return role === "admin" || role === "superadmin";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  // Only auto-redirect if the current session already has admin role confirmed.
  // Checking app_metadata here prevents the redirect loop that happens when a
  // non-admin user is logged in: AdminGuard would redirect back to this page
  // and this useEffect would redirect back to /admin — infinite loop.
  useEffect(() => {
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
      // authApi.login calls Supabase + /auth/me (backend MongoDB role)
      const result = await login.mutateAsync({ email, password });
      if (isAdminRole(result.user?.role)) {
        router.replace("/admin");
      } else {
        // Logged in but not admin — sign them out and show a clear error
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 mb-2">
            <Lock className="w-5 h-5 text-blue-500" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Sign in to manage your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={login.isPending}
              className="w-full gap-2"
            >
              {login.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

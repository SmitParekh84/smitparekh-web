"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

function isAdminRole(role: string | null | undefined): boolean {
  return role === "admin" || role === "superadmin";
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function check(role: string | null | undefined, hasSession: boolean) {
      if (!mounted) return;
      // No session at all → go to login
      if (!hasSession) {
        router.replace("/admin/login");
        return;
      }
      // Has session but no role in app_metadata → try backend (MongoDB is source of truth)
      if (!role) {
        try {
          const me = await api.get<{ user?: { role?: string } }>("/auth/me");
          role = me?.user?.role;
        } catch {
          // backend unreachable — fall through to forbidden
        }
      }
      if (!mounted) return;
      if (isAdminRole(role)) {
        setForbidden(false);
        setChecking(false);
      } else {
        // Logged in but not admin — show forbidden (NOT redirect to login, that causes a loop)
        setForbidden(true);
        setChecking(false);
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      check(data.session?.user.app_metadata?.role, !!data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        check(session.user.app_metadata?.role, true);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Your account does not have admin access. Contact the site owner if you believe this is an error.
        </p>
        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.replace("/admin/login");
          }}
          className="text-sm underline text-blue-500"
        >
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}


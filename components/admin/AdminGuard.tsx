"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { getPublicAdminEmails } from "@/lib/admin-allowlist";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;
    const allowlist = getPublicAdminEmails();

    const evaluate = (email: string | null | undefined) => {
      if (!email) {
        router.replace("/admin/login");
        return;
      }
      if (allowlist.length === 0 || !allowlist.includes(email.toLowerCase())) {
        setForbidden(true);
        setChecking(false);
        return;
      }
      setForbidden(false);
      setChecking(false);
    };

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        evaluate(data.session.user.email);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
      else evaluate(session.user.email);
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
          Your account is not in the admin allowlist. Sign in with an authorised email or contact the site owner.
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

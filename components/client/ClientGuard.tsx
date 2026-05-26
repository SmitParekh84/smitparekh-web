"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export function ClientGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    function resolve(hasSession: boolean) {
      if (!mounted) return;
      if (!hasSession) {
        router.replace("/admin/login");
        return;
      }
      setForbidden(false);
      setChecking(false);
    }

    supabase.auth.getSession().then(({ data }) => resolve(!!data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
      else resolve(true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="text-sm text-muted-foreground">
          Please sign in to access the client portal.
        </p>
        <button
          onClick={() => router.replace("/admin/login")}
          className="text-sm underline text-blue-500"
        >
          Sign in
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

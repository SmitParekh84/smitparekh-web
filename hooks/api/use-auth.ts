"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return async () => {
    await authApi.logout();
    qc.clear();
  };
}

/**
 * Subscribes to the Supabase auth session. Returns null while the initial
 * `getSession()` is in flight, then the current session (or null when signed out).
 */
export function useSupabaseSession(): {
  session: Session | null;
  isLoading: boolean;
} {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
}

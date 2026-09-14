"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.me(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name?: string; avatarUrl?: string }) =>
      authApi.updateProfile(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["auth", "me"] }),
  });
}

export function useUploadAvatar() {
  return useMutation({
    mutationFn: (file: File) => authApi.uploadAvatar(file),
  });
}

/**
 * Subscribes to the Supabase auth session. Returns null while the initial
 * `getSession()` is in flight, then the current session (or null when signed out).
 */
export function useSupabaseSession(): {
  session: Session | null;
  isLoading: boolean;
} {
  // `createClient()` throws when the Supabase env vars are missing. Resolve it
  // during render so we degrade to a settled "signed out" state instead of
  // taking down every component that renders the nav.
  const [supabase] = useState(() => {
    try {
      return createClient();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.warn(err);
      return null;
    }
  });
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(supabase !== null);

  useEffect(() => {
    if (!supabase) return;

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
  }, [supabase]);

  return { session, isLoading };
}

/**
 * True when the signed-in Supabase user has an admin role in `app_metadata`.
 * Used to show cross-area shortcuts (switching between the client portal and the
 * admin dashboard). Mirrors the client-side gating rule used by `AdminGuard`.
 */
export function useIsAdmin(): { isAdmin: boolean; isLoading: boolean } {
  const { session, isLoading } = useSupabaseSession();
  const role = session?.user?.app_metadata?.role as string | undefined;
  return { isAdmin: role === "admin" || role === "superadmin", isLoading };
}

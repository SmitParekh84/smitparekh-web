import { createClient } from "@/lib/supabase/client";
import type { AuthResponse } from "@/types";
import { api } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Auth API now backed by Supabase on the client. The backend exposes
 * `GET /auth/me` which returns the linked Mongo profile for the current
 * Supabase user (token attached automatically by the axios interceptor).
 */
export const authApi = {
  /**
   * Sign in with Supabase email/password. Throws on failure.
   * Returns the active session's access_token and the linked profile from the backend.
   */
  async login({ email, password }: LoginPayload): Promise<AuthResponse> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session) {
      throw new Error(error?.message || "Invalid credentials");
    }

    let user: AuthResponse["user"] = {
      id: data.user?.id ?? "",
      email: data.user?.email ?? email,
      role: "user",
    };
    try {
      const me = await api.get<{ user: AuthResponse["user"] }>("/auth/me");
      if (me?.user) user = me.user;
    } catch {
      // Backend may be unreachable or profile not yet provisioned - keep Supabase identity.
    }

    return { token: data.session.access_token, user };
  },

  async logout(): Promise<void> {
    const supabase = createClient();
    await supabase.auth.signOut();
  },

  async me(): Promise<AuthResponse["user"] | null> {
    try {
      const res = await api.get<{ user: AuthResponse["user"] }>("/auth/me");
      return res?.user ?? null;
    } catch {
      return null;
    }
  },

  async updateProfile(data: { name?: string; avatarUrl?: string }): Promise<void> {
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: { full_name: data.name, avatar_url: data.avatarUrl },
    });
    try {
      await api.patch("/auth/me", data);
    } catch {
      // Backend endpoint may not exist yet - Supabase metadata is the source of truth.
    }
  },

  async uploadAvatar(file: File): Promise<string> {
    const form = new FormData();
    form.append("image", file);
    const res = await api.postForm<{ url: string }>("/auth/avatar", form);
    return res.url;
  },
};

/**
 * Returns the current Supabase access token (Bearer token for backend calls).
 * Null on the server or when there is no active session.
 */
export async function getAdminToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Sign out and clear the Supabase session.
 * (Old API kept for callers that imported it.)
 */
export async function clearAdminToken(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    /* ignore */
  }
}

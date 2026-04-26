"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AuthResponse } from "@/types";

const TOKEN_KEY = "admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.post<AuthResponse>("/auth/login", { email, password }),
    onSuccess: (data) => {
      if (data.token) setAdminToken(data.token);
    },
  });
}

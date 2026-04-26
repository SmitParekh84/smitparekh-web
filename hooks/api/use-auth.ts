"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, setAdminToken, clearAdminToken, type LoginPayload } from "@/lib/api";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      if (data.token) setAdminToken(data.token);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    clearAdminToken();
    qc.clear();
  };
}

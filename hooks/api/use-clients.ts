"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsApi } from "@/lib/api/clients";
import { queryKeys } from "@/lib/api/query-keys";
import type { ClientRequirements } from "@/types";

/* ─── Admin hooks ─────────────────────────────────────────────────────── */

export function useAdminClients() {
  return useQuery({
    queryKey: queryKeys.clients.list(),
    queryFn: () => clientsApi.list(),
  });
}

export function useAdminClient(id: string) {
  return useQuery({
    queryKey: queryKeys.clients.byId(id),
    queryFn: () => clientsApi.getById(id),
    enabled: !!id,
  });
}

export function useInviteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => clientsApi.invite(email),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.clients.list() }),
  });
}

export function useUpdateClientStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      clientsApi.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.clients.all }),
  });
}

export function useAdminClientRequirements(clientId: string) {
  return useQuery({
    queryKey: queryKeys.clients.requirements(clientId),
    queryFn: () => clientsApi.getRequirements(clientId),
    enabled: !!clientId,
  });
}

/* ─── Onboarding (public) ─────────────────────────────────────────────── */

export function useValidateInvitation(token: string) {
  return useQuery({
    queryKey: queryKeys.clients.invitation(token),
    queryFn: () => clientsApi.validateInvitation(token),
    enabled: !!token,
    retry: false,
  });
}

export function useOnboardClient() {
  return useMutation({
    mutationFn: (payload: { token: string; name: string; mobile?: string; password: string }) =>
      clientsApi.onboard(payload.token, {
        name: payload.name,
        mobile: payload.mobile,
        password: payload.password,
      }),
  });
}

/* ─── Client (self) hooks ─────────────────────────────────────────────── */

export function useClientMe() {
  return useQuery({
    queryKey: queryKeys.clients.me(),
    queryFn: () => clientsApi.getMe(),
  });
}

export function useMyRequirements() {
  return useQuery({
    queryKey: queryKeys.clients.myRequirements(),
    queryFn: () => clientsApi.getMyRequirements(),
  });
}

export function useSubmitRequirements() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (
      data: Omit<ClientRequirements, "_id" | "clientId" | "submittedAt" | "createdAt" | "updatedAt">
    ) => clientsApi.submitRequirements(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.clients.myRequirements() }),
  });
}

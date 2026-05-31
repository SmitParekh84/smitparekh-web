"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contractsApi } from "@/lib/api/contracts";

const KEYS = {
  mine: ["contract", "mine"] as const,
  admin: (clientId: string) => ["contract", "admin", clientId] as const,
};

/* ─── Client hooks ─────────────────────────────────────────────────────── */

export function useMyContract() {
  return useQuery({
    queryKey: KEYS.mine,
    queryFn: () => contractsApi.getMine(),
  });
}

export function useSignContract() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (signature: string) => contractsApi.sign(signature),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.mine }),
  });
}

/* ─── Admin hooks ──────────────────────────────────────────────────────── */

export function useAdminContract(clientId: string) {
  return useQuery({
    queryKey: KEYS.admin(clientId),
    queryFn: () => contractsApi.getForClient(clientId),
    enabled: !!clientId,
  });
}

export function useUploadContractTemplate(clientId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => contractsApi.uploadTemplate(clientId, file),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.admin(clientId) }),
  });
}

export function useSendContractSigningRequest() {
  return useMutation({
    mutationFn: (clientId: string) => contractsApi.sendSigningRequest(clientId),
  });
}

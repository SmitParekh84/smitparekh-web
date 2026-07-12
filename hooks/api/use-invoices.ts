"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesApi, type CreateInvoiceInput, type VerifyPaymentInput } from "@/lib/api/invoices";
import { queryKeys } from "@/lib/api/query-keys";

/* ─── Admin ───────────────────────────────────────────────────────────── */

export function useAdminInvoices(params?: { status?: string; clientId?: string }) {
  return useQuery({
    queryKey: queryKeys.invoices.list(params),
    queryFn: () => invoicesApi.list(params),
  });
}

export function useAdminInvoice(id: string) {
  return useQuery({
    queryKey: queryKeys.invoices.byId(id),
    queryFn: () => invoicesApi.getById(id),
    enabled: !!id,
  });
}

export function useNextInvoiceNumber(clientId: string, prefix?: string) {
  return useQuery({
    queryKey: queryKeys.invoices.nextNumber(clientId, prefix),
    queryFn: () => invoicesApi.nextNumber(clientId, prefix),
    enabled: !!clientId,
    staleTime: 0,
  });
}

export function useClientInvoices(clientId: string) {
  return useQuery({
    queryKey: queryKeys.invoices.forClient(clientId),
    queryFn: () => invoicesApi.forClient(clientId),
    enabled: !!clientId,
  });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateInvoiceInput) => invoicesApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.all }),
  });
}

export function useUpdateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CreateInvoiceInput> }) =>
      invoicesApi.update(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.all }),
  });
}

export function useSendInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoicesApi.send(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.all }),
  });
}

export function useCancelInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoicesApi.cancel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.all }),
  });
}

export function useMarkOverdue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoicesApi.markOverdue(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.all }),
  });
}

export function useCheckOverdue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => invoicesApi.checkOverdue(),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.all }),
  });
}

/* ─── Client ──────────────────────────────────────────────────────────── */

export function useMyInvoices() {
  return useQuery({
    queryKey: queryKeys.invoices.mine(),
    queryFn: () => invoicesApi.listMine(),
  });
}

export function useCreateInvoiceOrder() {
  return useMutation({ mutationFn: (id: string) => invoicesApi.createOrder(id) });
}

export function useVerifyPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: VerifyPaymentInput }) =>
      invoicesApi.verify(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.mine() }),
  });
}

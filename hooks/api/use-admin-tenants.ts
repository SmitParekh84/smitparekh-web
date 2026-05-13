"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  adminTenantApi,
  queryKeys,
} from "@/lib/api";
import type { AdminTenant } from "@/lib/api/tenant";

export function useAdminTenants(status?: string) {
  return useQuery({
    queryKey: queryKeys.adminTenants.list(status),
    queryFn: () => adminTenantApi.list(status),
  });
}

export function useApproveTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTenantApi.approve(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
    },
  });
}

export function useRejectTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      adminTenantApi.reject(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
    },
  });
}

export function useSuspendTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTenantApi.suspend(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
    },
  });
}

export function useMigrateSiteBlogs() {
  return useMutation({
    mutationFn: ({ apiKey, site }: { apiKey: string; site: string }) =>
      adminTenantApi.migrateSiteBlogs(apiKey, site),
  });
}
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUsersApi, queryKeys } from "@/lib/api";
import type { AdminUser, BackendListResponse } from "@/types";

export function useAdminUsers() {
  return useQuery({
    queryKey: queryKeys.adminUsers.list(),
    queryFn: () => adminUsersApi.list().then((r) => r.data),
  });
}

export function useDeletedAdminUsers() {
  return useQuery({
    queryKey: queryKeys.adminUsers.deleted(),
    queryFn: () => adminUsersApi.listDeleted().then((r) => r.data),
  });
}

export function useDeleteAdminUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUsersApi.remove(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.adminUsers.all }),
  });
}

export function useRestoreAdminUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUsersApi.restore(id),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: queryKeys.adminUsers.deleted() });
      const prev = qc.getQueryData<BackendListResponse<AdminUser>>(
        queryKeys.adminUsers.deleted(),
      );
      if (prev) {
        qc.setQueryData<BackendListResponse<AdminUser>>(
          queryKeys.adminUsers.deleted(),
          {
            ...prev,
            data: prev.data.filter((u) => u._id !== id),
            count: Math.max(0, (prev.count ?? prev.data.length) - 1),
          },
        );
      }
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(queryKeys.adminUsers.deleted(), ctx.prev);
      }
    },
    onSettled: () =>
      qc.invalidateQueries({ queryKey: queryKeys.adminUsers.all }),
  });
}

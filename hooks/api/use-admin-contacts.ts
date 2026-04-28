"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  adminContactsApi,
  queryKeys,
  type AdminContactsListParams,
} from "@/lib/api";
import type {
  AdminContact,
  AdminContactsListResponse,
  BackendListResponse,
  BackendOneResponse,
} from "@/types";

export function useAdminContacts(params?: AdminContactsListParams) {
  return useQuery({
    queryKey: queryKeys.adminContacts.list(params),
    queryFn: () => adminContactsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useAdminContact(id: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.adminContacts.detail(id ?? ""),
    queryFn: () => adminContactsApi.byId(id as string).then((r) => r.data),
    enabled: Boolean(id),
  });
}

export function useDeletedAdminContacts() {
  return useQuery({
    queryKey: queryKeys.adminContacts.deleted(),
    queryFn: () => adminContactsApi.listDeleted().then((r) => r.data),
  });
}

/**
 * Lightweight unread-count poll for the sidebar badge.
 * Calls /admin/contacts?limit=1, uses the response's `unreadCount` field.
 * Refetches every 60s and on window focus.
 */
export function useAdminContactsUnreadCount() {
  return useQuery({
    queryKey: [...queryKeys.adminContacts.all, "unread-count"] as const,
    queryFn: () => adminContactsApi.list({ limit: 1 }),
    select: (res) => res.unreadCount ?? 0,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    staleTime: 30_000,
  });
}

/** Toggle isRead with optimistic update on detail + list caches. */
export function useSetContactRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) =>
      adminContactsApi.setRead(id, isRead),
    onMutate: async ({ id, isRead }) => {
      await qc.cancelQueries({ queryKey: queryKeys.adminContacts.all });

      const previous = {
        detail: qc.getQueryData<BackendOneResponse<AdminContact>>(
          queryKeys.adminContacts.detail(id),
        ),
        lists: qc.getQueriesData<AdminContactsListResponse>({
          queryKey: queryKeys.adminContacts.all,
        }),
      };

      // detail cache
      if (previous.detail) {
        qc.setQueryData<BackendOneResponse<AdminContact>>(
          queryKeys.adminContacts.detail(id),
          {
            ...previous.detail,
            data: {
              ...previous.detail.data,
              isRead,
              readAt: isRead ? new Date().toISOString() : null,
            },
          },
        );
      }

      // list caches: update isRead inline + adjust unreadCount
      qc.getQueriesData<AdminContactsListResponse>({
        queryKey: queryKeys.adminContacts.all,
      }).forEach(([key, value]) => {
        if (!value || !Array.isArray(value.data)) return;
        const idx = value.data.findIndex((c) => c._id === id);
        if (idx === -1) return;
        const wasRead = value.data[idx].isRead;
        if (wasRead === isRead) return;
        const nextData = value.data.slice();
        nextData[idx] = { ...nextData[idx], isRead };
        qc.setQueryData<AdminContactsListResponse>(key, {
          ...value,
          data: nextData,
          unreadCount: Math.max(
            0,
            (value.unreadCount ?? 0) + (isRead ? -1 : 1),
          ),
        });
      });

      return previous;
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      if (ctx.detail) {
        qc.setQueryData(
          queryKeys.adminContacts.detail(ctx.detail.data._id),
          ctx.detail,
        );
      }
      ctx.lists.forEach(([key, value]) => {
        qc.setQueryData(key, value);
      });
    },
    onSettled: () =>
      qc.invalidateQueries({ queryKey: queryKeys.adminContacts.all }),
  });
}

export function useDeleteAdminContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminContactsApi.remove(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.adminContacts.all }),
  });
}

export function useRestoreAdminContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminContactsApi.restore(id),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: queryKeys.adminContacts.deleted() });
      const prev = qc.getQueryData<BackendListResponse<AdminContact>>(
        queryKeys.adminContacts.deleted(),
      );
      if (prev) {
        qc.setQueryData<BackendListResponse<AdminContact>>(
          queryKeys.adminContacts.deleted(),
          {
            ...prev,
            data: prev.data.filter((c) => c._id !== id),
            count: Math.max(0, (prev.count ?? prev.data.length) - 1),
          },
        );
      }
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(queryKeys.adminContacts.deleted(), ctx.prev);
      }
    },
    onSettled: () =>
      qc.invalidateQueries({ queryKey: queryKeys.adminContacts.all }),
  });
}

import type {
  AdminContact,
  AdminContactsListResponse,
  BackendListResponse,
  BackendOneResponse,
} from "@/types";
import { api } from "./client";

export interface AdminContactsListParams {
  page?: number;
  limit?: number;
  unread?: boolean;
}

function buildQuery(params?: AdminContactsListParams): string {
  if (!params) return "";
  const usp = new URLSearchParams();
  if (params.page != null) usp.set("page", String(params.page));
  if (params.limit != null) usp.set("limit", String(params.limit));
  if (params.unread != null) usp.set("unread", String(params.unread));
  const q = usp.toString();
  return q ? `?${q}` : "";
}

export const adminContactsApi = {
  list: (params?: AdminContactsListParams) =>
    api.get<AdminContactsListResponse>(`/admin/contacts${buildQuery(params)}`),
  byId: (id: string) =>
    api.get<BackendOneResponse<AdminContact>>(`/admin/contacts/${id}`),
  setRead: (id: string, isRead: boolean) =>
    api.patch<BackendOneResponse<AdminContact>>(
      `/admin/contacts/${id}/read`,
      { isRead },
    ),
  bulkSetRead: (ids: string[], isRead: boolean) =>
    api.patch<{
      success: boolean;
      message: string;
      matched: number;
      modified: number;
    }>(`/admin/contacts/bulk/read`, { ids, isRead }),
  remove: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/admin/contacts/${id}`),
  restore: (id: string) =>
    api.post<BackendOneResponse<AdminContact>>(
      `/admin/contacts/${id}/restore`,
    ),
  listDeleted: () =>
    api.get<BackendListResponse<AdminContact>>("/admin/contacts/deleted"),
};

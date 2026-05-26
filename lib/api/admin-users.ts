import type {
  AdminUser,
  BackendListResponse,
  BackendOneResponse,
} from "@/types";
import { api } from "./client";

export const adminUsersApi = {
  list: () => api.get<BackendListResponse<AdminUser>>("/admin/users"),
  listDeleted: () =>
    api.get<BackendListResponse<AdminUser>>("/admin/users/deleted"),
  remove: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/admin/users/${id}`),
  restore: (id: string) =>
    api.post<BackendOneResponse<AdminUser>>(`/admin/users/${id}/restore`),
};

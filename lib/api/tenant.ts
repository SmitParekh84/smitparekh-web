import { api } from "./client";

export interface Tenant {
  _id: string;
  supabaseUserId: string;
  name: string;
  email: string;
  tenantSlug: string;
  apiKey: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  rejectionReason: string | null;
  requestedAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
}

export interface TenantBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readMinutes: number;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export type AdminTenant = Tenant;

export const tenantApi = {
  register: (data: { name: string }) =>
    api.post<{ success: boolean; data: Tenant }>("/tenants/register", data),
  getMe: () =>
    api.get<{ success: boolean; data: Tenant }>("/tenants/me"),
  regenerateKey: () =>
    api.post<{ success: boolean; data: { apiKey: string } }>("/tenants/me/regenerate-key"),

  listMyBlogs: () =>
    api.get<{ success: boolean; count: number; data: TenantBlog[] }>("/tenants/me/blogs"),
  createMyBlog: (data: Partial<TenantBlog>) =>
    api.post<{ success: boolean; data: TenantBlog }>("/tenants/me/blogs", data),
  updateMyBlog: (id: string, data: Partial<TenantBlog>) =>
    api.put<{ success: boolean; data: TenantBlog }>(`/tenants/me/blogs/${id}`, data),
  deleteMyBlog: (id: string) =>
    api.del<{ success: boolean }>(`/tenants/me/blogs/${id}`),
  publishMyBlog: (id: string) =>
    api.patch<{ success: boolean; data: TenantBlog }>(`/tenants/me/blogs/${id}/publish`),
};

export const adminTenantApi = {
  list: (status?: string) =>
    api.get<{ success: boolean; count: number; data: AdminTenant[] }>(
      status ? `/admin/tenants?status=${status}` : "/admin/tenants"
    ),
  approve: (id: string) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/approve`),
  reject: (id: string, reason?: string) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/reject`, { reason }),
  suspend: (id: string) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/suspend`),
};

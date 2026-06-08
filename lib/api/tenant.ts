import { api } from "./client";
import type { TenantFeatures } from "@/lib/tenant-features";
import type { BlogPreferences, ImproveMode } from "@/lib/blog-categories";

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
  // Optional: tenant docs created before this feature shipped won't have it on .lean() reads.
  features?: TenantFeatures;
  blogPreferences?: BlogPreferences;
  // Feature keys the tenant requested but the admin hasn't granted yet.
  featureRequests?: string[];
  webhook?: {
    url: string;
    enabled: boolean;
    secretSet: boolean;
    lastFiredAt: string | null;
    lastStatus: number | null;
  };
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
  updateWebhook: (data: { url?: string; enabled?: boolean }) =>
    api.put<{ success: boolean; data: { webhook: NonNullable<Tenant["webhook"]> } }>(
      "/tenants/me/webhook",
      data
    ),
  regenerateWebhookSecret: () =>
    api.post<{ success: boolean; data: { secret: string } }>(
      "/tenants/me/webhook/regenerate-secret"
    ),
  testWebhook: () =>
    api.post<{ success: boolean; data: { ok: boolean; status: number; firedAt: string } }>(
      "/tenants/me/webhook/test"
    ),

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
  uploadMyBlogImage: (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return api.postForm<{ url: string }>("/tenants/me/blogs/upload", form);
  },
  generateBlog: (prompt: string) =>
    api.post<{
      success: boolean;
      data: {
        title: string;
        excerpt: string;
        content: string;
        category: string;
        tags: string[];
        readMinutes: number;
      };
    }>("/tenants/me/blogs/ai/generate", { prompt }),
  updatePreferences: (prefs: Partial<BlogPreferences>) =>
    api.put<{ success: boolean; data: { blogPreferences: BlogPreferences } }>(
      "/tenants/me/preferences",
      prefs
    ),
  generateTopics: (category?: string) =>
    api.post<{ success: boolean; data: { topics: string[] } }>(
      "/tenants/me/blogs/ai/topics",
      { category: category ?? "" }
    ),
  improveContent: (content: string, mode: ImproveMode) =>
    api.post<{ success: boolean; data: { content: string } }>(
      "/tenants/me/blogs/ai/improve",
      { content, mode }
    ),
  requestFeature: (feature: string) =>
    api.post<{ success: boolean; message?: string; data: { featureRequests: string[] } }>(
      "/tenants/me/features/request",
      { feature }
    ),
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
  migrateSiteBlogs: (apiKey: string, site: string) =>
    api.post<{ success: boolean; modifiedCount: number; tenant: AdminTenant }>(
      "/admin/tenants/migrate-site-blogs",
      { apiKey, site }
    ),
  listBlogs: (tenantId: string) =>
    api.get<{ success: boolean; count: number; tenant: AdminTenant; data: TenantBlog[] }>(
      `/admin/tenants/${tenantId}/blogs`
    ),
  updateFeatures: (id: string, features: Partial<TenantFeatures>) =>
    api.patch<{ success: boolean; data: AdminTenant }>(`/admin/tenants/${id}/features`, { features }),
};

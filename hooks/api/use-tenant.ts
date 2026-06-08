// smitparekh-web/hooks/api/use-tenant.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { tenantApi, adminTenantApi } from "@/lib/api/tenant";
import { queryKeys } from "@/lib/api/query-keys";
import { toast } from "@/lib/toast";
import type { BlogPreferences, ImproveMode } from "@/lib/blog-categories";

export function useMyTenant() {
  return useQuery({
    queryKey: queryKeys.tenant.me(),
    queryFn: async () => {
      try {
        const res = await tenantApi.getMe();
        return res.data;
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
    retry: false,
  });
}

export function useRegisterTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => tenantApi.register(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
      toast.success("Registered!", "Your blog tenant request has been submitted.");
    },
    onError: (err: ApiError) => toast.error("Registration failed", err.message),
  });
}

export function useRegenerateApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => tenantApi.regenerateKey(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
      toast.success("Key regenerated", "Your old API key is now invalid.");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useUpdateWebhook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { url?: string; enabled?: boolean }) => tenantApi.updateWebhook(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
      toast.success("Webhook saved");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useRegenerateWebhookSecret() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => tenantApi.regenerateWebhookSecret(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
      toast.success("Secret generated", "Copy it into your site's REVALIDATE_SECRET.");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useTestWebhook() {
  return useMutation({
    mutationFn: () => tenantApi.testWebhook(),
    onError: (err: ApiError) => toast.error("Test failed", err.message),
  });
}

export function useMyBlogs() {
  return useQuery({
    queryKey: queryKeys.tenant.myBlogs(),
    queryFn: () => tenantApi.listMyBlogs().then((r) => r.data),
    staleTime: 30_000,
  });
}

export function useCreateMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tenantApi.createMyBlog,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() }),
    onError: (err: ApiError) => toast.error("Failed to create blog", err.message),
  });
}

export function useUpdateMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof tenantApi.updateMyBlog>[1] }) =>
      tenantApi.updateMyBlog(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() });
      toast.success("Blog updated");
    },
    onError: (err: ApiError) => toast.error("Failed to update blog", err.message),
  });
}

export function useDeleteMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tenantApi.deleteMyBlog(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() });
      toast.success("Blog deleted");
    },
    onError: (err: ApiError) => toast.error("Failed to delete blog", err.message),
  });
}

export function usePublishMyBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tenantApi.publishMyBlog(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tenant.myBlogs() }),
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useUploadMyBlogImage() {
  return useMutation({
    mutationFn: (file: File) => tenantApi.uploadMyBlogImage(file),
    onError: (err: ApiError) => toast.error("Upload failed", err.message),
  });
}

// Admin hooks
export function useAdminTenants(status?: string) {
  return useQuery({
    queryKey: queryKeys.adminTenants.list(status),
    queryFn: () => adminTenantApi.list(status).then((r) => r.data),
    staleTime: 30_000,
  });
}

export function useApproveTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTenantApi.approve(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
      toast.success("Tenant approved");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useRejectTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => adminTenantApi.reject(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
      toast.success("Tenant rejected");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useSuspendTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTenantApi.suspend(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminTenants.all });
      toast.success("Tenant suspended");
    },
    onError: (err: ApiError) => toast.error("Failed", err.message),
  });
}

export function useGenerateMyBlog() {
  return useMutation({
    mutationFn: (prompt: string) => tenantApi.generateBlog(prompt),
  });
}

export function useUpdateMyPreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (prefs: Partial<BlogPreferences>) => tenantApi.updatePreferences(prefs),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
    },
  });
}

export function useGenerateMyTopics() {
  return useMutation({
    mutationFn: (category?: string) => tenantApi.generateTopics(category),
  });
}

export function useImproveMyContent() {
  return useMutation({
    mutationFn: ({ content, mode }: { content: string; mode: ImproveMode }) =>
      tenantApi.improveContent(content, mode),
  });
}

export function useRequestFeature() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (feature: string) => tenantApi.requestFeature(feature),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tenant.me() });
    },
  });
}

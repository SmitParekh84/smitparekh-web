"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsApi, queryKeys } from "@/lib/api";
import type { BackendBlogInput } from "@/types";

async function revalidateBlogs() {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag: "blogs" }),
    });
  } catch {
    // non-critical — ISR will expire on its own
  }
}

export function useBlogs() {
  return useQuery({
    queryKey: queryKeys.blogs.list(),
    queryFn: () => blogsApi.list().then((r) => r.data),
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: queryKeys.blogs.byId(id),
    queryFn: () => blogsApi.byId(id).then((r) => r.data),
    enabled: Boolean(id),
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.blogs.bySlug(slug),
    queryFn: () => blogsApi.bySlug(slug).then((r) => r.data),
    enabled: Boolean(slug),
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BackendBlogInput) => blogsApi.create(data),
    onSuccess: () => {
      revalidateBlogs();
      qc.invalidateQueries({ queryKey: queryKeys.blogs.all });
    },
  });
}

export function useUpdateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BackendBlogInput> }) =>
      blogsApi.update(id, data),
    onSuccess: () => {
      revalidateBlogs();
      qc.invalidateQueries({ queryKey: queryKeys.blogs.all });
    },
  });
}

export function useDeletedBlogs() {
  return useQuery({
    queryKey: queryKeys.blogs.deleted(),
    queryFn: () => blogsApi.listDeleted().then((r) => r.data),
  });
}

export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogsApi.remove(id),
    onSuccess: () => {
      revalidateBlogs();
      qc.invalidateQueries({ queryKey: queryKeys.blogs.all });
    },
  });
}

export function useRestoreBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogsApi.restore(id),
    onSuccess: () => {
      revalidateBlogs();
      qc.invalidateQueries({ queryKey: queryKeys.blogs.all });
    },
  });
}

export function usePermanentDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogsApi.removePermanent(id),
    onSuccess: () => {
      revalidateBlogs();
      qc.invalidateQueries({ queryKey: queryKeys.blogs.all });
    },
  });
}

export function useUploadBlogImage() {
  return useMutation({
    mutationFn: (file: File) => blogsApi.uploadImage(file),
  });
}

export function useBlogImages(enabled = true) {
  return useQuery({
    queryKey: queryKeys.blogs.images(),
    queryFn: () => blogsApi.listImages(),
    enabled,
    staleTime: 30_000,
  });
}

export function useDeleteBlogImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (publicId: string) => blogsApi.deleteImage(publicId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.images() }),
  });
}

export function useGenerateBlog() {
  return useMutation({
    mutationFn: (prompt: string) => blogsApi.generate(prompt),
  });
}

export function useGenerateBlogTopics() {
  return useMutation({
    mutationFn: (seed?: string) => blogsApi.generateTopics(seed),
  });
}

export function useGenerateBlogLinkedIn() {
  return useMutation({
    mutationFn: (payload: Parameters<typeof blogsApi.generateLinkedIn>[0]) =>
      blogsApi.generateLinkedIn(payload),
  });
}

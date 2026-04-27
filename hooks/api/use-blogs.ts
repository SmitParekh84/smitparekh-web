"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsApi, queryKeys } from "@/lib/api";
import type { BackendBlogInput } from "@/types";

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
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.all }),
  });
}

export function useUpdateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BackendBlogInput> }) =>
      blogsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.all }),
  });
}

export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.all }),
  });
}

export function useUploadBlogImage() {
  return useMutation({
    mutationFn: (file: File) => blogsApi.uploadImage(file),
  });
}

export function useGenerateBlog() {
  return useMutation({
    mutationFn: (prompt: string) => blogsApi.generate(prompt),
  });
}

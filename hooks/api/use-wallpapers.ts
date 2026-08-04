"use client";

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { wallpapersApi, queryKeys } from "@/lib/api";
import type { WallpaperListParams, WallpaperUpdateInput } from "@/types";

const PAGE_LIMIT = 24;

// Public: infinite-scroll list filtered by search/category/device.
export function useWallpapersInfinite(
  params: Omit<WallpaperListParams, "page" | "limit">
) {
  return useInfiniteQuery({
    queryKey: queryKeys.wallpapers.infinite(params),
    queryFn: ({ pageParam = 1 }) =>
      wallpapersApi.list({ ...params, page: pageParam, limit: PAGE_LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });
}

export function useWallpaperCategories() {
  return useQuery({
    queryKey: queryKeys.wallpapers.categories(),
    queryFn: () => wallpapersApi.categories().then((r) => r.data),
  });
}

// Public: related wallpapers (same category, excluding the current one).
export function useRelatedWallpapers(params: {
  category?: string;
  exclude: string;
}) {
  return useQuery({
    queryKey: queryKeys.wallpapers.list({ related: params }),
    queryFn: () =>
      wallpapersApi
        .list({ category: params.category, exclude: params.exclude, limit: 8 })
        .then((r) => r.data),
    enabled: Boolean(params.exclude),
  });
}

// Admin: full listing including drafts.
export function useAdminWallpapers() {
  return useQuery({
    queryKey: queryKeys.wallpapers.adminList(),
    queryFn: () => wallpapersApi.adminList().then((r) => r.data),
  });
}

export function useUploadWallpapers() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (files: File[]) => wallpapersApi.upload(files),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallpapers.all });
    },
  });
}

export function useUpdateWallpaper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WallpaperUpdateInput }) =>
      wallpapersApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallpapers.all });
    },
  });
}

export function useDeleteWallpaper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => wallpapersApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallpapers.all });
    },
  });
}

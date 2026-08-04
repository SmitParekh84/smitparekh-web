import type {
  Wallpaper,
  WallpaperCategory,
  WallpaperListParams,
  WallpaperListResponse,
  WallpaperUpdateInput,
} from "@/types";
import { api } from "./client";

interface OneResponse {
  success: boolean;
  data: Wallpaper;
}

interface CategoriesResponse {
  success: boolean;
  data: WallpaperCategory[];
}

interface AdminListResponse {
  success: boolean;
  count: number;
  data: Wallpaper[];
}

export interface UploadWallpapersResponse {
  success: boolean;
  data: Wallpaper[];
  errors: { file: string; message: string }[];
}

function toQuery(params: WallpaperListParams): string {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.category && params.category !== "All") sp.set("category", params.category);
  if (params.device) sp.set("device", params.device);
  if (params.exclude) sp.set("exclude", params.exclude);
  if (params.page) sp.set("page", String(params.page));
  if (params.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export const wallpapersApi = {
  list: (params: WallpaperListParams = {}) =>
    api.get<WallpaperListResponse>(`/wallpapers${toQuery(params)}`),
  categories: () => api.get<CategoriesResponse>("/wallpapers/categories"),
  bySlug: (slug: string) =>
    api.get<OneResponse>(`/wallpapers/slug/${encodeURIComponent(slug)}`),
  recordDownload: (id: string) =>
    api.post<{ success: boolean; downloads: number }>(`/wallpapers/${id}/download`),

  // Admin
  adminList: () => api.get<AdminListResponse>("/wallpapers/admin"),
  upload: (files: File[]) => {
    const form = new FormData();
    files.forEach((file) => form.append("images", file));
    return api.postForm<UploadWallpapersResponse>("/wallpapers/upload", form);
  },
  update: (id: string, data: WallpaperUpdateInput) =>
    api.patch<OneResponse>(`/wallpapers/${id}`, data),
  remove: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/wallpapers/${id}`),
};

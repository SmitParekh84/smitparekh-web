import type {
  BackendListResponse,
  BackendOneResponse,
  BackendBlog,
  BackendBlogInput,
} from "@/types";
import { api } from "./client";

export interface UploadBlogImageResponse {
  url: string;
}

export interface CloudinaryImage {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  createdAt: string;
}

export interface ListImagesResponse {
  success: boolean;
  images: CloudinaryImage[];
  nextCursor: string | null;
}

export interface GenerateBlogResponse {
  success: boolean;
  data: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    readMinutes: number;
  };
}

export interface GenerateBlogTopicsResponse {
  success: boolean;
  data: { topics: string[] };
}

export interface GenerateLinkedInResponse {
  success: boolean;
  data: {
    headline: string;
    body: string;
    hashtags: string[];
    charCount: number;
  };
}

export const blogsApi = {
  list: () => api.get<BackendListResponse<BackendBlog>>("/blogs"),
  byId: (id: string) => api.get<BackendOneResponse<BackendBlog>>(`/blogs/${id}`),
  bySlug: (slug: string) =>
    api.get<BackendOneResponse<BackendBlog>>(`/blogs/slug/${encodeURIComponent(slug)}`),
  create: (data: BackendBlogInput) =>
    api.post<BackendOneResponse<BackendBlog>>("/blogs", data),
  replace: (id: string, data: BackendBlogInput) =>
    api.put<BackendOneResponse<BackendBlog>>(`/blogs/${id}`, data),
  update: (id: string, data: Partial<BackendBlogInput>) =>
    api.patch<BackendOneResponse<BackendBlog>>(`/blogs/${id}`, data),
  remove: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/blogs/${id}`),
  listDeleted: () =>
    api.get<BackendListResponse<BackendBlog>>("/blogs/deleted"),
  restore: (id: string) =>
    api.post<BackendOneResponse<BackendBlog>>(`/blogs/${id}/restore`),
  removePermanent: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/blogs/${id}/permanent`),
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return api.postForm<UploadBlogImageResponse>("/blogs/upload", form);
  },
  listImages: () => api.get<ListImagesResponse>("/blogs/images"),
  deleteImage: (publicId: string) =>
    api.post<{ success: boolean }>("/blogs/images/delete", { publicId }),
  generate: (prompt: string) =>
    api.post<GenerateBlogResponse>("/blogs/generate", { prompt }),
  generateTopics: (seed?: string) =>
    api.post<GenerateBlogTopicsResponse>("/blogs/generate-topics", { seed: seed ?? "" }),
  generateLinkedIn: (payload: { title: string; content: string; excerpt?: string; tags?: string[]; category?: string }) =>
    api.post<GenerateLinkedInResponse>("/blogs/generate-linkedin", payload),
};

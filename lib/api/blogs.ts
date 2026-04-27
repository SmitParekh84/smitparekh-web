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
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return api.postForm<UploadBlogImageResponse>("/blogs/upload", form);
  },
};

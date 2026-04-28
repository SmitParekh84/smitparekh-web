import type {
  BackendListResponse,
  BackendOneResponse,
  BackendProject,
  BackendProjectInput,
} from "@/types";
import { api } from "./client";

export interface UploadImageResponse {
  url: string;
}

export interface ListProjectImagesResponse {
  success: boolean;
  images: import("./blogs").CloudinaryImage[];
  nextCursor: string | null;
}

export interface GenerateProjectResponse {
  success: boolean;
  data: BackendProjectInput & { detailMarkdown: string };
}

export const projectsApi = {
  list: () => api.get<BackendListResponse<BackendProject>>("/projects"),
  byId: (id: string) => api.get<BackendOneResponse<BackendProject>>(`/projects/${id}`),
  byTitle: (title: string) =>
    api.get<BackendOneResponse<BackendProject>>(`/projects/title/${encodeURIComponent(title)}`),
  bySlug: (slug: string) =>
    api.get<BackendOneResponse<BackendProject>>(`/projects/slug/${encodeURIComponent(slug)}`),
  create: (data: BackendProjectInput) =>
    api.post<BackendOneResponse<BackendProject>>("/projects", data),
  replace: (id: string, data: BackendProjectInput) =>
    api.put<BackendOneResponse<BackendProject>>(`/projects/${id}`, data),
  update: (id: string, data: Partial<BackendProjectInput>) =>
    api.patch<BackendOneResponse<BackendProject>>(`/projects/${id}`, data),
  remove: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/projects/${id}`),
  listDeleted: () =>
    api.get<BackendListResponse<BackendProject>>("/projects/deleted"),
  restore: (id: string) =>
    api.post<BackendOneResponse<BackendProject>>(`/projects/${id}/restore`),
  removePermanent: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/projects/${id}/permanent`),
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return api.postForm<UploadImageResponse>("/upload", form);
  },
  listImages: () => api.get<ListProjectImagesResponse>("/projects/images"),
  deleteImage: (publicId: string) =>
    api.post<{ success: boolean }>("/projects/images/delete", { publicId }),
  generate: (params: { mode: "rewrite" | "idea"; prompt: string }) =>
    api.post<GenerateProjectResponse>("/projects/generate", params),
};

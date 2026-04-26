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

export const projectsApi = {
  list: () => api.get<BackendListResponse<BackendProject>>("/projects"),
  byId: (id: string) => api.get<BackendOneResponse<BackendProject>>(`/projects/${id}`),
  byTitle: (title: string) =>
    api.get<BackendOneResponse<BackendProject>>(`/projects/title/${encodeURIComponent(title)}`),
  create: (data: BackendProjectInput) =>
    api.post<BackendOneResponse<BackendProject>>("/projects", data),
  replace: (id: string, data: BackendProjectInput) =>
    api.put<BackendOneResponse<BackendProject>>(`/projects/${id}`, data),
  update: (id: string, data: Partial<BackendProjectInput>) =>
    api.patch<BackendOneResponse<BackendProject>>(`/projects/${id}`, data),
  remove: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/projects/${id}`),
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return api.postForm<UploadImageResponse>("/upload", form);
  },
};

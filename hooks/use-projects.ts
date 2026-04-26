"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  BackendProject,
  BackendProjectInput,
  BackendListResponse,
  BackendOneResponse,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function authHeaders(): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      api
        .get<BackendListResponse<BackendProject>>("/projects")
        .then((r) => r.data),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () =>
      api
        .get<BackendOneResponse<BackendProject>>(`/projects/${id}`)
        .then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BackendProjectInput) =>
      api.post<BackendOneResponse<BackendProject>>("/projects", data, {
        headers: authHeaders(),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<BackendProjectInput>;
    }) =>
      api.patch<BackendOneResponse<BackendProject>>(`/projects/${id}`, data, {
        headers: authHeaders(),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.del<{ success: boolean; message: string }>(`/projects/${id}`, {
        headers: authHeaders(),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUploadProjectImage() {
  return useMutation({
    mutationFn: async (file: File): Promise<{ url: string }> => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("admin_token")
          : null;
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error("Image upload failed");
      return res.json() as Promise<{ url: string }>;
    },
  });
}

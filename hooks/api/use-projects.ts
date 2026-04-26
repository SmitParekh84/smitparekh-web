"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi, queryKeys } from "@/lib/api";
import type { BackendProjectInput } from "@/types";

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects.list(),
    queryFn: () => projectsApi.list().then((r) => r.data),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.byId(id),
    queryFn: () => projectsApi.byId(id).then((r) => r.data),
    enabled: Boolean(id),
  });
}

export function useProjectByTitle(title: string) {
  return useQuery({
    queryKey: queryKeys.projects.byTitle(title),
    queryFn: () => projectsApi.byTitle(title).then((r) => r.data),
    enabled: Boolean(title),
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BackendProjectInput) => projectsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BackendProjectInput> }) =>
      projectsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}

export function useReplaceProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BackendProjectInput }) =>
      projectsApi.replace(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}

export function useUploadProjectImage() {
  return useMutation({
    mutationFn: (file: File) => projectsApi.uploadImage(file),
  });
}

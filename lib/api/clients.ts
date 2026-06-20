import { api } from "./client";
import type {
  Client,
  ClientInvitation,
  ClientRequirements,
  ClientProject,
  ProjectStepPatch,
} from "@/types";

export const clientsApi = {
  /* Admin */
  invite: (payload: { email: string; name?: string; company?: string; message?: string }) =>
    api.post<{ success: boolean; message: string }>("/clients/invite", payload),

  list: () => api.get<{ success: boolean; data: Client[]; total: number }>("/clients"),

  getById: (id: string) =>
    api.get<{ success: boolean; data: Client }>(`/clients/${id}`),

  updateStatus: (id: string, status: string) =>
    api.patch<{ success: boolean; data: Client }>(`/clients/${id}/status`, { status }),

  getRequirements: (clientId: string) =>
    api.get<{ success: boolean; data: ClientRequirements }>(`/clients/${clientId}/requirements`),

  getProject: (clientId: string) =>
    api.get<{ success: boolean; data: ClientProject }>(`/clients/${clientId}/project`),

  updateProjectStep: (
    clientId: string,
    stepKey: string,
    patch: ProjectStepPatch,
    notify = false
  ) =>
    api.patch<{ success: boolean; data: ClientProject }>(
      `/clients/${clientId}/project/steps/${stepKey}`,
      { ...patch, notify }
    ),

  regenerateProject: (clientId: string) =>
    api.post<{ success: boolean; data: ClientProject }>(`/clients/${clientId}/project/regenerate`),

  addProjectStep: (
    clientId: string,
    payload: { label: string; serviceLabel?: string; phase?: string }
  ) =>
    api.post<{ success: boolean; data: ClientProject }>(
      `/clients/${clientId}/project/steps`,
      payload
    ),

  deleteProjectStep: (clientId: string, stepKey: string) =>
    api.del<{ success: boolean; data: ClientProject }>(
      `/clients/${clientId}/project/steps/${stepKey}`
    ),

  reorderProjectSteps: (clientId: string, order: string[]) =>
    api.patch<{ success: boolean; data: ClientProject }>(
      `/clients/${clientId}/project/steps/reorder`,
      { order }
    ),

  /* Onboarding (public - no auth token) */
  validateInvitation: (token: string) =>
    api.get<{ success: boolean; data: ClientInvitation }>(`/clients/invite/validate/${token}`),

  onboard: (
    token: string,
    payload: { name: string; mobile?: string; password: string }
  ) =>
    api.post<{ success: boolean; message: string; token: string }>(
      "/clients/onboard",
      { token, ...payload }
    ),

  /* Client (self) */
  submitRequirements: (data: Omit<ClientRequirements, "_id" | "clientId" | "submittedAt" | "createdAt" | "updatedAt">) =>
    api.post<{ success: boolean; data: ClientRequirements }>("/clients/requirements", data),

  getMyRequirements: () =>
    api.get<{ success: boolean; data: ClientRequirements | null }>("/clients/requirements/me"),

  getMe: () =>
    api.get<{ success: boolean; data: Client }>("/clients/me"),

  updateMe: (payload: { name?: string; company?: string; mobile?: string }) =>
    api.patch<{ success: boolean; data: Client }>("/clients/me", payload),

  getMyProject: () =>
    api.get<{ success: boolean; data: ClientProject | null }>("/clients/project/me"),
};

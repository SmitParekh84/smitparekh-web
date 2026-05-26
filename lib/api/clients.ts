import { api } from "./client";
import type { Client, ClientInvitation, ClientRequirements } from "@/types";

export const clientsApi = {
  /* Admin */
  invite: (email: string) =>
    api.post<{ success: boolean; message: string }>("/clients/invite", { email }),

  list: () => api.get<{ success: boolean; data: Client[]; total: number }>("/clients"),

  getById: (id: string) =>
    api.get<{ success: boolean; data: Client }>(`/clients/${id}`),

  updateStatus: (id: string, status: string) =>
    api.patch<{ success: boolean; data: Client }>(`/clients/${id}/status`, { status }),

  getRequirements: (clientId: string) =>
    api.get<{ success: boolean; data: ClientRequirements }>(`/clients/${clientId}/requirements`),

  /* Onboarding (public — no auth token) */
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
};

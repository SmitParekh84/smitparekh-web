import { api } from "./client";
import type { ClientContract } from "@/types";

export const contractsApi = {
  /* Client (self) */
  getMine: () =>
    api.get<{ success: boolean; data: ClientContract | null }>("/clients/contract/me"),

  sign: (signature: string) =>
    api.post<{ success: boolean; data: ClientContract }>("/clients/contract/sign", { signature }),

  downloadMine: () =>
    api.get<Blob>("/clients/contract/download", { responseType: "blob" }),

  /* Admin */
  getForClient: (clientId: string) =>
    api.get<{ success: boolean; data: ClientContract | null }>(`/clients/${clientId}/contract`),

  uploadTemplate: (clientId: string, file: File) => {
    const form = new FormData();
    form.append("template", file);
    return api.postForm<{ success: boolean; data: ClientContract }>(
      `/clients/${clientId}/contract/template`,
      form,
    );
  },

  downloadForClient: (clientId: string) =>
    api.get<Blob>(`/clients/${clientId}/contract/download`, { responseType: "blob" }),
};

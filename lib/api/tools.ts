import { api } from "./client";

export interface NotifyToolPayload {
  email: string;
  tool: string;
}

export interface NotifyToolResponse {
  success: boolean;
}

export const toolsApi = {
  notify: (payload: NotifyToolPayload) =>
    api.post<NotifyToolResponse>("/tools/notify", payload),
};

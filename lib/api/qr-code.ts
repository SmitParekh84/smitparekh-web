import { api, apiClient } from "./client";

export interface QrCodePayload {
  text: string;
  size?: number;
  color?: string;
  background?: string;
}

export interface QrCodeResponse {
  success: boolean;
  dataUrl: string;
}

export const qrCodeApi = {
  generate: (payload: QrCodePayload) => api.post<QrCodeResponse>("/qr-code", payload),
  generateImage: async (payload: QrCodePayload): Promise<Blob> => {
    const res = await apiClient.post<Blob>("/qr-code/image", payload, {
      responseType: "blob",
    });
    return res.data;
  },
};

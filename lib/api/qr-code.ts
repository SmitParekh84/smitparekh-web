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

function toBackendPayload(payload: QrCodePayload) {
  return {
    content: payload.text,
    size: payload.size,
    color: payload.color,
    backgroundColor: payload.background,
  };
}

export const qrCodeApi = {
  generate: (payload: QrCodePayload) => api.post<QrCodeResponse>("/qr-code", toBackendPayload(payload)),
  generateImage: async (payload: QrCodePayload): Promise<Blob> => {
    const res = await apiClient.post<Blob>("/qr-code/image", toBackendPayload(payload), {
      responseType: "blob",
    });
    return res.data;
  },
};

import { api } from "./client";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface ContactResponse {
  success?: boolean;
  message: string;
}

export interface CvDownloadPayload {
  name: string;
  email: string;
}

export const contactApi = {
  submit: (payload: ContactPayload) => api.post<ContactResponse>("/contact", payload),
  cvDownload: (payload: CvDownloadPayload) =>
    api.post<ContactResponse>("/cv-downloads", payload),
};

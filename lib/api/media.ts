import { api } from "./client";

export interface LinkedInMediaPayload {
  url: string;
}

export interface LinkedInMediaResponse {
  success: boolean;
  mediaUrl?: string;
  type?: "image" | "video";
  message?: string;
}

export const mediaApi = {
  downloadLinkedIn: (payload: LinkedInMediaPayload) =>
    api.post<LinkedInMediaResponse>("/linkedin-media-download", payload),
};

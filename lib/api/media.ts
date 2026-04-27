import { api } from "./client";

export interface LinkedInMediaPayload {
  url: string;
}

export interface LinkedInMediaResponse {
  mediaUrl: string;
  type: "image" | "video";
}

export const mediaApi = {
  downloadLinkedIn: async (payload: LinkedInMediaPayload): Promise<LinkedInMediaResponse> => {
    // Try video first, fall back to photo
    for (const mediaType of ["video", "photo"] as const) {
      try {
        const res = await api.post<{ success: boolean; mediaType: string; media: string[] }>(
          "/linkedin-media-download",
          { url: payload.url, mediaType },
        );
        if (res.success && res.media?.length) {
          return { mediaUrl: res.media[0], type: mediaType === "video" ? "video" : "image" };
        }
      } catch {
        // try next type
      }
    }
    throw new Error("No downloadable media found in this post.");
  },
};

import { api } from "./client";

export type SharePlatform = "linkedin" | "x";
export type ShareKind = "blog" | "project";

export interface GenerateShareCaptionPayload {
  kind: ShareKind;
  id: string;
  platform: SharePlatform;
  url: string;
}

export interface GenerateShareCaptionResponse {
  success: boolean;
  data: { caption: string };
}

export const socialApi = {
  generateCaption: (payload: GenerateShareCaptionPayload) =>
    api.post<GenerateShareCaptionResponse>("/social/share-caption", payload),
};

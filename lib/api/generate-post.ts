import { api } from "./client";

export interface GeneratePostPayload {
  topic: string;
  tone?: string;
  length?: "short" | "medium" | "long";
  audience?: string;
}

export interface GeneratePostResponse {
  success: boolean;
  post: string;
}

export const generatePostApi = {
  generate: (payload: GeneratePostPayload) =>
    api.post<GeneratePostResponse>("/generate-post", payload),
};

import { api } from "./client";

export interface FeedbackPayload {
  name?: string;
  email?: string;
  rating?: number;
  message: string;
}

export interface FeedbackEntry {
  _id: string;
  name?: string;
  email?: string;
  rating?: number;
  message: string;
  createdAt: string;
}

export const feedbackApi = {
  submit: (payload: FeedbackPayload) =>
    api.post<{ success: boolean; message: string }>("/feedback", payload),
  list: () => api.get<{ success: boolean; data: FeedbackEntry[] }>("/feedback"),
};

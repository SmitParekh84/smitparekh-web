import { api } from "./client";

export type FeedbackType = "feedback" | "bug";
export type FeedbackStatus = "open" | "in_review" | "resolved";

export interface FeedbackPayload {
  name: string;
  email: string;
  type?: FeedbackType;
  title: string;
  message: string;
  rating?: number;
  supabaseUserId?: string;
}

export interface FeedbackEntry {
  _id: string;
  name: string;
  email: string;
  type: FeedbackType;
  title: string;
  message: string;
  rating?: number;
  status: FeedbackStatus;
  isPublic: boolean;
  supabaseUserId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackListResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  data: FeedbackEntry[];
}

export interface AdminFeedbackListResponse extends FeedbackListResponse {
  stats: Array<{ _id: { type: FeedbackType; status: FeedbackStatus }; count: number }>;
}

export const feedbackApi = {
  // Public
  submit: (payload: FeedbackPayload) =>
    api.post<{ success: boolean; message: string }>("/feedback", payload),
  listPublic: (params?: { type?: FeedbackType; page?: number; limit?: number }) =>
    api.get<FeedbackListResponse>("/feedback", { params }),

  // Admin
  adminList: (params?: { type?: FeedbackType; status?: FeedbackStatus; page?: number; limit?: number }) =>
    api.get<AdminFeedbackListResponse>("/admin/feedback", { params }),
  adminUpdate: (id: string, body: { status?: FeedbackStatus; isPublic?: boolean }) =>
    api.patch<{ success: boolean; data: FeedbackEntry }>(`/admin/feedback/${id}`, body),
  adminDelete: (id: string) =>
    api.del<{ success: boolean; message: string }>(`/admin/feedback/${id}`),
};

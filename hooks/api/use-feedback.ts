"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  feedbackApi,
  adminWaitlistApi,
  queryKeys,
  type FeedbackPayload,
  type FeedbackType,
  type FeedbackStatus,
} from "@/lib/api";

// ── Public ─────────────────────────────────────────────────────────────────

export function usePublicFeedback(params?: { type?: FeedbackType; page?: number }) {
  return useQuery({
    queryKey: queryKeys.feedback.list(),
    queryFn: () => feedbackApi.listPublic(params).then((r) => r),
  });
}

export function useSubmitFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: FeedbackPayload) => feedbackApi.submit(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.feedback.all }),
  });
}

// ── Admin ───────────────────────────────────────────────────────────────────

export function useAdminFeedbackList(params?: {
  type?: FeedbackType;
  status?: FeedbackStatus;
  page?: number;
}) {
  return useQuery({
    queryKey: queryKeys.feedback.adminList(params),
    queryFn: () => feedbackApi.adminList(params).then((r) => r),
  });
}

export function useAdminUpdateFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: { status?: FeedbackStatus; isPublic?: boolean } }) =>
      feedbackApi.adminUpdate(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.feedback.all }),
  });
}

export function useAdminDeleteFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => feedbackApi.adminDelete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.feedback.all }),
  });
}

// ── Waitlist ────────────────────────────────────────────────────────────────

export function useAdminWaitlist() {
  return useQuery({
    queryKey: queryKeys.adminWaitlist.list(),
    queryFn: () => adminWaitlistApi.list().then((r) => r),
  });
}

// Backward compat export (admin feedback page used useFeedbackList)
export { useAdminFeedbackList as useFeedbackList };

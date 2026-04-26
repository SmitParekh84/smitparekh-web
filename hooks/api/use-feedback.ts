"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { feedbackApi, queryKeys, type FeedbackPayload } from "@/lib/api";

export function useFeedbackList() {
  return useQuery({
    queryKey: queryKeys.feedback.list(),
    queryFn: () => feedbackApi.list().then((r) => r.data),
  });
}

export function useSubmitFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: FeedbackPayload) => feedbackApi.submit(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.feedback.all }),
  });
}

"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  resumeEventsApi,
  queryKeys,
  type ResumeEventType,
} from "@/lib/api";

/**
 * Fire-and-forget mutation for tracking resume events.
 * Errors are silently swallowed so that analytics never block the user.
 */
export function useTrackResumeEvent() {
  return useMutation({
    mutationFn: (type: ResumeEventType) => resumeEventsApi.track(type),
    // Swallow errors - analytics should never surface failures to the user.
    onError: () => {},
    retry: false,
  });
}

export function useResumeEventStats(days = 30) {
  return useQuery({
    queryKey: queryKeys.resumeEvents.stats(days),
    queryFn: () => resumeEventsApi.getStats(days),
  });
}

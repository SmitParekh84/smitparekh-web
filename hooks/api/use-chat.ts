"use client";

import { useQuery } from "@tanstack/react-query";
import { listChatSessions, getChatSession, queryKeys } from "@/lib/api";

export function useChatSessions(
  params: { page?: number; limit?: number; search?: string } = {},
) {
  return useQuery({
    queryKey: queryKeys.chat.sessions(params),
    queryFn: () => listChatSessions(params),
    staleTime: 30_000,
  });
}

export function useChatSession(sessionId: string | null) {
  return useQuery({
    queryKey: queryKeys.chat.session(sessionId ?? ""),
    queryFn: () => getChatSession(sessionId as string),
    enabled: !!sessionId,
    staleTime: 30_000,
  });
}

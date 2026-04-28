import { api } from "./client";
import type { ChatMessage } from "@/lib/stores/chat-store";

type ChatRequestMessage = { role: "user" | "assistant"; content: string };

export type ChatReplySource = "gemini" | "canned" | "banned";

type ChatResponse = {
  success: boolean;
  reply?: string;
  message?: string;
  source?: ChatReplySource;
  cannedId?: string;
};

export async function sendChatMessage(
  messages: ChatMessage[],
  pagePath?: string,
  sessionId?: string,
): Promise<{ reply: string; source?: ChatReplySource; cannedId?: string }> {
  const payload: {
    messages: ChatRequestMessage[];
    pagePath?: string;
    sessionId?: string;
  } = {
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  };
  if (pagePath) payload.pagePath = pagePath;
  if (sessionId) payload.sessionId = sessionId;

  const res = await api.post<ChatResponse>("/chat", payload);
  if (!res.success || !res.reply) {
    throw new Error(res.message || "Empty response from chat service");
  }
  return { reply: res.reply, source: res.source, cannedId: res.cannedId };
}

// ---------- Admin ----------

export type ChatSessionListItem = {
  sessionId: string;
  firstPagePath: string;
  lastPagePath: string;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
  preview: string;
  lastReplyPreview: string;
  lastReplySource: "user" | "gemini" | "canned" | "banned" | "error" | null;
};

export type ChatSessionMessage = {
  role: "user" | "assistant";
  content: string;
  source: "user" | "gemini" | "canned" | "banned" | "error";
  cannedId?: string;
  createdAt: string;
};

export type ChatSessionDetail = {
  _id: string;
  sessionId: string;
  firstPagePath: string;
  lastPagePath: string;
  userAgent: string;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatSessionMessage[];
};

export type ChatSessionListResponse = {
  success: boolean;
  data: {
    sessions: ChatSessionListItem[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export async function listChatSessions(
  params: { page?: number; limit?: number; search?: string } = {},
): Promise<ChatSessionListResponse["data"]> {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  const res = await api.get<ChatSessionListResponse>(
    `/chat/sessions${qs ? `?${qs}` : ""}`,
  );
  return res.data;
}

export async function getChatSession(sessionId: string): Promise<ChatSessionDetail> {
  const res = await api.get<{ success: boolean; data: ChatSessionDetail }>(
    `/chat/sessions/${encodeURIComponent(sessionId)}`,
  );
  return res.data;
}

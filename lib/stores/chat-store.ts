import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

type ChatState = {
  isOpen: boolean;
  messages: ChatMessage[];
  isSending: boolean;
  error: string | null;
  sessionId: string;

  open: () => void;
  close: () => void;
  toggle: () => void;
  appendMessage: (msg: ChatMessage) => void;
  patchLastAssistant: (content: string) => void;
  setSending: (v: boolean) => void;
  setError: (err: string | null) => void;
  reset: () => void;
};

const SESSION_KEY = "sp-chat-session-id";

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const newSessionId = () => `s_${newId().replace(/-/g, "").slice(0, 24)}`;

const loadSessionId = (): string => {
  if (typeof window === "undefined") return newSessionId();
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing && /^[A-Za-z0-9_-]{8,64}$/.test(existing)) return existing;
    const fresh = newSessionId();
    window.localStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return newSessionId();
  }
};

const persistSessionId = (id: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_KEY, id);
  } catch {
    /* noop */
  }
};

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [],
  isSending: false,
  error: null,
  // SSR-safe: use a placeholder; real id is hydrated client-side via hydrateChatSession()
  sessionId: "",

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),

  appendMessage: (msg) =>
    set((s) => ({ messages: [...s.messages, msg], error: null })),

  patchLastAssistant: (content) =>
    set((s) => {
      const i = [...s.messages].reverse().findIndex((m) => m.role === "assistant");
      if (i === -1) return s;
      const idx = s.messages.length - 1 - i;
      const next = s.messages.slice();
      next[idx] = { ...next[idx], content };
      return { messages: next };
    }),

  setSending: (v) => set({ isSending: v }),
  setError: (err) => set({ error: err }),
  reset: () => {
    const fresh = newSessionId();
    persistSessionId(fresh);
    set({ messages: [], isSending: false, error: null, sessionId: fresh });
  },
}));

/**
 * Call once on the client (e.g. inside ChatWidget useEffect) to hydrate the
 * sessionId from localStorage. Avoids SSR/CSR mismatches.
 */
export const hydrateChatSession = () => {
  const current = useChatStore.getState().sessionId;
  if (current) return;
  useChatStore.setState({ sessionId: loadSessionId() });
};

export const useChatUI = () =>
  useChatStore(
    useShallow((s) => ({
      isOpen: s.isOpen,
      open: s.open,
      close: s.close,
      toggle: s.toggle,
    })),
  );

export const useChatConversation = () =>
  useChatStore(
    useShallow((s) => ({
      messages: s.messages,
      isSending: s.isSending,
      error: s.error,
    })),
  );

export const newMessage = (role: ChatRole, content: string): ChatMessage => ({
  id: newId(),
  role,
  content,
  createdAt: Date.now(),
});

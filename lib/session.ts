const SESSION_KEY = "sp_session_id";

/**
 * Returns a stable per-browser session UUID, persisted in `localStorage`.
 * Used to track guest tool usage server-side. Returns `""` during SSR.
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

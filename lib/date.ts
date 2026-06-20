const LOCALE = "en-GB";
const ADMIN_TZ = "America/New_York"; // US Eastern
const CONTENT_TZ = "UTC"; // authored dates stored as UTC

function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "7 May 2025" - for authored content dates (blog, portfolio) shown publicly */
export function formatDate(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "";
  return d.toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: CONTENT_TZ,
  });
}

/** "7 May 2025, 20:02" - for admin UIs (IST) */
export function formatDateTime(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "";
  return d.toLocaleString(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ADMIN_TZ,
  });
}

/** "20:02" - for chat message timestamps (IST) */
export function formatTime(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "";
  return d.toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ADMIN_TZ,
  });
}

/** "just now" / "2h ago" / "3d ago" / falls back to formatDateTime() */
export function formatRelative(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "";
  const diffMs = Date.now() - d.getTime();
  const secs = Math.floor(diffMs / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDateTime(d);
}

/** "2025-05-07" - UTC date string for quota keys; intentionally UTC */
export function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Full ISO 8601 string: "2025-05-07T14:32:00.000Z" */
export function nowISO(): string {
  return new Date().toISOString();
}

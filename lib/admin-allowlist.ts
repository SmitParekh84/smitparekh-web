/**
 * Admin email allowlist.
 * Set ADMIN_EMAILS in env (comma-separated). If unset, NO ONE passes
 * (locked-down by default). For local dev, set to your email.
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

/**
 * Public list (lowercased) — exposed to client via NEXT_PUBLIC_ADMIN_EMAILS
 * for AdminGuard. Server-side checks should use the non-public version.
 */
export function getPublicAdminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

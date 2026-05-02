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

// NOTE: Admin identity is intentionally NOT exposed to the browser.
// All admin checks use ADMIN_EMAILS (server-only, no NEXT_PUBLIC_ prefix).

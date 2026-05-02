import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

/**
 * Extract client IP from common proxy headers.
 * Vercel sets `x-forwarded-for`; Cloudflare sets `cf-connecting-ip`.
 */
export function getClientIp(request: NextRequest): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

/**
 * Hash an IP with the server-side salt. Returns first 32 hex chars.
 * If the salt isn't configured we still hash (with empty salt) so quotas keep
 * working — but operators should set IP_HASH_SALT to make hashes non-rainbow-attackable.
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(ip + salt).digest("hex").slice(0, 32);
}

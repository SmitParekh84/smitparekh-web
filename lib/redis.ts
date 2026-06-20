import { Redis } from "@upstash/redis";

/**
 * Optional Upstash Redis (REST) client.
 *
 * Returns `null` when the REST env vars are absent so every caller can fall
 * back to the Supabase source of truth. This keeps the Redis layer **purely
 * additive** - tool quotas keep working with Redis disabled, and the fast
 * path simply switches on once `UPSTASH_REDIS_REST_URL` /
 * `UPSTASH_REDIS_REST_TOKEN` are set (Vercel + local `.env`).
 */
function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export const redis = createRedis();

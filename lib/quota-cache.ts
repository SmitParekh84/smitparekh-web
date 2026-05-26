import { redis } from "@/lib/redis";

/**
 * Redis read-cache for tool-usage quota counts.
 *
 * Supabase `tool_usage` stays the source of truth (durable history, admin
 * stats). Redis holds per-day counters so the badge `GET` and the consume
 * `POST` avoid SQL `COUNT` queries on the hot path. Every counter expires at
 * UTC midnight — the same boundary the `date` column rolls over on.
 *
 * All helpers fail safe: any Redis error (or Redis disabled) falls through to
 * the Supabase fallback, preserving the original behaviour exactly.
 */

type CounterKind = "u" | "s" | "i"; // user_id | session_id | ip_hash

/** Seconds remaining until the next UTC midnight (min 60s as a floor). */
function secondsUntilUtcMidnight(): number {
  const now = new Date();
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  return Math.max(60, Math.ceil((next - now.getTime()) / 1000));
}

/** `q:{slug}:{date}:{kind}:{id}` — e.g. `q:ats-resume-checker:2026-05-23:i:ab12…`. */
export function quotaKey(
  slug: string,
  date: string,
  kind: CounterKind,
  id: string,
): string {
  return `q:${slug}:${date}:${kind}:${id}`;
}

/**
 * Read a counter from Redis. On a cold/missing key (or any Redis failure) it
 * calls `countFromDb`, seeds Redis for subsequent reads, and returns the DB
 * value. Seeding before any consume keeps Redis aligned with pre-existing
 * Supabase rows when Redis is enabled mid-day.
 */
export async function getCachedCount(
  key: string,
  countFromDb: () => Promise<number>,
): Promise<number> {
  if (redis) {
    try {
      const cached = await redis.get<number>(key);
      if (typeof cached === "number") return cached;

      const dbCount = await countFromDb();
      // NX so a concurrent consume's INCR is never clobbered back down.
      await redis.set(key, dbCount, { ex: secondsUntilUtcMidnight(), nx: true });
      return dbCount;
    } catch {
      /* Redis unavailable — fall through to the DB. */
    }
  }
  return countFromDb();
}

/**
 * Increment one or more counters after a usage row is written. Best-effort:
 * Supabase already recorded the truth, so Redis errors are swallowed. Keys are
 * (re)expired to UTC midnight on every bump so the TTL tracks the current day.
 */
export async function incrementCounters(keys: string[]): Promise<void> {
  if (!redis || keys.length === 0) return;
  try {
    const ttl = secondsUntilUtcMidnight();
    const pipe = redis.pipeline();
    for (const key of keys) {
      pipe.incr(key);
      pipe.expire(key, ttl);
    }
    await pipe.exec();
  } catch {
    /* Source of truth is already in Supabase — safe to ignore. */
  }
}

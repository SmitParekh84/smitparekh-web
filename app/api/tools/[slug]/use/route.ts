import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getClientIp, hashIp } from "@/lib/ip-hash";

/**
 * Quota gate for any tool invocation.
 *
 * Hybrid guest tracking — counts the MAX of three signals (whichever is highest):
 *   - localStorage session UUID  (X-Session-ID header)
 *   - IP hash                    (sha256(ip + IP_HASH_SALT))
 *   - signed-in user_id          (when authenticated)
 *
 * IP-based count is divided by IP_QUOTA_MULTIPLIER (default 3) so users
 * sharing a CGNAT or office network aren't unfairly throttled.
 */

const IP_QUOTA_MULTIPLIER = Number(process.env.IP_QUOTA_MULTIPLIER || 3);

type Tier = "guest" | "user";

interface CallerIdentity {
  userId: string | null;
  sessionId: string | null;
  ipHash: string;
}

async function identifyCaller(request: NextRequest): Promise<CallerIdentity> {
  const sessionId = request.headers.get("x-session-id")?.trim() || null;
  const ipHash = hashIp(getClientIp(request));

  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const admin = createAdminClient();
      if (admin) {
        const { data: row } = await admin
          .from("users")
          .select("id")
          .eq("supabase_auth_id", user.id)
          .maybeSingle();
        userId = row?.id ?? null;
      }
    }
  } catch {
    /* ignore */
  }

  return { userId, sessionId, ipHash };
}

void 0; // placeholder removed

/** Shared logic for both POST (consume) and GET (status). */
async function loadCounts(
  request: NextRequest,
  slug: string,
): Promise<
  | { ok: false; reason: "no-config" | "inactive" | "no-admin" | "missing-session" }
  | {
      ok: true;
      tier: Tier;
      quota: number;
      used: number;
      caller: CallerIdentity;
      isGuest: boolean;
    }
> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, reason: "no-admin" };

  const { data: config } = await admin
    .from("tool_config")
    .select("guest_quota, user_quota, is_active")
    .eq("slug", slug)
    .maybeSingle();

  if (!config) return { ok: false, reason: "no-config" };
  if (!config.is_active) return { ok: false, reason: "inactive" };

  const caller = await identifyCaller(request);
  const isGuest = !caller.userId;
  const quota = isGuest ? config.guest_quota : config.user_quota;

  if (quota === 0) {
    return { ok: true, tier: isGuest ? "guest" : "user", quota: 0, used: 0, caller, isGuest };
  }

  const today = new Date().toISOString().slice(0, 10);

  if (!isGuest) {
    const { count } = await admin
      .from("tool_usage")
      .select("id", { count: "exact", head: true })
      .eq("tool_slug", slug)
      .eq("date", today)
      .eq("user_id", caller.userId);
    return {
      ok: true,
      tier: "user",
      quota,
      used: count ?? 0,
      caller,
      isGuest: false,
    };
  }

  // Guest: hybrid count = max(session_count, ceil(ip_count / multiplier))
  if (!caller.sessionId) {
    return { ok: false, reason: "missing-session" };
  }

  const [{ count: sessionCount }, { count: ipCount }] = await Promise.all([
    admin
      .from("tool_usage")
      .select("id", { count: "exact", head: true })
      .eq("tool_slug", slug)
      .eq("date", today)
      .eq("session_id", caller.sessionId),
    admin
      .from("tool_usage")
      .select("id", { count: "exact", head: true })
      .eq("tool_slug", slug)
      .eq("date", today)
      .eq("ip_hash", caller.ipHash),
  ]);

  const sCount = sessionCount ?? 0;
  const iScaled = Math.ceil((ipCount ?? 0) / Math.max(1, IP_QUOTA_MULTIPLIER));
  const used = Math.max(sCount, iScaled);

  return { ok: true, tier: "guest", quota, used, caller, isGuest: true };
}

/** POST — consume a quota slot. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const result = await loadCounts(request, slug);

  if (!result.ok) {
    if (result.reason === "missing-session") {
      return NextResponse.json({ error: "Missing X-Session-ID header" }, { status: 400 });
    }
    // no-config / inactive / no-admin → fail open
    return NextResponse.json({ allowed: true, remaining: null, unlimited: true });
  }

  const { tier, quota, used, caller, isGuest } = result;

  if (quota === 0) {
    return NextResponse.json({ allowed: true, remaining: null, unlimited: true, tier });
  }

  if (used >= quota) {
    return NextResponse.json(
      { allowed: false, code: "QUOTA_EXCEEDED", remaining: 0, quota, tier },
      { status: 429 },
    );
  }

  const admin = createAdminClient()!;
  const { error: insertErr } = await admin.from("tool_usage").insert({
    tool_slug: slug,
    user_id: caller.userId,
    session_id: isGuest ? caller.sessionId : null,
    ip_hash: isGuest ? caller.ipHash : null,
  });

  if (insertErr) {
    return NextResponse.json({ allowed: true, remaining: null, unlimited: false, tier });
  }

  return NextResponse.json({
    allowed: true,
    remaining: Math.max(0, quota - used - 1),
    quota,
    tier,
  });
}

/** GET — read-only quota status (does not consume). Used to show "X of Y left". */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const result = await loadCounts(request, slug);

  if (!result.ok) {
    return NextResponse.json({
      allowed: true,
      remaining: null,
      unlimited: true,
    });
  }

  const { tier, quota, used } = result;
  if (quota === 0) {
    return NextResponse.json({ allowed: true, remaining: null, unlimited: true, tier });
  }

  return NextResponse.json({
    allowed: used < quota,
    remaining: Math.max(0, quota - used),
    quota,
    tier,
  });
}

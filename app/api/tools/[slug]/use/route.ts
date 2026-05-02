import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Quota gate for any tool invocation.
 *
 * Flow:
 *   1. Look up `tool_config` for this slug.
 *   2. If missing or `is_active=false`, allow (fail-open) and skip counting.
 *   3. If quota = 0 for the caller's tier, allow and skip counting (unlimited).
 *   4. Count today's usage rows for this caller.
 *   5. If count >= quota → 429 `QUOTA_EXCEEDED`.
 *   6. Else insert a usage row and return remaining count.
 *
 * Caller identity:
 *   - Authenticated: derived from Supabase session cookie. Counted via `user_id`.
 *   - Guest: `X-Session-ID` header (UUID stored in browser localStorage).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    // Quota system not configured — fail open so the site stays functional.
    return NextResponse.json({ allowed: true, remaining: null, unlimited: true });
  }

  // 1. Load tool config
  const { data: config } = await admin
    .from("tool_config")
    .select("guest_quota, user_quota, is_active")
    .eq("slug", slug)
    .maybeSingle();

  if (!config || !config.is_active) {
    return NextResponse.json({ allowed: true, remaining: null, unlimited: true });
  }

  // 2. Identify caller
  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: row } = await admin
        .from("users")
        .select("id")
        .eq("supabase_auth_id", user.id)
        .maybeSingle();
      userId = row?.id ?? null;
    }
  } catch {
    userId = null;
  }

  const sessionId = request.headers.get("x-session-id")?.trim() || null;
  const isGuest = !userId;
  const quota = isGuest ? config.guest_quota : config.user_quota;

  // Unlimited tier
  if (quota === 0) {
    return NextResponse.json({ allowed: true, remaining: null, unlimited: true });
  }

  if (isGuest && !sessionId) {
    return NextResponse.json(
      { error: "Missing X-Session-ID header" },
      { status: 400 },
    );
  }

  // 3. Count today's usage (UTC date)
  const today = new Date().toISOString().slice(0, 10);
  const countQuery = admin
    .from("tool_usage")
    .select("id", { count: "exact", head: true })
    .eq("tool_slug", slug)
    .eq("date", today);

  const { count, error: countErr } = userId
    ? await countQuery.eq("user_id", userId)
    : await countQuery.eq("session_id", sessionId);

  if (countErr) {
    // Fail open on transient DB errors so users aren't blocked.
    return NextResponse.json({ allowed: true, remaining: null, unlimited: false });
  }

  const used = count ?? 0;
  if (used >= quota) {
    return NextResponse.json(
      {
        allowed: false,
        code: "QUOTA_EXCEEDED",
        remaining: 0,
        quota,
        tier: isGuest ? "guest" : "user",
      },
      { status: 429 },
    );
  }

  // 4. Record usage
  const { error: insertErr } = await admin.from("tool_usage").insert({
    tool_slug: slug,
    user_id: userId,
    session_id: isGuest ? sessionId : null,
  });

  if (insertErr) {
    return NextResponse.json({ allowed: true, remaining: null, unlimited: false });
  }

  return NextResponse.json({
    allowed: true,
    remaining: Math.max(0, quota - used - 1),
    quota,
    tier: isGuest ? "guest" : "user",
  });
}

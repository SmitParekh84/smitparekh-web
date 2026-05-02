import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({
      configured: false,
      configs: [],
      summary: { totalToday: 0, sessionsToday: 0, usersToday: 0, topTool: null },
      perTool: [],
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  const [{ data: configs }, { data: todayRows }, { data: allRows }] = await Promise.all([
    admin
      .from("tool_config")
      .select("slug,guest_quota,user_quota,is_active,updated_at")
      .order("slug"),
    admin.from("tool_usage").select("tool_slug,session_id,user_id").eq("date", today),
    admin.from("tool_usage").select("tool_slug"),
  ]);

  const perToolToday = new Map<
    string,
    { uses: number; sessions: Set<string>; users: Set<string> }
  >();
  (todayRows ?? []).forEach(
    (r: { tool_slug: string; session_id: string | null; user_id: string | null }) => {
      const slot =
        perToolToday.get(r.tool_slug) ?? { uses: 0, sessions: new Set(), users: new Set() };
      slot.uses += 1;
      if (r.session_id) slot.sessions.add(r.session_id);
      if (r.user_id) slot.users.add(r.user_id);
      perToolToday.set(r.tool_slug, slot);
    },
  );

  const perToolAll = new Map<string, number>();
  (allRows ?? []).forEach((r: { tool_slug: string }) => {
    perToolAll.set(r.tool_slug, (perToolAll.get(r.tool_slug) ?? 0) + 1);
  });

  const totalToday = todayRows?.length ?? 0;
  const allSessions = new Set<string>();
  const allUsers = new Set<string>();
  (todayRows ?? []).forEach(
    (r: { session_id: string | null; user_id: string | null }) => {
      if (r.session_id) allSessions.add(r.session_id);
      if (r.user_id) allUsers.add(r.user_id);
    },
  );

  let topTool: { slug: string; uses: number } | null = null;
  perToolToday.forEach((v, slug) => {
    if (!topTool || v.uses > topTool.uses) topTool = { slug, uses: v.uses };
  });

  const perTool = (configs ?? []).map(
    (c: {
      slug: string;
      guest_quota: number;
      user_quota: number;
      is_active: boolean;
      updated_at: string;
    }) => {
      const t = perToolToday.get(c.slug);
      return {
        slug: c.slug,
        guest_quota: c.guest_quota,
        user_quota: c.user_quota,
        is_active: c.is_active,
        updated_at: c.updated_at,
        uses_today: t?.uses ?? 0,
        sessions_today: t?.sessions.size ?? 0,
        users_today: t?.users.size ?? 0,
        uses_total: perToolAll.get(c.slug) ?? 0,
      };
    },
  );

  return NextResponse.json({
    configured: true,
    configs: configs ?? [],
    summary: {
      totalToday,
      sessionsToday: allSessions.size,
      usersToday: allUsers.size,
      topTool,
    },
    perTool,
  });
}

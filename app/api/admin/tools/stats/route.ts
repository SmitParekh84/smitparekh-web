import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin-allowlist";

function currentMonthStart() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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

  // Accept ?from=yyyy-mm-dd&to=yyyy-mm-dd - default to current month
  const params = req.nextUrl.searchParams;
  const from = params.get("from") ?? currentMonthStart();
  const to = params.get("to") ?? todayISO();

  const [{ data: configs }, { data: rangeRows }, { data: allRows }] = await Promise.all([
    admin
      .from("tool_config")
      .select("slug,guest_quota,user_quota,is_active,updated_at,featured_in_nav,nav_group,nav_order")
      .order("slug"),
    admin
      .from("tool_usage")
      .select("tool_slug,session_id,user_id")
      .gte("date", from)
      .lte("date", to),
    admin.from("tool_usage").select("tool_slug"),
  ]);

  const perToolRange = new Map<
    string,
    {
      uses: number;
      sessions: Set<string>;
      users: Set<string>;
      guestUses: number;
      userUses: number;
    }
  >();
  (rangeRows ?? []).forEach(
    (r: { tool_slug: string; session_id: string | null; user_id: string | null }) => {
      const slot =
        perToolRange.get(r.tool_slug) ?? {
          uses: 0,
          sessions: new Set(),
          users: new Set(),
          guestUses: 0,
          userUses: 0,
        };
      slot.uses += 1;
      if (r.session_id) slot.sessions.add(r.session_id);
      if (r.user_id) {
        slot.users.add(r.user_id);
        slot.userUses += 1;
      } else {
        slot.guestUses += 1;
      }
      perToolRange.set(r.tool_slug, slot);
    },
  );

  const perToolAll = new Map<string, number>();
  (allRows ?? []).forEach((r: { tool_slug: string }) => {
    perToolAll.set(r.tool_slug, (perToolAll.get(r.tool_slug) ?? 0) + 1);
  });

  const totalToday = rangeRows?.length ?? 0;
  const allSessions = new Set<string>();
  const allUsers = new Set<string>();
  const guestSessions = new Set<string>();
  let guestUses = 0;
  let loggedInUses = 0;
  (rangeRows ?? []).forEach(
    (r: { session_id: string | null; user_id: string | null }) => {
      if (r.session_id) allSessions.add(r.session_id);
      if (r.user_id) {
        allUsers.add(r.user_id);
        loggedInUses += 1;
      } else {
        guestUses += 1;
        if (r.session_id) guestSessions.add(r.session_id);
      }
    },
  );

  let topTool: { slug: string; uses: number } | null = null;
  perToolRange.forEach((v, slug) => {
    if (!topTool || v.uses > topTool.uses) topTool = { slug, uses: v.uses };
  });

  const perTool = (configs ?? []).map(
    (c: {
      slug: string;
      guest_quota: number;
      user_quota: number;
      is_active: boolean;
      updated_at: string;
      featured_in_nav?: boolean | null;
      nav_group?: string | null;
      nav_order?: number | null;
    }) => {
      const t = perToolRange.get(c.slug);
      return {
        slug: c.slug,
        guest_quota: c.guest_quota,
        user_quota: c.user_quota,
        is_active: c.is_active,
        updated_at: c.updated_at,
        featured_in_nav: c.featured_in_nav ?? false,
        nav_group: c.nav_group ?? null,
        nav_order: c.nav_order ?? 100,
        uses_today: t?.uses ?? 0,
        sessions_today: t?.sessions.size ?? 0,
        users_today: t?.users.size ?? 0,
        guest_uses: t?.guestUses ?? 0,
        user_uses: t?.userUses ?? 0,
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
      guestUses,
      guestSessions: guestSessions.size,
      loggedInUses,
      topTool,
    },
    perTool,
  });
}

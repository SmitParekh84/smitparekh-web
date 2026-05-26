import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin-allowlist";

export async function GET() {
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
    return NextResponse.json({ users: [], guestUsesToday: 0, guestSessionsToday: 0 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const [{ data: allUsers }, { data: todayRows }, { data: allRows }] = await Promise.all([
    admin.from("users").select("id,email,name,created_at").order("created_at", { ascending: false }),
    admin.from("tool_usage").select("user_id,tool_slug,session_id").eq("date", today),
    admin
      .from("tool_usage")
      .select("user_id,tool_slug,used_at")
      .not("user_id", "is", null),
  ]);

  const todayByUser = new Map<string, { uses: number; tools: Set<string> }>();
  const allByUser = new Map<string, { uses: number; lastUsed: string }>();

  (
    todayRows as Array<{ user_id: string | null; tool_slug: string; session_id: string | null }> ?? []
  ).forEach((r) => {
    if (!r.user_id) return;
    const slot = todayByUser.get(r.user_id) ?? { uses: 0, tools: new Set<string>() };
    slot.uses += 1;
    slot.tools.add(r.tool_slug);
    todayByUser.set(r.user_id, slot);
  });

  (
    allRows as Array<{ user_id: string | null; tool_slug: string; used_at: string }> ?? []
  ).forEach((r) => {
    if (!r.user_id) return;
    const slot = allByUser.get(r.user_id) ?? { uses: 0, lastUsed: "" };
    slot.uses += 1;
    if (!slot.lastUsed || r.used_at > slot.lastUsed) slot.lastUsed = r.used_at;
    allByUser.set(r.user_id, slot);
  });

  const users = (
    allUsers as Array<{ id: string; email: string; name: string | null; created_at: string }> ?? []
  )
    .map((u) => {
      const td = todayByUser.get(u.id);
      const al = allByUser.get(u.id);
      return {
        userId: u.id,
        email: u.email,
        name: u.name,
        usesToday: td?.uses ?? 0,
        toolsToday: td ? Array.from(td.tools) : [],
        usesTotal: al?.uses ?? 0,
        lastUsedAt: al?.lastUsed ?? null,
      };
    })
    .filter((u) => u.usesTotal > 0);

  const guestRowsToday = (
    todayRows as Array<{ user_id: string | null; session_id: string | null }> ?? []
  ).filter((r) => !r.user_id);
  const guestSessionsToday = new Set(
    guestRowsToday.filter((r) => r.session_id).map((r) => r.session_id),
  ).size;

  return NextResponse.json({
    users,
    guestUsesToday: guestRowsToday.length,
    guestSessionsToday,
  });
}

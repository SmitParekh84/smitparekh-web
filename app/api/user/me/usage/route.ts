import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const today = new Date().toISOString().slice(0, 10);

  // Look up user's internal row
  const { data: userRow } = await admin
    .from("users")
    .select("id,email,name")
    .eq("supabase_auth_id", user.id)
    .maybeSingle();

  if (!userRow) {
    // First login — no usage yet
    const { data: configs } = await admin
      .from("tool_config")
      .select("slug,user_quota,is_active")
      .eq("is_active", true)
      .order("slug");

    const byTool = (configs ?? []).map(
      (c: { slug: string; user_quota: number; is_active: boolean }) => ({
        slug: c.slug,
        uses: 0,
        quota: c.user_quota,
        remaining: c.user_quota,
        is_active: c.is_active,
      }),
    );

    return NextResponse.json({
      user: {
        email: user.email ?? "",
        name: (user.user_metadata?.full_name as string | undefined) ?? null,
      },
      today: { total: 0, byTool },
      allTime: { total: 0, byTool: [] },
    });
  }

  const [{ data: todayRows }, { data: allRows }, { data: configs }] = await Promise.all([
    admin
      .from("tool_usage")
      .select("tool_slug")
      .eq("user_id", userRow.id)
      .eq("date", today),
    admin.from("tool_usage").select("tool_slug").eq("user_id", userRow.id),
    admin
      .from("tool_config")
      .select("slug,user_quota,is_active")
      .order("slug"),
  ]);

  const todayByTool = new Map<string, number>();
  (todayRows as Array<{ tool_slug: string }> ?? []).forEach((r) => {
    todayByTool.set(r.tool_slug, (todayByTool.get(r.tool_slug) ?? 0) + 1);
  });

  const allByTool = new Map<string, number>();
  (allRows as Array<{ tool_slug: string }> ?? []).forEach((r) => {
    allByTool.set(r.tool_slug, (allByTool.get(r.tool_slug) ?? 0) + 1);
  });

  const configMap = new Map<string, { user_quota: number; is_active: boolean }>();
  (configs as Array<{ slug: string; user_quota: number; is_active: boolean }> ?? []).forEach(
    (c) => configMap.set(c.slug, c),
  );

  const byToolToday = Array.from(
    new Set([
      ...(configs ?? []).map((c: { slug: string }) => c.slug),
      ...todayByTool.keys(),
    ]),
  )
    .map((slug) => {
      const config = configMap.get(slug);
      const uses = todayByTool.get(slug) ?? 0;
      const quota = config?.user_quota ?? 0;
      return {
        slug,
        uses,
        quota,
        remaining: Math.max(0, quota - uses),
        is_active: config?.is_active ?? false,
      };
    })
    .filter((t) => t.is_active || t.uses > 0);

  const byToolAll = Array.from(allByTool.entries())
    .map(([slug, uses]) => ({ slug, uses }))
    .sort((a, b) => b.uses - a.uses);

  return NextResponse.json({
    user: { email: userRow.email, name: userRow.name },
    today: { total: todayRows?.length ?? 0, byTool: byToolToday },
    allTime: { total: allRows?.length ?? 0, byTool: byToolAll },
  });
}

import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin-allowlist";
import { NAV_TOOLS_TAG } from "@/lib/featured-nav-tools";
import { isToolCategory } from "@/data/tool-categories";

/**
 * Admin endpoint to update per-tool quota + navbar visibility config.
 * Auth: requires a logged-in Supabase session WHOSE email is in ADMIN_EMAILS.
 * Body (any subset): {
 *   guest_quota?: number,
 *   user_quota?: number,
 *   is_active?: boolean,
 *   featured_in_nav?: boolean,
 *   nav_group?: "Image" | "Content" | "SEO" | "Career" | "Developer" | "Productivity" | null,
 *   nav_order?: number,
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  // Auth gate
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
    return NextResponse.json({ error: "Quota system not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.guest_quota === "number" && body.guest_quota >= 0) {
    update.guest_quota = Math.floor(body.guest_quota);
  }
  if (typeof body.user_quota === "number" && body.user_quota >= 0) {
    update.user_quota = Math.floor(body.user_quota);
  }
  if (typeof body.is_active === "boolean") {
    update.is_active = body.is_active;
  }
  if (typeof body.featured_in_nav === "boolean") {
    update.featured_in_nav = body.featured_in_nav;
  }
  if (isToolCategory(body.nav_group)) {
    update.nav_group = body.nav_group;
  } else if (body.nav_group === null) {
    update.nav_group = null;
  }
  if (typeof body.nav_order === "number" && Number.isFinite(body.nav_order)) {
    update.nav_order = Math.max(0, Math.floor(body.nav_order));
  }
  if (Object.keys(update).length === 1) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  }

  const { data, error } = await admin
    .from("tool_config")
    .update(update)
    .eq("slug", slug)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  // If anything that affects the navbar changed, blow the ISR cache.
  if (
    "featured_in_nav" in update ||
    "nav_group" in update ||
    "nav_order" in update ||
    "is_active" in update
  ) {
    try {
      revalidateTag(NAV_TOOLS_TAG, "max");
    } catch {
      // best-effort — never fail the request because the tag couldn't be flushed.
    }
  }

  return NextResponse.json({ success: true, config: data });
}

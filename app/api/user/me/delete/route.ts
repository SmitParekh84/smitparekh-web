import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  // Soft-delete: set deleted_at — usage rows are intentionally kept (anti-abuse)
  const { error } = await admin
    .from("users")
    .update({ deleted_at: new Date().toISOString() })
    .eq("supabase_auth_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Sign out the Supabase session
  await supabase.auth.signOut();

  return NextResponse.json({ ok: true });
}

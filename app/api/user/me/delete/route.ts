import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Soft-delete in MongoDB via the backend API (keeps admin trash in sync)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.smitparekh.co.in/api";
  const mongoRes = await fetch(`${apiUrl}/auth/me`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  if (!mongoRes.ok) {
    const body = await mongoRes.json().catch(() => ({}));
    return NextResponse.json(
      { error: body.message ?? "Failed to delete account" },
      { status: mongoRes.status }
    );
  }

  // Sign out the Supabase session
  await supabase.auth.signOut();

  return NextResponse.json({ ok: true });
}

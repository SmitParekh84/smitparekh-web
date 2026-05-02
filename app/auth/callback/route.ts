import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase OAuth callback handler.
 * Exchanges the `code` query param for a session cookie and redirects back
 * to the page the user was on (encoded in `next`).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/free-tools";

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch {
      // fall through to error redirect
    }
  }

  return NextResponse.redirect(`${origin}/free-tools?auth_error=1`);
}

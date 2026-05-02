import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

/**
 * Service-role Supabase client. **Server-only** — bypasses RLS.
 * Never import from a Client Component or expose to the browser.
 *
 * Returns `null` if `SUPABASE_SERVICE_ROLE_KEY` is not configured so callers
 * can degrade gracefully (e.g. allow tool calls when quota system is offline).
 */
export function createAdminClient(): SupabaseClient | null {
  if (adminClient) return adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  adminClient = createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return adminClient;
}

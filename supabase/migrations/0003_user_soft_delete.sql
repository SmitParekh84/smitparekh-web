-- =====================================================================
-- Phase 2.2 — User soft delete + account restore on re-login
-- Run this AFTER 0002_tools_ip_hash.sql
-- =====================================================================

-- 1. Add deleted_at column to users (null = active)
alter table public.users
  add column if not exists deleted_at timestamptz;

-- 2. Update trigger: on re-login restore the account (deleted_at → null)
--    but KEEP all tool_usage rows so usage history is preserved (anti-abuse).
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (supabase_auth_id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (supabase_auth_id) do update
    set email      = excluded.email,
        name       = coalesce(excluded.name, public.users.name),
        avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url),
        deleted_at = null;   -- restore soft-deleted account; usage history stays intact
  return new;
end;
$$;

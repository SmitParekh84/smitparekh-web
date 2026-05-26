-- =====================================================================
-- Phase 2 — Tools quota + auth schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → paste → Run
-- =====================================================================

-- 1. App-level users (created on first Google login via trigger below)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  supabase_auth_id uuid references auth.users(id) on delete cascade unique,
  email text not null unique,
  name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- 2. Per-tool quota config (managed by admin)
create table if not exists public.tool_config (
  slug text primary key,
  guest_quota int not null default 5,   -- 0 = unlimited
  user_quota  int not null default 50,  -- 0 = unlimited
  is_active   boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- 3. Usage tracking — one row per tool invocation
create table if not exists public.tool_usage (
  id          uuid primary key default gen_random_uuid(),
  tool_slug   text not null,
  user_id     uuid references public.users(id) on delete set null,
  session_id  text,
  used_at     timestamptz not null default now(),
  date        date generated always as ((used_at at time zone 'utc')::date) stored
);

-- Quota lookup indexes
create index if not exists tool_usage_session_idx
  on public.tool_usage (tool_slug, session_id, date)
  where session_id is not null;

create index if not exists tool_usage_user_idx
  on public.tool_usage (tool_slug, user_id, date)
  where user_id is not null;

create index if not exists tool_usage_date_idx
  on public.tool_usage (date);

-- =====================================================================
-- Trigger: mirror auth.users → public.users on signup
-- =====================================================================
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
        avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute function public.handle_new_auth_user();

-- =====================================================================
-- Row-level security
-- =====================================================================
alter table public.users      enable row level security;
alter table public.tool_config enable row level security;
alter table public.tool_usage enable row level security;

-- tool_config: public read so frontend can show remaining quota
drop policy if exists "tool_config readable by anyone" on public.tool_config;
create policy "tool_config readable by anyone"
  on public.tool_config for select
  using (true);

-- users: a user can read their own row
drop policy if exists "users read own" on public.users;
create policy "users read own"
  on public.users for select
  using (auth.uid() = supabase_auth_id);

-- tool_usage: a user can read their own usage rows
drop policy if exists "tool_usage read own" on public.tool_usage;
create policy "tool_usage read own"
  on public.tool_usage for select
  using (
    user_id in (select id from public.users where supabase_auth_id = auth.uid())
  );

-- All writes happen server-side via service_role (bypasses RLS) — no insert/update/delete policies needed.

-- =====================================================================
-- Seed: tool_config (idempotent)
-- =====================================================================
insert into public.tool_config (slug, guest_quota, user_quota) values
  ('ats-resume-checker',              5,  50),
  ('background-remover',              5,  50),
  ('viral-linkedin-post-generator',  10, 100),
  ('linkedin-media-downloader',      10, 100),
  ('seo-analyzer',                   10, 100),
  ('meta-tag-checker',               10, 100),
  ('password-generator',              0,   0),
  ('word-counter',                    0,   0),
  ('qr-code-generator',               0,   0),
  ('json-formatter',                  0,   0),
  ('base64-encoder-decoder',          0,   0),
  ('image-converter',                 0,   0),
  ('image-compressor',                0,   0),
  ('youtube-thumbnail-downloader',    0,   0)
on conflict (slug) do nothing;

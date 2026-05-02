# Tools Phase 2 — Design Spec
**Date:** 2026-05-02  
**Status:** Documented — implement after Phase 1 ships  
**Scope:** Per-tool rate limiting, Supabase Auth (Google OAuth), Admin Tools Dashboard  
**Prerequisite:** Phase 1 spec (`2026-05-02-tools-phase1-design.md`) must be complete

---

## Overview

Phase 2 adds infrastructure to control how many times a guest user (unauthenticated) can use each tool, forces a Google login when the quota is exceeded, and gives the admin visibility into usage via a dashboard.

---

## 1. Supabase Setup

### Project
Create a Supabase project (or use existing). Set env vars:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   ← server-side only, never expose to client
```

### Auth
- Enable Google OAuth provider in Supabase dashboard
- Callback URL: `https://smitparekh.co.in/auth/callback`
- Use `@supabase/ssr` for Next.js App Router (already in node_modules)

### Database Schema

```sql
-- Stores registered users (created on first Google login)
create table public.users (
  id uuid primary key default gen_random_uuid(),
  supabase_auth_id uuid references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Configurable quota per tool — managed by admin
create table public.tool_config (
  slug text primary key,              -- e.g. "ats-resume-checker"
  guest_quota int not null default 5, -- 0 = unlimited
  user_quota int not null default 50, -- logged-in users get more
  is_active boolean default true,
  updated_at timestamptz default now()
);

-- Tracks usage per tool per user/session
create table public.tool_usage (
  id uuid primary key default gen_random_uuid(),
  tool_slug text not null,
  user_id uuid references public.users(id),   -- null for guests
  session_id text,                             -- localStorage UUID for guests
  used_at timestamptz default now(),
  date date generated always as (used_at::date) stored
);

-- Index for fast quota checks
create index on public.tool_usage(tool_slug, session_id, date);
create index on public.tool_usage(tool_slug, user_id, date);
```

**Default tool_config values (seed data):**

| slug | guest_quota | user_quota |
|------|-------------|------------|
| ats-resume-checker | 5 | 50 |
| background-remover | 5 | 50 |
| viral-linkedin-post-generator | 10 | 100 |
| linkedin-media-downloader | 10 | 100 |
| seo-analyzer | 10 | 100 |
| meta-tag-checker | 10 | 100 |
| password-generator | 0 | 0 |
| word-counter | 0 | 0 |
| qr-code-generator | 0 | 0 |
| json-formatter | 0 | 0 |
| base64-encoder-decoder | 0 | 0 |
| image-converter | 0 | 0 |
| image-compressor | 0 | 0 |
| youtube-thumbnail-downloader | 0 | 0 |

---

## 2. Rate Limiting Architecture

### Guest identification
- On first visit, generate a UUID and store in `localStorage` as `sp_session_id`
- Use this as `session_id` in `tool_usage` for guest tracking
- Not foolproof (clearable by user) but sufficient — true enforcement happens server-side via Supabase

### Quota check flow (per tool API call)

```
User clicks "Analyse" / "Generate" / etc.
    ↓
Frontend hook calls Next.js API Route: POST /api/tools/[slug]/use
    ↓
API Route:
  1. Read session_id from request header (X-Session-ID)
  2. Read user JWT from Supabase session (if logged in)
  3. Query tool_config for this slug → get quota
  4. If quota = 0 → allow, skip counting
  5. Count rows in tool_usage for (slug + session_id/user_id + today)
  6. If count >= quota → return 429 { code: "QUOTA_EXCEEDED" }
  7. Else → insert row in tool_usage → return 200 { allowed: true }
    ↓
Frontend:
  - On 200 → proceed with tool call (existing logic)
  - On 429 → show Login Gate Modal
```

### Login Gate Modal

Triggered when any tool returns `QUOTA_EXCEEDED`.

**Content:**
- Headline: "You've used your free quota for today"
- Sub: "Sign in with Google to get 10× more uses — free, takes 5 seconds"
- CTA: "Continue with Google" (Supabase OAuth button)
- Dismiss: "Maybe later" (closes modal, tool stays in current state)
- After login: re-submit the tool call automatically

**Reset:** Quotas reset daily at midnight UTC (enforced by the `date` column in `tool_usage`).

### Next.js API Route
`app/api/tools/[slug]/use/route.ts` — server-side, uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS.

---

## 3. Admin Tools Dashboard

### Location
Extend existing `app/(admin)/admin/tools/page.tsx` — replace the current static card list with live data.

### Metrics to show

**Per-tool row:**
- Tool name + category
- Today's uses (guest + logged-in)
- Total uses (all time)
- Unique users today
- Guest quota setting (editable inline)
- Logged-in quota setting (editable inline)
- Active toggle

**Summary cards at top:**
- Total tool uses today
- Total unique sessions today
- Most used tool today
- Logged-in users today

### Data source
Supabase queries from admin (uses `SUPABASE_SERVICE_ROLE_KEY` via server component or API route — admin is already auth-gated).

### Quota editing
Inline number input per tool row. On blur → `PATCH /api/admin/tools/[slug]/config` → updates `tool_config` in Supabase.

---

## 4. Auth Flow — Next.js + Supabase SSR

### New files
```
app/auth/callback/route.ts          ← handles OAuth callback, sets session cookie
app/api/tools/[slug]/use/route.ts   ← quota check + usage insert
app/api/admin/tools/[slug]/config/route.ts  ← admin quota update
middleware.ts                        ← extend existing to refresh Supabase session
lib/supabase/                        ← supabase clients
  server.ts                          ←   createServerClient (for Route Handlers, Server Components)
  client.ts                          ←   createBrowserClient (for Client Components)
  middleware.ts                       ←   refreshSession helper
```

### Middleware update
Current `middleware.ts` handles admin JWT auth. Extend it to also refresh the Supabase session on every request (using `@supabase/ssr` `updateSession`). The two auth systems are independent — Supabase handles public users, the existing JWT handles admin.

---

## 5. Frontend Integration

### `useToolQuota(slug)` hook
```ts
// hooks/api/use-tool-quota.ts
// Checks quota before any tool call. Returns:
// { allowed: boolean, remaining: number | null, checkQuota: () => Promise<boolean> }
```

Each tool component calls `checkQuota()` before the main API call. If false → quota modal appears.

### Session ID utility
```ts
// lib/session.ts
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("sp_session_id");
  if (!id) { id = crypto.randomUUID(); localStorage.setItem("sp_session_id", id); }
  return id;
}
```

---

## 6. MongoDB → Supabase Migration Notes

**MongoDB stays for:** projects, blogs, contacts, feedback, resume events, SEO reports — no change.  
**Supabase handles:** users, tool_usage, tool_config (all new tables, no migration needed).

The two databases coexist. Phase 2 does NOT require migrating existing MongoDB data.

---

## 7. Files to Create / Modify

| File | Action |
|------|--------|
| `lib/supabase/server.ts` | New — Supabase server client |
| `lib/supabase/client.ts` | New — Supabase browser client |
| `lib/supabase/middleware.ts` | New — session refresh helper |
| `lib/session.ts` | New — guest session ID utility |
| `middleware.ts` | Extend — add Supabase session refresh |
| `app/auth/callback/route.ts` | New — OAuth callback handler |
| `app/api/tools/[slug]/use/route.ts` | New — quota check API route |
| `app/api/admin/tools/[slug]/config/route.ts` | New — admin quota update |
| `hooks/api/use-tool-quota.ts` | New — quota check hook |
| `components/tools/LoginGateModal.tsx` | New — quota exceeded modal |
| `app/(admin)/admin/tools/page.tsx` | Rewrite — live metrics + inline quota editing |
| Each tool component | Add `checkQuota()` call before API submit |
| `.env.local` | Add Supabase env vars |

---

## 8. Implementation Order

1. Supabase project setup + schema migration
2. `lib/supabase/` clients + middleware update
3. Auth callback route + Google OAuth test
4. `tool_config` seed data
5. Quota check API route
6. `useToolQuota` hook + `LoginGateModal`
7. Wire quota check into top 3 AI tools first (ATS, background remover, LinkedIn generator)
8. Admin dashboard rewrite
9. Wire remaining tools
10. QA: guest quota reset at midnight, login flow, admin quota edit

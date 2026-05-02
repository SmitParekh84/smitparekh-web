-- =====================================================================
-- Phase 2.1 — Hybrid IP + session quota tracking
-- Run this AFTER 0001_tools_phase2.sql
-- =====================================================================

-- Add ip_hash column for guest tracking that survives localStorage clears.
-- Values are sha256(ip + IP_HASH_SALT) truncated to 32 chars (no raw IP stored).
alter table public.tool_usage
  add column if not exists ip_hash text;

-- Index for IP-based daily counts (guests only)
create index if not exists tool_usage_ip_idx
  on public.tool_usage (tool_slug, ip_hash, date)
  where ip_hash is not null;

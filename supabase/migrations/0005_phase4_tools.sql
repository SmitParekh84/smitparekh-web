-- 0005_phase4_tools.sql
-- Phase 4: AI tools for college students (US/UK/CA/AU/IN audience).
-- Seeds quota config for 6 student-focused AI tools.

insert into public.tool_config (slug, guest_quota, user_quota) values
  ('ai-note-summarizer',     5, 50),
  ('ai-flashcard-generator', 5, 50),
  ('ai-essay-outliner',      5, 50),
  ('ai-citation-generator', 10, 100),
  ('ai-paraphraser',         5, 50),
  ('ai-cover-letter',        3, 30)
on conflict (slug) do nothing;

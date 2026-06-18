-- 0007_audio_to_text_tool.sql
-- Seeds quota config for the Audio to Text Transcriber tool.
-- Transcription runs on CPU (faster-whisper) via the Python tools service, so it's
-- a relatively expensive operation - mirror the background-remover guest/user limits.

insert into public.tool_config (slug, guest_quota, user_quota) values
  ('audio-to-text', 5, 50)
on conflict (slug) do nothing;

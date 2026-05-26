-- 0003_nav_tools.sql
-- Adds admin-controllable navbar visibility + grouping to tool_config.
-- These columns drive the compact "Free Tools" dropdown in the navbar.
-- Frontend consumes them via a server-side fetch that's cached + tag-revalidated,
-- so the navbar never shows a client-side loading state.

alter table public.tool_config
  add column if not exists featured_in_nav boolean not null default false;

alter table public.tool_config
  add column if not exists nav_group text;

alter table public.tool_config
  add column if not exists nav_order int not null default 100;

create index if not exists tool_config_featured_in_nav_idx
  on public.tool_config (featured_in_nav, nav_order);

-- Seed the default 8 trending picks (idempotent — only sets the flag if currently false).
update public.tool_config
   set featured_in_nav = true,
       nav_group       = case slug
                           when 'background-remover'             then 'Image'
                           when 'image-compressor'               then 'Image'
                           when 'youtube-thumbnail-downloader'   then 'Content'
                           when 'viral-linkedin-post-generator'  then 'Content'
                           when 'ats-resume-checker'             then 'Career'
                           when 'qr-code-generator'              then 'Career'
                           when 'json-formatter'                 then 'Developer'
                           when 'password-generator'             then 'Developer'
                         end,
       nav_order       = case slug
                           when 'background-remover'             then 10
                           when 'image-compressor'               then 20
                           when 'youtube-thumbnail-downloader'   then 30
                           when 'viral-linkedin-post-generator'  then 40
                           when 'ats-resume-checker'             then 50
                           when 'qr-code-generator'              then 60
                           when 'json-formatter'                 then 70
                           when 'password-generator'             then 80
                         end,
       updated_at      = now()
 where slug in (
   'background-remover',
   'image-compressor',
   'youtube-thumbnail-downloader',
   'viral-linkedin-post-generator',
   'ats-resume-checker',
   'qr-code-generator',
   'json-formatter',
   'password-generator'
 )
   and featured_in_nav = false;

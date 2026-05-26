-- 0006_normalize_tool_categories.sql
-- Backfills nav_group for every tool to match the canonical category map in
-- data/tool-categories.ts. Fixes the issue where admin-toggled tools landed in
-- "Productivity" because nav_group was NULL and the code fallback defaulted
-- everything unknown to that group.
--
-- Idempotent: running this again is safe — it always sets nav_group to the
-- canonical category, regardless of current value.

update public.tool_config
   set nav_group = case slug
       when 'background-remover'             then 'Image'
       when 'image-compressor'               then 'Image'
       when 'image-converter'                then 'Image'
       when 'image-to-base64'                then 'Image'
       when 'favicon-generator'              then 'Image'

       when 'word-counter'                   then 'Content'
       when 'viral-linkedin-post-generator'  then 'Content'
       when 'markdown-editor'                then 'Content'
       when 'lorem-ipsum'                    then 'Content'
       when 'linkedin-media-downloader'      then 'Content'
       when 'youtube-thumbnail-downloader'   then 'Content'

       when 'meta-tag-checker'               then 'SEO'
       when 'seo-analyzer'                   then 'SEO'
       when 'slug-generator'                 then 'SEO'

       when 'ats-resume-checker'             then 'Career'
       when 'qr-code-generator'              then 'Career'

       when 'json-formatter'                 then 'Developer'
       when 'base64-encoder-decoder'         then 'Developer'
       when 'url-encoder-decoder'            then 'Developer'
       when 'hash-generator'                 then 'Developer'
       when 'regex-tester'                   then 'Developer'
       when 'cron-builder'                   then 'Developer'
       when 'jwt-decoder'                    then 'Developer'
       when 'sql-formatter'                  then 'Developer'
       when 'uuid-generator'                 then 'Developer'
       when 'password-generator'             then 'Developer'
       when 'color-converter'                then 'Developer'
       when 'css-gradient-generator'         then 'Developer'

       when 'pomodoro-timer'                 then 'Productivity'
       when 'world-clock'                    then 'Productivity'
       when 'unit-converter'                 then 'Productivity'

       else nav_group
     end,
       updated_at = now();

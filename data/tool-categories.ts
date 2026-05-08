/**
 * Single source of truth for tool categories.
 *
 * Every place that renders or filters tools by category MUST import from here:
 *   - components/tools/ToolsCategoryFilter (public /free-tools page)
 *   - app/(admin)/admin/tools/page (admin table + filter dropdown)
 *   - lib/featured-nav-tools (navbar dropdown grouping + fallback)
 *   - app/api/admin/tools/[slug]/config/route (allowed nav_group values)
 *
 * Rule: never add another `Record<slug, string>` map for categories.
 * Rule: navbar `nav_group` column in Supabase may override the per-tool default,
 *       but the fallback when nav_group is NULL/invalid is `getToolCategory(slug)`.
 */

export const TOOL_CATEGORIES = [
  "Image",
  "Content",
  "SEO",
  "Career",
  "Developer",
  "Productivity",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

/**
 * Per-tool default category. Single source of truth — every UI that needs a
 * category for a tool slug should call `getToolCategory(slug)` rather than
 * inlining its own map.
 */
const TOOL_CATEGORY_MAP: Record<string, ToolCategory> = {
  // Image
  "background-remover": "Image",
  "image-compressor": "Image",
  "image-converter": "Image",
  "image-to-base64": "Image",
  "favicon-generator": "Image",

  // Content
  "word-counter": "Content",
  "viral-linkedin-post-generator": "Content",
  "markdown-editor": "Content",
  "lorem-ipsum": "Content",
  "linkedin-media-downloader": "Content",
  "youtube-thumbnail-downloader": "Content",

  // SEO
  "meta-tag-checker": "SEO",
  "seo-analyzer": "SEO",
  "slug-generator": "SEO",

  // Career
  "ats-resume-checker": "Career",
  "qr-code-generator": "Career",

  // Developer
  "json-formatter": "Developer",
  "base64-encoder-decoder": "Developer",
  "url-encoder-decoder": "Developer",
  "hash-generator": "Developer",
  "regex-tester": "Developer",
  "cron-builder": "Developer",
  "jwt-decoder": "Developer",
  "sql-formatter": "Developer",
  "uuid-generator": "Developer",
  "password-generator": "Developer",
  "color-converter": "Developer",
  "css-gradient-generator": "Developer",

  // Productivity
  "pomodoro-timer": "Productivity",
  "world-clock": "Productivity",
  "unit-converter": "Productivity",
};

const VALID_CATEGORIES: ReadonlySet<ToolCategory> = new Set(TOOL_CATEGORIES);

/**
 * Returns the canonical category for a tool slug. Falls back to "Developer"
 * for unknown slugs so the UI never shows "Productivity" by accident.
 */
export function getToolCategory(slug: string): ToolCategory {
  return TOOL_CATEGORY_MAP[slug] ?? "Developer";
}

/** Type guard — useful when validating an incoming string from a DB row or API body. */
export function isToolCategory(value: unknown): value is ToolCategory {
  return typeof value === "string" && VALID_CATEGORIES.has(value as ToolCategory);
}

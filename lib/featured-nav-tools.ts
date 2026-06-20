/**
 * Compact list of "featured" tools shown in the navbar dropdown.
 *
 * Source of truth = `public.tool_config` in Supabase (columns: featured_in_nav,
 * nav_group, nav_order). Admins toggle the flag from /admin/tools.
 *
 * Render path:
 *   - app/layout.tsx (server) calls getFeaturedNavTools() → cached with the
 *     'nav-tools' tag.
 *   - That list is passed as a prop into <ConditionalNavbar /> → <Navbar />.
 *   - Admin PATCH route revalidates the tag, so changes show up everywhere
 *     within a single request, with NO client-side fetch.
 *
 * If Supabase is unreachable (or the migration hasn't run yet), the static
 * defaults below kick in so the build/render never breaks.
 *
 * Categories: imported from data/tool-categories (single source of truth).
 * When the admin enables a tool's featured_in_nav flag but leaves nav_group
 * NULL, the fallback derives the category from data/tool-categories rather
 * than dumping every untagged tool into "Productivity".
 */
import "server-only";
import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { toolsSEO } from "@/data/tools-seo";
import {
  getToolCategory,
  isToolCategory,
  type ToolCategory,
} from "@/data/tool-categories";

export const NAV_TOOLS_TAG = "nav-tools";

/** Navbar groups are the same as public tool categories. */
export type NavGroup = ToolCategory;

export interface FeaturedNavTool {
  slug: string;
  href: string;
  label: string;
  description?: string;
  group: NavGroup;
  order: number;
}

/** Fallback list - used when Supabase is unreachable or column is missing. */
const STATIC_DEFAULTS: FeaturedNavTool[] = [
  { slug: "background-remover",            group: "Image",        order: 10, label: "Bg Remover",                description: "Remove image backgrounds in seconds",       href: "/free-tools/background-remover" },
  { slug: "image-compressor",              group: "Image",        order: 20, label: "Image Compressor",          description: "Shrink images without losing quality",      href: "/free-tools/image-compressor" },
  { slug: "youtube-thumbnail-downloader",  group: "Content",      order: 30, label: "YT Thumbnail Downloader",   description: "Grab any YouTube thumbnail in HD",          href: "/free-tools/youtube-thumbnail-downloader" },
  { slug: "viral-linkedin-post-generator", group: "Content",      order: 40, label: "LinkedIn Post Generator",   description: "Write engaging LinkedIn posts with AI",     href: "/free-tools/viral-linkedin-post-generator" },
  { slug: "ats-resume-checker",            group: "Career",       order: 50, label: "ATS Resume Checker",        description: "Score your CV against ATS systems",         href: "/free-tools/ats-resume-checker" },
  { slug: "qr-code-generator",             group: "Career",       order: 60, label: "QR Code Generator",         description: "Generate custom QR codes for any link",     href: "/free-tools/qr-code-generator" },
  { slug: "json-formatter",                group: "Developer",    order: 70, label: "JSON Formatter",            description: "Beautify, minify and validate JSON",        href: "/free-tools/json-formatter" },
  { slug: "password-generator",            group: "Developer",    order: 80, label: "Password Generator",        description: "Strong, secure, random passwords",          href: "/free-tools/password-generator" },
];

interface ToolConfigRow {
  slug: string;
  featured_in_nav: boolean | null;
  nav_group: string | null;
  nav_order: number | null;
}

/**
 * Server-only fetcher (cached). Returns featured tools sorted by (group, order).
 * Called once per ISR render of the layout.
 */
export const getFeaturedNavTools = unstable_cache(
  async (): Promise<FeaturedNavTool[]> => {
    const admin = createAdminClient();
    if (!admin) return STATIC_DEFAULTS;

    try {
      const { data, error } = await admin
        .from("tool_config")
        .select("slug,featured_in_nav,nav_group,nav_order")
        .eq("featured_in_nav", true)
        .eq("is_active", true);

      if (error || !data || data.length === 0) {
        // Column might not exist yet → fall back to defaults so navbar still renders.
        return STATIC_DEFAULTS;
      }

      const seoBySlug = new Map(toolsSEO.map((t) => [t.slug, t]));

      const merged: FeaturedNavTool[] = (data as ToolConfigRow[])
        .map((row): FeaturedNavTool | null => {
          const seo = seoBySlug.get(row.slug);
          if (!seo) return null;
          // Strip suffix like " - Free ..." from SEO title to keep navbar labels short.
          const shortLabel = seo.title.split(" - ")[0]?.trim() || prettifySlug(row.slug);
          const desc = seo.description?.split(".")[0]?.slice(0, 80);
          // Prefer the admin-set nav_group; otherwise fall back to the central
          // category map so a freshly-flagged tool lands in its real group
          // instead of "Productivity".
          const group: NavGroup = isToolCategory(row.nav_group)
            ? row.nav_group
            : getToolCategory(row.slug);
          return {
            slug: row.slug,
            href: `/free-tools/${row.slug}`,
            label: shortLabel.length <= 30 ? shortLabel : prettifySlug(row.slug),
            description: desc || undefined,
            group,
            order: row.nav_order ?? 100,
          };
        })
        .filter((x): x is FeaturedNavTool => x !== null);

      if (merged.length === 0) return STATIC_DEFAULTS;

      return merged.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
    } catch {
      return STATIC_DEFAULTS;
    }
  },
  ["nav-tools-v2"],
  { tags: [NAV_TOOLS_TAG], revalidate: 86400 },
);

/** Group featured tools into ordered buckets for the dropdown. */
export function groupFeaturedTools(
  tools: FeaturedNavTool[],
): Array<{ title: NavGroup; items: FeaturedNavTool[] }> {
  const order: NavGroup[] = ["Image", "Content", "SEO", "Career", "Developer", "Productivity"];
  const buckets = new Map<NavGroup, FeaturedNavTool[]>();
  tools.forEach((t) => {
    const list = buckets.get(t.group) ?? [];
    list.push(t);
    buckets.set(t.group, list);
  });
  return order
    .filter((g) => buckets.has(g))
    .map((g) => ({ title: g, items: buckets.get(g) ?? [] }));
}

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

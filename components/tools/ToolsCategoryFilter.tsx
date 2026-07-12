"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eraser,
  PenLine,
  FileText,
  Globe,
  QrCode,
  Hash,
  Minimize2,
  ArrowLeftRight,
  Download,
  Search,
  Lock,
  ArrowRight,
  Video,
  Braces,
  Binary,
  Link2,
  Fingerprint,
  Regex,
  Palette,
  Timer,
  Clock,
  Calculator,
  FileEdit,
  CalendarClock,
  Type,
  KeyRound,
  Database,
  ImagePlus,
  Paintbrush,
  Slice,
  Star,
  Hexagon,
  AudioLines,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toolsSEO } from "@/data/tools-seo";
import { TOOL_CATEGORIES, getToolCategory, type ToolCategory } from "@/data/tool-categories";

const toolIconMap: Record<string, React.FC<{ className?: string }>> = {
  "background-remover": Eraser,
  "audio-to-text": AudioLines,
  "viral-linkedin-post-generator": PenLine,
  "ats-resume-checker": FileText,
  "meta-tag-checker": Globe,
  "qr-code-generator": QrCode,
  "word-counter": Hash,
  "image-compressor": Minimize2,
  "image-converter": ArrowLeftRight,
  "linkedin-media-downloader": Download,
  "seo-analyzer": Search,
  "password-generator": Lock,
  "youtube-thumbnail-downloader": Video,
  "json-formatter": Braces,
  "base64-encoder-decoder": Binary,
  "url-encoder-decoder": Link2,
  "hash-generator": Fingerprint,
  "regex-tester": Regex,
  "color-converter": Palette,
  "pomodoro-timer": Timer,
  "world-clock": Clock,
  "unit-converter": Calculator,
  "markdown-editor": FileEdit,
  "cron-builder": CalendarClock,
  "lorem-ipsum": Type,
  "jwt-decoder": KeyRound,
  "sql-formatter": Database,
  "image-to-base64": ImagePlus,
  "css-gradient-generator": Paintbrush,
  "slug-generator": Slice,
  "favicon-generator": Star,
  "uuid-generator": Hexagon,
};

const popularSlugs = new Set(["background-remover", "viral-linkedin-post-generator"]);
const trendingSlugs = new Set(["ats-resume-checker"]);
const newSlugs = new Set([
  "audio-to-text",
  "youtube-thumbnail-downloader",
  "json-formatter",
  "base64-encoder-decoder",
]);

const CATEGORIES = ["All", ...TOOL_CATEGORIES] as const;
type Category = "All" | ToolCategory;

export default function ToolsCategoryFilter() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: toolsSEO.length };
    for (const tool of toolsSEO) {
      const cat = getToolCategory(tool.slug);
      map[cat] = (map[cat] ?? 0) + 1;
    }
    return map;
  }, []);

  const visibleTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return toolsSEO.filter((t) => {
      const matchesCat = active === "All" || getToolCategory(t.slug) === active;
      if (!matchesCat) return false;
      if (!q) return true;
      const name = t.title.split(" - ")[0].toLowerCase();
      return (
        name.includes(q) ||
        t.slug.includes(q) ||
        (t.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [active, query]);

  return (
    <>
      {/* Search box */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools by name or keyword…"
            aria-label="Search tools"
            className="h-11 pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-10 -mx-4 sm:-mx-6 lg:mx-0 mb-8 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div
          className="flex items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-0 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter tools by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const count = counts[cat] ?? 0;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActive(cat)}
                className={`relative shrink-0 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-blue-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 text-xs text-muted-foreground/80">({count})</span>
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleTools.map((tool) => {
          const Icon = toolIconMap[tool.slug] ?? Globe;
          const category = getToolCategory(tool.slug);
          const isPopular = popularSlugs.has(tool.slug);
          const isTrending = trendingSlugs.has(tool.slug);
          const isNew = newSlugs.has(tool.slug);
          const shortTitle = tool.title.split(" - ")[0];

          return (
            <Link
              key={tool.slug}
              href={`/free-tools/${tool.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors shrink-0">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {isPopular && (
                    <Badge className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 border-blue-500/20">
                      Popular
                    </Badge>
                  )}
                  {isTrending && (
                    <Badge className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-500 border-amber-500/20">
                      Trending
                    </Badge>
                  )}
                  {isNew && (
                    <Badge className="text-xs px-2 py-0.5 bg-cyan-400/10 text-cyan-500 border-cyan-400/20">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                  {category}
                </p>
                <h3 className="font-semibold text-base leading-snug mb-1.5 group-hover:text-blue-500 transition-colors">
                  {shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-blue-500 font-medium mt-auto">
                Use for free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {visibleTools.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">
            {query.trim()
              ? `No tools match “${query.trim()}”.`
              : "No tools in this category yet."}
          </p>
          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("All");
              }}
              className="mt-3 text-sm font-medium text-blue-500 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </>
  );
}

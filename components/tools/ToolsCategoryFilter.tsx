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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toolsSEO } from "@/data/tools-seo";

const toolIconMap: Record<string, React.FC<{ className?: string }>> = {
  "background-remover": Eraser,
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
};

const toolCategoryMap: Record<string, string> = {
  "background-remover": "Image",
  "viral-linkedin-post-generator": "Content",
  "ats-resume-checker": "Career",
  "meta-tag-checker": "SEO",
  "qr-code-generator": "Dev",
  "word-counter": "Content",
  "image-compressor": "Image",
  "image-converter": "Image",
  "linkedin-media-downloader": "Content",
  "seo-analyzer": "SEO",
  "password-generator": "Security",
  "youtube-thumbnail-downloader": "Dev",
  "json-formatter": "Dev",
  "base64-encoder-decoder": "Dev",
};

const popularSlugs = new Set(["background-remover", "viral-linkedin-post-generator"]);
const trendingSlugs = new Set(["ats-resume-checker"]);
const newSlugs = new Set([
  "youtube-thumbnail-downloader",
  "json-formatter",
  "base64-encoder-decoder",
]);

const CATEGORIES = ["All", "Image", "Content", "SEO", "Career", "Dev", "Security"] as const;
type Category = (typeof CATEGORIES)[number];

export default function ToolsCategoryFilter() {
  const [active, setActive] = useState<Category>("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: toolsSEO.length };
    for (const tool of toolsSEO) {
      const cat = toolCategoryMap[tool.slug] ?? "Dev";
      map[cat] = (map[cat] ?? 0) + 1;
    }
    return map;
  }, []);

  const visibleTools = useMemo(() => {
    if (active === "All") return toolsSEO;
    return toolsSEO.filter((t) => (toolCategoryMap[t.slug] ?? "Dev") === active);
  }, [active]);

  return (
    <>
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
          const category = toolCategoryMap[tool.slug] ?? "Tool";
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
        <p className="text-center text-sm text-muted-foreground py-12">
          No tools in this category yet.
        </p>
      )}
    </>
  );
}

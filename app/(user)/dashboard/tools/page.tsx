"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toolsSEO } from "@/data/tools-seo";
import { ArrowRight, Zap } from "lucide-react";

const CATEGORY_MAP: Record<string, string> = {
  "background-remover": "Image",
  "image-compressor": "Image",
  "image-converter": "Image",
  "viral-linkedin-post-generator": "Content",
  "linkedin-media-downloader": "Content",
  "youtube-thumbnail-downloader": "Content",
  "meta-tag-checker": "SEO",
  "seo-analyzer": "SEO",
  "word-counter": "Content",
  "qr-code-generator": "Dev",
  "ats-resume-checker": "Career",
  "password-generator": "Security",
  "json-formatter": "Dev",
  "base64-encoder-decoder": "Dev",
};

const CATEGORY_COLORS: Record<string, string> = {
  Image: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Content: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  SEO: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Dev: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Career: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Security: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

interface UsageTool {
  slug: string;
  uses: number;
  quota: number;
  remaining: number;
}

interface UsageData {
  today: { byTool: UsageTool[] };
}

function ToolsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-24 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardToolsPage() {
  const [usage, setUsage] = useState<UsageTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me/usage")
      .then((r) => r.json())
      .then((d: UsageData) => setUsage(d?.today?.byTool ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ToolsSkeleton />;

  const usageMap = Object.fromEntries(usage.map((u) => [u.slug, u]));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tools</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          All {toolsSEO.length} tools — click any to use it right here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {toolsSEO.map((tool) => {
          const name = tool.title.split(" - ")[0];
          const cat = CATEGORY_MAP[tool.slug] ?? "Tool";
          const u = usageMap[tool.slug];
          const isUnlimited = u ? u.quota === 0 : false;
          const exhausted = u && !isUnlimited && u.remaining === 0;

          return (
            <Link
              key={tool.slug}
              href={`/dashboard/tools/${tool.slug}`}
              className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-blue-500/40 hover:bg-accent/40 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-sm leading-snug">{name}</span>
                <Badge
                  className={`text-[10px] uppercase tracking-wide shrink-0 ${CATEGORY_COLORS[cat] ?? ""}`}
                >
                  {cat}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                {tool.description}
              </p>

              <div className="flex items-center justify-between">
                {u ? (
                  exhausted ? (
                    <span className="text-xs text-red-500 font-medium">Quota reached</span>
                  ) : isUnlimited ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <Zap className="w-3 h-3" /> Unlimited
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {u.remaining} of {u.quota} left today
                    </span>
                  )
                ) : (
                  <span className="text-xs text-muted-foreground">Ready to use</span>
                )}
                <span className="flex items-center gap-1 text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Use tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

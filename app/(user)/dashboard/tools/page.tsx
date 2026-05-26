"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { toolsSEO } from "@/data/tools-seo";
import { ArrowRight, Search, Star, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface UsageTool {
  slug: string;
  uses: number;
  quota: number;
  remaining: number;
}

interface UsageData {
  today: { byTool: UsageTool[] };
}

function QuotaBar({ used, quota }: { used: number; quota: number }) {
  const unlimited = quota === 0;
  const pct = unlimited ? 100 : Math.min(100, (used / Math.max(1, quota)) * 100);
  const cls = unlimited
    ? "bg-emerald-500"
    : pct >= 80
      ? "bg-red-500"
      : pct >= 60
        ? "bg-amber-500"
        : "bg-foreground/70";
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all", cls)} style={{ width: `${pct}%` }} />
    </div>
  );
}

function ToolsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-full max-w-md rounded-lg" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardToolsPage() {
  const [usage, setUsage] = useState<UsageTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    fetch("/api/user/me/usage")
      .then((r) => r.json())
      .then((d: UsageData) => setUsage(d?.today?.byTool ?? []))
      .finally(() => setLoading(false));
  }, []);

  const usageMap = useMemo(
    () => Object.fromEntries(usage.map((u) => [u.slug, u])),
    [usage],
  );

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(toolsSEO.map((t) => CATEGORY_MAP[t.slug] ?? "Tool")))],
    [],
  );

  const filtered = toolsSEO.filter((t) => {
    const c = CATEGORY_MAP[t.slug] ?? "Tool";
    const name = t.title.split(" - ")[0];
    const matchesCat = cat === "All" || c === cat;
    const matchesQ =
      name.toLowerCase().includes(q.toLowerCase()) ||
      (t.description ?? "").toLowerCase().includes(q.toLowerCase());
    return matchesCat && matchesQ;
  });

  if (loading) return <ToolsSkeleton />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">My tools</h1>
        <p className="text-[13px] text-muted-foreground">
          Tools you use, with personal usage and quotas.
        </p>
      </div>

      {/* Category pills + search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-1 text-[12.5px] transition-colors",
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground/70 hover:bg-muted/50",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools"
            className="h-9 pl-8 text-sm"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No tools match your search.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => {
            const name = tool.title.split(" - ")[0];
            const c = CATEGORY_MAP[tool.slug] ?? "Tool";
            const u = usageMap[tool.slug];
            const unlimited = u ? u.quota === 0 : false;

            return (
              <Card key={tool.slug} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-start justify-between">
                    <div className="grid h-9 w-9 place-items-center rounded-md border border-border bg-muted/40">
                      <Wrench className="h-[15px] w-[15px]" />
                    </div>
                    {/* Favorites not wired yet */}
                    <button
                      type="button"
                      disabled
                      title="Favorites coming soon"
                      className="cursor-not-allowed text-muted-foreground/40"
                      aria-label="Favorite (coming soon)"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <div className="text-[14px] font-semibold tracking-tight">{name}</div>
                    <p className="mt-0.5 line-clamp-2 text-[12.5px] text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-[11.5px]">
                      <Badge variant="outline">{c}</Badge>
                      <span className="tabular-nums text-muted-foreground">
                        {u
                          ? unlimited
                            ? "∞ unlimited"
                            : `${u.remaining} of ${u.quota} left today`
                          : "Ready to use"}
                      </span>
                    </div>
                    {u && (
                      <div className="mt-1.5">
                        <QuotaBar used={u.uses} quota={u.quota} />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      /{tool.slug}
                    </span>
                    <Link
                      href={`/dashboard/tools/${tool.slug}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

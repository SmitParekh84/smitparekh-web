"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Activity, Trophy, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { cn } from "@/lib/utils";

interface UsageTool {
  slug: string;
  uses: number;
  quota: number;
  remaining: number;
  is_active: boolean;
}

interface UsageData {
  user: { email: string; name: string | null };
  today: { total: number; byTool: UsageTool[] };
  allTime: { total: number; byTool: { slug: string; uses: number }[] };
}

const TOOL_LABELS: Record<string, string> = {
  "ats-resume-checker": "ATS Resume Checker",
  "image-compressor": "Image Compressor",
  "qr-code-generator": "QR Code Generator",
  "word-counter": "Word Counter",
  "meta-tag-generator": "Meta Tag Generator",
  "password-generator": "Password Generator",
};

function toolLabel(slug: string) {
  return TOOL_LABELS[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function greeting(name: string): string {
  const hour = new Date().getHours();
  const part = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const first = name.split(" ")[0];
  return `Good ${part}, ${first} 👋`;
}

function remainingColor(remaining: number, quota: number) {
  if (quota === 0) return "text-emerald-600 dark:text-emerald-400"; // unlimited = always green
  const pct = remaining / quota;
  if (pct > 0.5) return "text-green-600 dark:text-green-400";
  if (pct > 0.2) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export default function DashboardPage() {
  const { session } = useSupabaseSession();
  const [data, setData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me/usage")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  const meta = session?.user?.user_metadata ?? {};
  const displayName: string =
    data?.user?.name ??
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    "there";

  const topTool =
    data?.allTime.byTool[0]?.slug
      ? toolLabel(data.allTime.byTool[0].slug)
      : "—";

  const summaryCards = [
    {
      label: "Uses today",
      value: loading ? "—" : String(data?.today.total ?? 0),
      icon: Zap,
      color: "text-blue-500",
    },
    {
      label: "All-time total",
      value: loading ? "—" : String(data?.allTime.total ?? 0),
      icon: Activity,
      color: "text-indigo-500",
    },
    {
      label: "Top tool",
      value: loading ? "—" : topTool,
      icon: Trophy,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold">{greeting(displayName)}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Here&apos;s a summary of your free tool usage.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <p className="text-2xl font-bold truncate">{card.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Today&apos;s activity</CardTitle>
          <Link
            href="/dashboard/tools"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1")}
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (data?.today.byTool.length ?? 0) === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-muted-foreground text-sm">No tool uses today yet.</p>
              <Link href="/free-tools" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                Try a free tool
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {(data?.today.byTool ?? []).slice(0, 6).map((tool) => {
                const isUnlimited = tool.quota === 0;
                const pct = isUnlimited ? 100 : Math.min(100, (tool.uses / tool.quota) * 100);
                return (
                  <div key={tool.slug} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate">{toolLabel(tool.slug)}</span>
                      <span className={`text-xs font-mono ml-2 shrink-0 ${remainingColor(tool.remaining, tool.quota)}`}>
                        {isUnlimited ? (
                          <span className="font-semibold">∞ Unlimited</span>
                        ) : (
                          `${tool.uses}/${tool.quota}`
                        )}
                      </span>
                    </div>
                    <Progress
                      value={pct}
                      className={`h-1.5 ${isUnlimited ? "[&>div]:bg-emerald-500" : ""}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick access */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Quick access
        </h3>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
          {Object.entries(TOOL_LABELS).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/free-tools/${slug}`}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors gap-2 group"
            >
              <span className="truncate">{label}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>

      {/* Plan notice */}
      {!loading && (data?.today.byTool.some((t) => t.remaining === 0)) && (
        <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/30">
          <CardContent className="py-4 flex items-center gap-3">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Quota reached
            </Badge>
            <p className="text-sm text-muted-foreground">
              One or more tools have hit today&apos;s limit. Quotas reset at midnight.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

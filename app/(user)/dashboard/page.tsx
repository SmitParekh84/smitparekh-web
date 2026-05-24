"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Activity,
  Wrench,
  Download,
  Sparkles,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { cn } from "@/lib/utils";
import { toolsSEO } from "@/data/tools-seo";

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

function toolLabel(slug: string) {
  const found = toolsSEO.find((t) => t.slug === slug);
  if (found) return found.title.split(" - ")[0];
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ─── Small building blocks (redesign style) ───────────────────────────── */
function MiniStat({
  label,
  value,
  sub,
  loading,
}: {
  label: string;
  value: string | number;
  sub?: string;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        {loading ? (
          <Skeleton className="mt-2 h-7 w-16" />
        ) : (
          <div className="mt-1.5 truncate text-[26px] font-semibold tracking-tight tabular-nums">
            {value}
          </div>
        )}
        {sub && <div className="text-[12px] text-muted-foreground">{sub}</div>}
      </CardContent>
    </Card>
  );
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

// Preview bars — there is no historical-usage endpoint yet (see README).
const SAMPLE_TREND = [12, 18, 14, 22, 28, 24, 31, 28, 34, 41, 38, 33, 47];
function UsageBars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-blue-500/15 transition-colors hover:bg-blue-500/30"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function SoonBadge() {
  return (
    <Badge variant="secondary" className="gap-1 text-[10px] uppercase tracking-wide">
      <Clock className="h-3 w-3" />
      Soon
    </Badge>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-7 w-56" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-64 rounded-xl lg:col-span-2" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
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
  const firstName = displayName.split(" ")[0];

  if (loading) return <DashboardSkeleton />;

  const hour = new Date().getHours();
  const part = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const todayTools = data?.today.byTool ?? [];
  const todayTotal = data?.today.total ?? 0;
  const allTimeTotal = data?.allTime.total ?? 0;
  const toolsUsed = data?.allTime.byTool.length ?? 0;
  const topTool = data?.allTime.byTool[0]?.slug ? toolLabel(data.allTime.byTool[0].slug) : "—";

  // Aggregate today's quota consumption across tools that have a finite quota.
  const capped = todayTools.filter((t) => t.quota > 0);
  const usedSum = capped.reduce((a, t) => a + t.uses, 0);
  const quotaSum = capped.reduce((a, t) => a + t.quota, 0);
  const aggPct = quotaSum > 0 ? Math.round((usedSum / quotaSum) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">
          Good {part}, {firstName}
        </h1>
        <p className="text-[13px] text-muted-foreground">
          A snapshot of your usage and recent activity.
        </p>
      </div>

      {/* Usage hero */}
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="border-0 bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  Today
                </Badge>
                <span className="text-[12px] text-muted-foreground">
                  resets at midnight
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[32px] font-semibold tracking-tight tabular-nums">
                  {todayTotal.toLocaleString()}
                </span>
                <span className="text-[14px] text-muted-foreground">
                  tool {todayTotal === 1 ? "use" : "uses"} today
                </span>
              </div>
              <div className="mt-1 text-[12.5px] text-muted-foreground">
                {quotaSum > 0
                  ? `${aggPct}% of today's combined quota used`
                  : "across your free tools"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled className="gap-1.5">
                <Download className="h-3.5 w-3.5" /> Export usage <SoonBadge />
              </Button>
              <Link
                href="/dashboard/tools"
                className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
              >
                <Wrench className="h-3.5 w-3.5" /> Browse tools
              </Link>
            </div>
          </div>
          {quotaSum > 0 && (
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${aggPct}%` }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stat cards — real data */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat label="Today" value={todayTotal} sub={`across ${todayTools.length} tools`} />
        <MiniStat label="All time" value={allTimeTotal.toLocaleString()} sub="total uses" />
        <MiniStat label="Tools used" value={toolsUsed} sub="distinct tools" />
        <MiniStat label="Top tool" value={topTool} sub="most used" />
      </div>

      {/* Usage trend (preview) + quotas by tool (real) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                Usage trend
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                  Preview
                </Badge>
              </CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Per-day history is coming soon.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <UsageBars data={SAMPLE_TREND} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quotas by tool</CardTitle>
            <p className="mt-0.5 text-sm text-muted-foreground">Today&apos;s limits.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTools.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No tool uses today yet.
              </p>
            ) : (
              todayTools.slice(0, 6).map((t) => (
                <div key={t.slug}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <Link
                      href={`/dashboard/tools/${t.slug}`}
                      className="truncate text-foreground/80 hover:text-blue-500"
                    >
                      {toolLabel(t.slug)}
                    </Link>
                    <span className="ml-2 shrink-0 tabular-nums text-muted-foreground">
                      {t.quota === 0 ? "∞" : `${t.uses} / ${t.quota}`}
                    </span>
                  </div>
                  <div className="mt-1">
                    <QuotaBar used={t.uses} quota={t.quota} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent activity (preview) + quick access (real) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                Recent activity
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                  Preview
                </Badge>
              </CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                A detailed activity log is coming soon.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium">Activity feed coming soon</p>
              <p className="max-w-xs text-[12.5px] text-muted-foreground">
                For now, see today&apos;s usage above or jump into a tool.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick access</CardTitle>
            <p className="mt-0.5 text-sm text-muted-foreground">Jump straight in.</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {toolsSEO.slice(0, 5).map((tool) => (
              <Link
                key={tool.slug}
                href={`/dashboard/tools/${tool.slug}`}
                className="flex w-full items-center gap-3 rounded-md border border-border bg-card p-2.5 text-left transition-colors hover:bg-muted/40"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-muted/40">
                  <Wrench className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">
                    {tool.title.split(" - ")[0]}
                  </div>
                  <div className="truncate font-mono text-[11px] text-muted-foreground">
                    /{tool.slug}
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tip card */}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[13.5px] font-medium">Explore every free tool</div>
              <div className="text-[12px] text-muted-foreground">
                JSON, PDF, QR, image tools and more — no sign-up required.
              </div>
            </div>
          </div>
          <Link href="/free-tools" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}>
            <Zap className="h-3.5 w-3.5" /> See all tools
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

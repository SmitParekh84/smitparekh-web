"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  ArrowUp,
  Plus,
  Mail,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";
import { useFeedbackList } from "@/hooks/api/use-feedback";
import { cn } from "@/lib/utils";

/* ─── Stat card ──────────────────────────────────────────────────────────
   Big number + optional delta chip, in the redesign's restrained style. */
interface MiniStatProps {
  label: string;
  value: string | number;
  hint?: string;
  delta?: string;
  loading?: boolean;
}

function MiniStat({ label, value, hint, delta, loading }: MiniStatProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        {loading ? (
          <Skeleton className="mt-2 h-8 w-16" />
        ) : (
          <div className="mt-1.5 flex items-baseline gap-2">
            <div className="text-[26px] font-semibold tracking-tight tabular-nums">
              {value}
            </div>
            {delta && (
              <span className="inline-flex items-center gap-0.5 rounded text-[12px] font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                <ArrowUp className="h-3 w-3" strokeWidth={2.5} />
                {delta}
              </span>
            )}
          </div>
        )}
        {hint && <div className="mt-1 text-[12px] text-muted-foreground">{hint}</div>}
      </CardContent>
    </Card>
  );
}

/* ─── Visitors chart (PREVIEW) ───────────────────────────────────────────
   Sample data only — there is no analytics backend wired yet. The UI is
   built so it's ready to drop real numbers into. See README → "Admin
   redesign · future backend work". */
const SAMPLE_TRAFFIC: Record<string, number[]> = {
  "7d": [12, 18, 14, 22, 28, 24, 31],
  "28d": [
    21, 24, 19, 26, 28, 31, 27, 24, 30, 36, 33, 39, 42, 38, 41, 47, 44, 41, 38,
    45, 52, 49, 55, 51, 58, 54, 60, 63,
  ],
  "90d": Array.from({ length: 30 }, (_, i) => 20 + Math.round(40 * (i / 29))),
};

function RangeTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const items = ["7d", "28d", "90d"];
  return (
    <div className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5">
      {items.map((it) => (
        <button
          key={it}
          type="button"
          onClick={() => onChange(it)}
          className={cn(
            "inline-flex h-7 items-center rounded-md px-2.5 text-[13px] font-medium transition-colors",
            value === it
              ? "bg-card text-foreground shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-blue-500/15 transition-colors hover:bg-blue-500/30"
          style={{ height: `${(v / max) * 100}%` }}
          title={String(v)}
        />
      ))}
    </div>
  );
}

function VisitorsCard() {
  const [range, setRange] = useState("28d");
  const data = SAMPLE_TRAFFIC[range];
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            Visitors
            <Badge
              variant="secondary"
              className="text-[10px] font-medium uppercase tracking-wide"
            >
              Preview
            </Badge>
          </CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Sample data — analytics wiring coming soon.
          </p>
        </div>
        <RangeTabs value={range} onChange={setRange} />
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-6">
          <div>
            <div className="text-[28px] font-semibold tracking-tight tabular-nums">
              1,284
            </div>
            <div className="text-[12px] text-muted-foreground">
              avg / day, last {range}
            </div>
          </div>
          <div className="flex gap-4 text-[12px]">
            <div>
              <div className="text-muted-foreground">peak</div>
              <div className="font-medium tabular-nums">63</div>
            </div>
            <div>
              <div className="text-muted-foreground">today</div>
              <div className="font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                +8.2%
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <BarChart data={data} />
        </div>
      </CardContent>
    </Card>
  );
}

function TopSourcesCard() {
  const sources = [
    { src: "Organic search", pct: 48, n: "17.2k" },
    { src: "Direct", pct: 24, n: "8.6k" },
    { src: "Twitter / X", pct: 14, n: "5.0k" },
    { src: "LinkedIn", pct: 9, n: "3.2k" },
    { src: "Referral", pct: 5, n: "1.9k" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Top sources
          <Badge
            variant="secondary"
            className="text-[10px] font-medium uppercase tracking-wide"
          >
            Preview
          </Badge>
        </CardTitle>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Where visitors come from.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {sources.map((r) => (
          <div key={r.src}>
            <div className="flex justify-between text-[13px]">
              <span className="text-foreground/80">{r.src}</span>
              <span className="tabular-nums text-muted-foreground">{r.n}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground/70"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const SHORTCUTS = [
  {
    href: "/admin/projects/new",
    icon: Plus,
    label: "New project",
    hint: "Add to portfolio",
    external: false,
  },
  {
    href: "/admin/blogs/new",
    icon: FileText,
    label: "Write a post",
    hint: "Open editor",
    external: false,
  },
  {
    href: "/admin/contacts",
    icon: Mail,
    label: "Reply to contacts",
    hint: "Inbox",
    external: false,
  },
  {
    href: "/",
    icon: ExternalLink,
    label: "Open public site",
    hint: "New tab",
    external: true,
  },
];

export default function AdminOverviewPage() {
  const { data: projects, isLoading: pLoading } = useProjects();
  const { data: feedbackRes, isLoading: fLoading } = useFeedbackList();

  const feedback = feedbackRes?.data;

  const total = projects?.length ?? 0;
  const featured = projects?.filter((p) => p.isShowcased).length ?? 0;
  const totalFeedback = feedbackRes?.total ?? 0;
  const ratings =
    feedback?.map((f) => f.rating).filter((r): r is number => typeof r === "number") ?? [];
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : "—";

  const recentProjects = projects
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.updatedDate || b.publishDate).getTime() -
        new Date(a.updatedDate || a.publishDate).getTime(),
    )
    .slice(0, 4);

  const recentFeedback = feedback?.slice(0, 3);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">Overview</h1>
        <p className="text-[13px] text-muted-foreground">
          Snapshot of everything happening on your site · {dateStr}
        </p>
      </div>

      {/* Stat cards — real wired data */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat
          label="Projects"
          value={total}
          hint={total === 1 ? "1 in portfolio" : `${total} in portfolio`}
          loading={pLoading}
        />
        <MiniStat
          label="Featured"
          value={featured}
          hint="Showcased on portfolio"
          loading={pLoading}
        />
        <MiniStat
          label="Feedback"
          value={totalFeedback}
          hint={totalFeedback === 1 ? "1 entry" : `${totalFeedback} entries`}
          loading={fLoading}
        />
        <MiniStat
          label="Avg rating"
          value={avgRating}
          hint={ratings.length ? `${ratings.length} rated` : "No ratings yet"}
          loading={fLoading}
        />
      </div>

      {/* Chart + sources (preview) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <VisitorsCard />
        <TopSourcesCard />
      </div>

      {/* Recent lists — real wired data */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Recent projects</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Latest edits to your portfolio.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1")}
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            {pLoading && (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            )}
            {!pLoading && recentProjects && recentProjects.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No projects yet. Create your first one.
                </p>
                <Link
                  href="/admin/projects/new"
                  className={cn(buttonVariants({ size: "sm" }), "mt-4 gap-2")}
                >
                  <Plus className="h-4 w-4" />
                  New project
                </Link>
              </div>
            )}
            {!pLoading && recentProjects && recentProjects.length > 0 && (
              <ul className="divide-y divide-border">
                {recentProjects.map((project) => (
                  <li key={project._id}>
                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted/40"
                    >
                      {project.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.imageUrl}
                          alt=""
                          className="h-9 w-9 shrink-0 rounded-md border border-border object-cover"
                        />
                      ) : (
                        <div className="h-9 w-9 shrink-0 rounded-md border border-border bg-gradient-to-br from-blue-500/20 to-cyan-400/20" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[13px] font-medium">
                            {project.title}
                          </span>
                          {project.isShowcased && (
                            <Badge
                              variant="secondary"
                              className="gap-1 shrink-0 border-amber-500/20 bg-amber-500/10 text-[11px] text-amber-600 dark:text-amber-400"
                            >
                              <Star className="h-3 w-3 fill-current" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="truncate text-[12px] text-muted-foreground">
                          {project.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Latest feedback</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Visitor notes from the widget.
              </p>
            </div>
            <Link
              href="/admin/feedback"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1")}
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {fLoading && (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            )}
            {!fLoading && recentFeedback && recentFeedback.length === 0 && (
              <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No feedback yet.
              </p>
            )}
            {!fLoading &&
              recentFeedback?.map((entry) => (
                <div
                  key={entry._id}
                  className="rounded-md border border-border bg-muted/30 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-medium">
                      {entry.name || "Anonymous"}
                    </span>
                    {typeof entry.rating === "number" && (
                      <span className="inline-flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3 w-3",
                              i < entry.rating!
                                ? "fill-current"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12px] text-muted-foreground">
                    {entry.message}
                  </p>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Shortcuts — real links */}
      <Card>
        <CardHeader>
          <CardTitle>Shortcuts</CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Jump to something common.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noreferrer" : undefined}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted/40"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-muted/40 text-foreground">
                  <s.icon className="h-[15px] w-[15px]" />
                </div>
                <div className="leading-tight">
                  <div className="text-[13px] font-medium">{s.label}</div>
                  <div className="text-[11px] text-muted-foreground">{s.hint}</div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

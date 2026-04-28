"use client";

import Link from "next/link";
import {
  FolderKanban,
  MessageSquare,
  Star,
  Sparkles,
  ArrowRight,
  Plus,
  TrendingUp,
  Eye,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/use-projects";
import { useFeedbackList } from "@/hooks/api/use-feedback";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "blue" | "purple" | "green" | "amber";
  loading?: boolean;
}

const colorMap = {
  blue: "bg-blue-500/10 text-blue-500",
  purple: "bg-purple-500/10 text-purple-500",
  green: "bg-emerald-500/10 text-emerald-500",
  amber: "bg-amber-500/10 text-amber-500",
};

function StatCard({ label, value, hint, icon: Icon, color, loading }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
          )}
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span className={cn("rounded-lg p-2 shrink-0", colorMap[color])}>
          <Icon className="h-4 w-4" />
        </span>
      </CardContent>
    </Card>
  );
}

export default function AdminOverviewPage() {
  const { data: projects, isLoading: pLoading } = useProjects();
  const { data: feedback, isLoading: fLoading } = useFeedbackList();

  const total = projects?.length ?? 0;
  const featured = projects?.filter((p) => p.isShowcased).length ?? 0;
  const totalFeedback = feedback?.length ?? 0;
  const ratings =
    feedback?.map((f) => f.rating).filter((r): r is number => typeof r === "number") ?? [];
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : "-";

  const recentProjects = projects
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.updatedDate || b.publishDate).getTime() -
        new Date(a.updatedDate || a.publishDate).getTime(),
    )
    .slice(0, 5);

  const recentFeedback = feedback?.slice(0, 5);

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            {greeting}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Smit Parekh</h2>
          <p className="text-sm text-muted-foreground">{dateStr}</p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Projects"
          value={total}
          hint={total === 1 ? "1 published" : `${total} published`}
          icon={FolderKanban}
          color="blue"
          loading={pLoading}
        />
        <StatCard
          label="Featured"
          value={featured}
          hint="Showcased on portfolio"
          icon={Sparkles}
          color="purple"
          loading={pLoading}
        />
        <StatCard
          label="Feedback"
          value={totalFeedback}
          hint={totalFeedback === 1 ? "1 entry" : `${totalFeedback} entries`}
          icon={MessageSquare}
          color="green"
          loading={fLoading}
        />
        <StatCard
          label="Avg rating"
          value={avgRating}
          hint={ratings.length ? `${ratings.length} rated` : "No ratings yet"}
          icon={Star}
          color="amber"
          loading={fLoading}
        />
      </div>

      {/* Recent content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Recent projects</CardTitle>
              <p className="text-sm text-muted-foreground">Latest 5 by update date.</p>
            </div>
            <Link
              href="/admin/projects"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1")}
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
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
            {!pLoading &&
              recentProjects?.map((project) => (
                <Link
                  key={project._id}
                  href={`/admin/projects/${project._id}/edit`}
                  className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/40"
                >
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-md border border-border object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-500/20 to-cyan-400/20 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{project.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {project.shortDescription}
                    </p>
                  </div>
                  {project.isShowcased && (
                    <Badge
                      variant="secondary"
                      className="gap-1 text-xs shrink-0 bg-amber-500/10 text-amber-600 border-amber-500/20"
                    >
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      Featured
                    </Badge>
                  )}
                </Link>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Recent feedback</CardTitle>
              <p className="text-sm text-muted-foreground">Latest visitor notes.</p>
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
                  className="rounded-lg border border-border bg-card/40 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">
                      {entry.name || "Anonymous"}
                    </p>
                    {typeof entry.rating === "number" && (
                      <Badge variant="secondary" className="gap-1 text-xs shrink-0">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {entry.rating}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {entry.message}
                  </p>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            Quick actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/projects/new"
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Plus className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">New project</p>
                <p className="text-xs text-muted-foreground">Add to portfolio</p>
              </div>
            </Link>

            <Link
              href="/admin/projects"
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <FolderKanban className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Manage projects</p>
                <p className="text-xs text-muted-foreground">Edit or delete</p>
              </div>
            </Link>

            <Link
              href="/admin/feedback"
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Read feedback</p>
                <p className="text-xs text-muted-foreground">Visitor notes</p>
              </div>
            </Link>

            <Link
              href="/free-tools"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">View public tools</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Open in new tab
                  <TrendingUp className="h-3 w-3" />
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

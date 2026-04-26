"use client";

import Link from "next/link";
import {
  FolderKanban,
  MessageSquare,
  Star,
  Sparkles,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/use-projects";
import { useFeedbackList } from "@/hooks/api/use-feedback";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

function StatCard({ label, value, hint, icon: Icon, loading }: StatCardProps) {
  return (
    <Card>
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
        <span className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
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
  const ratings = feedback?.map((f) => f.rating).filter((r): r is number => typeof r === "number") ?? [];
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
    .slice(0, 5);

  const recentFeedback = feedback?.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-sm text-muted-foreground">
          Snapshot of your portfolio activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Projects"
          value={total}
          hint={total === 1 ? "1 published" : `${total} published`}
          icon={FolderKanban}
          loading={pLoading}
        />
        <StatCard
          label="Featured"
          value={featured}
          hint="Showcased on home"
          icon={Sparkles}
          loading={pLoading}
        />
        <StatCard
          label="Feedback"
          value={totalFeedback}
          hint={totalFeedback === 1 ? "1 entry" : `${totalFeedback} entries`}
          icon={MessageSquare}
          loading={fLoading}
        />
        <StatCard
          label="Avg rating"
          value={avgRating}
          hint={ratings.length ? `${ratings.length} rated` : "No ratings yet"}
          icon={Star}
          loading={fLoading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Recent projects</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest 5 by update date.
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
                      className="h-10 w-10 rounded-md border border-border object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{project.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {project.shortDescription}
                    </p>
                  </div>
                  {project.isShowcased && (
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
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
                      <Badge variant="secondary" className="gap-1 text-xs">
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

      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <Plus className="h-4 w-4" />
            New project
          </Link>
          <Link
            href="/admin/projects"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Manage projects
          </Link>
          <Link
            href="/admin/feedback"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Read feedback
          </Link>
          <Link
            href="/free-tools"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            View public tools
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

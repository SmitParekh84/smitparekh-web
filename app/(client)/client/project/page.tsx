"use client";

import { ClientProjectTimeline } from "@/components/client/ClientProjectTimeline";
import { ClientStageBar } from "@/components/client/ClientStageBar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useMyProject } from "@/hooks/api/use-clients";
import { projectStats } from "@/lib/project-journey";
import { cn } from "@/lib/utils";
import { Briefcase, Mail } from "lucide-react";

export default function ClientProjectPage() {
  const { data, isLoading } = useMyProject();
  const project = data?.data ?? null;
  const steps = project?.steps ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!project || steps.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <Briefcase className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm font-medium">No active project yet</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Once your requirements are approved and work kicks off, your project timeline will
            appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const stats = projectStats(steps);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <ClientStageBar steps={steps} />

        {stats.inProgress.length > 0 && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-500">
              Currently working on
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {stats.inProgress.map((s) => (
                <Badge
                  key={s.key}
                  variant="outline"
                  className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                >
                  {s.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-base">Timeline</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Every step across your workstreams.
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ClientProjectTimeline steps={steps} />
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Overall progress
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[28px] font-semibold tracking-tight">{stats.pct}%</span>
              <span className="text-xs text-muted-foreground">
                {stats.done}/{stats.total} steps
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-4">
            <div className="text-[13px] font-medium">Have a question?</div>
            <p className="text-xs text-muted-foreground">
              Reach your project team — replies within a few hours.
            </p>
            <a
              href="mailto:business.smitp@gmail.com"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-1.5")}
            >
              <Mail className="h-3.5 w-3.5" /> Email the team
            </a>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

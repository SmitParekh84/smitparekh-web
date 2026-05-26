"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMyProject } from "@/hooks/api/use-clients";
import { STEP_STATUS_CONFIG, LinkChips } from "@/components/client-project/status";
import { formatDate } from "@/lib/date";

export function ProjectTimeline() {
  const { data, isLoading } = useMyProject();
  const project = data?.data ?? null;
  const steps = [...(project?.steps ?? [])].sort((a, b) => a.order - b.order);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!project || steps.length === 0) {
    return (
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-400/5">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <ClipboardList className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-sm font-medium">Your project hasn&apos;t started yet</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Once you submit your requirements, we&apos;ll set up your project workflow and you&apos;ll
            see live progress and shared resources here.
          </p>
          <Link
            href="/client/requirements"
            className={buttonVariants({ size: "sm", className: "mt-1" })}
          >
            Submit requirements
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Project progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {steps.map((step, i) => {
          const prev = steps[i - 1];
          const showPhaseHeader = !prev || prev.serviceLabel !== step.serviceLabel || prev.phase !== step.phase;
          const cfg = STEP_STATUS_CONFIG[step.status];
          // Hide notes/links for not-yet-started steps so drafts aren't leaked early.
          const reveal = step.status === "in_progress" || step.status === "done";
          return (
            <Fragment key={step.key}>
              {showPhaseHeader && (
                <div className="flex items-center gap-2 pb-1 pt-4 first:pt-0">
                  {step.serviceLabel && <Badge variant="secondary">{step.serviceLabel}</Badge>}
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {step.phase}
                  </span>
                </div>
              )}
              <div className="flex gap-3 py-2">
                <cfg.icon className={`mt-0.5 h-4 w-4 shrink-0 ${cfg.iconClassName}`} />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{step.label}</span>
                    <Badge variant="outline" className={`text-[11px] font-medium ${cfg.badgeClassName}`}>
                      {cfg.label}
                    </Badge>
                    {step.endDate && step.status === "done" && (
                      <span className="text-xs text-muted-foreground">{formatDate(step.endDate)}</span>
                    )}
                  </div>
                  {reveal && step.note && (
                    <p className="text-sm text-muted-foreground">{step.note}</p>
                  )}
                  {reveal && <LinkChips links={step.links} />}
                </div>
              </div>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}

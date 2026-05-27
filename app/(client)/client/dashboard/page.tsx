"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMyRequirements, useMyProject } from "@/hooks/api/use-clients";
import { Spinner } from "@/components/ui/spinner";
import { buttonVariants } from "@/components/ui/button";
import { ClientProjectTimeline } from "@/components/client/ClientProjectTimeline";

const SERVICE_LABELS: Record<string, string> = {
  website: "Website Development",
  seo: "SEO",
  "ai-automation": "AI & Automation",
  "custom-software": "Custom Software",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-500": "Under $500",
  "500-2000": "$500 – $2,000",
  "2000-5000": "$2,000 – $5,000",
  "5000-15000": "$5,000 – $15,000",
  "15000-50000": "$15,000 – $50,000",
  "50000-plus": "$50,000+",
  "not-sure": "Not sure / Flexible",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP (within 2 weeks)",
  "1-month": "1 month",
  "2-3-months": "2–3 months",
  "3-6-months": "3–6 months",
  "6-plus-months": "6+ months",
  flexible: "Flexible",
};

export default function ClientDashboardPage() {
  const { data, isLoading } = useMyRequirements();
  const { data: projectData } = useMyProject();
  const requirements = data?.data ?? null;
  const project = projectData?.data ?? null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to your client portal.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : requirements ? (
        /* Requirements submitted — show summary */
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Requirements submitted
              </p>
              <p className="text-xs text-green-600/80 dark:text-green-500/80">
                Our team will review and get back to you shortly.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your requirements summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Services requested
                </p>
                <div className="flex flex-wrap gap-2">
                  {requirements.categories.map((c) => (
                    <Badge key={c} variant="secondary">
                      {SERVICE_LABELS[c] ?? c}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Budget
                  </p>
                  <p className="font-medium">
                    {BUDGET_LABELS[requirements.budget] ?? requirements.budget}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Timeline
                  </p>
                  <p className="font-medium">
                    {TIMELINE_LABELS[requirements.timeline] ?? requirements.timeline}
                  </p>
                </div>
              </div>

              {requirements.additionalNotes && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Additional notes
                  </p>
                  <p className="text-muted-foreground">{requirements.additionalNotes}</p>
                </div>
              )}

              <Link
                href="/client/requirements"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View requirements
              </Link>
            </CardContent>
          </Card>

          {project && project.steps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Project progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ClientProjectTimeline steps={project.steps} />
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* No requirements yet */
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-400/5">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <ClipboardList className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Submit your requirements</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us what you need — website, SEO, AI automation, or custom software — and
                  we&apos;ll put together the right team.
                </p>
              </div>
              <Link
                href="/client/requirements"
                className={buttonVariants({ className: "gap-2 self-start" })}
              >
                Start now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">What happens next?</h3>
                <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-semibold text-blue-500">
                      1
                    </span>
                    Submit your project requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-semibold text-blue-500">
                      2
                    </span>
                    We review and assign the right team
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-semibold text-blue-500">
                      3
                    </span>
                    You receive a proposal within 24–48 hrs
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

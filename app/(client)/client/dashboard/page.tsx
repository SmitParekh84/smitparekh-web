"use client";

import { ClientProjectTimeline } from "@/components/client/ClientProjectTimeline";
import { ClientStageBar } from "@/components/client/ClientStageBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useClientMe, useMyProject, useMyRequirements } from "@/hooks/api/use-clients";
import { useMyInvoices } from "@/hooks/api/use-invoices";
import { projectStats } from "@/lib/project-journey";
import { cn } from "@/lib/utils";
import type { ClientProject, ClientRequirements, ServiceCategory } from "@/types";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  Code,
  Globe,
  Mail,
  Pencil,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const SERVICE_LABELS: Record<string, string> = {
  website: "Website Development",
  seo: "SEO",
  "ai-automation": "AI & Automation",
  "custom-software": "Custom Software",
};

const SERVICE_ICONS: Record<string, React.ElementType> = {
  website: Globe,
  seo: TrendingUp,
  "ai-automation": Bot,
  "custom-software": Code,
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
  const { data: reqData, isLoading } = useMyRequirements();
  const { data: projectData } = useMyProject();
  const { data: meData } = useClientMe();

  const requirements = reqData?.data ?? null;
  const project = projectData?.data ?? null;
  const client = meData?.data ?? null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!requirements) {
    return <DashboardNew firstName={(client?.name || "there").split(" ")[0]} />;
  }

  const isActive = client?.status === "active" && !!project && project.steps.length > 0;

  return (
    <DashboardWithRequirements
      isActive={isActive}
      requirements={requirements}
      project={project}
      client={client}
    />
  );
}

/* ─── New client — no requirements yet ────────────────────────────────── */
function DashboardNew({ firstName }: { firstName: string }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="relative p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle,theme(colors.blue.500/0.12)_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
          <div className="relative max-w-[60ch]">
            <Badge
              variant="outline"
              className="gap-1 border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
            >
              <Sparkles className="h-3 w-3" /> Welcome, {firstName}
            </Badge>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Let&apos;s scope your project
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us what you need — website, SEO, AI automation, or custom software — and
              we&apos;ll put together the right plan and a proposal within 24–48 hours.
            </p>
            <Link href="/client/requirements" className={cn(buttonVariants(), "mt-4 gap-2")}>
              Submit requirements <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle className="text-base">How it works</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">From first message to launch.</p>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <ol className="grid gap-3 sm:grid-cols-3">
              {[
                { n: 1, t: "Submit requirements", s: "Pick services, budget and timeline." },
                { n: 2, t: "We scope & assign", s: "Right team, clear plan, fixed quote." },
                { n: 3, t: "Proposal in 24–48h", s: "Review, approve, and we kick off." },
              ].map((step) => (
                <li key={step.n} className="rounded-xl border border-border p-4">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-[12px] font-semibold text-background">
                    {step.n}
                  </div>
                  <div className="mt-3 text-[13.5px] font-semibold">{step.t}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{step.s}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-500/15 text-sm font-semibold text-blue-500">
                  SP
                </AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-[13.5px] font-medium">Smit Parekh</div>
                <div className="text-xs text-muted-foreground">Lead developer &amp; PM</div>
              </div>
            </div>
            <div className="space-y-1.5 text-[12.5px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> business.smitp@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Replies within a few hours (IST)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ─── Requirements submitted / project active ─────────────────────────── */
function DashboardWithRequirements({
  isActive,
  requirements,
  project,
  client,
}: {
  isActive: boolean;
  requirements: ClientRequirements;
  project: ClientProject | null;
  client: { name?: string; status?: string } | null;
}) {
  const steps = project?.steps ?? [];
  const stats = projectStats(steps);
  const categories = (requirements.categories ?? []) as ServiceCategory[];
  const { data: invoiceData } = useMyInvoices();
  const pendingInvoices = (invoiceData?.data ?? []).filter(
    (i) => i.status === "sent" || i.status === "overdue",
  );

  return (
    <div className="space-y-6">
      {/* Pending invoice alert */}
      {pendingInvoices.length > 0 && (
        <Link href="/client/invoices" className="block">
          <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 transition-colors hover:bg-amber-500/15">
            <Clock className="h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                You have {pendingInvoices.length} invoice
                {pendingInvoices.length > 1 ? "s" : ""} awaiting payment
              </p>
              <p className="text-xs text-amber-600/80 dark:text-amber-500/80">
                Click to review and pay.
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Status banner */}
      {isActive ? (
        <Card className="overflow-hidden">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="gap-1.5 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Project active
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  >
                    {stats.phase === "Done" ? "Wrapping up" : `${stats.phase} phase`}
                  </Badge>
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">Your project</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {stats.inProgress.length ? (
                    <>
                      Currently working on{" "}
                      <span className="font-medium text-foreground">
                        {stats.inProgress.map((s) => s.label).join(", ")}
                      </span>
                      .
                    </>
                  ) : (
                    "No steps in progress right now."
                  )}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground/80">Overall progress</span>
                <span className="text-muted-foreground">
                  {stats.done} of {stats.total} steps · {stats.pct}%
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${stats.pct}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center gap-2.5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
          <div>
            <p className="text-[13.5px] font-medium text-green-700 dark:text-green-400">
              Requirements submitted
            </p>
            <p className="text-xs text-green-600/80 dark:text-green-500/80">
              Our team is reviewing — you&apos;ll get a proposal within 24–48 hours.
            </p>
          </div>
          <Link
            href="/client/requirements"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-auto")}
          >
            View
          </Link>
        </div>
      )}

      {/* Journey stage bar (active only) */}
      {isActive && <ClientStageBar steps={steps} />}

      {/* Stat cards (active only) */}
      {isActive && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashStat
            label="Progress"
            value={`${stats.pct}%`}
            sub={`${stats.done}/${stats.total} steps`}
          />
          <DashStat
            label="In progress"
            value={String(stats.inProgress.length)}
            sub="active steps"
          />
          <DashStat label="Next up" value={stats.next ? stats.next.label : "—"} small />
          <DashStat
            label="Workstreams"
            value={String(categories.length)}
            sub={categories.map((c) => SERVICE_LABELS[c] ?? c).join(" · ")}
            small
          />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Requirements summary */}
        <Card className={isActive ? "lg:col-span-1" : "lg:col-span-2"}>
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">Requirements</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">What you asked for.</p>
            </div>
            <Link
              href="/client/requirements"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
            </Link>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <div>
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Services
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => {
                  const Ic = SERVICE_ICONS[c] ?? Briefcase;
                  return (
                    <Badge key={c} variant="outline" className="gap-1">
                      <Ic className="h-3 w-3" /> {SERVICE_LABELS[c] ?? c}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Budget
                </div>
                <div className="mt-0.5 text-[13.5px] font-medium">
                  {BUDGET_LABELS[requirements.budget] ?? requirements.budget}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Timeline
                </div>
                <div className="mt-0.5 text-[13.5px] font-medium">
                  {TIMELINE_LABELS[requirements.timeline] ?? requirements.timeline}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project progress (active) OR what's next (submitted) */}
        {isActive ? (
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Project progress</CardTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Latest across all workstreams.
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <ClientProjectTimeline steps={steps.slice(0, 6)} />
            </CardContent>
          </Card>
        ) : (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">What happens next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {[
                { d: true, l: "Requirements submitted" },
                { d: false, l: "We review & assign a team" },
                { d: false, l: "You receive a proposal (24–48h)" },
                { d: false, l: "Approve & kick off" },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                      s.d
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-dashed border-border text-muted-foreground",
                    )}
                  >
                    {s.d ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                    )}
                  </div>
                  <span
                    className={cn("text-[13px]", s.d ? "font-medium" : "text-muted-foreground")}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function DashStat({
  label,
  value,
  sub,
  small,
}: {
  label: string;
  value: string;
  sub?: string;
  small?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div
          className={cn(
            "mt-1.5 font-semibold tracking-tight",
            small ? "text-[15px]" : "text-[26px]",
          )}
        >
          {value}
        </div>
        {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
      </CardContent>
    </Card>
  );
}

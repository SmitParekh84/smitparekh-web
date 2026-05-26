"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, RefreshCw, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import {
  useAdminClient,
  useAdminClientRequirements,
  useAdminClientProject,
  useUpdateProjectStep,
  useRegenerateProject,
} from "@/hooks/api/use-clients";
import { ClientRequirementsView } from "@/components/admin/ClientRequirementsView";
import { ClientProjectTimeline } from "@/components/client/ClientProjectTimeline";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ClientStatus } from "@/types";

const STATUS_CONFIG: Record<ClientStatus, { label: string; className: string }> = {
  invited: {
    label: "Invited",
    className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  onboarded: {
    label: "Onboarded",
    className: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  active: {
    label: "Active",
    className: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  },
  inactive: {
    label: "Inactive",
    className: "border-muted bg-muted/50 text-muted-foreground",
  },
};

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [tab, setTab] = useState("workflow");

  const clientQuery = useAdminClient(id);
  const requirementsQuery = useAdminClientRequirements(id);
  const projectQuery = useAdminClientProject(id);
  const updateStep = useUpdateProjectStep(id);
  const regenerate = useRegenerateProject(id);

  const client = clientQuery.data?.data;
  const requirements = requirementsQuery.data?.data;
  const project = projectQuery.data?.data;
  // Requirements endpoint 404s when none submitted — treat as "not submitted".
  const noRequirements =
    requirementsQuery.isError &&
    requirementsQuery.error instanceof ApiError &&
    requirementsQuery.error.status === 404;

  function handleUpdateStep(stepKey: string, patch: Parameters<typeof updateStep.mutate>[0]["patch"]) {
    updateStep.mutate(
      { stepKey, patch },
      {
        onError: (err) => {
          const msg = err instanceof ApiError ? err.message : "Could not update step.";
          toast.error("Update failed", msg);
        },
      }
    );
  }

  async function handleRegenerate() {
    try {
      await regenerate.mutateAsync();
      toast.success("Workflow refreshed", "Steps rebuilt from the latest requirements.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not refresh workflow.";
      toast.error("Refresh failed", msg);
    }
  }

  if (clientQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (clientQuery.isError || !client) {
    return (
      <div className="space-y-4">
        <Link href="/admin/clients" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to clients
        </Link>
        <p className="text-sm text-muted-foreground">Could not load this client.</p>
      </div>
    );
  }

  const status = STATUS_CONFIG[client.status] ?? STATUS_CONFIG.inactive;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 w-fit")}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to clients
      </Link>

      {/* Client header */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-semibold">
                {client.name || <span className="italic text-muted-foreground">Pending</span>}
              </h1>
              <Badge variant="outline" className={cn("text-[11px]", status.className)}>
                {status.label}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {client.email}
              </span>
              {client.mobile && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {client.mobile}
                </span>
              )}
              {client.company && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {client.company}
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 text-xs text-muted-foreground sm:text-right">
            <p>Invited {formatDate(client.invitedAt)}</p>
            {client.onboardedAt && <p>Onboarded {formatDate(client.onboardedAt)}</p>}
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTab value="workflow">Workflow</TabsTab>
          <TabsTab value="requirements">Requirements</TabsTab>
        </TabsList>

        {/* Workflow */}
        <TabsPanel value="workflow" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <CardTitle className="text-base">Project workflow</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={regenerate.isPending}
                className="gap-1.5"
              >
                {regenerate.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Rebuild from requirements
              </Button>
            </CardHeader>
            <CardContent>
              {projectQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner />
                </div>
              ) : project ? (
                <ClientProjectTimeline
                  steps={project.steps}
                  editable
                  onUpdateStep={handleUpdateStep}
                  busyStepKey={updateStep.isPending ? updateStep.variables?.stepKey : null}
                />
              ) : (
                <p className="text-sm text-muted-foreground">No workflow yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsPanel>

        {/* Requirements */}
        <TabsPanel value="requirements" className="mt-4">
          {requirementsQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          ) : requirements ? (
            <ClientRequirementsView data={requirements} />
          ) : (
            <div className="rounded-xl border border-dashed border-border py-12 text-center">
              <p className="text-sm text-muted-foreground">
                {noRequirements
                  ? "This client hasn't submitted their requirements yet."
                  : "Could not load requirements."}
              </p>
            </div>
          )}
        </TabsPanel>
      </Tabs>
    </div>
  );
}

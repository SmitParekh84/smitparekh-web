"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, RefreshCw, Loader2, Send, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAdminClient,
  useAdminClientRequirements,
  useAdminClientProject,
  useUpdateProjectStep,
  useRegenerateProject,
  useUpdateClientStatus,
} from "@/hooks/api/use-clients";
import { useClientInvoices } from "@/hooks/api/use-invoices";
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

function initials(name?: string, email?: string) {
  const src = name?.trim() || email || "";
  return (
    src
      .split(/\s+|@/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "C"
  );
}

function projectProgress(steps: { status: string }[]) {
  const total = steps.length;
  const done = steps.filter((s) => s.status === "done").length;
  return { total, done, pct: Math.round((done / Math.max(1, total)) * 100) };
}

export default function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [tab, setTab] = useState("workflow");
  const [nowTs] = useState(() => Date.now());
  const [notifyClient, setNotifyClient] = useState(false);

  const clientQuery = useAdminClient(id);
  const requirementsQuery = useAdminClientRequirements(id);
  const projectQuery = useAdminClientProject(id);
  const updateStep = useUpdateProjectStep(id);
  const regenerate = useRegenerateProject(id);
  const updateStatus = useUpdateClientStatus();
  const invoicesQuery = useClientInvoices(id);
  const invoices = invoicesQuery.data?.data ?? [];

  const client = clientQuery.data?.data;
  const requirements = requirementsQuery.data?.data;
  const project = projectQuery.data?.data;
  // Requirements endpoint 404s when none submitted — treat as "not submitted".
  const noRequirements =
    requirementsQuery.isError &&
    requirementsQuery.error instanceof ApiError &&
    requirementsQuery.error.status === 404;

  function handleUpdateStep(stepKey: string, patch: Parameters<typeof updateStep.mutate>[0]["patch"]) {
    // Only status changes can trigger a client email, and only when "Notify client" is ticked.
    const willNotify = notifyClient && patch.status !== undefined;
    updateStep.mutate(
      { stepKey, patch, notify: willNotify },
      {
        onSuccess: () => {
          if (willNotify) toast.success("Client notified", "An update email was sent.");
        },
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

  async function handleResendInvite() {
    try {
      await updateStatus.mutateAsync({ id, status: "invited" });
      toast.success("Invitation resent", "A fresh onboarding link is on its way.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not resend invitation.";
      toast.error("Resend failed", msg);
    }
  }

  async function handleSetStatus(status: ClientStatus) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated", `Client marked as ${status}.`);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not update status.";
      toast.error("Update failed", msg);
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
  const inviteExpired =
    client.status === "invited" &&
    !!client.invitationExpiresAt &&
    new Date(client.invitationExpiresAt).getTime() < nowTs;

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
          <div className="flex items-start gap-3">
            <Avatar className="h-11 w-11">
              <AvatarFallback className="bg-blue-500/15 text-sm font-semibold text-blue-500">
                {initials(client.name, client.email)}
              </AvatarFallback>
            </Avatar>
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
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Set status:</span>
              <Select
                value={client.status}
                onValueChange={(v) => handleSetStatus(v as ClientStatus)}
              >
                <SelectTrigger className="h-8 w-36 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invited" className="text-xs">Invited</SelectItem>
                  <SelectItem value="onboarded" className="text-xs">Onboarded</SelectItem>
                  <SelectItem value="active" className="text-xs">Active</SelectItem>
                  <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-muted-foreground sm:text-right">
              <p>Invited {formatDate(client.invitedAt)}</p>
              {client.onboardedAt && <p>Onboarded {formatDate(client.onboardedAt)}</p>}
            </div>
          </div>
        </CardContent>

        {client.status === "invited" && (
          <div className="flex flex-col gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              {inviteExpired ? (
                <span className="text-destructive">
                  Invitation expired {formatDate(client.invitationExpiresAt)}
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Invitation pending · expires {formatDate(client.invitationExpiresAt)}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResendInvite}
              disabled={updateStatus.isPending}
              className="gap-1.5"
            >
              {updateStatus.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Resend invitation
            </Button>
          </div>
        )}
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTab value="workflow">Workflow</TabsTab>
          <TabsTab value="requirements">Requirements</TabsTab>
          <TabsTab value="invoices">Invoices</TabsTab>
        </TabsList>

        {/* Workflow */}
        <TabsPanel value="workflow" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">Project workflow</CardTitle>
                {project && project.steps.length > 0 && (
                  <p className="mt-0.5 text-[13px] text-muted-foreground">
                    {projectProgress(project.steps).done} of {projectProgress(project.steps).total}{" "}
                    steps done · {projectProgress(project.steps).pct}% — pre-sales → execution,
                    synced to the client instantly.
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground select-none">
                  <Checkbox
                    checked={notifyClient}
                    onCheckedChange={(v) => setNotifyClient(v === true)}
                  />
                  Notify client by email
                </label>
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
              </div>
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

        {/* Invoices */}
        <TabsPanel value="invoices" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <CardTitle className="text-base">Invoices</CardTitle>
              <Link
                href={`/admin/invoices/new?clientId=${id}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
              >
                <Plus className="h-3.5 w-3.5" /> New invoice
              </Link>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {invoicesQuery.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner />
                </div>
              ) : invoices.length === 0 ? (
                <p className="text-muted-foreground">No invoices for this client yet.</p>
              ) : (
                invoices.map((inv) => (
                  <div
                    key={inv._id}
                    className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0"
                  >
                    <Link href={`/admin/invoices/${inv._id}`} className="font-medium hover:underline">
                      {inv.invoiceNumber}
                    </Link>
                    <span className="text-muted-foreground">
                      {inv.currency === "INR" ? "₹" : "$"}
                      {inv.amount.toFixed(2)} · {inv.status}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsPanel>
      </Tabs>
    </div>
  );
}

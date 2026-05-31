"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, Loader2, Send, Plus, ExternalLink, X, FileSignature, Upload, Download, CheckCircle2, Eye, LinkIcon } from "lucide-react";
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
  useAddProjectStep,
  useDeleteProjectStep,
  useReorderProjectSteps,
  useRegenerateProject,
  useUpdateClientStatus,
} from "@/hooks/api/use-clients";
import { useClientInvoices, useSendInvoice, useCancelInvoice } from "@/hooks/api/use-invoices";
import { useAdminContract, useUploadContractTemplate, useSendContractSigningRequest } from "@/hooks/api/use-contracts";
import { contractsApi } from "@/lib/api/contracts";
import { DocxViewer } from "@/components/client/DocxViewer";
import { ClientRequirementsView } from "@/components/admin/ClientRequirementsView";
import { AdminWorkflowEditor } from "@/components/admin/AdminWorkflowEditor";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ClientStatus, Invoice, InvoiceStatus } from "@/types";

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

/* ─── Invoice helpers ─────────────────────────────────────────────────── */

function money(amount: number, currency: string) {
  return `${currency === "INR" ? "₹" : "$"}${amount.toFixed(2)}`;
}

function fmtDateShort(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

const INV_STATUS_BADGE: Record<InvoiceStatus, { dot: string; badge: string; label: string }> = {
  paid:      { dot: "bg-green-500",             badge: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",   label: "Paid" },
  sent:      { dot: "bg-blue-500",              badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",       label: "Sent" },
  overdue:   { dot: "bg-red-500",               badge: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",           label: "Overdue" },
  draft:     { dot: "bg-yellow-500",            badge: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400", label: "Draft" },
  cancelled: { dot: "bg-muted-foreground/40",   badge: "border-border bg-muted/50 text-muted-foreground",                          label: "Cancelled" },
};

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const cfg = INV_STATUS_BADGE[status] ?? INV_STATUS_BADGE.draft;
  return (
    <Badge variant="outline" className={cn("gap-1 text-[11px] font-medium", cfg.badge)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </Badge>
  );
}

function InvoiceRow({ inv }: { inv: Invoice }) {
  const send = useSendInvoice();
  const cancel = useCancelInvoice();
  const [busyAction, setBusyAction] = useState<"send" | "cancel" | null>(null);
  const busy = busyAction !== null;

  const isDraft = inv.status === "draft";
  const canCancel = inv.status !== "paid" && inv.status !== "cancelled";

  async function handleSend() {
    setBusyAction("send");
    try {
      await send.mutateAsync(inv._id);
      toast.success("Invoice sent", "Client has been notified by email.");
    } catch (e) {
      toast.error("Send failed", e instanceof ApiError ? e.message : "Could not send invoice.");
    } finally {
      setBusyAction(null);
    }
  }

  async function handleCancel() {
    setBusyAction("cancel");
    try {
      await cancel.mutateAsync(inv._id);
      toast.success("Invoice cancelled");
    } catch (e) {
      toast.error("Cancel failed", e instanceof ApiError ? e.message : "Could not cancel.");
    } finally {
      setBusyAction(null);
    }
  }

  const projectLabel = (inv as Invoice & { projectLabel?: string }).projectLabel;

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[13px] font-semibold">{inv.invoiceNumber}</span>
          <InvoiceStatusBadge status={inv.status} />
          {projectLabel && (
            <span className="text-[11px] text-muted-foreground">{projectLabel}</span>
          )}
        </div>
        <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
          {inv.title}
          {inv.createdAt && ` · issued ${fmtDateShort(inv.createdAt)}`}
          {inv.dueDate && ` · due ${fmtDateShort(inv.dueDate)}`}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <span className="min-w-[80px] text-right font-semibold tabular-nums text-[14px]">
          {money(inv.amount, inv.currency)}
        </span>
        <Link href={`/admin/invoices/${inv._id}`}>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </Link>
        {isDraft && (
          <Button
            size="sm"
            className="h-7 gap-1 px-2.5 text-[12px]"
            onClick={handleSend}
            disabled={busy}
          >
            {busyAction === "send" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Send className="h-3 w-3" />
            )}
            Send
          </Button>
        )}
        {canCancel && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={handleCancel}
            disabled={busy}
          >
            {busyAction === "cancel" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
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
  const addStep = useAddProjectStep(id);
  const deleteStep = useDeleteProjectStep(id);
  const reorderSteps = useReorderProjectSteps(id);
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
          <TabsTab value="contract">Contract</TabsTab>
        </TabsList>

        {/* Workflow */}
        <TabsPanel value="workflow" className="mt-4">
          <div className="space-y-3">
            {/* Notify client toggle */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-1.5 text-[12.5px] text-muted-foreground select-none">
                <Checkbox
                  checked={notifyClient}
                  onCheckedChange={(v) => setNotifyClient(v === true)}
                />
                Email client on status changes
              </label>
            </div>

            {projectQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner />
              </div>
            ) : (
              <AdminWorkflowEditor
                steps={project?.steps ?? []}
                onUpdateStep={handleUpdateStep}
                onAddStep={(payload) => {
                  addStep.mutate(payload, {
                    onSuccess: () => toast.success("Step added"),
                    onError: (e) => toast.error("Add failed", e instanceof ApiError ? e.message : "Could not add step."),
                  });
                }}
                onDeleteStep={(key) => {
                  deleteStep.mutate(key, {
                    onSuccess: () => toast.success("Step removed"),
                    onError: (e) => toast.error("Delete failed", e instanceof ApiError ? e.message : "Could not remove step."),
                  });
                }}
                onReorderSteps={(order) => {
                  reorderSteps.mutate(order, {
                    onError: (e) => toast.error("Reorder failed", e instanceof ApiError ? e.message : "Could not save order."),
                  });
                }}
                onRegenerate={handleRegenerate}
                busyStepKey={updateStep.isPending ? updateStep.variables?.stepKey : null}
                reorderPending={reorderSteps.isPending}
                addPending={addStep.isPending}
                regeneratePending={regenerate.isPending}
              />
            )}
          </div>
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
          {invoicesQuery.isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary stats */}
              <div className="grid gap-3 sm:grid-cols-3">
                {(() => {
                  const outstanding = invoices
                    .filter((i) => i.status === "sent" || i.status === "overdue")
                    .reduce((s, i) => s + i.amount, 0);
                  const collected = invoices
                    .filter((i) => i.status === "paid")
                    .reduce((s, i) => s + i.amount, 0);
                  const drafts = invoices.filter((i) => i.status === "draft").length;
                  const currency = invoices[0]?.currency ?? "USD";
                  return (
                    <>
                      <div className="rounded-xl border border-border bg-card p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Outstanding</p>
                        <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight">{money(outstanding, currency)}</p>
                      </div>
                      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Collected</p>
                        <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight">{money(collected, currency)}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Drafts</p>
                        <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight">{drafts}</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Invoice list card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">Invoices</CardTitle>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">
                      Create, send and track payments — the client sees sent invoices instantly.
                    </p>
                  </div>
                  <Link
                    href={`/admin/invoices/new?clientId=${id}`}
                    className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                  >
                    <Plus className="h-3.5 w-3.5" /> New invoice
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  {invoices.length === 0 ? (
                    <p className="px-4 pb-6 pt-2 text-sm text-muted-foreground">
                      No invoices for this client yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-border overflow-hidden rounded-b-xl">
                      {invoices.map((inv) => (
                        <InvoiceRow key={inv._id} inv={inv} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsPanel>

        {/* Contract */}
        <TabsPanel value="contract" className="mt-4">
          <ContractTab clientId={id} clientName={client.name} />
        </TabsPanel>
      </Tabs>
    </div>
  );
}

/* ─── Admin contract tab ──────────────────────────────────────────────── */
function ContractTab({ clientId, clientName }: { clientId: string; clientName?: string }) {
  const { data, isLoading } = useAdminContract(clientId);
  const uploadMutation = useUploadContractTemplate(clientId);
  const sendRequest = useSendContractSigningRequest();
  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const contract = data?.data;

  async function handleSendSigningLink() {
    try {
      await sendRequest.mutateAsync(clientId);
      setLinkSent(true);
      toast.success(
        "Signing link sent",
        `${clientName ?? "The client"} will receive an email with a one-click sign-in link.`,
      );
      setTimeout(() => setLinkSent(false), 6000);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not send signing link.";
      toast.error("Send failed", msg);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadMutation.mutateAsync(file);
      setShowPreview(false);
      toast.success("Template uploaded", "The client can now sign their contract.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Upload failed.";
      toast.error("Upload failed", msg);
    }
    e.target.value = "";
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await contractsApi.downloadForClient(clientId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contract-signed-${clientName?.replace(/\s+/g, "-") ?? "client"}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not download.";
      toast.error("Download failed", msg);
    } finally {
      setDownloading(false);
    }
  }

  if (isLoading) return <div className="flex items-center justify-center py-12"><Spinner /></div>;

  const isSigned = contract?.status === "signed";
  const hasTemplate = contract && contract.status !== "no_template";

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">Contract</CardTitle>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Upload a DOCX template — the client signs it in their portal.
            </p>
          </div>
          {isSigned && (
            <Badge
              variant="outline"
              className="gap-1.5 border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
            >
              <CheckCircle2 className="h-3 w-3" /> Signed
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Signed alert */}
          {isSigned && (
            <div className="flex items-center gap-2.5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
              <div className="flex-1 text-[13px]">
                <span className="font-medium text-green-700 dark:text-green-400">
                  {clientName ?? "Client"} has signed this contract.
                </span>
                {contract.signedAt && (
                  <span className="ml-1 text-green-600/80 dark:text-green-500/80">
                    · {new Date(contract.signedAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Template info row */}
          {hasTemplate ? (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-3.5 py-3">
              <FileSignature className="h-5 w-5 shrink-0 text-blue-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{contract.templateName}</p>
                <p className="text-xs text-muted-foreground">
                  {isSigned ? "Signed & ready to download" : "Awaiting client signature"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setShowPreview((v) => !v)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  {showPreview ? "Hide" : "Preview"}
                </Button>
                {isSigned && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={handleDownload}
                    disabled={downloading}
                  >
                    {downloading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    Download
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No contract template uploaded yet.</p>
          )}

          {/* Send signing link — shown when template exists and not yet signed */}
          {hasTemplate && !isSigned && (
            <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium">Ready to send?</p>
                <p className="text-[11.5px] text-muted-foreground">
                  Email {clientName ?? "the client"} a one-click link — they click it, get
                  automatically signed in, and land straight on the contract page.
                </p>
              </div>
              <Button
                className="shrink-0 gap-1.5"
                size="sm"
                onClick={handleSendSigningLink}
                disabled={sendRequest.isPending || linkSent}
              >
                {sendRequest.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : linkSent ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <LinkIcon className="h-3.5 w-3.5" />
                )}
                {linkSent ? "Link sent!" : "Send signing link"}
              </Button>
            </div>
          )}

          {/* Upload / replace */}
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={handleUpload}
                disabled={uploadMutation.isPending}
              />
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[13px] font-medium hover:bg-muted cursor-pointer">
                {uploadMutation.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                {hasTemplate ? "Replace template" : "Upload DOCX template"}
              </div>
            </label>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 px-3.5 py-3 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground/70">Template placeholders:</p>
            <p><code className="font-mono text-[11px]">&#123;clientName&#125;</code> — client full name</p>
            <p><code className="font-mono text-[11px]">&#123;date&#125;</code> — signing date</p>
            <p><code className="font-mono text-[11px]">&#123;%signature&#125;</code> — signature image (alone in its own paragraph)</p>
          </div>
        </CardContent>
      </Card>

      {/* DOCX preview panel */}
      {showPreview && hasTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isSigned ? "Signed contract preview" : "Template preview"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DocxViewer
              fetchDoc={
                isSigned
                  ? () => contractsApi.downloadForClient(clientId)
                  : () => contractsApi.previewForClient(clientId)
              }
              className="px-2 pb-4"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Check,
  X,
  Ban,
  DatabaseZap,
  Copy,
  CheckCheck,
  Loader2,
  Eye,
  EyeOff,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  useAdminTenants,
  useApproveTenant,
  useRejectTenant,
  useSuspendTenant,
  useMigrateSiteBlogs,
} from "@/hooks/api/use-admin-tenants";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { AdminTenant } from "@/lib/api/tenant";
import { TenantFeaturesDialog } from "@/components/admin/TenantFeaturesDialog";

function CopyBtn({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      title={`Copy ${label ?? "value"}`}
      className="ml-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground/60 transition-colors hover:text-foreground"
    >
      {copied ? (
        <CheckCheck className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  );
}

function truncate(s: string, head = 8, tail = 4) {
  if (s.length <= head + tail + 3) return s;
  return `${s.slice(0, head)}…${s.slice(-tail)}`;
}

const STATUS_BADGE: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  approved:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  suspended:
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const STATUS_TABS = ["pending", "approved", "rejected", "suspended"] as const;

function TenantRow({
  tenant,
  selected,
  onToggle,
}: {
  tenant: AdminTenant;
  selected: boolean;
  onToggle: () => void;
}) {
  const approveTenant = useApproveTenant();
  const rejectTenant = useRejectTenant();
  const suspendTenant = useSuspendTenant();
  const migrateSiteBlogs = useMigrateSiteBlogs();
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Features the tenant requested but that aren't enabled yet → admin attention.
  const pendingRequests = (tenant.featureRequests ?? []).filter(
    (key) => !tenant.features?.[key as keyof typeof tenant.features]
  );
  const hasPendingRequests = pendingRequests.length > 0;

  async function handleMigrate() {
    const site = window.prompt(
      "Migrate unowned blogs to this tenant.\nEnter site name (e.g. marketixpert):",
      "marketixpert"
    );
    if (!site) return;
    try {
      const res = await migrateSiteBlogs.mutateAsync({
        apiKey: tenant.apiKey,
        site,
      });
      toast.success(
        "Migration complete",
        `${res.modifiedCount} blog(s) assigned to ${tenant.name}`
      );
    } catch {
      toast.error("Migration failed", "Check the API response.");
    }
  }

  return (
    <>
      <TableRow data-state={selected ? "selected" : undefined}>
        <TableCell className="pr-0">
          <input
            type="checkbox"
            aria-label={`Select ${tenant.name}`}
            checked={selected}
            onChange={onToggle}
            className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
          />
        </TableCell>

        {/* Name + email */}
        <TableCell>
          <p className="font-medium leading-tight">{tenant.name}</p>
          <p className="text-xs text-muted-foreground">{tenant.email}</p>
          {tenant.rejectionReason && (
            <p className="mt-0.5 text-xs text-destructive/80 italic">
              {tenant.rejectionReason}
            </p>
          )}
        </TableCell>

        {/* Tenant ID */}
        <TableCell className="hidden md:table-cell">
          <div className="flex items-center font-mono text-xs text-muted-foreground">
            <span>{truncate(tenant._id)}</span>
            <CopyBtn value={tenant._id} label="tenant ID" />
          </div>
        </TableCell>

        {/* API Key */}
        <TableCell className="hidden lg:table-cell">
          <div className="flex items-center gap-1">
            <span className="font-mono text-xs text-muted-foreground">
              {showKey ? tenant.apiKey : truncate(tenant.apiKey)}
            </span>
            <button
              onClick={() => setShowKey((v) => !v)}
              title={showKey ? "Hide key" : "Reveal key"}
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {showKey ? (
                <EyeOff className="h-3 w-3" />
              ) : (
                <Eye className="h-3 w-3" />
              )}
            </button>
            <CopyBtn value={tenant.apiKey} label="API key" />
          </div>
        </TableCell>

        {/* Status */}
        <TableCell>
          <Badge
            variant="secondary"
            className={cn(
              "border-0 capitalize text-xs",
              STATUS_BADGE[tenant.status]
            )}
          >
            {tenant.status}
          </Badge>
        </TableCell>

        {/* Requested */}
        <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
          {new Date(tenant.requestedAt).toLocaleDateString()}
        </TableCell>

        {/* Actions */}
        <TableCell>
          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-green-600"
              title="Approve"
              disabled={
                approveTenant.isPending || tenant.status === "approved"
              }
              onClick={() => approveTenant.mutate(tenant._id)}
            >
              {approveTenant.isPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              title="Reject"
              disabled={rejectTenant.isPending}
              onClick={() => setShowReject((v) => !v)}
            >
              <X className="h-3 w-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-yellow-600"
              title="Suspend"
              disabled={
                suspendTenant.isPending || tenant.status === "suspended"
              }
              onClick={() => suspendTenant.mutate(tenant._id)}
            >
              <Ban className="h-3 w-3" />
            </Button>

            <Link
              href={`/admin/tenants/${tenant._id}/blogs`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-7 w-7 text-muted-foreground hover:text-foreground"
              )}
              title="View & edit tenant blogs"
            >
              <BookOpen className="h-3 w-3" />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative h-7 w-7 text-muted-foreground hover:text-blue-500",
                hasPendingRequests && "text-amber-600 hover:text-amber-600"
              )}
              title={
                hasPendingRequests
                  ? `${pendingRequests.length} feature request${pendingRequests.length > 1 ? "s" : ""} pending`
                  : "AI feature permissions"
              }
              onClick={() => setShowFeatures(true)}
            >
              <SlidersHorizontal className="h-3 w-3" />
              {hasPendingRequests && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold leading-none text-white">
                  {pendingRequests.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-blue-500"
              title="Migrate site blogs to this tenant"
              disabled={migrateSiteBlogs.isPending}
              onClick={handleMigrate}
            >
              {migrateSiteBlogs.isPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <DatabaseZap className="h-3 w-3" />
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Inline reject reason row */}
      {showReject && (
        <TableRow>
          <TableCell />
          <TableCell colSpan={6} className="py-2">
            <div className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Rejection reason (optional)"
                className="h-8 flex-1 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <Button
                size="sm"
                variant="destructive"
                className="h-8 px-3 text-xs"
                disabled={rejectTenant.isPending}
                onClick={async () => {
                  await rejectTenant.mutateAsync({
                    id: tenant._id,
                    reason: rejectReason || undefined,
                  });
                  setShowReject(false);
                  setRejectReason("");
                }}
              >
                {rejectTenant.isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "Confirm reject"
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-xs"
                onClick={() => {
                  setShowReject(false);
                  setRejectReason("");
                }}
              >
                Cancel
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )}

      <TenantFeaturesDialog
        open={showFeatures}
        onOpenChange={setShowFeatures}
        tenantId={tenant._id}
        tenantName={tenant.name}
        features={tenant.features}
        featureRequests={tenant.featureRequests}
      />
    </>
  );
}

export default function AdminTenantsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawStatus = searchParams.get("status");
  const statusFilter = rawStatus as
    | "pending"
    | "approved"
    | "rejected"
    | "suspended"
    | null;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const approveBulk = useApproveTenant();
  const rejectBulk = useRejectTenant();
  const suspendBulk = useSuspendTenant();

  const { data: tenantResponse, isLoading, isError, refetch } = useAdminTenants(
    statusFilter ?? undefined
  );

  // ── Fix: null means "All" (no ?status= param) ──────────────────────────
  const allTenants = tenantResponse?.data ?? [];
  const filteredTenants = statusFilter
    ? allTenants.filter((t) => t.status === statusFilter)
    : allTenants;

  const visibleIds = filteredTenants.map((t) => t._id);
  const allChecked =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someChecked =
    !allChecked && visibleIds.some((id) => selectedIds.has(id));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((prev) =>
      visibleIds.every((id) => prev.has(id))
        ? new Set()
        : new Set(visibleIds)
    );
  }

  function setStatus(s: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!s) params.delete("status");
    else params.set("status", s);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    setSelectedIds(new Set());
  }

  async function handleBulkApprove() {
    const ids = Array.from(selectedIds);
    setBulkBusy(true);
    try {
      await Promise.all(ids.map((id) => approveBulk.mutateAsync(id)));
      toast.success(`Approved ${ids.length} tenant${ids.length > 1 ? "s" : ""}`);
      setSelectedIds(new Set());
    } catch {
      toast.error("Bulk approve failed");
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleBulkReject() {
    const ids = Array.from(selectedIds);
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) => rejectBulk.mutateAsync({ id, reason: undefined }))
      );
      toast.success(`Rejected ${ids.length} tenant${ids.length > 1 ? "s" : ""}`);
      setSelectedIds(new Set());
    } catch {
      toast.error("Bulk reject failed");
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleBulkSuspend() {
    const ids = Array.from(selectedIds);
    setBulkBusy(true);
    try {
      await Promise.all(ids.map((id) => suspendBulk.mutateAsync(id)));
      toast.success(`Suspended ${ids.length} tenant${ids.length > 1 ? "s" : ""}`);
      setSelectedIds(new Set());
    } catch {
      toast.error("Bulk suspend failed");
    } finally {
      setBulkBusy(false);
    }
  }

  const countByStatus = STATUS_TABS.reduce(
    (acc, s) => {
      acc[s] = allTenants.filter((t) => t.status === s).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Tenants</h1>
        <p className="text-[13px] text-muted-foreground">
          Workspaces using your platform — approve or reject blog API access.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        <button
          type="button"
          onClick={() => setStatus(null)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            !statusFilter
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All
          {!statusFilter && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
          )}
        </button>

        {STATUS_TABS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium capitalize transition-colors",
              statusFilter === s
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {s}
            {countByStatus[s] > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
                {countByStatus[s]}
              </span>
            )}
            {statusFilter === s && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Could not load tenants. Is the backend running?
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && filteredTenants.length === 0 && (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {statusFilter ? `No ${statusFilter} tenants.` : "No tenants yet."}
          </p>
          {statusFilter && (
            <Button variant="outline" size="sm" onClick={() => setStatus(null)}>
              Show all
            </Button>
          )}
        </div>
      )}

      {!isLoading && !isError && filteredTenants.length > 0 && (
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base">
              {statusFilter
                ? `${statusFilter.charAt(0).toUpperCase()}${statusFilter.slice(1)} tenants`
                : "All tenants"}
            </CardTitle>
            <CardDescription>
              {filteredTenants.length} tenant{filteredTenants.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {selectedIds.size > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
                <span className="text-xs font-medium">
                  {selectedIds.size} selected
                </span>
                <div className="ml-auto flex flex-wrap items-center gap-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1.5 text-xs text-green-700 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-950"
                    disabled={bulkBusy}
                    onClick={handleBulkApprove}
                  >
                    <Check className="h-3 w-3" /> Approve
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1.5 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                    disabled={bulkBusy}
                    onClick={handleBulkReject}
                  >
                    <X className="h-3 w-3" /> Reject
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1.5 text-xs"
                    disabled={bulkBusy}
                    onClick={handleBulkSuspend}
                  >
                    <Ban className="h-3 w-3" /> Suspend
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 gap-1.5 text-xs"
                    disabled={bulkBusy}
                    onClick={() => setSelectedIds(new Set())}
                  >
                    {bulkBusy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <X className="h-3.5 w-3.5" />
                    )}
                    Clear
                  </Button>
                </div>
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[1%] pr-0">
                    <input
                      type="checkbox"
                      aria-label="Select all"
                      checked={allChecked}
                      ref={(el) => {
                        if (el) el.indeterminate = someChecked;
                      }}
                      onChange={toggleAll}
                      className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Tenant ID
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    API Key
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Requested
                  </TableHead>
                  <TableHead className="w-[1%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TenantRow
                    key={tenant._id}
                    tenant={tenant}
                    selected={selectedIds.has(tenant._id)}
                    onToggle={() => toggleOne(tenant._id)}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

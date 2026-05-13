"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  TriangleAlert,
  Users,
  Clock,
  Check,
  X,
  RefreshCw,
  MessageSquareWarning,
  Ban,
  Plus,
  DatabaseZap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useAdminTenants, useApproveTenant, useRejectTenant, useSuspendTenant, useMigrateSiteBlogs } from "@/hooks/api/use-admin-tenants";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export default function AdminTenantsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") as
    | "all" | "pending" | "approved" | "rejected" | "suspended" | undefined;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const {
    data: tenantResponse,
    isLoading,
    isError,
  } = useAdminTenants(statusFilter);

  const approveTenant = useApproveTenant();
  const rejectTenant = useRejectTenant();
  const suspendTenant = useSuspendTenant();
  const migrateSiteBlogs = useMigrateSiteBlogs();

  const filteredTenants = statusFilter === "all"
    ? (tenantResponse?.data ?? [])
    : (tenantResponse?.data ?? []).filter(t => t.status === statusFilter);

  const allChecked =
    filteredTenants.length > 0 &&
    filteredTenants.every((t) => selectedIds.has(t._id));

  const someChecked =
    !allChecked &&
    filteredTenants.some((t) => selectedIds.has(t._id));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((prev) => {
      if (filteredTenants.every((t) => prev.has(t._id))) return new Set();
      return new Set(filteredTenants.map(t => t._id));
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  async function handleApprove() {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) => approveTenant.mutateAsync(id))
      );
      toast.success(`Approved ${ids.length} ${ids.length === 1 ? "tenant" : "tenants"}`);
      clearSelection();
    } catch {
      toast.error("Bulk approval failed", "Some tenants may not have been approved.");
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleReject() {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    // We'll need a prompt for rejection reason - simplified for now
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) => rejectTenant.mutateAsync({ id, reason: "Bulk rejection via admin" }))
      );
      toast.success(`Rejected ${ids.length} ${ids.length === 1 ? "tenant" : "tenants"}`);
      clearSelection();
    } catch {
      toast.error("Bulk rejection failed", "Some tenants may not have been rejected.");
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleSuspend() {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) => suspendTenant.mutateAsync(id))
      );
      toast.success(`Suspended ${ids.length} ${ids.length === 1 ? "tenant" : "tenants"}`);
      clearSelection();
    } catch {
      toast.error("Bulk suspension failed", "Some tenants may not have been suspended.");
    } finally {
      setBulkBusy(false);
    }
  }

  function getStatusBadgeClass(status: string) {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tenants</h2>
          <p className="text-sm text-muted-foreground">
            Manage tenant applications and approvals.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Link
            href="/admin/tenants/new"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <Plus className="h-4 w-4" />
            New tenant
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border">
        <button
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("status");
            const qs = params.toString();
            router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
          }}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            !statusFilter
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          All
          {!statusFilter && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
          )}
        </button>
        {[ "pending", "approved", "rejected", "suspended" ].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("status", status);
              const qs = params.toString();
              router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
            }}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              statusFilter === status
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {statusFilter === status && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 border-2 border-blue-500 border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin" />
            <span>Loading tenants...</span>
          </div>
        </div>
      )}

      {isError && (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Could not load tenants. Is the backend running?
          </p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && filteredTenants.length === 0 && (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {statusFilter !== "all"
              ? `No ${statusFilter} tenants yet.`
              : "No tenants yet."}
          </p>
          {statusFilter !== "all" ? (
            <Button variant="outline" size="sm" onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("status");
              const qs = params.toString();
              router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
            }}>
              Show all
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground mt-2">
              Tenants appear here after they apply through the blog signup.
            </p>
          )}
        </div>
      )}

      {!isLoading && !isError && filteredTenants.length > 0 && (
        <>
          {selectedIds.size > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
              <span className="text-xs font-medium">
                {selectedIds.size} selected
              </span>
              <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">
                Apply to all:
              </span>
              <div className="ml-auto flex flex-wrap items-center gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-xs"
                  disabled={bulkBusy}
                  onClick={handleApprove}
                >
                  Check
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-xs"
                  disabled={bulkBusy}
                  onClick={handleReject}
                >
                  X
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-xs"
                  disabled={bulkBusy}
                  onClick={handleSuspend}
                >
                  Zzz
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 gap-1 text-xs"
                  disabled={bulkBusy}
                  onClick={clearSelection}
                >
                  {bulkBusy ? (
                    <div className="h-3 w-3 border-2 border-blue-500 border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
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
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Requested</TableHead>
                <TableHead className="w-[1%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow
                  key={tenant._id}
                  data-state={selectedIds.has(tenant._id) ? "selected" : undefined}
                >
                  <TableCell className="pr-0">
                    <input
                      type="checkbox"
                      aria-label={`Select ${tenant.name}`}
                      checked={selectedIds.has(tenant._id)}
                      onChange={() => toggleOne(tenant._id)}
                      className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium">{tenant.name}</p>
                        </div>
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {tenant.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass(tenant.status)}
                    >
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-xs">
                      {new Date(tenant.requestedAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-green-500"
                        title="Approve"
                        onClick={() => approveTenant.mutateAsync(tenant._id)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-red-500"
                        title="Reject"
                        onClick={() => {
                          // Simple prompt for demo - in production would use a dialog
                          const reason = prompt("Rejection reason (optional):");
                          rejectTenant.mutateAsync({ id: tenant._id, reason: reason || "No reason provided" });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-yellow-500"
                        title="Suspend"
                        onClick={() => suspendTenant.mutateAsync(tenant._id)}
                      >
                        <Ban className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-blue-500"
                        title="Migrate site blogs to this tenant"
                        disabled={migrateSiteBlogs.isPending}
                        onClick={async () => {
                          const site = window.prompt(
                            `Migrate all unowned blogs with site =\nEnter site name (e.g. marketixpert):`,
                            "marketixpert"
                          );
                          if (!site) return;
                          try {
                            const res = await migrateSiteBlogs.mutateAsync({
                              apiKey: tenant.apiKey,
                              site,
                            });
                            toast.success(
                              `Migration complete`,
                              `${res.modifiedCount} blog(s) assigned to ${tenant.name}`
                            );
                          } catch {
                            toast.error("Migration failed", "Check the console for details.");
                          }
                        }}
                      >
                        <DatabaseZap className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
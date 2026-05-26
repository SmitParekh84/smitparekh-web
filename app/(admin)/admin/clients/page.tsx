"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Loader2,
  Mail,
  MoreHorizontal,
  Plus,
  RotateCcw,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner as UiSpinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminClients, useUpdateClientStatus } from "@/hooks/api/use-clients";
import { InviteClientModal } from "@/components/admin/InviteClientModal";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Client, ClientStatus } from "@/types";

const STATUS_CONFIG: Record<
  ClientStatus,
  { label: string; className: string }
> = {
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

function StatusBadge({ status }: { status: ClientStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", cfg.className)}>
      {cfg.label}
    </Badge>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name?: string, email?: string) {
  const src = name?.trim() || email || "";
  return src
    .split(/\s+|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "C";
}

export default function AdminClientsPage() {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const clientsQuery = useAdminClients();
  const updateStatus = useUpdateClientStatus();

  const clients = clientsQuery.data?.data ?? [];

  async function handleStatusChange(client: Client, status: ClientStatus) {
    setBusyId(client._id);
    try {
      await updateStatus.mutateAsync({ id: client._id, status });
      toast.success("Status updated");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not update status.";
      toast.error("Update failed", msg);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Clients</h1>
          <p className="text-[13px] text-muted-foreground">
            Manage client onboarding and requirements.
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Invite client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-500" />
            All clients
          </CardTitle>
          <CardDescription>
            {clients.length} {clients.length === 1 ? "client" : "clients"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {clientsQuery.isLoading && (
            <div className="flex items-center justify-center py-16">
              <UiSpinner className="[&_svg]:h-5 [&_svg]:w-5" />
            </div>
          )}

          {clientsQuery.isError && (
            <div className="px-6 py-12 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Could not load clients. Is the backend running?
              </p>
              <Button variant="outline" size="sm" onClick={() => clientsQuery.refetch()}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Retry
              </Button>
            </div>
          )}

          {!clientsQuery.isLoading && !clientsQuery.isError && clients.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm font-medium">No clients yet</p>
              <p className="text-xs text-muted-foreground">
                Send an invitation to onboard your first client.
              </p>
              <Button size="sm" onClick={() => setInviteOpen(true)} className="mt-1 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Invite client
              </Button>
            </div>
          )}

          {!clientsQuery.isLoading && !clientsQuery.isError && clients.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Mobile</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Invited</TableHead>
                  <TableHead className="hidden lg:table-cell">Onboarded</TableHead>
                  <TableHead className="w-[1%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    key={client._id}
                    onClick={() => router.push(`/admin/clients/${client._id}`)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-semibold text-blue-500">
                          {initials(client.name, client.email)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {client.name || <span className="text-muted-foreground italic">Pending</span>}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {client.mobile || "—"}
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={client.status} />
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {formatDate(client.invitedAt)}
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {client.onboardedAt ? formatDate(client.onboardedAt) : "—"}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        {busyId === client._id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground"
                                />
                              }
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {client.status !== "active" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(client, "active")}
                                  className="gap-2"
                                >
                                  <UserCheck className="h-3.5 w-3.5 text-green-500" />
                                  Mark as Active
                                </DropdownMenuItem>
                              )}
                              {client.status !== "inactive" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(client, "inactive")}
                                  className="gap-2 text-muted-foreground"
                                >
                                  Mark as Inactive
                                </DropdownMenuItem>
                              )}
                              {client.status === "invited" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(client, "invited")}
                                  className="gap-2"
                                >
                                  <Mail className="h-3.5 w-3.5 text-yellow-500" />
                                  Resend invitation
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <InviteClientModal open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Loader2,
  RotateCcw,
  ShieldCheck,
  Trash2,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAdminUsers,
  useDeletedAdminUsers,
  useDeleteAdminUser,
  useRestoreAdminUser,
} from "@/hooks/api/use-admin-users";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/api";
import { formatDateTime, formatDate } from "@/lib/date";
import type { AdminUser } from "@/types";

type Tab = "active" | "trash";

export default function AdminUsersPage() {
  const [tab, setTab] = useState<Tab>("active");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const { session } = useSupabaseSession();
  const currentEmail = session?.user?.email ?? null;

  const usersQuery = useAdminUsers();
  const trashQuery = useDeletedAdminUsers();
  const deleteUser = useDeleteAdminUser();
  const restoreUser = useRestoreAdminUser();

  const users = usersQuery.data ?? [];
  const trashed = trashQuery.data ?? [];

  function isSelf(user: AdminUser): boolean {
    if (!currentEmail) return false;
    return user.email?.toLowerCase() === currentEmail.toLowerCase();
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await deleteUser.mutateAsync(id);
      toast.success("User moved to trash");
      setConfirmId(null);
    } catch (err) {
      const msg =
        err instanceof ApiError && err.status === 400
          ? err.message
          : "Could not delete user.";
      toast.error("Delete failed", msg);
    } finally {
      setBusyId(null);
    }
  }

  async function handleRestore(id: string) {
    setBusyId(id);
    try {
      await restoreUser.mutateAsync(id);
      toast.success("User restored");
    } catch {
      toast.error("Restore failed", "Could not restore user.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Users</h1>
        <p className="text-[13px] text-muted-foreground">
          People with access to this admin.
        </p>
      </div>

      <div className="flex items-center gap-1 border-b border-border">
        <TabBtn
          active={tab === "active"}
          onClick={() => setTab("active")}
          label="Active"
        />
        <TabBtn
          active={tab === "trash"}
          onClick={() => setTab("trash")}
          label="Trash"
          count={trashed.length}
        />
      </div>

      {tab === "active" ? (
        <Card>
          <CardHeader>
            <CardTitle>All users</CardTitle>
            <CardDescription>
              {users.length} {users.length === 1 ? "user" : "users"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {usersQuery.isLoading && <Spinner />}
            {usersQuery.isError && (
              <ErrorState onRetry={() => usersQuery.refetch()} />
            )}
            {!usersQuery.isLoading &&
              !usersQuery.isError &&
              users.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  No users yet.
                </p>
              )}
            {!usersQuery.isLoading && !usersQuery.isError && users.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Provider
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Last login
                    </TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Logins
                    </TableHead>
                    <TableHead className="w-[1%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => {
                    const self = isSelf(u);
                    return (
                      <TableRow key={u._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 rounded-lg">
                              {u.avatarUrl && (
                                <AvatarImage
                                  src={u.avatarUrl}
                                  alt={u.name ?? u.email}
                                />
                              )}
                              <AvatarFallback className="rounded-lg bg-blue-500/15 text-xs font-semibold text-blue-500">
                                {initials(u.name, u.email)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate font-medium">
                                  {u.name || u.email}
                                </p>
                                {self && (
                                  <Badge
                                    variant="secondary"
                                    className="px-1.5 py-0 text-[10px]"
                                  >
                                    You
                                  </Badge>
                                )}
                              </div>
                              <p className="truncate text-xs text-muted-foreground">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "gap-1 px-2 py-0 text-xs capitalize",
                              u.role === "superadmin" &&
                                "border-blue-500/30 bg-blue-500/10 text-blue-500",
                            )}
                          >
                            {u.role === "superadmin" && (
                              <ShieldCheck className="h-3 w-3" />
                            )}
                            {u.role || "user"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-xs text-muted-foreground capitalize">
                          {u.provider || "-"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                          {u.lastLoginAt ? formatDateTime(u.lastLoginAt) : "-"}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-xs text-muted-foreground">
                          {u.loginCount ?? 0}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {confirmId === u._id ? (
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-7 px-2 text-xs"
                                  disabled={busyId === u._id}
                                  onClick={() => handleDelete(u._id)}
                                >
                                  {busyId === u._id ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Confirm"
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => setConfirmId(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                title={
                                  self
                                    ? "You cannot delete your own account"
                                    : "Delete"
                                }
                                disabled={self}
                                className="h-7 w-7 text-muted-foreground hover:text-destructive disabled:opacity-40"
                                onClick={() => setConfirmId(u._id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Trash</CardTitle>
            <CardDescription>
              Soft-deleted users. Restore to re-enable.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {trashQuery.isLoading && <Spinner />}
            {trashQuery.isError && (
              <ErrorState onRetry={() => trashQuery.refetch()} />
            )}
            {!trashQuery.isLoading &&
              !trashQuery.isError &&
              trashed.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Trash is empty.
                </p>
              )}
            {!trashQuery.isLoading && !trashQuery.isError && trashed.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deleted
                    </TableHead>
                    <TableHead className="w-[1%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trashed.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-lg opacity-70">
                            {u.avatarUrl && (
                              <AvatarImage
                                src={u.avatarUrl}
                                alt={u.name ?? u.email}
                              />
                            )}
                            <AvatarFallback className="rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                              {initials(u.name, u.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {u.name || u.email}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs capitalize text-muted-foreground">
                        {u.role || "user"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                        {u.deletedAt ? formatDate(u.deletedAt) : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-xs"
                            disabled={busyId === u._id}
                            onClick={() => handleRestore(u._id)}
                          >
                            {busyId === u._id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RotateCcw className="h-3 w-3" />
                            )}
                            Restore
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      {typeof count === "number" && count > 0 && (
        <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
          {count}
        </span>
      )}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
      )}
    </button>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <UiSpinner className="[&_svg]:h-5 [&_svg]:w-5" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="mb-3 text-sm text-muted-foreground">
        Could not load users. Is the backend running?
      </p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

function initials(name?: string, email?: string): string {
  const source = name && name.trim() ? name : (email ?? "");
  const parts = source.split(/\s+|@/).filter(Boolean);
  if (!parts.length) return "U";
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

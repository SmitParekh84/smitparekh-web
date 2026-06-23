"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Ban,
  ChevronRight,
  Loader2,
  MoreHorizontal,
  Plus,
  Receipt,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSelect } from "@/components/ui/app-select";
import {
  useAdminInvoices,
  useSendInvoice,
  useCancelInvoice,
  useMarkOverdue,
} from "@/hooks/api/use-invoices";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types";

function money(a: number, c: string) {
  return `${c === "INR" ? "₹" : "$"}${a.toFixed(2)}`;
}

function clientName(inv: Invoice) {
  return typeof inv.clientId === "object"
    ? inv.clientId.name || inv.clientId.email || "-"
    : "-";
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  paid: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  sent: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  overdue: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  cancelled: "border-muted bg-muted/50 text-muted-foreground",
  draft: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
};

const STATUS_DOT: Record<InvoiceStatus, string> = {
  paid: "bg-green-500",
  sent: "bg-blue-500",
  overdue: "bg-red-500",
  cancelled: "bg-muted-foreground/40",
  draft: "bg-yellow-500",
};

function InvoiceRow({ inv }: { inv: Invoice }) {
  const send = useSendInvoice();
  const cancel = useCancelInvoice();
  const markOverdue = useMarkOverdue();
  const [busyAction, setBusyAction] = useState<"send" | "cancel" | "overdue" | null>(null);

  const canSend = ["draft", "sent", "overdue"].includes(inv.status);
  const canCancel = inv.status !== "paid" && inv.status !== "cancelled";
  const isDraft = inv.status === "draft";
  const canMarkOverdue =
    inv.status === "sent" && !!inv.dueDate && new Date(inv.dueDate) < new Date();
  const busy = busyAction !== null;

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

  async function handleMarkOverdue() {
    setBusyAction("overdue");
    try {
      await markOverdue.mutateAsync(inv._id);
      toast.success("Marked overdue");
    } catch (e) {
      toast.error("Failed", e instanceof ApiError ? e.message : "Could not mark overdue.");
    } finally {
      setBusyAction(null);
    }
  }

  return (
    <TableRow className="group">
      <TableCell>
        <Link
          href={`/admin/invoices/${inv._id}`}
          className="font-mono text-[13px] font-medium hover:underline"
        >
          {inv.invoiceNumber}
        </Link>
      </TableCell>
      <TableCell className="text-[13px]">{clientName(inv)}</TableCell>
      <TableCell className="font-medium tabular-nums text-[13px]">
        {money(inv.amount, inv.currency)}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={cn("gap-1.5 text-[11px]", STATUS_BADGE[inv.status])}>
          <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[inv.status])} />
          {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell text-[12.5px] text-muted-foreground">
        {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1">
          {/* Prominent Send button for drafts */}
          {isDraft && (
            <Button
              size="sm"
              className="h-7 gap-1.5 px-2.5 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity"
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

          {/* Dropdown for all other actions */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={busy}
                />
              }
            >
              {busy && busyAction !== "send" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <MoreHorizontal className="h-3.5 w-3.5" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem render={<Link href={`/admin/invoices/${inv._id}`} />} className="gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                View details
              </DropdownMenuItem>
              {canSend && (
                <DropdownMenuItem onClick={handleSend} className="gap-2" disabled={busy}>
                  <Send className="h-3.5 w-3.5 text-blue-500" />
                  {inv.status === "draft" ? "Send to client" : "Resend"}
                </DropdownMenuItem>
              )}
              {canMarkOverdue && (
                <DropdownMenuItem onClick={handleMarkOverdue} className="gap-2 text-orange-600 focus:text-orange-600" disabled={busy}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Mark overdue
                </DropdownMenuItem>
              )}
              {canCancel && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleCancel}
                    className="gap-2 text-destructive focus:text-destructive"
                    disabled={busy}
                  >
                    <Ban className="h-3.5 w-3.5" />
                    Cancel invoice
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Chevron link */}
          <Link href={`/admin/invoices/${inv._id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function AdminInvoicesPage() {
  const [status, setStatus] = useState("all");
  const { data, isLoading } = useAdminInvoices(
    status === "all" ? undefined : { status }
  );
  const invoices = data?.data ?? [];

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AppSelect
          value={status}
          onValueChange={setStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "draft", label: "Draft" },
            { value: "sent", label: "Sent" },
            { value: "paid", label: "Paid" },
            { value: "overdue", label: "Overdue" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          triggerClassName="h-9 w-40"
        />
        <Link href="/admin/invoices/new" className={cn(buttonVariants(), "gap-1.5")}>
          <Plus className="h-4 w-4" /> New invoice
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner />
            </div>
          ) : invoices.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Receipt className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm font-medium">No invoices</p>
              <p className="text-xs text-muted-foreground">
                {status !== "all" ? `No ${status} invoices.` : "Create your first invoice."}
              </p>
              <Link
                href="/admin/invoices/new"
                className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
              >
                <Plus className="h-3.5 w-3.5" /> New invoice
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Number</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Due</TableHead>
                  <TableHead className="w-[1%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv: Invoice) => (
                  <InvoiceRow key={inv._id} inv={inv} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

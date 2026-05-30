"use client";

import { CheckCircle2, Clock, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyInvoices } from "@/hooks/api/use-invoices";
import { useClientMe } from "@/hooks/api/use-clients";
import { usePayInvoice } from "@/components/client/RazorpayCheckout";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types";

function money(amount: number, currency: string) {
  return `${currency === "INR" ? "₹" : "$"}${amount.toFixed(2)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; dot: string; badge: string }> = {
  paid: {
    label: "Paid",
    dot: "bg-green-500",
    badge: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  },
  sent: {
    label: "Awaiting payment",
    dot: "bg-blue-500",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  overdue: {
    label: "Overdue",
    dot: "bg-red-500",
    badge: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-muted-foreground/40",
    badge: "border-border bg-muted/50 text-muted-foreground",
  },
  draft: {
    label: "Draft",
    dot: "bg-muted-foreground/40",
    badge: "border-border bg-muted/50 text-muted-foreground",
  },
};

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <Badge variant="outline" className={cn("gap-1.5 text-[11px] font-medium", cfg.badge)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </Badge>
  );
}

export default function ClientInvoicesPage() {
  const { data, isLoading, refetch } = useMyInvoices();
  const { data: meData } = useClientMe();
  const invoices = data?.data ?? [];
  const me = meData?.data;
  const { pay, paying, error } = usePayInvoice(() => refetch());

  const pendingCount = invoices.filter(
    (i) => i.status === "sent" || i.status === "overdue"
  ).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Payment error banner */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <span className="mt-0.5 h-4 w-4 shrink-0">⚠</span>
          {error}
        </div>
      )}

      {/* Pending payment alert */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <Clock className="h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-[13px] font-medium text-amber-700 dark:text-amber-400">
            {pendingCount} invoice{pendingCount > 1 ? "s" : ""} awaiting payment
          </p>
        </div>
      )}

      {/* Empty state */}
      {invoices.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <Receipt className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm font-medium">No invoices yet</p>
          <p className="text-xs text-muted-foreground">
            Invoices from your project will appear here.
          </p>
        </div>
      ) : (
        /* Desktop table / mobile cards */
        <>
          {/* Table — hidden on xs */}
          <div className="hidden sm:block overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[1%] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv: Invoice) => {
                  const payable = inv.status === "sent" || inv.status === "overdue";
                  const isPaying = paying === inv._id;
                  return (
                    <TableRow key={inv._id}>
                      <TableCell>
                        <p className="text-[13.5px] font-medium">{inv.title}</p>
                        <p className="font-mono text-[11.5px] text-muted-foreground">
                          {inv.invoiceNumber}
                        </p>
                      </TableCell>
                      <TableCell className="font-semibold tabular-nums text-[14px]">
                        {money(inv.amount, inv.currency)}
                      </TableCell>
                      <TableCell className="text-[12.5px] text-muted-foreground">
                        {inv.dueDate ? fmtDate(inv.dueDate) : "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={inv.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {payable ? (
                          <Button
                            size="sm"
                            className="h-7 gap-1.5 px-3 text-[12px]"
                            onClick={() => pay(inv, { name: me?.name, email: me?.email })}
                            disabled={isPaying}
                          >
                            {isPaying ? "Processing…" : "Pay now"}
                          </Button>
                        ) : inv.status === "paid" ? (
                          <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                          </span>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Cards — shown only on mobile */}
          <div className="flex flex-col gap-3 sm:hidden">
            {invoices.map((inv: Invoice) => {
              const payable = inv.status === "sent" || inv.status === "overdue";
              const isPaying = paying === inv._id;
              return (
                <Card key={inv._id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium">{inv.title}</p>
                        <p className="font-mono text-[11.5px] text-muted-foreground">
                          {inv.invoiceNumber}
                        </p>
                      </div>
                      <StatusBadge status={inv.status} />
                    </div>
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[18px] font-semibold tabular-nums">
                          {money(inv.amount, inv.currency)}
                        </p>
                        {inv.dueDate && (
                          <p className="text-[12px] text-muted-foreground">
                            Due {fmtDate(inv.dueDate)}
                          </p>
                        )}
                      </div>
                      {payable ? (
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() => pay(inv, { name: me?.name, email: me?.email })}
                          disabled={isPaying}
                        >
                          {isPaying ? "Processing…" : "Pay now"}
                        </Button>
                      ) : inv.status === "paid" ? (
                        <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                        </span>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

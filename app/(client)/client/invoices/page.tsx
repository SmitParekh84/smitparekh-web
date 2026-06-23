"use client";

import { CheckCircle2, ChevronRight, Clock, CreditCard, FileText, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMyInvoices } from "@/hooks/api/use-invoices";
import { useClientMe } from "@/hooks/api/use-clients";
import { usePayInvoice } from "@/components/client/RazorpayCheckout";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types";

function money(amount: number, currency: string) {
  return `${currency === "INR" ? "₹" : "$"}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function fmtDate(iso?: string | null) {
  if (!iso) return "-";
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
    label: "Due",
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
  const allInvoices = data?.data ?? [];
  const me = meData?.data;
  const { pay, paying, error } = usePayInvoice(() => refetch());

  // Clients never see drafts
  const invoices = allInvoices.filter((i) => i.status !== "draft");
  const outstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue");
  const outstandingTotal = outstanding.reduce((s, i) => s + i.amount, 0);
  const paidTotal = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const currency = invoices[0]?.currency ?? "USD";

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
          <span className="mt-0.5 shrink-0">⚠</span>
          {error}
        </div>
      )}

      {/* Summary stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div
          className={cn(
            "rounded-xl border p-4",
            outstandingTotal > 0
              ? "border-blue-500/30 bg-blue-500/5"
              : "border-border bg-card"
          )}
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Amount due
          </p>
          <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight">
            {money(outstandingTotal, currency)}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {outstanding.length} open invoice{outstanding.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Paid to date
          </p>
          <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight">
            {money(paidTotal, currency)}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {invoices.filter((i) => i.status === "paid").length} invoices
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Pay securely with
          </p>
          <div className="mt-1 flex items-center gap-2 text-[14px] font-medium">
            <CreditCard className="h-4 w-4 text-muted-foreground" /> Razorpay
          </div>
          <p className="text-[12px] text-muted-foreground">UPI · cards · netbanking</p>
        </div>
      </div>

      {/* Pay-now callout */}
      {outstanding.length > 0 && (
        <Card className="border-blue-500/30">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13.5px] font-medium">
                  {outstanding.length === 1
                    ? outstanding[0].title
                    : `${outstanding.length} invoices awaiting payment`}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {outstanding.length === 1 ? (
                    <>
                      Due {fmtDate(outstanding[0].dueDate)} · {money(outstanding[0].amount, outstanding[0].currency)}
                    </>
                  ) : (
                    <>Total {money(outstandingTotal, currency)}</>
                  )}
                </p>
              </div>
            </div>
            <Button
              className="gap-1.5"
              onClick={() => pay(outstanding[0], { name: me?.name, email: me?.email })}
              disabled={!!paying}
            >
              <CreditCard className="h-3.5 w-3.5" />
              {outstanding.length === 1 ? "Review & pay" : "Pay next invoice"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Invoice list */}
      {invoices.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <Receipt className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm font-medium">No invoices yet</p>
          <p className="text-xs text-muted-foreground">Invoices from your project will appear here.</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-base">All invoices</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Tap an invoice to view, pay or download.
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border overflow-hidden rounded-b-xl">
              {invoices.map((inv: Invoice) => {
                const payable = inv.status === "sent" || inv.status === "overdue";
                const isPaying = paying === inv._id;
                return (
                  <div
                    key={inv._id}
                    id={`inv-${inv._id}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30 scroll-mt-24"
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-lg border",
                        inv.status === "paid"
                          ? "border-green-500/30 bg-green-500/10 text-green-600"
                          : payable
                          ? "border-blue-500/20 bg-blue-500/10 text-blue-600"
                          : "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      <FileText className="h-4 w-4" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[12.5px] font-semibold">
                          {inv.invoiceNumber}
                        </span>
                        <StatusBadge status={inv.status} />
                      </div>
                      <p className="truncate text-[12.5px] text-muted-foreground">
                        {inv.title}
                        {payable && inv.dueDate
                          ? ` · due ${fmtDate(inv.dueDate)}`
                          : inv.createdAt
                          ? ` · ${fmtDate(inv.createdAt)}`
                          : ""}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-[14px] font-semibold tabular-nums">
                        {money(inv.amount, inv.currency)}
                      </p>
                      <p className="text-[11.5px] text-muted-foreground">{inv.currency}</p>
                    </div>

                    {/* Action */}
                    {payable ? (
                      <Button
                        size="sm"
                        className="h-8 gap-1.5 px-3 text-[12px]"
                        onClick={() => pay(inv, { name: me?.name, email: me?.email })}
                        disabled={!!isPaying}
                      >
                        {isPaying ? "Processing…" : "Pay"}
                      </Button>
                    ) : inv.status === "paid" ? (
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

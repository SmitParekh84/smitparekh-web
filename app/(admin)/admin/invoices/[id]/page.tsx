"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, CheckCircle2, Clock, Download, Printer, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAdminInvoice, useSendInvoice, useCancelInvoice } from "@/hooks/api/use-invoices";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/types";

const INV_FROM = {
  name: "Smit Parekh",
  org: "Smit Parekh Technologies",
  email: "billing@smitparekh.co.in",
  address: "Ahmedabad, Gujarat 380015, India",
  taxLabel: "GSTIN",
  taxId: "24ABCDE1234F1Z5",
};

function money(a: number, c: string) {
  return `${c === "INR" ? "₹" : "$"}${Number(a || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function fmtDate(iso?: string | null) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; dot: string; badge: string }> = {
  paid:      { label: "Paid",      dot: "bg-green-500",           badge: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400" },
  sent:      { label: "Sent",      dot: "bg-blue-500",            badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  overdue:   { label: "Overdue",   dot: "bg-red-500",             badge: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400" },
  cancelled: { label: "Cancelled", dot: "bg-muted-foreground/40", badge: "border-border bg-muted/50 text-muted-foreground" },
  draft:     { label: "Draft",     dot: "bg-yellow-500",          badge: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
};

const HISTORY_ICONS: Record<string, React.ElementType> = {
  paid: CheckCircle2, sent: Send, overdue: Clock, cancelled: Ban, draft: Clock,
};

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <Badge variant="outline" className={cn("gap-1.5 text-[12px] font-medium", cfg.badge)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </Badge>
  );
}

export default function AdminInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useAdminInvoice(id);
  const send = useSendInvoice();
  const cancel = useCancelInvoice();
  const inv = data?.data;

  async function handleSend() {
    try {
      await send.mutateAsync(id);
      toast.success("Invoice sent", "The client has been emailed a payment link.");
    } catch (e) {
      toast.error("Send failed", e instanceof ApiError ? e.message : "Could not send invoice.");
    }
  }

  async function handleCancel() {
    try {
      await cancel.mutateAsync(id);
      toast.success("Invoice cancelled");
    } catch (e) {
      toast.error("Cancel failed", e instanceof ApiError ? e.message : "Could not cancel invoice.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!inv) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/invoices"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 w-fit")}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
        </Link>
        <p className="text-sm text-muted-foreground">Invoice not found.</p>
      </div>
    );
  }

  const clientObj = typeof inv.clientId === "object" ? inv.clientId : null;
  const canSend = ["draft", "sent", "overdue"].includes(inv.status);
  const canCancel = inv.status !== "paid" && inv.status !== "cancelled";
  const isOverdue = inv.status === "overdue";

  const subtotal = inv.lineItems.reduce((s, li) => s + li.amount, 0);
  const total = subtotal;

  return (
    <div className="mx-auto max-w-[800px] space-y-4 print:space-y-0">
      {/* Toolbar - hidden on print */}
      <div className="flex items-center justify-between gap-3 print:hidden">
        <Link
          href="/admin/invoices"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2")}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.print()}>
            <Download className="h-3.5 w-3.5" /> Download PDF
          </Button>
          {canSend && (
            <Button onClick={handleSend} disabled={send.isPending} size="sm" className="gap-1.5">
              <Send className="h-3.5 w-3.5" />
              {send.isPending ? "Sending…" : inv.status === "draft" ? "Send to client" : "Resend"}
            </Button>
          )}
          {canCancel && (
            <Button variant="outline" onClick={handleCancel} disabled={cancel.isPending} size="sm" className="gap-1.5">
              <Ban className="h-3.5 w-3.5" />
              {cancel.isPending ? "Cancelling…" : "Cancel"}
            </Button>
          )}
        </div>
      </div>

      {/* Invoice sheet */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm print:border-0 print:shadow-none print:rounded-none">

        {/* Header */}
        <div className="border-b border-border px-8 py-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-500 text-white">
                <span className="text-[15px] font-bold tracking-tight">SP</span>
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold tracking-tight">{INV_FROM.name}</div>
                <div className="text-[12px] text-muted-foreground">{INV_FROM.org}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[22px] font-semibold tracking-tight">Invoice</div>
              <div className="font-mono text-[12.5px] text-muted-foreground">{inv.invoiceNumber}</div>
              <div className="mt-1.5">
                <StatusBadge status={inv.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Bill-to / meta */}
        <div className="grid gap-6 px-8 py-6 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Billed to</p>
            {clientObj ? (
              <>
                {clientObj.company && <p className="text-[13.5px] font-medium">{clientObj.company}</p>}
                <p className="text-[12.5px] text-muted-foreground">
                  {clientObj.name && `${clientObj.name} · `}{clientObj.email}
                </p>
              </>
            ) : (
              <p className="text-[12.5px] text-muted-foreground">-</p>
            )}
            <h1 className="mt-3 text-[15px] font-semibold">{inv.title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:justify-items-end sm:text-right">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Issued</p>
              <p className="mt-0.5 text-[13px] font-medium tabular-nums">{fmtDate(inv.createdAt)}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Due</p>
              <p className={cn("mt-0.5 text-[13px] font-medium tabular-nums", isOverdue && "text-red-600")}>
                {fmtDate(inv.dueDate)}
              </p>
            </div>
            {inv.status === "paid" && inv.paidAt && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Paid on</p>
                <p className="mt-0.5 text-[13px] font-medium tabular-nums">{fmtDate(inv.paidAt)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Line items */}
        <div className="px-8">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-y border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 text-left font-semibold">Description</th>
                <th className="py-2.5 text-right font-semibold w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.lineItems.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-6 text-center text-[12.5px] text-muted-foreground">
                    No line items
                  </td>
                </tr>
              ) : (
                inv.lineItems.map((li, i) => (
                  <tr key={i} className="border-b border-border/60">
                    <td className="py-3 pr-4 text-foreground/90">{li.description}</td>
                    <td className="py-3 text-right tabular-nums font-medium">{money(li.amount, inv.currency)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end px-8 py-5">
          <div className="w-full max-w-[280px] space-y-1.5 text-[13px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums">{money(subtotal, inv.currency)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="tabular-nums">{money(0, inv.currency)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-border pt-2.5">
              <span className="font-semibold">Total {inv.currency}</span>
              <span className="text-[19px] font-semibold tabular-nums tracking-tight">
                {money(total, inv.currency)}
              </span>
            </div>
            {inv.status === "paid" && (
              <div className="flex items-center justify-end gap-1.5 pt-1 text-[12px] font-medium text-green-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> Paid in full
                {inv.razorpayPaymentId && (
                  <span className="ml-1 font-mono text-[11px] text-muted-foreground">· {inv.razorpayPaymentId}</span>
                )}
              </div>
            )}
            {isOverdue && (
              <div className="flex items-center justify-end gap-1.5 pt-1 text-[12px] font-medium text-red-600">
                <Clock className="h-3.5 w-3.5" /> Past due
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {inv.notes && (
          <div className="px-8 pb-3">
            <p className="rounded-md bg-muted/40 px-3 py-2 text-[12px] text-muted-foreground leading-relaxed">
              {inv.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border bg-muted/20 px-8 py-5">
          <div className="grid gap-4 sm:grid-cols-2 text-[11.5px] leading-relaxed text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground/70">{INV_FROM.name}</p>
              <p>{INV_FROM.address}</p>
              <p>{INV_FROM.taxLabel}: {INV_FROM.taxId} · {INV_FROM.email}</p>
            </div>
            <div className="sm:text-right">
              <p>Questions? Email <a href={`mailto:${INV_FROM.email}`} className="text-blue-600 hover:underline">{INV_FROM.email}</a>.</p>
              <p className="mt-1">Secure payments processed by Razorpay.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status history - hidden on print */}
      <div className="rounded-xl border border-border bg-card p-5 print:hidden">
        <h2 className="mb-4 text-sm font-semibold">Status history</h2>
        <ol className="relative space-y-0 border-l border-border pl-5">
          {[...inv.statusHistory].reverse().map((h, i) => {
            const cfg = STATUS_CONFIG[h.status as InvoiceStatus] ?? STATUS_CONFIG.draft;
            const Icon = HISTORY_ICONS[h.status] ?? Clock;
            return (
              <li key={i} className="relative pb-5 last:pb-0">
                <span className={cn("absolute -left-[22px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background", cfg.dot)} />
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[13.5px] font-medium capitalize">{h.status}</span>
                  </div>
                  <span className="shrink-0 text-[11.5px] text-muted-foreground">
                    {fmtDateTime(h.at)} · {h.by}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body > * { visibility: hidden !important; }
          .print\\:hidden { display: none !important; }
          [data-print-invoice] { visibility: visible !important; position: absolute; inset: 0; }
        }
      `}</style>
    </div>
  );
}

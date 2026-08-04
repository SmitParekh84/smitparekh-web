"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  useAdminInvoice,
  useCancelInvoice,
  useMarkOverdue,
  useSendInvoice,
  useUpdateInvoice,
} from "@/hooks/api/use-invoices";
import { ApiError } from "@/lib/api";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types";
import { AlertTriangle, ArrowLeft, Ban, Check, CheckCircle2, Clock, Download, Loader2, Pencil, Send, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

/**
 * The invoice "sheet" is always printed on white paper, so it must stay light
 * even in dark mode — otherwise the theme's light-on-dark text renders on white
 * and becomes unreadable. Pinning the semantic tokens locally forces a light
 * palette for the sheet and everything inside it.
 */
const LIGHT_SHEET = {
  "--background": "oklch(1 0 0)",
  "--foreground": "oklch(0.145 0 0)",
  "--card": "oklch(0.990 0.004 264)",
  "--popover": "oklch(1 0 0)",
  "--popover-foreground": "oklch(0.145 0 0)",
  "--muted": "oklch(0.970 0.005 240)",
  "--muted-foreground": "oklch(0.520 0.020 240)",
  "--border": "oklch(0.910 0.010 240)",
  "--input": "oklch(0.910 0.010 240)",
  "--ring": "oklch(0.761 0.141 204.6)",
} as React.CSSProperties;

const INV_FROM = {
  name: "Smit Parekh",
  org: "Smit Parekh Technologies",
  email: "business.smitp@gmail.com",
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
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; dot: string; badge: string }> = {
  paid: {
    label: "Paid",
    dot: "bg-green-500",
    badge: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
  },
  sent: {
    label: "Sent",
    dot: "bg-blue-500",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  overdue: {
    label: "Overdue",
    dot: "bg-red-500",
    badge: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-muted-foreground/40",
    badge: "border-border bg-muted/50 text-muted-foreground",
  },
  draft: {
    label: "Draft",
    dot: "bg-yellow-500",
    badge: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
};

const HISTORY_ICONS: Record<string, React.ElementType> = {
  paid: CheckCircle2,
  sent: Send,
  overdue: Clock,
  cancelled: Ban,
  draft: Clock,
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

/**
 * Invoice number shown on the sheet. Editable inline for draft invoices only —
 * the backend rejects edits once an invoice is sent, and enforces uniqueness.
 */
function InvoiceNumberField({ invoice }: { invoice: Invoice }) {
  const update = useUpdateInvoice();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(invoice.invoiceNumber);
  const canEdit = invoice.status === "draft";

  function start() {
    setValue(invoice.invoiceNumber);
    setEditing(true);
  }

  async function save() {
    const next = value.trim().toUpperCase();
    if (!next || next === invoice.invoiceNumber) {
      setEditing(false);
      return;
    }
    try {
      await update.mutateAsync({ id: invoice._id, input: { invoiceNumber: next } });
      toast.success("Invoice number updated");
      setEditing(false);
    } catch (e) {
      toast.error(
        "Update failed",
        e instanceof ApiError ? e.message : "Could not update the invoice number.",
      );
    }
  }

  if (editing) {
    return (
      <div className="flex items-center justify-end gap-1.5 print:hidden">
        <Input
          value={value}
          onChange={(e) =>
            setValue(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 30))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEditing(false);
          }}
          autoFocus
          className="h-7 w-40 font-mono text-[12.5px]"
        />
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 shrink-0"
          onClick={save}
          disabled={update.isPending}
          aria-label="Save invoice number"
        >
          {update.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5 text-green-600" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 shrink-0"
          onClick={() => setEditing(false)}
          disabled={update.isPending}
          aria-label="Cancel"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      <span className="font-mono text-[12.5px] text-muted-foreground">{invoice.invoiceNumber}</span>
      {canEdit && (
        <button
          type="button"
          onClick={start}
          aria-label="Edit invoice number"
          title="Edit invoice number"
          className="text-muted-foreground/70 transition-colors hover:text-foreground print:hidden"
        >
          <Pencil className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export default function AdminInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading } = useAdminInvoice(id);
  const send = useSendInvoice();
  const cancel = useCancelInvoice();
  const markOverdue = useMarkOverdue();
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

  async function handleMarkOverdue() {
    try {
      await markOverdue.mutateAsync(id);
      toast.success("Marked overdue", "Client will see this as overdue.");
    } catch (e) {
      toast.error("Failed", e instanceof ApiError ? e.message : "Could not mark overdue.");
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
  const canMarkOverdue =
    inv.status === "sent" && !!inv.dueDate && new Date(inv.dueDate) < new Date();

  const subtotal = inv.lineItems.reduce((s, li) => s + li.amount, 0);
  const total = subtotal;

  return (
    <div className="mx-auto max-w-[800px] space-y-4 print:space-y-0">
      {/* Toolbar - hidden on print */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/admin/invoices"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2")}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.print()}>
            <Download className="h-3.5 w-3.5" /> Download PDF
          </Button>
          {canSend && (
            <Button onClick={handleSend} disabled={send.isPending} size="sm" className="gap-1.5">
              <Send className="h-3.5 w-3.5" />
              {send.isPending ? "Sending…" : inv.status === "draft" ? "Send to client" : "Resend"}
            </Button>
          )}
          {canMarkOverdue && (
            <Button
              variant="outline"
              onClick={handleMarkOverdue}
              disabled={markOverdue.isPending}
              size="sm"
              className="gap-1.5 border-orange-500/40 text-orange-600 hover:bg-orange-500/10 dark:text-orange-400"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              {markOverdue.isPending ? "Updating…" : "Mark overdue"}
            </Button>
          )}
          {canCancel && (
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={cancel.isPending}
              size="sm"
              className="gap-1.5"
            >
              <Ban className="h-3.5 w-3.5" />
              {cancel.isPending ? "Cancelling…" : "Cancel"}
            </Button>
          )}
        </div>
      </div>

      {/* Invoice sheet */}
      <div
        data-print-invoice
        style={LIGHT_SHEET}
        className="overflow-hidden rounded-xl border border-border bg-white text-foreground shadow-sm print:border-0 print:shadow-none print:rounded-none"
      >
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
              <InvoiceNumberField invoice={inv} />
              <div className="mt-1.5">
                <StatusBadge status={inv.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Bill-to / meta */}
        <div className="grid gap-6 px-8 py-6 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Billed to
            </p>
            {clientObj ? (
              <>
                {clientObj.company && (
                  <p className="text-[13.5px] font-medium">{clientObj.company}</p>
                )}
                <p className="text-[12.5px] text-muted-foreground">
                  {clientObj.name && `${clientObj.name} · `}
                  {clientObj.email}
                </p>
              </>
            ) : (
              <p className="text-[12.5px] text-muted-foreground">-</p>
            )}
            <h1 className="mt-3 text-[15px] font-semibold">{inv.title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:justify-items-end sm:text-right">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Issued
              </p>
              <p className="mt-0.5 text-[13px] font-medium tabular-nums">
                {fmtDate(inv.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Due
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[13px] font-medium tabular-nums",
                  isOverdue && "text-red-600",
                )}
              >
                {fmtDate(inv.dueDate)}
              </p>
            </div>
            {inv.status === "paid" && inv.paidAt && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Paid on
                </p>
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
                    <td className="py-3 text-right tabular-nums font-medium">
                      {money(li.amount, inv.currency)}
                    </td>
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
                  <span className="ml-1 font-mono text-[11px] text-muted-foreground">
                    · {inv.razorpayPaymentId}
                  </span>
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
              <p>
                {INV_FROM.taxLabel}: {INV_FROM.taxId} · {INV_FROM.email}
              </p>
            </div>
            <div className="sm:text-right">
              <p>
                Questions? Email{" "}
                <a href={`mailto:${INV_FROM.email}`} className="text-blue-600 hover:underline">
                  {INV_FROM.email}
                </a>
                .
              </p>
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
                <span
                  className={cn(
                    "absolute -left-[22px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background",
                    cfg.dot,
                  )}
                />
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

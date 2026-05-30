"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, CheckCircle2, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAdminInvoice, useSendInvoice, useCancelInvoice } from "@/hooks/api/use-invoices";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/types";

function money(a: number, c: string) {
  return `${c === "INR" ? "₹" : "$"}${a.toFixed(2)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
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
    badge: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  },
  sent: {
    label: "Sent",
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
    dot: "bg-yellow-500",
    badge: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
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

const HISTORY_ICONS: Record<string, React.ElementType> = {
  paid: CheckCircle2,
  sent: Send,
  overdue: Clock,
  cancelled: Ban,
  draft: Clock,
};

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
      toast.error(
        "Cancel failed",
        e instanceof ApiError ? e.message : "Could not cancel invoice."
      );
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

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href="/admin/invoices"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 w-fit")}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
      </Link>

      {/* Header card */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[13px] text-muted-foreground">
                  {inv.invoiceNumber}
                </span>
                <StatusBadge status={inv.status} />
              </div>
              <h1 className="mt-1.5 text-[20px] font-semibold tracking-tight">{inv.title}</h1>
              {clientObj && (
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  {clientObj.name || clientObj.email}
                  {clientObj.name && clientObj.email && ` · ${clientObj.email}`}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-[28px] font-semibold tracking-tight tabular-nums">
                {money(inv.amount, inv.currency)}
              </div>
              {inv.dueDate && (
                <p className="text-[12px] text-muted-foreground">
                  Due {fmtDate(inv.dueDate)}
                </p>
              )}
            </div>
          </div>

          {inv.notes && (
            <>
              <Separator className="my-4" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{inv.notes}</p>
            </>
          )}

          {inv.status === "paid" && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center gap-2 text-[13px] text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Paid {inv.paidAt ? fmtDateTime(inv.paidAt) : ""}
                {inv.razorpayPaymentId && (
                  <span className="ml-1 font-mono text-[12px] text-muted-foreground">
                    · {inv.razorpayPaymentId}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Actions */}
          {(canSend || canCancel) && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap items-center gap-2">
                {canSend && (
                  <Button
                    onClick={handleSend}
                    disabled={send.isPending}
                    className="gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {send.isPending
                      ? "Sending…"
                      : inv.status === "draft"
                        ? "Send to client"
                        : "Resend"}
                  </Button>
                )}
                {canCancel && (
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={cancel.isPending}
                    className="gap-1.5"
                  >
                    <Ban className="h-3.5 w-3.5" />
                    {cancel.isPending ? "Cancelling…" : "Cancel invoice"}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Status history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status history</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="relative space-y-0 border-l border-border pl-5">
            {[...inv.statusHistory].reverse().map((h, i) => {
              const cfg = STATUS_CONFIG[h.status as InvoiceStatus] ?? STATUS_CONFIG.draft;
              const Icon = HISTORY_ICONS[h.status] ?? Clock;
              return (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span
                    className={cn(
                      "absolute -left-[22px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background",
                      cfg.dot
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
        </CardContent>
      </Card>
    </div>
  );
}

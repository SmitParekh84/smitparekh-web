"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAdminInvoice, useSendInvoice, useCancelInvoice } from "@/hooks/api/use-invoices";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/types";

function money(a: number, c: string) {
  return `${c === "INR" ? "₹" : "$"}${a.toFixed(2)}`;
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  paid: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  sent: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  overdue: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  cancelled: "border-muted bg-muted/50 text-muted-foreground",
  draft: "border-muted bg-muted/50 text-muted-foreground",
};

export default function AdminInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
        <Link href="/admin/invoices" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
        </Link>
        <p className="text-sm text-muted-foreground">Invoice not found.</p>
      </div>
    );
  }

  const canSend = ["draft", "sent", "overdue"].includes(inv.status);
  const canCancel = inv.status !== "paid" && inv.status !== "cancelled";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/admin/invoices"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 w-fit")}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
      </Link>

      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">{inv.invoiceNumber}</h1>
        <Badge variant="outline" className={cn("text-[11px]", STATUS_BADGE[inv.status])}>
          {inv.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{inv.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-lg font-semibold">{money(inv.amount, inv.currency)}</p>
          {inv.dueDate && (
            <p className="text-muted-foreground">Due {new Date(inv.dueDate).toLocaleDateString()}</p>
          )}
          {inv.notes && <p className="text-muted-foreground">{inv.notes}</p>}
          {inv.razorpayPaymentId && (
            <p className="text-muted-foreground">Payment ID: {inv.razorpayPaymentId}</p>
          )}
          {inv.paidAt && (
            <p className="text-green-600 dark:text-green-400">
              Paid {new Date(inv.paidAt).toLocaleString()}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-3">
            {canSend && (
              <Button onClick={handleSend} disabled={send.isPending} className="gap-1.5">
                <Send className="h-3.5 w-3.5" />
                {inv.status === "draft" ? "Send to client" : "Resend"}
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={cancel.isPending}
                className="gap-1.5"
              >
                <Ban className="h-3.5 w-3.5" /> Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status history</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {inv.statusHistory.map((h, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="font-medium capitalize">{h.status}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(h.at).toLocaleString()} · {h.by}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

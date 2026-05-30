"use client";

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
  return `${currency === "INR" ? "₹" : "$"}${amount.toFixed(2)}`;
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  paid: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  sent: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  overdue: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  cancelled: "border-muted bg-muted/50 text-muted-foreground",
  draft: "border-muted bg-muted/50 text-muted-foreground",
};

export default function ClientInvoicesPage() {
  const { data, isLoading, refetch } = useMyInvoices();
  const { data: meData } = useClientMe();
  const invoices = data?.data ?? [];
  const me = meData?.data;
  const { pay, paying, error } = usePayInvoice(() => refetch());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
        <p className="mt-1 text-sm text-muted-foreground">View and pay your invoices.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No invoices yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv: Invoice) => {
            const payable = inv.status === "sent" || inv.status === "overdue";
            return (
              <Card key={inv._id}>
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{inv.title}</CardTitle>
                    <p className="mt-0.5 text-xs text-muted-foreground">{inv.invoiceNumber}</p>
                  </div>
                  <Badge variant="outline" className={cn("text-[11px]", STATUS_BADGE[inv.status])}>
                    {inv.status}
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{money(inv.amount, inv.currency)}</p>
                    {inv.dueDate && (
                      <p className="text-xs text-muted-foreground">
                        Due {new Date(inv.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {payable && (
                    <Button
                      onClick={() => pay(inv, { name: me?.name, email: me?.email })}
                      disabled={paying === inv._id}
                    >
                      {paying === inv._id ? "Processing…" : "Pay now"}
                    </Button>
                  )}
                  {inv.status === "paid" && (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Paid ✓
                    </span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppSelect } from "@/components/ui/app-select";
import { useAdminInvoices } from "@/hooks/api/use-invoices";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types";

function money(a: number, c: string) {
  return `${c === "INR" ? "₹" : "$"}${a.toFixed(2)}`;
}

function clientName(inv: Invoice) {
  return typeof inv.clientId === "object" ? inv.clientId.name || inv.clientId.email || "—" : "—";
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  paid: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  sent: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  overdue: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  cancelled: "border-muted bg-muted/50 text-muted-foreground",
  draft: "border-muted bg-muted/50 text-muted-foreground",
};

export default function AdminInvoicesPage() {
  const [status, setStatus] = useState("all");
  const { data, isLoading } = useAdminInvoices(status === "all" ? undefined : { status });
  const invoices = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Invoices</h1>
          <p className="text-[13px] text-muted-foreground">Create and track client invoices.</p>
        </div>
        <Link href="/admin/invoices/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus className="h-4 w-4" /> New invoice
        </Link>
      </div>

      <div className="flex items-center gap-2">
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
              <p className="text-sm font-medium">No invoices yet</p>
              <Link href="/admin/invoices/new" className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
                <Plus className="h-3.5 w-3.5" /> New invoice
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv: Invoice) => (
                  <TableRow key={inv._id}>
                    <TableCell>
                      <Link href={`/admin/invoices/${inv._id}`} className="font-medium hover:underline">
                        {inv.invoiceNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{clientName(inv)}</TableCell>
                    <TableCell className="text-sm">{money(inv.amount, inv.currency)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-[11px]", STATUS_BADGE[inv.status])}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

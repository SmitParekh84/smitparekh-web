"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppSelect } from "@/components/ui/app-select";
import { useAdminClients } from "@/hooks/api/use-clients";
import { useCreateInvoice, useSendInvoice } from "@/hooks/api/use-invoices";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Client } from "@/types";

export default function NewInvoicePage() {
  return (
    <Suspense fallback={null}>
      <NewInvoiceForm />
    </Suspense>
  );
}

function NewInvoiceForm() {
  const router = useRouter();
  const presetClient = useSearchParams().get("clientId") ?? "";
  const { data: clientsData } = useAdminClients();
  const clients = clientsData?.data ?? [];
  const createInvoice = useCreateInvoice();
  const sendInvoice = useSendInvoice();

  const [clientId, setClientId] = useState(presetClient);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function submit(andSend = false) {
    setErr(null);
    if (!clientId || !title || !amount) {
      setErr("Client, title and amount are required.");
      return;
    }
    try {
      const res = await createInvoice.mutateAsync({
        clientId,
        title,
        currency,
        amount: Number(amount),
        lineItems: [{ description: title, amount: Number(amount) }],
        notes: notes || undefined,
        dueDate: dueDate || null,
      });
      if (andSend) {
        await sendInvoice.mutateAsync(res.data._id);
        toast.success("Invoice sent", "Client has been notified by email.");
      } else {
        toast.success("Invoice created", "Saved as draft.");
      }
      router.push("/admin/invoices");
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Could not create invoice.";
      setErr(msg);
      toast.error("Failed", msg);
    }
  }

  const busy = createInvoice.isPending || sendInvoice.isPending;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Link
        href="/admin/invoices"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 w-fit")}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to invoices
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">New invoice</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {err && <p className="text-sm text-destructive">{err}</p>}

          <div className="space-y-1.5">
            <Label>Client</Label>
            <AppSelect
              value={clientId}
              onValueChange={setClientId}
              options={clients.map((c: Client) => ({ value: c._id, label: c.name || c.email }))}
              placeholder="Select a client…"
              triggerClassName="w-full"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Milestone 1 — Design phase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Currency</Label>
              <AppSelect
                value={currency}
                onValueChange={(v) => setCurrency(v as "USD" | "INR")}
                options={[
                  { value: "USD", label: "USD ($)" },
                  { value: "INR", label: "INR (₹)" },
                ]}
                triggerClassName="w-full"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Amount</Label>
              <Input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Due date</Label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional"
              rows={3}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            USD is the default. USD live payments need Razorpay International Payments (account under
            review) — test mode works now.
          </p>

          {/* Split button: primary = Create & Send, dropdown = Save draft */}
          <div className="flex items-center">
            <Button
              onClick={() => submit(true)}
              disabled={busy}
              className="gap-1.5 rounded-r-none border-r border-r-white/20"
            >
              <Send className="h-3.5 w-3.5" />
              {sendInvoice.isPending ? "Sending…" : createInvoice.isPending ? "Creating…" : "Create & Send"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    disabled={busy}
                    className="rounded-l-none px-2"
                  />
                }
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => submit(false)} className="gap-2">
                  Save as draft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

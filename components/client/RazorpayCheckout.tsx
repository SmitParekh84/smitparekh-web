"use client";

import { useCallback, useState } from "react";
import { invoicesApi } from "@/lib/api/invoices";
import type { Invoice } from "@/types";

type RazorpayInstance = { open: () => void; on: (event: string, cb: (resp: unknown) => void) => void };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

/**
 * Drives the Razorpay Standard Checkout for a single invoice.
 * `onPaid` fires after a successful client-side verify (the webhook reconciles
 * server-side regardless).
 */
export function usePayInvoice(onPaid: () => void) {
  const [paying, setPaying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pay = useCallback(
    async (invoice: Invoice, client: { name?: string; email?: string }) => {
      setError(null);
      setPaying(invoice._id);
      try {
        const ok = await loadScript(CHECKOUT_SRC);
        if (!ok || !window.Razorpay) throw new Error("Could not load Razorpay checkout.");

        const orderRes = await invoicesApi.createOrder(invoice._id);
        const order = orderRes.data;

        const rzp = new window.Razorpay({
          key: order.keyId,
          order_id: order.orderId,
          amount: order.amount,
          currency: order.currency,
          name: "Smit Parekh",
          description: `${invoice.invoiceNumber} - ${invoice.title}`,
          prefill: { name: client.name ?? "", email: client.email ?? "" },
          theme: { color: "#0628FF" },
          handler: async (resp: unknown) => {
            const r = resp as {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            };
            try {
              await invoicesApi.verify(invoice._id, {
                razorpay_order_id: r.razorpay_order_id,
                razorpay_payment_id: r.razorpay_payment_id,
                razorpay_signature: r.razorpay_signature,
              });
              onPaid();
            } catch {
              // Payment captured but verify lagged - webhook will reconcile.
              setError("Payment received - confirmation is updating, please refresh in a moment.");
              onPaid();
            } finally {
              setPaying(null);
            }
          },
          modal: { ondismiss: () => setPaying(null) },
        });
        rzp.on("payment.failed", (resp: unknown) => {
          const r = resp as { error?: { description?: string } };
          setError(r.error?.description ?? "Payment failed. Please try again.");
          setPaying(null);
        });
        rzp.open();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
        setPaying(null);
      }
    },
    [onPaid]
  );

  return { pay, paying, error };
}

import { api } from "./client";
import type { Invoice, CreateOrderResponse } from "@/types";

export interface CreateInvoiceInput {
  clientId: string;
  projectId?: string | null;
  title: string;
  lineItems: { description: string; amount: number }[];
  currency: "USD" | "INR";
  amount: number;
  notes?: string;
  dueDate?: string | null;
  invoicePrefix?: string;
}

export interface NextInvoiceNumber {
  prefix: string;
  year: number;
  seq: number;
  invoiceNumber: string;
}

export interface VerifyPaymentInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

type Ok<T> = { success: boolean; data: T };

export const invoicesApi = {
  /* Admin */
  list: (params?: { status?: string; clientId?: string }) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params ?? {}).filter(([, v]) => v))
    ).toString();
    return api.get<Ok<Invoice[]>>(`/invoices${qs ? `?${qs}` : ""}`);
  },
  getById: (id: string) => api.get<Ok<Invoice>>(`/invoices/${id}`),
  nextNumber: (clientId: string, prefix?: string) => {
    const qs = new URLSearchParams({ clientId, ...(prefix ? { prefix } : {}) }).toString();
    return api.get<Ok<NextInvoiceNumber>>(`/invoices/next-number?${qs}`);
  },
  create: (input: CreateInvoiceInput) => api.post<Ok<Invoice>>("/invoices", input),
  update: (id: string, input: Partial<CreateInvoiceInput>) =>
    api.patch<Ok<Invoice>>(`/invoices/${id}`, input),
  send: (id: string) => api.post<Ok<Invoice>>(`/invoices/${id}/send`, {}),
  cancel: (id: string) => api.post<Ok<Invoice>>(`/invoices/${id}/cancel`, {}),
  markOverdue: (id: string) => api.post<Ok<Invoice>>(`/invoices/${id}/overdue`, {}),
  checkOverdue: () => api.post<Ok<{ marked: number }>>("/invoices/check-overdue", {}),
  forClient: (clientId: string) => api.get<Ok<Invoice[]>>(`/clients/${clientId}/invoices`),

  /* Client self */
  listMine: () => api.get<Ok<Invoice[]>>("/invoices/me"),
  getMine: (id: string) => api.get<Ok<Invoice>>(`/invoices/me/${id}`),
  createOrder: (id: string) => api.post<Ok<CreateOrderResponse>>(`/invoices/me/${id}/order`, {}),
  verify: (id: string, input: VerifyPaymentInput) =>
    api.post<Ok<Invoice>>(`/invoices/me/${id}/verify`, input),
};

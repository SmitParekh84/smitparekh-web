import { toast as sonner } from "sonner";

interface ToastOptions {
  description?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

export const toast = {
  success: (message: string, descriptionOrOptions?: string | ToastOptions) =>
    sonner.success(message, normalize(descriptionOrOptions)),

  error: (message: string, descriptionOrOptions?: string | ToastOptions) =>
    sonner.error(message, normalize(descriptionOrOptions)),

  info: (message: string, descriptionOrOptions?: string | ToastOptions) =>
    sonner.info(message, normalize(descriptionOrOptions)),

  warning: (message: string, descriptionOrOptions?: string | ToastOptions) =>
    sonner.warning(message, normalize(descriptionOrOptions)),

  loading: (message: string) => sonner.loading(message),

  promise: sonner.promise,

  dismiss: (id?: string | number) => sonner.dismiss(id),
};

function normalize(arg?: string | ToastOptions) {
  if (!arg) return undefined;
  if (typeof arg === "string") return { description: arg };
  return arg;
}


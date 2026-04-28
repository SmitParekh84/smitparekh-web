"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TypedConfirmModalProps {
  title: string;
  description: ReactNode;
  /** The exact text the user must type to enable the confirm button. */
  confirmText: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TypedConfirmModal({
  title,
  description,
  confirmText,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isPending = false,
  onConfirm,
  onCancel,
}: TypedConfirmModalProps) {
  const [value, setValue] = useState("");
  const matches = value.trim() === confirmText.trim();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !isPending) onCancel();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isPending, onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="typed-confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => !isPending && onCancel()}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-xl bg-destructive/10 p-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h3
              id="typed-confirm-title"
              className="text-base font-semibold"
            >
              {title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            aria-label="Close"
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          Type{" "}
          <span className="font-mono text-foreground">{confirmText}</span>{" "}
          to confirm
        </label>
        <input
          type="text"
          autoFocus
          value={value}
          disabled={isPending}
          onChange={(e) => setValue(e.target.value)}
          className="mb-5 w-full rounded-xl border border-border bg-background px-3 py-2 font-mono text-sm transition-colors focus:border-destructive/60 focus:outline-none focus:ring-2 focus:ring-destructive/20 disabled:opacity-50"
        />

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isPending}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={!matches || isPending}
            onClick={onConfirm}
            className="gap-1.5"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Working...
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

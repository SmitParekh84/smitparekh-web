"use client";

import { useState, type ReactNode } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  return (
    <AlertDialog
      open
      onOpenChange={(open) => {
        if (!open && !isPending) onCancel();
      }}
    >
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-destructive/10 p-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription className="mt-0.5">
                {description}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-1.5">
          <Label htmlFor="typed-confirm-input" className="text-xs text-muted-foreground">
            Type{" "}
            <span className="font-mono text-foreground">{confirmText}</span>{" "}
            to confirm
          </Label>
          <Input
            id="typed-confirm-input"
            type="text"
            autoFocus
            value={value}
            disabled={isPending}
            onChange={(e) => setValue(e.target.value)}
            className="font-mono"
          />
        </div>

        <AlertDialogFooter>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

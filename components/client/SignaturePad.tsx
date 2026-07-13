"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SignaturePadLib from "signature_pad";
import { Button } from "@/components/ui/button";
import { Check, PenLine, RotateCcw, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSign: (dataUrl: string) => void;
  /** Disable (e.g. while mutation is pending) */
  disabled?: boolean;
  className?: string;
}

/**
 * Two-step signature flow:
 *  1. Tap trigger → full-screen overlay opens (landscape hint shown)
 *  2. User draws → taps "Use this signature"
 *  3. Preview shown → "Confirm" or "Redraw"
 *  4. On confirm → onSign(dataUrl) called
 */
export function SignaturePad({ onSign, disabled, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePadLib | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);

  /* ── Initialise / destroy the pad whenever the overlay opens/closes ── */
  const initPad = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = Math.max(window.devicePixelRatio ?? 1, 1);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.offsetWidth || 800;
    const h = rect.height || canvas.offsetHeight || 300;
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.getContext("2d")?.scale(ratio, ratio);

    const pad = new SignaturePadLib(canvas, {
      backgroundColor: "rgb(255,255,255)",
      penColor: "rgb(10,10,10)",
      minWidth: 1,
      maxWidth: 3,
    });
    pad.addEventListener("endStroke", () => setIsEmpty(pad.isEmpty()));
    padRef.current = pad;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    // Two rAF cycles ensure the DOM has fully painted before we measure
    let id: number;
    const outer = requestAnimationFrame(() => {
      id = requestAnimationFrame(initPad);
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(id);
      padRef.current?.off();
      padRef.current = null;
    };
  }, [isOpen, initPad]);

  /* ── Re-init on orientation change ──────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => {
      // Give the browser a frame to reflow then reinit the pad
      requestAnimationFrame(initPad);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen, initPad]);

  /* ── Try to lock landscape orientation when overlay opens ───────────── */
  useEffect(() => {
    if (!isOpen) return;
    const tryLock = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (screen.orientation as any).lock?.("landscape");
      } catch {
        // Not available in all browsers - graceful degradation
      }
    };
    tryLock();
    return () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (screen.orientation as any).unlock?.();
      } catch {}
    };
  }, [isOpen]);

  /* ── Handlers ────────────────────────────────────────────────────────── */
  function open() {
    setIsOpen(true);
    setIsEmpty(true);
    setPreview(null);
  }

  function close() {
    setIsOpen(false);
    setPreview(null);
    setIsEmpty(true);
    padRef.current?.clear();
  }

  function handleClear() {
    padRef.current?.clear();
    setIsEmpty(true);
    setPreview(null);
  }

  function handlePreviewStep() {
    const pad = padRef.current;
    if (!pad || pad.isEmpty()) return;
    setPreview(pad.toDataURL("image/png"));
  }

  function handleConfirm() {
    if (!preview) return;
    onSign(preview);
    close();
  }

  /* ── Trigger ─────────────────────────────────────────────────────────── */
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={open}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border",
          "bg-muted/20 py-8 text-[13px] font-medium text-muted-foreground",
          "transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-600",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        <PenLine className="h-4 w-4" />
        Tap to draw your signature
      </button>

      {/* ── Full-screen overlay ───────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-zinc-950"
          style={{ touchAction: "none" }}
        >
          {/* Header bar */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold leading-tight">Draw your signature</p>
              <p className="text-[11px] text-muted-foreground">
                Use your finger, stylus, or mouse
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!preview ? (
            /* ── Drawing step ──────────────────────────────────────────── */
            <>
              {/* Canvas */}
              <div className="min-h-0 flex-1 p-3">
                <canvas
                  ref={canvasRef}
                  className="h-full w-full cursor-crosshair touch-none rounded-xl border-2 border-dashed border-border bg-white"
                />
              </div>

              {/* Landscape hint (shown only in portrait on small screens) */}
              <div className="flex shrink-0 items-center gap-2 bg-amber-50 px-4 py-2 text-[11.5px] text-amber-700 landscape:hidden dark:bg-amber-900/20 dark:text-amber-400 sm:hidden">
                <Smartphone className="h-3.5 w-3.5 shrink-0" />
                Rotate your device to landscape for a larger signing area.
              </div>

              {/* Action bar */}
              <div className="flex shrink-0 items-center gap-3 border-t border-border px-4 py-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="gap-1.5"
                >
                  <RotateCcw className="h-4 w-4" /> Clear
                </Button>
                <Button
                  type="button"
                  className="flex-1 gap-1.5"
                  disabled={isEmpty}
                  onClick={handlePreviewStep}
                >
                  <Check className="h-4 w-4" />
                  Use this signature
                </Button>
              </div>
            </>
          ) : (
            /* ── Preview & confirm step ────────────────────────────────── */
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
              <div className="w-full max-w-sm space-y-2">
                <p className="text-center text-[13px] font-semibold">Signature preview</p>
                <p className="text-center text-[11.5px] text-muted-foreground">
                  This is exactly how it will appear in your signed contract.
                </p>
                <div className="overflow-hidden rounded-xl border-2 border-border bg-white p-6 shadow-sm">
                  <img
                    src={preview}
                    alt="Your signature preview"
                    className="mx-auto block max-h-24 w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex w-full max-w-sm flex-col gap-2">
                <Button
                  type="button"
                  className="w-full gap-2"
                  onClick={handleConfirm}
                >
                  <Check className="h-4 w-4" />
                  Confirm &amp; submit signature
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setPreview(null)}
                >
                  <RotateCcw className="h-4 w-4" />
                  Redraw
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

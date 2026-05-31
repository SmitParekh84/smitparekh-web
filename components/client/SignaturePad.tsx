"use client";

import { useEffect, useRef, useState } from "react";
import SignaturePadLib from "signature_pad";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSign: (dataUrl: string) => void;
  className?: string;
}

export function SignaturePad({ onSign, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePadLib | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Match canvas internal resolution to its CSS size for sharp rendering
    const ratio = Math.max(window.devicePixelRatio ?? 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d")?.scale(ratio, ratio);

    const pad = new SignaturePadLib(canvas, {
      backgroundColor: "rgb(255,255,255)",
      penColor: "rgb(10,10,10)",
      minWidth: 1,
      maxWidth: 2.5,
    });

    pad.addEventListener("endStroke", () => setIsEmpty(pad.isEmpty()));
    padRef.current = pad;

    return () => pad.off();
  }, []);

  function handleClear() {
    padRef.current?.clear();
    setIsEmpty(true);
  }

  function handleConfirm() {
    const pad = padRef.current;
    if (!pad || pad.isEmpty()) return;
    onSign(pad.toDataURL("image/png"));
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-xl border-2 border-dashed border-border bg-white">
        <canvas
          ref={canvasRef}
          className="block h-36 w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
        />
      </div>
      <p className="text-center text-[11px] text-muted-foreground">
        Draw your signature above using a mouse or touchscreen.
      </p>
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={handleClear} className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Clear
        </Button>
        <Button onClick={handleConfirm} disabled={isEmpty} className="gap-1.5">
          Confirm signature
        </Button>
      </div>
    </div>
  );
}

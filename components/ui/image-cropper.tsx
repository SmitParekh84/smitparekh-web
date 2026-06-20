"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { Loader2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type CropperOutputType = "image/jpeg" | "image/png" | "image/webp";

export interface ImageCropperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Source image to crop. When `null`, the dialog stays empty. */
  file: File | null;
  /** Aspect ratio (width / height). Default 16/9. */
  aspect?: number;
  /** Crop window shape. Use `"round"` for avatars. */
  cropShape?: "rect" | "round";
  /** Encoded mime type. Default "image/jpeg". */
  outputType?: CropperOutputType;
  /** JPEG/WebP quality (0–1). Default 0.9. */
  outputQuality?: number;
  /** Cap the cropped image's width in pixels (downscale). Default 2400. */
  maxOutputWidth?: number;
  /** Called with the produced cropped File when the user confirms. */
  onCropped: (file: File) => void | Promise<void>;
  /** Confirm button label. */
  confirmLabel?: string;
  /** Optional dialog title. */
  title?: string;
  /** Optional helper text under the title. */
  description?: string;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const PASSTHROUGH_MIME_TYPES = new Set([
  "image/svg+xml",
  "image/gif",
]);

/** Returns true when we should NOT open the cropper for this file. */
export function shouldSkipCropping(file: File): boolean {
  return PASSTHROUGH_MIME_TYPES.has(file.type);
}

function extensionFor(type: CropperOutputType): string {
  switch (type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/jpeg":
    default:
      return "jpg";
  }
}

function swapExtension(name: string, ext: string): string {
  const dot = name.lastIndexOf(".");
  const base = dot >= 0 ? name.slice(0, dot) : name;
  return `${base || "image"}.${ext}`;
}

/**
 * Produces a cropped File from a source image, using `<canvas>` for encoding.
 * Honors EXIF orientation via `createImageBitmap({ imageOrientation: "from-image" })`
 * when available, falling back to a plain `<img>` source.
 */
async function getCroppedImageFile(opts: {
  file: File;
  croppedAreaPixels: Area;
  rotation: number;
  outputType: CropperOutputType;
  outputQuality: number;
  maxOutputWidth: number;
}): Promise<File> {
  const {
    file,
    croppedAreaPixels,
    rotation,
    outputType,
    outputQuality,
    maxOutputWidth,
  } = opts;

  const source = await loadImageSource(file);
  const sourceWidth = "width" in source ? source.width : (source as HTMLImageElement).naturalWidth;
  const sourceHeight = "height" in source ? source.height : (source as HTMLImageElement).naturalHeight;

  // Render the rotated source into an offscreen canvas, then read the cropped region.
  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const rotatedWidth = sourceWidth * cos + sourceHeight * sin;
  const rotatedHeight = sourceWidth * sin + sourceHeight * cos;

  const stage = document.createElement("canvas");
  stage.width = Math.round(rotatedWidth);
  stage.height = Math.round(rotatedHeight);
  const stageCtx = stage.getContext("2d");
  if (!stageCtx) throw new Error("Canvas 2D context unavailable");
  stageCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
  stageCtx.rotate(radians);
  stageCtx.drawImage(
    source as CanvasImageSource,
    -sourceWidth / 2,
    -sourceHeight / 2
  );

  // Pull the crop region off the rotated stage.
  const cropCanvas = document.createElement("canvas");
  const targetWidth = Math.max(1, Math.round(croppedAreaPixels.width));
  const targetHeight = Math.max(1, Math.round(croppedAreaPixels.height));

  // Optional downscale to maxOutputWidth.
  const scale =
    maxOutputWidth > 0 && targetWidth > maxOutputWidth
      ? maxOutputWidth / targetWidth
      : 1;
  cropCanvas.width = Math.max(1, Math.round(targetWidth * scale));
  cropCanvas.height = Math.max(1, Math.round(targetHeight * scale));

  const cropCtx = cropCanvas.getContext("2d");
  if (!cropCtx) throw new Error("Canvas 2D context unavailable");
  cropCtx.imageSmoothingQuality = "high";
  cropCtx.drawImage(
    stage,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    targetWidth,
    targetHeight,
    0,
    0,
    cropCanvas.width,
    cropCanvas.height
  );

  // Free the staged canvas reference.
  stage.width = 0;
  stage.height = 0;

  // Cleanup ImageBitmap if applicable.
  if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap) {
    source.close();
  }

  const blob = await new Promise<Blob | null>((resolve) =>
    cropCanvas.toBlob(resolve, outputType, outputQuality)
  );
  if (!blob) throw new Error("Failed to encode cropped image");

  const ext = extensionFor(outputType);
  const fileName = swapExtension(file.name || "image", ext);
  return new File([blob], fileName, { type: outputType, lastModified: Date.now() });
}

async function loadImageSource(
  file: File
): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, {
        imageOrientation: "from-image",
      });
    } catch {
      // Fall through to <img> fallback.
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Failed to load image"));
      el.src = url;
    });
    return img;
  } finally {
    // Don't revoke immediately - the canvas drawImage call needs the URL until the image is decoded.
    // Defer to the next tick.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

/* -------------------------------------------------------------------------- */
/* useImageCropper hook                                                        */
/* -------------------------------------------------------------------------- */

export function useImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const openWith = useCallback((next: File) => {
    setFile(next);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Drop the file when fully closed so we don't leak it.
  useEffect(() => {
    if (!open) {
      // Slight delay so the closing animation can read the previous file if needed.
      const t = window.setTimeout(() => setFile(null), 200);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  return { file, open, setOpen, openWith, close };
}

/* -------------------------------------------------------------------------- */
/* ImageCropperDialog                                                          */
/* -------------------------------------------------------------------------- */

export function ImageCropperDialog(props: ImageCropperDialogProps) {
  const { open, onOpenChange, file } = props;

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden">
        {/* Re-mount the inner editor whenever the file changes so its zoom/rotation/crop state resets cleanly. */}
        <CropperEditor key={file ? `${file.name}:${file.size}:${file.lastModified}` : "empty"} {...props} />
      </DialogContent>
    </Dialog>
  );
}

function CropperEditor({
  onOpenChange,
  file,
  aspect = 16 / 9,
  cropShape = "rect",
  outputType = "image/jpeg",
  outputQuality = 0.9,
  maxOutputWidth = 2400,
  onCropped,
  confirmLabel = "Use image",
  title = "Crop image",
  description = "Drag to reposition, scroll or use the slider to zoom.",
}: ImageCropperDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [busy, setBusy] = useState(false);
  const croppedAreaPixelsRef = useRef<Area | null>(null);

  // Build a stable object URL for the source file.
  const imageUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  // Revoke object URL on file change / unmount.
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    croppedAreaPixelsRef.current = areaPixels;
  }, []);

  async function handleConfirm() {
    if (!file || !croppedAreaPixelsRef.current) return;
    setBusy(true);
    try {
      const cropped = await getCroppedImageFile({
        file,
        croppedAreaPixels: croppedAreaPixelsRef.current,
        rotation,
        outputType,
        outputQuality,
        maxOutputWidth,
      });
      await onCropped(cropped);
      onOpenChange(false);
    } catch (err) {
      console.error("[ImageCropperDialog] crop failed", err);
    } finally {
      setBusy(false);
    }
  }

  async function handleUseOriginal() {
    if (!file) return;
    setBusy(true);
    try {
      await onCropped(file);
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  }

  function handleCancel() {
    if (busy) return;
    onOpenChange(false);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-muted",
          cropShape === "round" ? "aspect-square" : "aspect-[16/9]"
        )}
      >
        {imageUrl ? (
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={cropShape !== "round"}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-1 items-center gap-2">
          <ZoomOut className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
          <input
            type="range"
            min={1}
            max={4}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-blue-500"
          />
          <ZoomIn className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setRotation((r) => (r + 90) % 360)}
          aria-label="Rotate 90 degrees"
        >
          <RotateCw className="h-4 w-4 mr-1.5" />
          Rotate
        </Button>
      </div>

      <DialogFooter className="gap-2 sm:gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={handleCancel}
          disabled={busy}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleUseOriginal}
          disabled={busy || !file}
        >
          Use original
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={busy || !file}
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
              Working…
            </>
          ) : (
            confirmLabel
          )}
        </Button>
      </DialogFooter>
    </>
  );
}

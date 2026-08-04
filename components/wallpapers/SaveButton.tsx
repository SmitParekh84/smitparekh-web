"use client";

import { useState } from "react";
import { Download, Loader2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { wallpapersApi } from "@/lib/api";
import { saveWallpaper, prefersShareSave } from "@/lib/wallpaper-save";
import type { Wallpaper } from "@/types";

interface SaveButtonProps {
  wallpaper: Pick<Wallpaper, "_id" | "title" | "imageUrl" | "format">;
  className?: string;
  size?: "default" | "sm" | "lg";
  onSaved?: () => void;
}

export function SaveButton({
  wallpaper,
  className,
  size = "lg",
  onSaved,
}: SaveButtonProps) {
  const [busy, setBusy] = useState(false);
  // Decided once on mount - iOS gets "Save to Photos", everyone else "Download".
  const [share] = useState(() => prefersShareSave());

  async function handleSave() {
    if (busy) return;
    setBusy(true);
    try {
      const result = await saveWallpaper({
        imageUrl: wallpaper.imageUrl,
        title: wallpaper.title,
        format: wallpaper.format,
      });

      if (result.outcome === "cancelled") return; // user backed out, stay quiet

      // Record the download (fire-and-forget - never block the user on it).
      wallpapersApi.recordDownload(wallpaper._id).catch(() => {});
      onSaved?.();

      if (result.outcome === "shared") {
        toast.success("Opening share sheet", "Tap “Save Image” to add it to Photos.");
      } else if (result.outcome === "fallback-open") {
        toast.info("Long-press to save", "Press and hold the image, then “Add to Photos”.");
      } else {
        toast.success("Downloaded", "Saved to your device.");
      }
    } catch {
      toast.error("Couldn't save", "Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      size={size}
      onClick={handleSave}
      disabled={busy}
      className={cn("gap-2", className)}
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : share ? (
        <Smartphone className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {share ? "Save to Photos" : "Download"}
    </Button>
  );
}

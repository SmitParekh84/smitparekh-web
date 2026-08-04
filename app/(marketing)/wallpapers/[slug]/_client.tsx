"use client";

import { useState } from "react";
import {
  Check,
  Download,
  Loader2,
  Monitor,
  Share2,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WallpaperCard } from "@/components/wallpapers/WallpaperCard";
import { SaveButton } from "@/components/wallpapers/SaveButton";
import { optimizeImageUrl } from "@/lib/cloudinary";
import { saveWallpaper } from "@/lib/wallpaper-save";
import { wallpapersApi } from "@/lib/api";
import {
  formatBytes,
  formatCount,
  resolutionLabel,
  deviceLabels,
} from "@/lib/wallpaper-format";
import { toast } from "@/lib/toast";
import { useRelatedWallpapers } from "@/hooks/api/use-wallpapers";
import type { Wallpaper, WallpaperDevice } from "@/types";

const deviceIcon: Record<WallpaperDevice, typeof Smartphone> = {
  phone: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
};

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}

export function WallpaperDetailClient({
  wallpaper,
  shareUrl,
}: {
  wallpaper: Wallpaper;
  shareUrl: string;
}) {
  const [downloads, setDownloads] = useState(wallpaper.downloads);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const DeviceIcon = deviceIcon[wallpaper.device];
  const res = resolutionLabel(wallpaper.width, wallpaper.height);

  const { data: related = [] } = useRelatedWallpapers({
    category: wallpaper.category,
    exclude: wallpaper._id,
  });

  // Plain download button (distinct from the smart Save-to-Photos button).
  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    try {
      const result = await saveWallpaper({
        imageUrl: wallpaper.imageUrl,
        title: wallpaper.title,
        format: wallpaper.format,
      });
      if (result.outcome !== "cancelled") {
        wallpapersApi.recordDownload(wallpaper._id).catch(() => {});
        setDownloads((d) => d + 1);
      }
    } catch {
      toast.error("Couldn't download", "Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.share) {
      try {
        await nav.share({ title: wallpaper.title, url: shareUrl });
        return;
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  }

  function onSaved() {
    setDownloads((d) => d + 1);
  }

  return (
    <div className="page-container py-6">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        {/* Preview - long-pressable as the backup save path on mobile */}
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={optimizeImageUrl(wallpaper.imageUrl)}
            alt={wallpaper.title}
            className="mx-auto max-h-[75vh] w-full object-contain"
          />
        </div>

        {/* Details + actions */}
        <div className="lg:sticky lg:top-24">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {wallpaper.title}
          </h1>
          {wallpaper.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {wallpaper.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <DeviceIcon className="h-3 w-3" />
              {deviceLabels[wallpaper.device]}
            </Badge>
            <Badge variant="secondary">{wallpaper.category}</Badge>
            {wallpaper.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <SaveButton wallpaper={wallpaper} onSaved={onSaved} className="flex-1" />
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleDownload}
              disabled={downloading}
              className="gap-2"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleShare}
              className="gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              Share
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            On iPhone, tap “Save to Photos” and choose Save Image to add it to
            your gallery.
          </p>

          {/* Meta strip */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {wallpaper.width && wallpaper.height && (
              <MetaItem
                label="Resolution"
                value={`${wallpaper.width} × ${wallpaper.height}${res ? ` (${res})` : ""}`}
              />
            )}
            {wallpaper.bytes > 0 && (
              <MetaItem label="File size" value={formatBytes(wallpaper.bytes)} />
            )}
            <MetaItem label="Downloads" value={formatCount(downloads)} />
            {wallpaper.format && (
              <MetaItem label="Format" value={wallpaper.format.toUpperCase()} />
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-lg font-semibold">More like this</h2>
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {related.map((w) => (
              <WallpaperCard key={w._id} wallpaper={w} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

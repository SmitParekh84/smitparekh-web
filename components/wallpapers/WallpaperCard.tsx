"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { optimizeImageUrl } from "@/lib/cloudinary";
import { formatCount, resolutionLabel } from "@/lib/wallpaper-format";
import type { Wallpaper } from "@/types";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

// Masonry item: preserves the image's real aspect ratio so tall phone shots and
// wide desktop shots sit together without cropping. Whole card links to detail.
export function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  const ratio =
    wallpaper.width && wallpaper.height
      ? `${wallpaper.width} / ${wallpaper.height}`
      : "3 / 4";
  const res = resolutionLabel(wallpaper.width, wallpaper.height);

  return (
    <Link
      href={`/wallpapers/${wallpaper.slug}`}
      className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={optimizeImageUrl(wallpaper.imageUrl)}
          alt={wallpaper.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {res && (
          <span className="absolute right-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {res}
          </span>
        )}

        {/* Bottom overlay - always visible on touch, emphasised on hover */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 opacity-100 transition-opacity">
          <span className="line-clamp-1 text-sm font-medium text-white">
            {wallpaper.title}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs text-white/85">
            <Download className="h-3 w-3" />
            {formatCount(wallpaper.downloads)}
          </span>
        </div>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/site";
import { WallpapersClient } from "./_client";

export const metadata: Metadata = {
  title: "Wallpapers - Free HD & 4K Wallpapers for Phone & Desktop | Smit Parekh",
  description:
    "Browse and download free high-resolution wallpapers for iPhone, Android, tablet, and desktop. Search by category, save straight to your gallery.",
  keywords: [
    "free wallpapers",
    "HD wallpapers",
    "4K wallpapers",
    "iphone wallpapers",
    "android wallpapers",
    "desktop wallpapers",
    "phone backgrounds",
    "download wallpapers",
  ],
  alternates: { canonical: `${siteConfig.url}/wallpapers` },
  openGraph: {
    title: "Free HD & 4K Wallpapers",
    description:
      "Download free high-resolution wallpapers for phone, tablet, and desktop. Save straight to your gallery.",
    url: `${siteConfig.url}/wallpapers`,
    type: "website",
  },
};

export default function WallpapersPage() {
  return (
    <div className="theme-wallpapers">
      {/* Green hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 pb-12 pt-24 text-white sm:pb-16 sm:pt-28">
        <div className="absolute inset-0 bg-black/15" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl"
          aria-hidden
        />
        <div className="page-container relative text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-white/30 bg-white/15 text-white backdrop-blur-sm"
          >
            <ImageIcon className="mr-1 h-3 w-3" /> Wallpapers
          </Badge>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Free HD & 4K Wallpapers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            For iPhone, Android, tablet, and desktop. Tap a wallpaper, then save
            it straight to your gallery - no fuss.
          </p>
        </div>
      </section>

      <WallpapersClient />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { optimizeImageUrl } from "@/lib/cloudinary";
import {
  fetchWallpaperBySlug,
  fetchWallpaperSlugs,
} from "@/lib/server/wallpapers";
import { WallpaperDetailClient } from "./_client";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // 1h; busted on-demand via revalidateTag("wallpapers")
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchWallpaperSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wallpaper = await fetchWallpaperBySlug(slug);

  if (!wallpaper) {
    return {
      title: "Wallpaper Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteConfig.url}/wallpapers/${wallpaper.slug}`;
  const title = `${wallpaper.title} Wallpaper - Free ${
    wallpaper.width && wallpaper.height ? `${wallpaper.width}×${wallpaper.height} ` : ""
  }Download`;
  const description =
    wallpaper.description ||
    `Download the ${wallpaper.title} wallpaper free in high resolution for your ${wallpaper.device}. Save it straight to your gallery.`;
  const ogImage = optimizeImageUrl(wallpaper.imageUrl);

  return {
    title,
    description,
    keywords: [
      `${wallpaper.title} wallpaper`,
      `${wallpaper.category} wallpaper`,
      `${wallpaper.device} wallpaper`,
      "free wallpaper download",
      "HD wallpaper",
      ...wallpaper.tags.map((t) => `${t} wallpaper`),
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function WallpaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const wallpaper = await fetchWallpaperBySlug(slug);

  if (!wallpaper) notFound();

  const url = `${siteConfig.url}/wallpapers/${wallpaper.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: wallpaper.title,
    description: wallpaper.description || undefined,
    contentUrl: wallpaper.imageUrl,
    thumbnailUrl: optimizeImageUrl(wallpaper.imageUrl),
    width: wallpaper.width || undefined,
    height: wallpaper.height || undefined,
    encodingFormat: wallpaper.format || undefined,
    uploadDate: wallpaper.createdAt,
    url,
  };

  return (
    <div className="theme-wallpapers">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page-container pt-24">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/wallpapers" className="hover:text-foreground">
            Wallpapers
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{wallpaper.title}</span>
        </nav>
      </div>

      <WallpaperDetailClient wallpaper={wallpaper} shareUrl={url} />
    </div>
  );
}

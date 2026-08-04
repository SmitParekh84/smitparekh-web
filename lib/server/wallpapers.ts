/**
 * Server-side wallpaper fetching for the detail pages (generateMetadata,
 * generateStaticParams). Read-only, published wallpapers only. Fails soft:
 * a transient backend error returns null rather than throwing, so a build
 * never breaks because the API is briefly offline.
 */

import type { Wallpaper, WallpaperListResponse } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:5000/api";

const FETCH_TIMEOUT_MS = 8000;

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600, tags: ["wallpapers"] },
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface OneResponse {
  success: boolean;
  data: Wallpaper;
}

export async function fetchWallpaperBySlug(
  slug: string
): Promise<Wallpaper | null> {
  const json = await safeFetch<OneResponse>(
    `${API_BASE}/wallpapers/slug/${encodeURIComponent(slug)}`
  );
  return json?.data ?? null;
}

// Used by generateStaticParams. Pulls the first page of published wallpapers -
// enough to pre-render the popular ones; the rest render on demand.
export async function fetchWallpaperSlugs(): Promise<string[]> {
  const json = await safeFetch<WallpaperListResponse>(
    `${API_BASE}/wallpapers?limit=48`
  );
  return (json?.data ?? []).map((w) => w.slug).filter(Boolean);
}

export async function fetchAllPublishedWallpapers(): Promise<Wallpaper[]> {
  const json = await safeFetch<WallpaperListResponse>(
    `${API_BASE}/wallpapers?limit=48`
  );
  return json?.data ?? [];
}

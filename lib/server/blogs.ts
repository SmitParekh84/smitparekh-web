/**
 * Server-side blog fetching with ISR caching.
 *
 * Used by /blog and /blog/[slug] server components and the sitemap.
 * Falls back to an empty list when the API is unreachable so builds never fail.
 */

import type {
  BackendBlog,
  BackendListResponse,
  BackendOneResponse,
} from "@/types";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:5000/api"
);

const FETCH_TIMEOUT_MS = 5000;

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 300, tags: ["blogs"] },
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchAllBlogs(): Promise<BackendBlog[]> {
  const data = await safeFetch<BackendListResponse<BackendBlog>>(
    `${API_BASE}/blogs`
  );
  if (!data?.data?.length) return [];
  return data.data
    .filter((b) => b.isPublished !== false)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function fetchBlogBySlug(
  slug: string
): Promise<BackendBlog | null> {
  const data = await safeFetch<BackendOneResponse<BackendBlog>>(
    `${API_BASE}/blogs/slug/${encodeURIComponent(slug)}`
  );
  if (!data?.data) return null;
  if (data.data.isPublished === false) return null;
  return data.data;
}

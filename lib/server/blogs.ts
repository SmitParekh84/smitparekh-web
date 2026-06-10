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

const FETCH_TIMEOUT_MS = 8000;

async function safeFetch<T>(
  url: string,
  attempt = 0
): Promise<{ data: T | null; transient: boolean }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      // 5-min ISR fallback so new posts self-heal even if the revalidate
      // webhook never lands. The page is force-busted on publish via
      // revalidateTag("blogs", "max"); this is the safety net, not the
      // primary path. (A 24h value here defeated the page-level 5-min window.)
      next: { revalidate: 300, tags: ["blogs"] },
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);
    if (res.status === 404) return { data: null, transient: false };
    if (!res.ok) {
      if (attempt < 1) {
        await new Promise((r) => setTimeout(r, 400));
        return safeFetch<T>(url, attempt + 1);
      }
      return { data: null, transient: true };
    }
    return { data: (await res.json()) as T, transient: false };
  } catch {
    if (attempt < 1) {
      await new Promise((r) => setTimeout(r, 400));
      return safeFetch<T>(url, attempt + 1);
    }
    return { data: null, transient: true };
  }
}

export async function fetchAllBlogs(): Promise<BackendBlog[]> {
  const { data } = await safeFetch<BackendListResponse<BackendBlog>>(
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
  const { data, transient } = await safeFetch<BackendOneResponse<BackendBlog>>(
    `${API_BASE}/blogs/slug/${encodeURIComponent(slug)}`
  );
  if (data?.data) {
    if (data.data.isPublished === false) return null;
    return data.data;
  }
  if (transient) {
    throw new Error("Upstream blog API unreachable. Please retry.");
  }
  return null;
}

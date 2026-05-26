/**
 * Server-side project fetching with static fallback.
 *
 * The marketing case study pages call these helpers from server components
 * (and generateStaticParams). They always fetch from the public REST API at
 * build/request time, but gracefully fall back to the bundled
 * `data/portfolio.ts` content when the API is unreachable - so SSG and
 * production builds never fail because the backend is offline.
 */

import { featuredProjects, type Project } from "@/data/portfolio";
import type {
  BackendProject,
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
      next: { revalidate: 86400, tags: ["projects"] },
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

function normalize(b: BackendProject, fallbackIdx = 0): Project {
  const fallback = featuredProjects.find((p) => p.slug === b.slug);
  return {
    id: fallbackIdx + 1,
    slug: b.slug || fallback?.slug || "",
    title: b.title,
    subtitle: b.subtitle || fallback?.subtitle || "",
    description: b.shortDescription,
    summary: b.summary || fallback?.summary || b.shortDescription,
    tags: b.tags?.length ? b.tags : fallback?.tags ?? [],
    category: b.categories?.[0] || fallback?.category || "Project",
    industry: b.industry || fallback?.industry || "",
    role: b.role || fallback?.role || "Full Stack Developer",
    year: b.year || fallback?.year || "",
    duration: b.duration || fallback?.duration || "",
    demoLink: b.demoLink || fallback?.demoLink || "",
    repoLink: b.repoLink || fallback?.repoLink,
    gradient:
      b.gradient ||
      fallback?.gradient ||
      "from-blue-600 via-blue-500 to-sky-500",
    imageUrl: b.imageUrl || fallback?.imageUrl,
    highlights: b.highlights?.length
      ? b.highlights
      : fallback?.highlights ?? [],
    problem: b.problem || fallback?.problem || "",
    approach: b.approach?.length ? b.approach : fallback?.approach ?? [],
    outcomes:
      (b.outcomes?.length
        ? b.outcomes.map((o) => ({
            label: o.label,
            value: o.value,
            detail: o.detail ?? "",
          }))
        : fallback?.outcomes) ?? [],
    techStack:
      b.techStack && Object.keys(b.techStack).length
        ? b.techStack
        : fallback?.techStack ?? {},
    lessons: b.lessons?.length ? b.lessons : fallback?.lessons,
    isShowcased: b.isShowcased ?? fallback?.isShowcased,
  };
}

export async function fetchAllCaseStudies(): Promise<Project[]> {
  const { data } = await safeFetch<BackendListResponse<BackendProject>>(
    `${API_BASE}/projects`
  );

  if (!data?.data?.length) return featuredProjects;

  const visible = data.data.filter((p) => p.isVisible !== false);
  if (!visible.length) return featuredProjects;

  const apiSlugs = new Set(visible.map((p) => p.slug).filter(Boolean));
  const apiNormalized = visible
    .filter((p) => p.slug)
    .map((p, i) => normalize(p, i));

  const staticOnly = featuredProjects.filter((p) => !apiSlugs.has(p.slug));
  return [...apiNormalized, ...staticOnly];
}

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<Project | null> {
  const { data, transient } = await safeFetch<BackendOneResponse<BackendProject>>(
    `${API_BASE}/projects/slug/${encodeURIComponent(slug)}`
  );

  if (data?.data) {
    if (data.data.isVisible === false) return null;
    return normalize(data.data);
  }

  // If the API was unreachable, surface the static fallback when possible -
  // never let a transient backend hiccup cache a 404 for a real project.
  const staticMatch = featuredProjects.find((p) => p.slug === slug);
  if (staticMatch) return staticMatch;

  // Genuine not-found from the API: bubble up null so the page can 404 cleanly.
  // For transient errors with no static fallback, throw so Next renders an
  // error page instead of caching a 404 for a slug that may exist.
  if (transient) {
    throw new Error("Upstream project API unreachable. Please retry.");
  }
  return null;
}

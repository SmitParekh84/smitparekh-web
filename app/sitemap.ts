import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly", lastModified: new Date("2026-04-27") },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-01") },
    { url: `${base}/portfolio`, priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-04-27") },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-01") },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-01-01") },
    { url: `${base}/free-tools`, priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-04-27") },
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolsSEO.map(({ slug }) => ({
    url: `${base}/free-tools/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: new Date("2026-04-27"),
  }));

  return [...staticRoutes, ...toolRoutes];
}

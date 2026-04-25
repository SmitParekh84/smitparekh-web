import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/portfolio`, priority: 0.8, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/free-tools`, priority: 0.9, changeFrequency: "weekly", lastModified: now },
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolsSEO.map(({ slug }) => ({
    url: `${base}/free-tools/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  return [...staticRoutes, ...toolRoutes];
}

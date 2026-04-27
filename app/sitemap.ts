import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import { fetchAllCaseStudies } from "@/lib/server/projects";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly", lastModified: new Date() },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${base}/portfolio`, priority: 0.8, changeFrequency: "weekly", lastModified: new Date() },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${base}/free-tools`, priority: 0.9, changeFrequency: "weekly", lastModified: new Date() },
  ];

  const projects = await fetchAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolsSEO.map(({ slug }) => ({
    url: `${base}/free-tools/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...toolRoutes];
}

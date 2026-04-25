import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: Array<{
    url: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { url: base, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/project`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/portfolio`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/qualification`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/free-tools`, priority: 0.9, changeFrequency: "weekly" },
  ];

  const toolRoutes = [
    "/free-tools/background-remover",
    "/free-tools/image-compressor",
    "/free-tools/image-converter",
    "/free-tools/viral-linkedin-post-generator",
    "/free-tools/linkedin-media-downloader",
    "/free-tools/meta-tag-checker",
    "/free-tools/seo-analyzer",
    "/free-tools/word-counter",
    "/free-tools/qr-code-generator",
    "/free-tools/ats-resume-checker",
    "/free-tools/password-generator",
  ].map((path) => ({
    url: `${base}${path}`,
    priority: 0.8 as const,
    changeFrequency: "monthly" as const,
  }));

  const now = new Date();
  return [...staticRoutes, ...toolRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}

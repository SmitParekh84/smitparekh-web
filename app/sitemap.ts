import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO, getToolOgImage } from "@/data/tools-seo";
import { fetchAllCaseStudies } from "@/lib/server/projects";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { optimizeImageUrl } from "@/lib/cloudinary";

export const revalidate = 300;

// Stable lastModified for static routes. Bump this date only when the
// underlying page content actually changes — Google reads a constantly
// updated lastModified as a noisy/spammy freshness signal and ignores it.
const STATIC_LASTMOD = new Date("2026-05-13");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const defaultImage = `${base}/images/Smit-Parekh-Home.png`;
  const lastModified = STATIC_LASTMOD;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly", lastModified, images: [defaultImage] },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly", lastModified, images: [`${base}/images/smit-parekh-about-full-stack-developer.png`] },
    { url: `${base}/portfolio`, priority: 0.8, changeFrequency: "weekly", lastModified, images: [`${base}/images/smit-parekh-portfolio-case-studies.png`] },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly", lastModified, images: [`${base}/images/smit-parekh-web-development-services.png`] },
    { url: `${base}/hire-me`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/feedback`, priority: 0.6, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/blog`, priority: 0.85, changeFrequency: "weekly", lastModified, images: [`${base}/images/smit-parekh-blog-web-development.png`] },
    { url: `${base}/free-tools`, priority: 0.9, changeFrequency: "weekly", lastModified, images: [`${base}/images/smit-parekh-free-developer-tools.png`] },
    { url: `${base}/resume`, priority: 0.6, changeFrequency: "yearly", lastModified, images: [defaultImage] },
    { url: `${base}/for-students`, priority: 0.8, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/changelog`, priority: 0.6, changeFrequency: "weekly", lastModified, images: [defaultImage] },
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: "yearly", lastModified },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: "yearly", lastModified },
    { url: `${base}/sitemap-html`, priority: 0.4, changeFrequency: "monthly", lastModified },
    { url: `${base}/react-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/nextjs-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/nodejs-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/typescript-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/full-stack-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/nestjs-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/saas-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/api-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/postgresql-developer`, priority: 0.85, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/production-nextjs`, priority: 0.9, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/nextjs-vercel-guide`, priority: 0.9, changeFrequency: "monthly", lastModified, images: [defaultImage] },
  ];

  const projects = await fetchAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: STATIC_LASTMOD,
    images: [`${base}/portfolio/${p.slug}/opengraph-image`],
  }));

  const blogs = await fetchAllBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: b.updatedAt
      ? new Date(b.updatedAt)
      : b.publishedAt
        ? new Date(b.publishedAt)
        : STATIC_LASTMOD,
    images: [
      optimizeImageUrl(b.coverImage) || `${base}/blog/${b.slug}/opengraph-image`,
    ],
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolsSEO.map(({ slug }) => ({
    url: `${base}/free-tools/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: STATIC_LASTMOD,
    images: [`${base}${getToolOgImage(slug)}`],
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes, ...toolRoutes];
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO, getToolOgImage } from "@/data/tools-seo";
import { fetchAllCaseStudies } from "@/lib/server/projects";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { optimizeImageUrl } from "@/lib/cloudinary";
import { servicePages } from "@/data/services-catalog";

export const revalidate = 300;

// Stable lastModified for static routes. Bump this date only when the
// underlying page content actually changes — Google reads a constantly
// updated lastModified as a noisy/spammy freshness signal and ignores it.
const STATIC_LASTMOD = new Date("2026-05-16");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const defaultImage = `${base}/images/Smit-Parekh-Home.png`;
  const lastModified = STATIC_LASTMOD;

  const staticRoutes: MetadataRoute.Sitemap = [
    // Tier 1 — primary money pages
    { url: base,                              priority: 1.0, changeFrequency: "weekly",  lastModified, images: [defaultImage] },
    { url: `${base}/hire-me`,                 priority: 0.95, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/contact`,                 priority: 0.9,  changeFrequency: "monthly", lastModified, images: [defaultImage] },
    // Tier 2 — content hubs (high crawl value)
    { url: `${base}/free-tools`,              priority: 0.9,  changeFrequency: "weekly",  lastModified, images: [`${base}/images/smit-parekh-free-developer-tools.png`] },
    { url: `${base}/blog`,                    priority: 0.9,  changeFrequency: "weekly",  lastModified, images: [`${base}/images/smit-parekh-blog-web-development.png`] },
    { url: `${base}/portfolio`,               priority: 0.85, changeFrequency: "weekly",  lastModified, images: [`${base}/images/smit-parekh-portfolio-case-studies.png`] },
    { url: `${base}/services`,                priority: 0.85, changeFrequency: "monthly", lastModified, images: [`${base}/images/smit-parekh-web-development-services.png`] },
    // Tier 3 — hire-intent landing pages (prioritise most-searched stacks first)
    { url: `${base}/full-stack-developer`,    priority: 0.85, changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-full-stack-developer.png`] },
    { url: `${base}/nextjs-developer`,        priority: 0.85, changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-nextjs-developer.png`] },
    { url: `${base}/react-developer`,         priority: 0.85, changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-react-developer.png`] },
    { url: `${base}/nodejs-developer`,        priority: 0.8,  changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-nodejs-developer.png`] },
    { url: `${base}/nestjs-developer`,        priority: 0.8,  changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-nestjs-developer.png`] },
    { url: `${base}/typescript-developer`,    priority: 0.8,  changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-typescript-developer.png`] },
    { url: `${base}/saas-developer`,          priority: 0.8,  changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-saas-developer.png`] },
    { url: `${base}/api-developer`,           priority: 0.75, changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-api-developer.png`] },
    { url: `${base}/postgresql-developer`,    priority: 0.75, changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-postgresql-developer.png`] },
    { url: `${base}/aws-developer`,           priority: 0.75, changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-aws-developer.png`] },
    { url: `${base}/wordpress-developer`,     priority: 0.7,  changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-wordpress-developer.png`] },
    { url: `${base}/react-native-developer`,  priority: 0.7,  changeFrequency: "monthly", lastModified, images: [`${base}/images/hire-react-native-developer.png`] },
    // Tier 4 — supporting pages
    { url: `${base}/about`,                   priority: 0.75, changeFrequency: "monthly", lastModified, images: [`${base}/images/smit-parekh-about-full-stack-developer.png`] },
    { url: `${base}/for-students`,            priority: 0.7,  changeFrequency: "monthly", lastModified, images: [`${base}/images/for-students.png`] },
    { url: `${base}/faq`,                     priority: 0.65, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/production-nextjs`,       priority: 0.75, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/nextjs-vercel-guide`,     priority: 0.75, changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/blog-api`,                priority: 0.7,  changeFrequency: "monthly", lastModified, images: [defaultImage] },
    // Tier 5 — utility (low-value pages omitted from sitemap to concentrate
    // crawl budget on money pages. Coverage report 2026-05-23 showed 98 URLs
    // stuck in "Discovered – not indexed" — Google is rationing crawl, so the
    // sitemap should advertise only pages we genuinely want indexed.
    { url: `${base}/feedback`,                priority: 0.5,  changeFrequency: "monthly", lastModified, images: [defaultImage] },
    { url: `${base}/changelog`,               priority: 0.5,  changeFrequency: "weekly",  lastModified, images: [defaultImage] },
    // /resume, /privacy-policy, /terms, /sitemap-html intentionally omitted.
    // They remain crawlable via internal links but don't take up sitemap slots.
  ];

  const projects = await fetchAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: STATIC_LASTMOD,
    // Prefer the real project banner (the image users actually see on the page
    // and in Google Images) over the synthetic OG card. Falls back to the OG
    // card only when a project has no uploaded image.
    images: [
      p.imageUrl
        ? optimizeImageUrl(p.imageUrl)
        : `${base}/portfolio/${p.slug}/opengraph-image`,
    ],
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

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: STATIC_LASTMOD,
    images: [`${base}/images/services-og/${s.slug}.png`],
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolsSEO.map(({ slug }) => ({
    url: `${base}/free-tools/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: STATIC_LASTMOD,
    images: [`${base}${getToolOgImage(slug)}`],
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
    ...toolRoutes,
  ];
}

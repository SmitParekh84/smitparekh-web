import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO, getToolOgImage } from "@/data/tools-seo";
import { fetchAllCaseStudies } from "@/lib/server/projects";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { optimizeImageUrl } from "@/lib/cloudinary";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const defaultImage = `${base}/images/Smit-Parekh-Home.png`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly", lastModified: new Date(), images: [defaultImage] },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly", lastModified: new Date(), images: [`${base}/images/smit-parekh-about-full-stack-developer.png`] },
    { url: `${base}/portfolio`, priority: 0.8, changeFrequency: "weekly", lastModified: new Date(), images: [`${base}/images/smit-parekh-portfolio-case-studies.png`] },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly", lastModified: new Date(), images: [`${base}/images/smit-parekh-web-development-services.png`] },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly", lastModified: new Date(), images: [defaultImage] },
    { url: `${base}/blog`, priority: 0.85, changeFrequency: "weekly", lastModified: new Date(), images: [`${base}/images/smit-parekh-blog-web-development.png`] },
    { url: `${base}/free-tools`, priority: 0.9, changeFrequency: "weekly", lastModified: new Date(), images: [`${base}/images/smit-parekh-free-developer-tools.png`] },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: "monthly", lastModified: new Date(), images: [defaultImage] },
  ];

  const projects = await fetchAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    images: [`${base}/portfolio/${p.slug}/opengraph-image`],
  }));

  const blogs = await fetchAllBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
    images: [
      optimizeImageUrl(b.coverImage) || `${base}/blog/${b.slug}/opengraph-image`,
    ],
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolsSEO.map(({ slug }) => ({
    url: `${base}/free-tools/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    images: [`${base}${getToolOgImage(slug)}`],
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes, ...toolRoutes];
}

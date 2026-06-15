import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { siteConfig } from "@/data/site";
import BlogClient, { type BlogCardData } from "./_client";

export const metadata: Metadata = {
  title: "Blog - Web Development Insights by Smit Parekh",
  description:
    "Articles on React, Next.js, Node.js, TypeScript, PostgreSQL, AWS and full-stack web development. Real lessons from production projects.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  keywords: [
    "web development blog",
    "React articles",
    "Next.js tutorials",
    "Node.js guides",
    "TypeScript tips",
    "full stack developer blog",
    "Smit Parekh blog",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    title: "Blog - Web Development Insights by Smit Parekh",
    description:
      "Articles on React, Next.js, Node.js, TypeScript and full-stack engineering. Real lessons from production projects.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-blog-web-development.png`,
        width: 1200,
        height: 630,
        alt: "Web Development Blog by Smit Parekh",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Blog - Web Development Insights by Smit Parekh",
    description:
      "Articles on React, Next.js, Node.js, TypeScript and full-stack engineering.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-blog-web-development.png`,
        width: 1200,
        height: 630,
        alt: "Web Development Blog by Smit Parekh",
      },
    ],
  },
};

// 5-minute ISR window - new posts appear within 5 minutes without a deploy.
// The /api/revalidate webhook busts this immediately when a post is published;
// this short window is a safety net for when the webhook is not reachable.
export const revalidate = 300;


export default async function BlogIndexPage() {
  const blogs = await fetchAllBlogs();
  const posts: BlogCardData[] = blogs.map((b) => ({
    _id: b._id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    coverImage: b.coverImage,
    category: b.category,
    readMinutes: b.readMinutes,
    publishedAt: b.publishedAt,
    isFeatured: b.isFeatured,
  }));

  const personNode = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Smit Parekh",
    url: siteConfig.url,
  };

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog`,
    description:
      "Articles and engineering notes by Smit Parekh on web development, React, Next.js, Node.js and TypeScript.",
    inLanguage: "en",
    author: personNode,
    publisher: personNode,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog` },
    blogPost: blogs.slice(0, 20).map((b) => ({
      "@type": "BlogPosting",
      "@id": `${siteConfig.url}/blog/${b.slug}`,
      headline: b.title,
      description: b.excerpt,
      datePublished: b.publishedAt,
      dateModified: b.updatedAt || b.publishedAt,
      url: `${siteConfig.url}/blog/${b.slug}`,
      inLanguage: "en",
      ...(b.coverImage
        ? { image: { "@type": "ImageObject", url: b.coverImage, width: 1200, height: 630 } }
        : {}),
      author: { "@type": "Person", "@id": `${siteConfig.url}/#person`, name: b.author || "Smit Parekh", url: siteConfig.url },
      keywords: b.tags?.join(", "),
      articleSection: b.category,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="Blog"
        icon={BookOpen}
        title={<>Notes on web development, engineering &amp; building products</>}
        description="Articles and field-notes on React, Next.js, Node.js, TypeScript, and shipping production-grade web apps."
      />

      {/* Server-rendered crawlable links - guarantees Googlebot reaches every
          post even before the client-side category filter hydrates. */}
      <nav aria-label="All blog posts" className="sr-only">
        <ul>
          {posts.map((p) => (
            <li key={p._id}>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <BlogClient posts={posts} />
    </>
  );
}

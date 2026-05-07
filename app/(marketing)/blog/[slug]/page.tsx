import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Tag,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { fetchAllBlogs, fetchBlogBySlug } from "@/lib/server/blogs";
import { optimizeImageUrl } from "@/lib/cloudinary";
import { normalizeMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/date";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const blogs = await fetchAllBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteConfig.url}/blog/${blog.slug}`;
  const title = `${blog.title} | Smit Parekh Blog`;

  return {
    title,
    description: blog.excerpt,
    alternates: { canonical: url },
    keywords: [
      blog.title,
      blog.category,
      "Smit Parekh blog",
      "web development",
      ...blog.tags,
    ],
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: siteConfig.name,
      url,
      title,
      description: blog.excerpt,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      tags: blog.tags,
      // If a real coverImage exists, prefer it; otherwise fall back to the
      // dynamically generated branded card from ./opengraph-image.tsx.
      ...(blog.coverImage
        ? {
            images: [
              {
                url: blog.coverImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description: blog.excerpt,
      ...(blog.coverImage
        ? {
            images: [
              {
                url: blog.coverImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) notFound();

  const all = await fetchAllBlogs();
  const related = all
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 3);
  const fillers = all
    .filter(
      (b) =>
        b.slug !== blog.slug && !related.some((r) => r.slug === b.slug)
    )
    .slice(0, 3 - related.length);
  const relatedFinal = [...related, ...fillers].slice(0, 3);

  const url = `${siteConfig.url}/blog/${blog.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    keywords: blog.tags.join(", "),
    articleSection: blog.category,
    inLanguage: "en",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      { "@type": "ListItem", position: 3, name: blog.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        <div className="page-container relative max-w-4xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-white/80 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate">{blog.title}</span>
          </nav>

          <Badge
            variant="secondary"
            className="bg-white/15 text-white border-white/30 backdrop-blur-sm mb-4"
          >
            {blog.category}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {blog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-white/90 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {blog.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {blog.readMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="page-container max-w-4xl -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
          <Image
            src={optimizeImageUrl(blog.coverImage)}
            alt={blog.title}
            width={1600}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <article className="page-section pt-10">
        <div className="page-container max-w-3xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-cyan-600 dark:prose-code:text-cyan-400 prose-code:before:content-none prose-code:after:content-none prose-code:bg-blue-500/8 dark:prose-code:bg-cyan-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-border prose-img:rounded-xl prose-blockquote:border-l-blue-500 prose-blockquote:text-foreground">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: (props) => (
                  <div className="not-prose my-6 -mx-4 sm:mx-0 overflow-x-auto rounded-lg border border-border bg-card">
                    <table
                      {...props}
                      className="w-full text-sm border-collapse"
                    />
                  </div>
                ),
                thead: (props) => (
                  <thead {...props} className="bg-muted/40" />
                ),
                th: (props) => (
                  <th
                    {...props}
                    className="px-4 py-2 text-left font-semibold text-foreground border-b border-border whitespace-nowrap"
                  />
                ),
                td: (props) => (
                  <td
                    {...props}
                    className="px-4 py-2 text-muted-foreground border-b border-border align-top"
                  />
                ),
              }}
            >
              {normalizeMarkdown(blog.content)}
            </ReactMarkdown>
          </div>

          {blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {blog.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related */}
      {relatedFinal.length > 0 && (
        <section className="page-section bg-muted/20">
          <div className="page-container">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3 text-center">
              Keep Reading
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
              Related articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedFinal.map((b) => (
                <Link
                  key={b._id}
                  href={`/blog/${b.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={optimizeImageUrl(b.coverImage)}
                      alt={b.title}
                      width={800}
                      height={450}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <Badge variant="secondary" className="self-start text-xs">
                      {b.category}
                    </Badge>
                    <h4 className="font-bold leading-snug line-clamp-2">
                      {b.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {b.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-blue-500 font-medium mt-1 group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="page-section">
        <div className="page-container max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Have a project in mind?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            I&apos;m available for full-stack engagements - React, Next.js,
            Node.js, PostgreSQL, AWS. Let&apos;s talk.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

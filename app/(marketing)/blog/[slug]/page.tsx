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
import { developerPages } from "@/data/developer-pages";
import { fetchAllBlogs, fetchBlogBySlug } from "@/lib/server/blogs";
import type { BackendBlog } from "@/types";
import { optimizeImageUrl } from "@/lib/cloudinary";
import { normalizeMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/date";
import { BookCallButton } from "@/components/cal/BookCallButton";
import { KeyTakeawaysBox, extractKeyTakeaways } from "@/components/blog/KeyTakeawaysBox";
import { extractBlogFaqs } from "@/lib/blog-faq";
import { faqPageSchema } from "@/lib/seo/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400; // 24h; busted on-demand via revalidateTag("blogs")
export const dynamicParams = true;

export async function generateStaticParams() {
  const blogs = await fetchAllBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

// Per-slug SEO overrides for posts whose DB title/excerpt is hurting CTR.
// Lets us fix SERP titles without an admin-UI edit.
type SlugOverride = {
  title?: string;
  description?: string;
  robots?: Metadata["robots"];
};
const SLUG_SEO_OVERRIDES: Record<string, SlugOverride> = {
  // GSC (3-mo to 2026-05-23): 5,357 impressions / 0 clicks at pos 7.3.
  // The DB title is stuffed with "2026" - irrelevant to real searchers.
  // Override to a click-worthy human title and let it re-earn CTR.
  "deploy-nextjs-on-vercel-in-2026-a-beginners-guide": {
    title:
      "Deploy a Next.js App on Vercel - Beginner's Guide",
    description:
      "Step-by-step beginner's guide to deploying a Next.js app on Vercel: GitHub import, env vars, preview deployments, and going live.",
  },
};

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
  const readLabel = blog.readMinutes ? ` · ${blog.readMinutes}-min read` : "";
  const override = SLUG_SEO_OVERRIDES[blog.slug];
  const title = override?.title ?? `${blog.title}${readLabel}`;
  const description = override?.description ?? blog.excerpt;

  return {
    title,
    description,
    ...(override?.robots ? { robots: override.robots } : {}),
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
      description,
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
      description,
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

// Map a free-form tag/category token to a developer specialty page.
// First match wins; falls back to /full-stack-developer.
const TAG_TO_DEVELOPER_SLUG: Array<[RegExp, (typeof developerPages)[number]["slug"]]> = [
  [/^next\.?js$/i, "nextjs-developer"],
  [/^nest\.?js$/i, "nestjs-developer"],
  [/^node\.?js?$/i, "nodejs-developer"],
  [/^react$/i, "react-developer"],
  [/^typescript$/i, "typescript-developer"],
  [/^postgres(ql)?$/i, "postgresql-developer"],
  [/^saas$/i, "saas-developer"],
  [/^(api|rest|graphql)$/i, "api-developer"],
];

function pickSpecialist(tags: string[], category: string) {
  const tokens = [category, ...tags].filter(Boolean);
  for (const t of tokens) {
    const hit = TAG_TO_DEVELOPER_SLUG.find(([re]) => re.test(t.trim()));
    if (hit) return developerPages.find((p) => p.slug === hit[1])!;
  }
  return developerPages.find((p) => p.slug === "full-stack-developer")!;
}

// Pick related posts by relevance instead of category-only.
// Scoring: shared tags (strongest) + same category + a small recency boost.
// The recency term means freshly-published posts bubble into other posts'
// related lists once those pages revalidate - so a new article gets linked
// from more places instead of only the blog index (the orphan-page problem
// behind "Discovered - currently not indexed").
function pickRelated(
  current: BackendBlog,
  all: BackendBlog[],
  limit: number
): BackendBlog[] {
  const currentTags = new Set(current.tags.map((t) => t.toLowerCase().trim()));
  const times = all
    .map((b) => new Date(b.publishedAt).getTime())
    .filter((n) => Number.isFinite(n));
  const newest = times.length ? Math.max(...times) : 0;
  const oldest = times.length ? Math.min(...times) : 0;
  const span = newest - oldest || 1;

  return all
    .filter((b) => b.slug !== current.slug)
    .map((b) => {
      const sharedTags = b.tags.filter((t) =>
        currentTags.has(t.toLowerCase().trim())
      ).length;
      const sameCategory = b.category === current.category ? 1 : 0;
      const recency = (new Date(b.publishedAt).getTime() - oldest) / span; // 0..1
      const score = sharedTags * 3 + sameCategory * 2 + recency; // recency < 1 = tiebreak only
      return { b, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.b);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) notFound();

  const all = await fetchAllBlogs();
  const relatedFinal = pickRelated(blog, all, 3);

  const url = `${siteConfig.url}/blog/${blog.slug}`;
  const specialist = pickSpecialist(blog.tags, blog.category);
  const fallbackOgImage = `${url}/opengraph-image`;
  const heroImage = blog.coverImage || fallbackOgImage;
  const { takeaways, remainder: contentWithoutTakeaways } = extractKeyTakeaways(
    blog.content ?? ""
  );
  const wordCount = blog.content
    ? blog.content.trim().split(/\s+/).filter(Boolean).length
    : undefined;

  // FAQPage rich result — derived from the post's visible "## FAQ" markdown
  // (the FAQ Q&A is rendered on the page, so this is Google-compliant). Posts
  // without a parseable FAQ section simply don't emit it.
  const faqs = extractBlogFaqs(blog.content ?? "");
  const faqSchema = faqs.length >= 2 ? faqPageSchema(faqs) : null;

  const personNode = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: blog.author || "Smit Parekh",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.x,
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: [
      {
        "@type": "ImageObject",
        url: heroImage,
        width: 1200,
        height: 630,
      },
    ],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: personNode,
    publisher: personNode,
    keywords: blog.tags.join(", "),
    articleSection: blog.category,
    inLanguage: "en",
    ...(wordCount ? { wordCount } : {}),
    about: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Smit Parekh",
    },
    mentions: [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Smit Parekh",
        url: siteConfig.url,
      },
    ],
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
          <KeyTakeawaysBox items={takeaways} />

          <div className="prose prose-neutral dark:prose-invert max-w-none break-words prose-headings:tracking-tight prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-cyan-600 dark:prose-code:text-cyan-400 prose-code:before:content-none prose-code:after:content-none prose-code:bg-blue-500/8 dark:prose-code:bg-cyan-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-border prose-img:rounded-xl prose-blockquote:border-l-blue-500 prose-blockquote:text-foreground">
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
              {normalizeMarkdown(contentWithoutTakeaways)}
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
        <section className="page-section bg-muted/70">
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

      {/* CTA - tag-aware specialist link routes equity to money pages */}
      <section className="page-section">
        <div className="page-container max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Need a {specialist.title.replace(/ Developer$/, "")} developer?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            {specialist.description} Let&apos;s talk about your project.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${specialist.slug}`}
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Hire a {specialist.title.replace(/ Developer$/, "")} Developer
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2"
              )}
            >
              Start a Conversation
            </Link>
            <BookCallButton
              size="lg"
              variant="outline"
              label="Book a 15-min call"
              className="gap-2"
            />
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

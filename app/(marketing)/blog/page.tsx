import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/layout/PageHero";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { siteConfig } from "@/data/site";

export const revalidate = 300;

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const blogs = await fetchAllBlogs();
  const featured = blogs.find((b) => b.isFeatured) ?? blogs[0];
  const rest = blogs.filter((b) => b._id !== featured?._id);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} - Blog`,
    url: `${siteConfig.url}/blog`,
    description:
      "Articles and engineering notes by Smit Parekh on web development, React, Next.js, Node.js and TypeScript.",
    blogPost: blogs.slice(0, 20).map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      description: b.excerpt,
      datePublished: b.publishedAt,
      dateModified: b.updatedAt,
      url: `${siteConfig.url}/blog/${b.slug}`,
      image: b.coverImage,
      author: { "@type": "Person", name: b.author, url: siteConfig.url },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <PageHero
        eyebrow="Blog"
        icon={BookOpen}
        title={<>Notes on web development, engineering &amp; building products</>}
        description="Articles and field-notes on React, Next.js, Node.js, TypeScript, and shipping production-grade web apps."
      />

      {/* Empty state */}
      {blogs.length === 0 && (
        <section className="page-section">
          <div className="page-container max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              No posts yet
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              I&apos;m drafting the first batch - check back soon, or follow me
              on socials for updates.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline"
            >
              Get in touch <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* Featured */}
      {featured && (
        <section className="page-section pt-12">
          <div className="page-container">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-5 gap-6 rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
            >
              <div className="relative lg:col-span-3 aspect-[16/9] lg:aspect-auto overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <Badge className="absolute top-4 left-4 bg-blue-500 text-white border-0">
                  Featured
                </Badge>
              </div>
              <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-center gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {featured.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(featured.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readMinutes} min
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {featured.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-500 group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section className="page-section">
          <div className="page-container">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
              Latest Articles
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              All posts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((b) => (
                <Link
                  key={b._id}
                  href={`/blog/${b.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {b.category}
                      </Badge>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {b.readMinutes} min
                      </span>
                    </div>
                    <h4 className="font-bold leading-snug line-clamp-2">
                      {b.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {b.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(b.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

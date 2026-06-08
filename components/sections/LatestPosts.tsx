import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { fetchAllBlogs } from "@/lib/server/blogs";

/**
 * "Latest from the blog" — homepage section linking to the 3 newest posts.
 *
 * SEO purpose: the homepage is the highest-authority, most-crawled page on the
 * site. Surfacing recent posts here gives every new article a contextual link
 * from that page (instead of only the navbar → /blog hop), which is the single
 * biggest lever against "Discovered – currently not indexed" on new posts.
 *
 * Server component on purpose — the post links must be in the server-rendered
 * HTML for crawlers, not hydrated client-side.
 */
export default async function LatestPosts() {
  const blogs = await fetchAllBlogs();
  if (blogs.length === 0) return null;

  const latest = blogs.slice(0, 3);

  return (
    <section className="page-section">
      <div className="page-container">
        <SectionHeader
          label="From the Blog"
          title="Latest Articles"
          description="Field-notes on React, Next.js, Node.js, TypeScript, and shipping production-grade web apps."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {latest.map((b) => (
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
                <h3 className="font-bold leading-snug line-clamp-2">
                  {b.title}
                </h3>
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

        <div className="text-center">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            Read All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

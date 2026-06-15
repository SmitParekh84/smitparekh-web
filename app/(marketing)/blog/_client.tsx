"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import { StaggerGrid, StaggerItem } from "@/components/ui/motion";

// Lean card shape - the parent server component maps the full blog records to
// this so we never ship every post's full markdown `content` to the client.
export type BlogCardData = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  isFeatured: boolean;
};

// Order the present categories by the canonical list (nicer, stable order),
// then append any categories that exist on posts but aren't in the canon.
function orderCategories(present: string[]): string[] {
  const canon = BLOG_CATEGORIES.filter((c) => present.includes(c));
  const extras = present.filter(
    (c) => !BLOG_CATEGORIES.includes(c as (typeof BLOG_CATEGORIES)[number])
  );
  return [...canon, ...extras];
}

function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter posts by category">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={selected === cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
            selected === cat
              ? "bg-blue-500 border-blue-500 text-white"
              : "border-border bg-card text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function PostCard({ post }: { post: BlogCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readMinutes} min
          </span>
        </div>
        <h4 className="font-bold leading-snug line-clamp-2">{post.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}

export default function BlogClient({ posts }: { posts: BlogCardData[] }) {
  const [selected, setSelected] = useState("All");

  const featured = useMemo(
    () => posts.find((b) => b.isFeatured) ?? posts[0],
    [posts]
  );

  const categories = useMemo(
    () =>
      orderCategories(
        Array.from(new Set(posts.map((b) => b.category).filter(Boolean)))
      ),
    [posts]
  );

  // "All" → featured hero + the rest in the grid (preserves the original layout).
  // A specific category → grid of every post in that category (no hero).
  const grid = useMemo(() => {
    if (selected === "All") {
      return posts.filter((b) => b._id !== featured?._id);
    }
    return posts.filter((b) => b.category === selected);
  }, [posts, selected, featured]);

  const showFeatured = selected === "All" && Boolean(featured);

  if (posts.length === 0) {
    return (
      <section className="page-section">
        <div className="page-container max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">No posts yet</h2>
          <p className="text-sm text-muted-foreground mb-6">
            I&apos;m drafting the first batch - check back soon, or follow me on
            socials for updates.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline"
          >
            Get in touch <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Featured */}
      {showFeatured && featured && (
        <section className="page-section pt-12 pb-0">
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

      {/* Filter + grid */}
      <section className="page-section">
        <div className="page-container">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
            {selected === "All" ? "Latest Articles" : "Filtered"}
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            {selected === "All" ? "All posts" : selected}
          </h3>

          {categories.length > 1 && (
            <CategoryFilter
              categories={categories}
              selected={selected}
              onSelect={setSelected}
            />
          )}

          {grid.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-base">No posts in this category yet.</p>
            </div>
          ) : (
            <StaggerGrid
              key={selected}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {grid.map((post) => (
                <StaggerItem key={post._id} className="h-full">
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </section>
    </>
  );
}

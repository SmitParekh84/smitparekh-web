import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials - Smit Parekh",
  description:
    "Real reviews from founders and engineering teams who have hired Smit Parekh for full-stack web development — React, Next.js, Node.js, and TypeScript projects.",
  alternates: { canonical: `${siteConfig.url}/testimonials` },
  openGraph: {
    title: "Client Reviews & Testimonials - Smit Parekh",
    description:
      "Real reviews from founders and engineering teams who have hired Smit Parekh for full-stack web development.",
    url: `${siteConfig.url}/testimonials`,
    type: "website",
  },
};

const totalReviews = testimonials.length;
const avgRating =
  Math.round(
    (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews) * 10
  ) / 10;

const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: testimonials.filter((t) => t.rating === star).length,
}));

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#org`,
  name: "Smit Parekh - Freelance Web Development",
  url: siteConfig.url,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: avgRating,
    reviewCount: totalReviews,
    bestRating: 5,
    worstRating: 1,
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: t.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: t.quote,
    publisher: {
      "@type": "Organization",
      name: t.company,
      ...(t.companyUrl ? { url: t.companyUrl } : {}),
    },
  })),
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <PageHero
        eyebrow="Client Reviews"
        title="Trusted by founders & teams"
        description={`${totalReviews} verified reviews from clients who hired Smit Parekh for full-stack web development, React, and Next.js projects.`}
        align="center"
      />

      {/* Rating summary */}
      <section className="page-section border-b border-border">
        <div className="page-container max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Big number */}
            <div className="text-center shrink-0">
              <p className="text-6xl font-bold tracking-tight">{avgRating}</p>
              <div className="flex items-center justify-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.round(avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {totalReviews} reviews
              </p>
            </div>

            {/* Bar breakdown */}
            <div className="w-full flex flex-col gap-2">
              {ratingBreakdown.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
                    {star}
                  </span>
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        width:
                          totalReviews > 0
                            ? `${(count / totalReviews) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-4 shrink-0">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review cards */}
      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < t.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-blue-500/30 shrink-0" />
                </div>

                <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br text-white text-xs font-bold shrink-0",
                      t.avatarColor
                    )}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    {t.companyUrl ? (
                      <a
                        href={t.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        {t.company}
                      </a>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {t.company}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section bg-muted/30 border-t border-border">
        <div className="page-container max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ready to add your project to the list?
          </h2>
          <p className="text-muted-foreground text-base mb-6">
            Every engagement starts with a free scoping call and a written
            proposal — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className={buttonVariants({ variant: "default" })}>
              Start a conversation
            </Link>
            <Link
              href="/portfolio"
              className={buttonVariants({ variant: "outline" })}
            >
              View case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { developerPages, relatedPages, type DeveloperPageSlug } from "@/data/developer-pages";

interface RelatedDeveloperPagesProps {
  currentSlug: DeveloperPageSlug;
}

export function RelatedDeveloperPages({ currentSlug }: RelatedDeveloperPagesProps) {
  const slugs = relatedPages[currentSlug];
  const pages = slugs.map((s) => developerPages.find((p) => p.slug === s)!);

  return (
    <section className="page-section border-t border-border">
      <div className="page-container">
        <SectionHeader
          label="Related Expertise"
          title="Other Ways I Can Help"
          description="Looking for a different speciality? Here are the most relevant pages."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
            >
              <h3 className="font-semibold text-sm leading-snug group-hover:text-blue-500 transition-colors">
                {page.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {page.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {page.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-blue-500 font-medium mt-1">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

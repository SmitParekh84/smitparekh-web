"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { useProjects } from "@/hooks/use-projects";
import { featuredProjects } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import type { BackendProject } from "@/types";

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
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
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

function ProjectCard({ project }: { project: BackendProject }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-end p-5">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
            >
              {project.categories[0]}
            </Badge>
          </div>
        )}
        {project.imageUrl && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {project.categories.slice(0, 2).map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="bg-black/50 text-white border-white/20 backdrop-blur-sm text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        <div className="flex items-center gap-3 pt-1">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors"
            >
              {project.demoBtn || "View Demo"}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-muted rounded-lg w-3/4" />
        <div className="h-4 bg-muted rounded-lg w-full" />
        <div className="h-4 bg-muted rounded-lg w-2/3" />
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: projects, isLoading, isError } = useProjects();

  const visibleProjects = projects?.filter((p) => p.isVisible !== false && p.isShowcased) ?? [];

  // Case studies: API entries with slug + summary, dedup by slug, fall back to static
  const apiCaseStudies = visibleProjects
    .filter((p) => p.slug && (p.summary || p.subtitle))
    .map((p) => ({
      slug: p.slug as string,
      title: p.title,
      subtitle: p.subtitle ?? "",
      description: p.shortDescription,
      category: p.categories?.[0] ?? "Project",
      gradient: p.gradient ?? "from-blue-600 via-blue-500 to-sky-500",
      tags: (p.tags?.length ? p.tags : p.categories) ?? [],
    }));

  const apiSlugs = new Set(apiCaseStudies.map((p) => p.slug));
  const fallbackCaseStudies = featuredProjects
    .filter((p) => !apiSlugs.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      category: p.category,
      gradient: p.gradient,
      tags: p.tags,
    }));

  const caseStudyCards = apiCaseStudies.length
    ? [...apiCaseStudies, ...fallbackCaseStudies]
    : fallbackCaseStudies;

  const allCategories = [...new Set(visibleProjects.flatMap((p) => p.categories))];

  const filtered =
    selectedCategory === "All"
      ? visibleProjects
      : visibleProjects.filter((p) => p.categories.includes(selectedCategory));

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio — Production Web Apps by Smit Parekh",
    description:
      "Web applications built by Smit Parekh for FinTech, SaaS, LegalTech, and enterprise clients.",
    url: `${siteConfig.url}/portfolio`,
    author: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudyCards.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/portfolio/${p.slug}`,
        name: `${p.title} — ${p.subtitle}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${siteConfig.url}/portfolio`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="page-section pt-24 sm:pt-28 pb-0 bg-muted/20">
        <div className="page-container text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
            My Work
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Projects & Case Studies
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Production applications built for FinTech, SaaS, LegalTech, and
            enterprise clients — each solving a real business problem at scale.
          </p>
        </div>
      </section>

      {/* Featured Case Studies (always shown — static, SEO-tuned) */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Featured Case Studies"
            title="Deep dives into real projects"
            description="Each case study walks through the problem, the approach, the stack, and the outcomes — the kind of detail you'd want before hiring."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudyCards.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div
                  className={cn(
                    "h-40 bg-gradient-to-br flex items-end p-5",
                    project.gradient
                  )}
                >
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                  >
                    {project.category}
                  </Badge>
                </div>
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-sm text-blue-500 font-medium mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-blue-500 font-medium mt-auto group-hover:gap-2 transition-all">
                    Read case study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects (from API) */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="More Projects"
            title="Latest work & live projects"
            description="A live feed of additional projects — kept up to date alongside the in-depth case studies above."
          />

          {isLoading && (
            <>
              <div className="flex justify-center mb-10">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </>
          )}

          {isError && (
            <p className="text-center text-sm text-muted-foreground">
              Live project feed unavailable right now — the case studies above
              cover the highlights.
            </p>
          )}

          {!isLoading && !isError && (
            <>
              {allCategories.length > 0 && (
                <CategoryFilter
                  categories={allCategories}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-base">No projects in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Interested in Working Together?</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            These projects are just a sample. Get in touch and I&apos;ll share
            more details about the work that matches your needs.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}

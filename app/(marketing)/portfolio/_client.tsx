"use client";

import { useMemo } from "react";
import { usePortfolioFilter } from "@/lib/stores";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Compass, PenTool, Hammer, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StaggerGrid, StaggerItem } from "@/components/ui/motion";

// Server-provided card shape. The parent server component fetches case studies
// with fetchAllCaseStudies() so the grid (and its <a> links) render in the SSR
// HTML — Googlebot can crawl the case-study URLs without executing JS. This is
// what fixed the "case studies Discovered – not indexed" issue: the internal
// links used to only exist after client-side hydration.
export type PortfolioCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  gradient: string;
  imageUrl?: string;
  isFeatured: boolean;
};

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
    <div className="flex flex-wrap gap-2 mb-10">
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

function Card({ project }: { project: PortfolioCard }) {
  const hasSlug = Boolean(project.slug);
  const Wrapper: React.ElementType = hasSlug ? Link : "div";
  const wrapperProps = hasSlug ? { href: `/portfolio/${project.slug}` } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all",
        hasSlug && "hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5"
      )}
    >
      {project.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md">
            ★ Featured
          </Badge>
        </div>
      )}

      <div className="relative h-44 sm:h-48 overflow-hidden">
        {project.imageUrl ? (
          <>
            <Image
              src={project.imageUrl}
              alt={
                project.subtitle
                  ? `${project.title} — ${project.subtitle} case study`
                  : `${project.title} case study`
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="secondary"
                className="bg-black/60 text-white border-white/20 backdrop-blur-sm text-xs"
              >
                {project.category}
              </Badge>
            </div>
          </>
        ) : (
          <div
            className={cn(
              "h-full bg-gradient-to-br flex items-end p-5",
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
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 gap-3">
        <div>
          <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
          {project.subtitle && (
            <p className="text-sm text-blue-500 font-medium mt-0.5">
              {project.subtitle}
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {hasSlug ? (
          <span className="inline-flex items-center gap-1 text-sm text-blue-500 font-medium mt-auto group-hover:gap-2 transition-all">
            Read case study
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground mt-auto">
            Coming soon
          </span>
        )}
      </div>
    </Wrapper>
  );
}

const PROCESS_STEPS = [
  {
    icon: Compass,
    title: "Discover",
    description:
      "Get into the business problem first - users, constraints, success metrics. No code until the goal is clear.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Sketch the architecture, data model, and key flows. Tradeoffs documented up front so the team agrees on direction.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Iterate in small, reviewable PRs. Tests for the parts that hurt when broken. Performance & accessibility from day one.",
  },
  {
    icon: Rocket,
    title: "Ship",
    description:
      "Roll out behind feature flags, watch the dashboards, fix what real users hit. Then write up the case study.",
  },
];

export default function PortfolioClient({
  initialCards,
}: {
  initialCards: PortfolioCard[];
}) {
  const { selectedCategory, setSelectedCategory } = usePortfolioFilter();

  const cards = useMemo(
    () =>
      [...initialCards].sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return a.title.localeCompare(b.title);
      }),
    [initialCards]
  );

  const allCategories = useMemo(
    () => Array.from(new Set(cards.map((c) => c.category))),
    [cards]
  );

  const filtered =
    selectedCategory === "All"
      ? cards
      : cards.filter((c) => c.category === selectedCategory);

  const isEmpty = cards.length === 0;

  return (
    <>
      <section className="page-section">
        <div className="page-container">
          {isEmpty ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">No portfolio available yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
                New case studies are being prepared. In the meantime, take a look
                at how I approach every project below - or get in touch directly.
              </p>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "sm" }), "mt-6 gap-2")}
              >
                Start a Conversation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              {allCategories.length > 1 && (
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
                <StaggerGrid
                  key={selectedCategory}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filtered.map((card) => (
                    <StaggerItem key={card.slug || card.title} className="h-full">
                      <Card project={card} />
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              )}
            </>
          )}
        </div>
      </section>

      <section className={cn("page-section", isEmpty ? "" : "bg-muted/20")}>
        <div className="page-container">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">
              How I Work
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              The process behind every project
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Every case study above followed roughly the same path - a tight
              loop of discovery, design, building, and shipping with real users
              in the loop.
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 p-2.5 text-blue-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/60 mt-1">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mt-4">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Interested in working together?</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            These are a sample. Get in touch and I&apos;ll share more details
            about the work that matches your needs.
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

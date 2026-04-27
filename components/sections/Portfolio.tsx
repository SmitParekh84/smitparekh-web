"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { useProjects } from "@/hooks/use-projects";
import { FadeInSection, StaggerGrid, StaggerItem } from "@/components/ui/motion";
import type { BackendProject } from "@/types";

type CardVM = {
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

function toVm(p: BackendProject): CardVM {
  return {
    slug: p.slug || "",
    title: p.title,
    subtitle: p.subtitle || "",
    description: p.shortDescription,
    category: p.categories?.[0] ?? "Project",
    tags: (p.tags?.length ? p.tags : p.categories) ?? [],
    gradient: p.gradient ?? "from-blue-600 via-blue-500 to-sky-500",
    imageUrl: p.imageUrl || undefined,
    isFeatured: Boolean(p.isShowcased),
  };
}

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();

  const cards = useMemo<CardVM[]>(() => {
    const visible = (projects ?? [])
      .filter((p) => p.isVisible !== false && p.slug)
      .map(toVm);
    // Featured first, then most recent backend order, capped at 4.
    visible.sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return 0;
    });
    return visible.slice(0, 4);
  }, [projects]);

  if (!isLoading && cards.length === 0) {
    return null;
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <FadeInSection>
          <SectionHeader
            label="Selected Work"
            title="Real Products. Real Results."
            description="A sample of production applications built for clients across FinTech, SaaS, and enterprise — each solving a genuine business problem at scale."
          />
        </FadeInSection>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <StaggerGrid
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
            delay={0.05}
          >
            {cards.map((project) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 h-full"
                >
                  {/* Featured ribbon */}
                  {project.isFeatured && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md">
                        ★ Featured
                      </Badge>
                    </div>
                  )}

                  <div className="relative h-44 overflow-hidden">
                    {project.imageUrl ? (
                      <>
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
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

                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
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
                        {project.tags.slice(0, 5).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 5 && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0.5 text-muted-foreground"
                          >
                            +{project.tags.length - 5}
                          </Badge>
                        )}
                      </div>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-sm text-blue-500 font-medium mt-auto group-hover:gap-2 transition-all">
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}

        <FadeInSection className="text-center" delay={0.2}>
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Briefcase,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { type Project } from "@/data/portfolio";
import { fetchAllCaseStudies, fetchCaseStudyBySlug } from "@/lib/server/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await fetchAllCaseStudies();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchCaseStudyBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteConfig.url}/portfolio/${project.slug}`;
  const title = `${project.title} — ${project.subtitle} | Case Study`;
  const description = project.summary;

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      `${project.title} case study`,
      `${project.title} project`,
      project.subtitle,
      project.industry,
      `${project.category} case study`,
      "Smit Parekh portfolio",
      ...project.tags.map((t) => `${t} project`),
    ],
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: siteConfig.name,
      url,
      title,
      description,
      images: [
        {
          url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
          width: 800,
          height: 800,
          alt: `${project.title} — ${project.subtitle}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [
        {
          url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
          width: 800,
          height: 800,
          alt: `${project.title} — ${project.subtitle}`,
        },
      ],
    },
  };
}

function MetaPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-3">
      <Icon className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
          {label}
        </p>
        <p className="text-sm font-semibold leading-snug truncate">{value}</p>
      </div>
    </div>
  );
}

function HighlightCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-2">
        {label}
      </p>
    </div>
  );
}

function buildSchemas(project: Project) {
  const url = `${siteConfig.url}/portfolio/${project.slug}`;
  const image = `${siteConfig.url}/images/Smit-Parekh-Home.png`;

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} — ${project.subtitle}`,
    headline: `${project.title} Case Study`,
    description: project.summary,
    url,
    image,
    inLanguage: "en",
    author: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
    creator: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
    keywords: project.tags.join(", "),
    about: project.industry,
  };

  const breadcrumb = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: url,
      },
    ],
  };

  return [creativeWork, breadcrumb];
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchCaseStudyBySlug(slug);
  if (!project) notFound();

  const all = await fetchAllCaseStudies();

  const sameCategory = all
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  const fillers = all
    .filter(
      (p) => p.slug !== project.slug && !sameCategory.some((s) => s.slug === p.slug)
    )
    .slice(0, 3 - sameCategory.length);

  const relatedFinal = [...sameCategory, ...fillers].slice(0, 3);

  const schemas = buildSchemas(project);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* Hero */}
      <section
        className={cn(
          "relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-br text-white overflow-hidden",
          project.gradient
        )}
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        <div className="page-container relative">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-white/80 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate">{project.title}</span>
          </nav>

          <Badge
            variant="secondary"
            className="bg-white/15 text-white border-white/30 backdrop-blur-sm mb-4"
          >
            {project.category} · Case Study
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
            {project.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/90 font-medium">
            {project.subtitle}
          </p>
          <p className="mt-5 max-w-3xl text-sm sm:text-base text-white/85 leading-relaxed">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-blue-600 hover:bg-white/90 gap-2"
                )}
              >
                Visit Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white gap-2"
              )}
            >
              Discuss a Similar Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project meta */}
      <section className="page-section pt-10 sm:pt-12 pb-0">
        <div className="page-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetaPill icon={Briefcase} label="Role" value={project.role} />
            <MetaPill icon={Building2} label="Industry" value={project.industry} />
            <MetaPill icon={Calendar} label="Year" value={project.year} />
            <MetaPill icon={Clock} label="Duration" value={project.duration} />
          </div>
        </div>
      </section>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <section className="page-section pt-10">
          <div className="page-container">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-4">
              At a Glance
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.highlights.map((h) => (
                <HighlightCard key={h.label} label={h.label} value={h.value} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Problem */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              The Problem
            </h2>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            What needed solving
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="page-section bg-muted/20">
        <div className="page-container max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              The Approach
            </h2>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            How I built it
          </h3>
          <ul className="space-y-4">
            {project.approach.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
            Tech Stack
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Tools used on this project
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(project.techStack).map(([group, items]) =>
              items && items.length > 0 ? (
                <div
                  key={group}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((t: string) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="page-section bg-muted/20">
        <div className="page-container max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Outcomes
            </h2>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Results that matter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.outcomes.map((o) => (
              <div
                key={o.label}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-2"
              >
                <p className="text-xl font-bold leading-snug">{o.label}</p>
                <p className="text-sm text-blue-500 font-medium">{o.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  {o.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons (optional) */}
      {project.lessons && project.lessons.length > 0 && (
        <section className="page-section">
          <div className="page-container max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
              Lessons
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              What I took away
            </h3>
            <ul className="space-y-3">
              {project.lessons.map((l, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <span className="text-blue-500 font-bold">→</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related */}
      {relatedFinal.length > 0 && (
        <section className="page-section bg-muted/20">
          <div className="page-container">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3 text-center">
              More Case Studies
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
              Related work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedFinal.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                >
                  <div
                    className={cn(
                      "h-28 bg-gradient-to-br flex items-end p-4",
                      p.gradient
                    )}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                    >
                      {p.category}
                    </Badge>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h4 className="font-bold leading-snug">{p.title}</h4>
                    <p className="text-xs text-blue-500 font-medium">
                      {p.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {p.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-blue-500 font-medium mt-1 group-hover:gap-2 transition-all">
                      Read case study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="page-section">
        <div className="page-container max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Have a similar project in mind?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            I&apos;m available for full-stack engagements — React, Next.js, Node.js,
            PostgreSQL, AWS. Let&apos;s talk through what you&apos;re building.
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
              href="/portfolio"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

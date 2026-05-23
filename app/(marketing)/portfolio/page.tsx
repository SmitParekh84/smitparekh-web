import Link from "next/link";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import { fetchAllCaseStudies } from "@/lib/server/projects";
import PortfolioClient, { type PortfolioCard } from "./_client";

// ISR: re-fetch case studies from the backend every 5 min. Rendering the grid
// server-side (instead of the old client-only useProjects fetch) means the
// case-study <a> links exist in the initial HTML, so Googlebot can crawl them
// without executing JS — the fix for "Discovered – currently not indexed".
export const revalidate = 300;

export default async function PortfolioPage() {
  const projects = await fetchAllCaseStudies();

  const cards: PortfolioCard[] = projects
    .filter((p) => p.slug)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle ?? "",
      description: p.description ?? p.summary ?? "",
      category: p.category ?? "Project",
      tags: p.tags ?? [],
      gradient: p.gradient ?? "from-blue-600 via-blue-500 to-sky-500",
      imageUrl: p.imageUrl || undefined,
      isFeatured: Boolean(p.isShowcased),
    }));

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio - Production Web Apps by Smit Parekh",
    description:
      "Web applications built by Smit Parekh for FinTech, SaaS, LegalTech, and enterprise clients.",
    url: `${siteConfig.url}/portfolio`,
    author: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cards.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/portfolio/${p.slug}`,
        name: `${p.title}${p.subtitle ? " - " + p.subtitle : ""}`,
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

      <PageHero
        eyebrow="My Work"
        icon={Briefcase}
        title="Projects & Case Studies"
        description="Production applications built for FinTech, SaaS, LegalTech, and enterprise clients - each solving a real business problem at scale. Click any card for the full case study."
      />

      {/* Server-rendered crawlable links for SEO. If JS is disabled or a crawler
          doesn't hydrate, these still let Google discover every case study. */}
      <nav aria-label="All case studies" className="sr-only">
        <ul>
          {cards.map((c) => (
            <li key={c.slug}>
              <Link href={`/portfolio/${c.slug}`}>
                {c.title}
                {c.subtitle ? ` — ${c.subtitle}` : ""}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <PortfolioClient initialCards={cards} />
    </>
  );
}

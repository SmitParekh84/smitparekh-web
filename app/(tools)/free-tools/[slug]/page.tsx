import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { toolsSEO, getToolSEO, getToolOgImage } from "@/data/tools-seo";
import { getToolFAQ } from "@/data/tools-faq";
import { getToolContent } from "@/data/tools-content";
import { howToSchema } from "@/lib/seo/schema";
import { getToolHowToSteps } from "@/data/tools-howto";
import ToolRenderer from "@/components/tools/ToolRenderer";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import RelatedTools from "@/components/tools/RelatedTools";
import { ToolLoginCTA } from "@/components/tools/ToolLoginCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolsSEO.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolSEO(slug);

  if (tool) {
    return {
      title: tool.title,
      description: tool.description,
      keywords: tool.keywords,
      alternates: { canonical: `${siteConfig.url}/free-tools/${slug}` },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
        },
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        siteName: siteConfig.name,
        title: tool.title,
        description: tool.description,
        url: `${siteConfig.url}/free-tools/${slug}`,
        images: [
          {
            url: `${siteConfig.url}${getToolOgImage(slug)}`,
            width: 1200,
            height: 630,
            alt: `${tool.title} - Free Online Tool by Smit Parekh`,
            type: "image/png",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: siteConfig.twitterHandle,
        creator: siteConfig.twitterHandle,
        title: tool.title,
        description: tool.description,
        images: [
          {
            url: `${siteConfig.url}${getToolOgImage(slug)}`,
            width: 1200,
            height: 630,
            alt: `${tool.title} - Free Online Tool by Smit Parekh`,
          },
        ],
      },
    };
  }

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} - Free Online Tool`,
    description: `Use the free ${title} tool - no account required.`,
    alternates: { canonical: `${siteConfig.url}/free-tools/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: `${title} - Free Online Tool`,
      description: `Use the free ${title} tool - no account required.`,
      url: `${siteConfig.url}/free-tools/${slug}`,
    },
    twitter: {
      card: "summary",
      site: siteConfig.twitterHandle,
      title: `${title} - Free Online Tool`,
      description: `Use the free ${title} tool - no account required.`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolSEO(slug);
  const faqs = getToolFAQ(slug);
  const content = getToolContent(slug);

  const shortTitle = tool
    ? tool.title.split(" - ")[0]
    : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const toolSchema = tool
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: shortTitle,
        description: tool.description,
        url: `${siteConfig.url}/free-tools/${slug}`,
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        inLanguage: "en",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          eligibleRegion: [
            { "@type": "Country", name: "IN" },
            { "@type": "Country", name: "US" },
            { "@type": "Country", name: "FR" },
            { "@type": "Country", name: "GB" },
            { "@type": "Country", name: "CA" },
            { "@type": "Country", name: "AU" },
          ],
        },
        author: { "@id": `${siteConfig.url}/#person` },
        publisher: { "@id": `${siteConfig.url}/#person` },
        keywords: tool.keywords.join(", "),
        isAccessibleForFree: true,
        featureList: tool.keywords.slice(0, 5).join(", "),
      }
    : null;

  const howToSteps = tool ? getToolHowToSteps(slug) : [];
  const howToSchemaData = tool && howToSteps.length > 0
    ? howToSchema(slug, tool, howToSteps)
    : null;

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteConfig.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: shortTitle, item: `${siteConfig.url}/free-tools/${slug}` },
    ],
  };

  return (
    <>
      {toolSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
        />
      )}
      {howToSchemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchemaData) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="border-b border-border bg-muted/20">
          <div className="page-container py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-5" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/free-tools" className="hover:text-foreground transition-colors">Free Tools</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{shortTitle}</span>
            </nav>

            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{shortTitle}</h1>
              {tool && (
                <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                  {tool.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>Free</span>
                <span>·</span>
                <span>No account required</span>
                <span>·</span>
                <span>Files deleted immediately</span>
                <span>·</span>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Built by Smit Parekh
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO intro - server-rendered above the tool so search engines see real content */}
        {content?.intro && (
          <section className="page-container pt-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {content.intro}
              </p>
            </div>
          </section>
        )}

        {/* Tool */}
        <section className="page-section pb-8">
          <div className="page-container">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <ToolRenderer slug={slug} />
              </div>
              <ToolLoginCTA slug={slug} toolName={shortTitle} />
            </div>
          </div>
        </section>

        {/* How It Works + Use Cases */}
        {content && (
          <ToolHowItWorks content={content} toolName={shortTitle} />
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="page-container pb-10">
            <ToolFAQ faqs={faqs} toolName={shortTitle} />
          </section>
        )}

        {/* Related Tools */}
        {content && content.relatedSlugs.length > 0 && (
          <RelatedTools relatedSlugs={content.relatedSlugs} />
        )}

        {/* Back link */}
        <section className="pb-16">
          <div className="page-container text-center">
            <Link
              href="/free-tools"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              ← Browse all free tools
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

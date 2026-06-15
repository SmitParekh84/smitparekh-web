import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Cloud,
  Search,
  Smartphone,
  Layers,
  ShieldCheck,
  Zap,
  Sparkles,
  FileSearch,
  MapPin,
  Globe,
  Cpu,
  TrendingUp,
  Brain,
  Megaphone,
  Target,
  BarChart3,
  Webhook,
  Star,
  ChevronRight,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import {
  servicePages,
  getServiceBySlug,
  getRelatedServices,
  serviceOgImageUrl,
  type ServicePage,
} from "@/data/services-catalog";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceAuthorBio } from "@/components/sections/ServiceAuthorBio";
import { ServiceMeetDeveloper } from "@/components/sections/ServiceMeetDeveloper";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

const iconMap: Record<ServicePage["iconName"], LucideIcon> = {
  Code2,
  Server,
  Database,
  Cloud,
  Search,
  Smartphone,
  Layers,
  ShieldCheck,
  Zap,
  Sparkles,
  FileSearch,
  MapPin,
  Globe,
  Cpu,
  TrendingUp,
  Brain,
  Megaphone,
  Target,
  BarChart3,
  Webhook,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const url = `${siteConfig.url}/services/${service.slug}`;
  // Existing services keep their hand-made static OG card; new services that
  // don't have one fall back to a dynamically generated card. Existing pages
  // are unaffected.
  const ogImage = serviceOgImageUrl(siteConfig.url, service.slug);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: service.metaTitle,
      description: service.metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.heroTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: service.metaTitle,
      description: service.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const HeroIcon = iconMap[service.iconName];
  const related = getRelatedServices(slug);
  const url = `${siteConfig.url}/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.heroTitle,
    serviceType: service.eyebrow,
    description: service.metaDescription,
    provider: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    offers: service.pricing.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.startingFrom.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      description: tier.bestFor,
      url,
    })),
    url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: service.eyebrow, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow={service.eyebrow}
        icon={HeroIcon}
        title={service.heroTitle}
        description={service.heroDescription}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="#start"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700"
            )}
          >
            Get a free quote in 24h
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#what-you-get"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            See what&apos;s included
          </Link>
        </div>
      </PageHero>

      {/* Breadcrumb */}
      <div className="page-container pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="hover:text-foreground transition-colors">
            Services
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{service.eyebrow}</span>
        </nav>
      </div>

      {/* Lede + Lead form (above the fold) */}
      <section id="start" className="page-section pt-6">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
            <div>
              <Badge variant="secondary" className="mb-3">
                Why work with me
              </Badge>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                {service.lede}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {service.proof.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-xl border border-border bg-card p-3"
                  >
                    <p className="text-xl sm:text-2xl font-semibold tracking-tight text-blue-600 dark:text-blue-400">
                      {p.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-1">
                      {p.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Trusted by founders & teams in
                </p>
                <div className="flex flex-wrap gap-2">
                  {["FinTech", "SaaS", "B2B", "E-commerce", "AI startups"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ServiceAuthorBio />
            </div>

            <div className="lg:sticky lg:top-24">
              <ServiceLeadForm serviceTitle={service.eyebrow} />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section id="what-you-get" className="page-section bg-muted/20">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              What you get
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Everything included in every engagement
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              No upsells. No surprise change orders. One scope, one price.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.deliverables.map((d) => {
              const Icon = iconMap[d.iconName];
              return (
                <div
                  key={d.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-blue-500/40"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {d.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              Tech stack
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              The tools I actually use in production
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Modern, battle-tested, and chosen for fit — not hype.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.techStack.map((cat) => (
              <div
                key={cat.label}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
                  {cat.label}
                </p>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              Process
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              How we&apos;ll work together
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Predictable, written-down, no surprises.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Meet the developer */}
      <ServiceMeetDeveloper />

      {/* Pricing */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              Engagement models
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Pricing that matches the work
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Starting prices. Final quote in writing after a 30-minute scoping call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.pricing.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative rounded-2xl border bg-card p-6 sm:p-7 flex flex-col",
                  tier.popular
                    ? "border-blue-500/60 shadow-lg shadow-blue-500/10"
                    : "border-border"
                )}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                    <Star className="h-2.5 w-2.5" />
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tier.bestFor}</p>
                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  {tier.startingFrom}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    starting
                  </span>
                </p>
                <ul className="mt-5 space-y-2 flex-1">
                  {tier.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#start"
                  className={cn(
                    buttonVariants({
                      variant: tier.popular ? "default" : "outline",
                      size: "default",
                    }),
                    "mt-6 w-full gap-1.5"
                  )}
                >
                  Start with {tier.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Me vs Agency vs In-house */}
      <section className="page-section bg-muted/20 border-y border-border">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Why solo dev</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Me vs. an agency vs. hiring in-house
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Three ways to get this built. Here&apos;s the honest comparison.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="w-[200px] pb-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground" />
                  <th className="pt-5 pb-4 px-4">
                    <div className="relative rounded-t-2xl bg-gradient-to-b from-blue-500/15 to-blue-500/5 border border-b-0 border-blue-500/30 px-4 pt-4 pb-3 text-center">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                        <Star className="h-2.5 w-2.5" /> Best value
                      </span>
                      <p className="font-bold text-base text-blue-500">Solo Dev (me)</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">$80–$120 /hr or fixed</p>
                    </div>
                  </th>
                  <th className="pb-4 px-4">
                    <div className="rounded-t-2xl border border-b-0 border-border bg-card px-4 pt-5 pb-3 text-center">
                      <p className="font-semibold text-base">Agency</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">$150–$300 /hr blended</p>
                    </div>
                  </th>
                  <th className="pb-4 px-4">
                    <div className="rounded-t-2xl border border-b-0 border-border bg-card px-4 pt-5 pb-3 text-center">
                      <p className="font-semibold text-base">In-house hire</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">$80–$120K /yr + benefits</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {([
                  {
                    label: "Start date",
                    me: "1–2 weeks from quote",
                    agency: "4–8 weeks onboarding",
                    inhouse: "8–16 weeks to hire",
                    meGood: true, agencyGood: false, inhouseGood: false,
                  },
                  {
                    label: "Who writes the code",
                    me: "Senior dev — every single line",
                    agency: "Junior assigned to your account",
                    inhouse: "Whoever you manage to hire",
                    meGood: true, agencyGood: false, inhouseGood: null,
                  },
                  {
                    label: "Communication",
                    me: "Direct — you talk to who codes",
                    agency: "Via account manager first",
                    inhouse: "Direct, but management overhead",
                    meGood: true, agencyGood: false, inhouseGood: null,
                  },
                  {
                    label: "Flexibility",
                    me: "Scale up or down any time",
                    agency: "Locked to contract length",
                    inhouse: "Fixed headcount, hard to change",
                    meGood: true, agencyGood: false, inhouseGood: false,
                  },
                  {
                    label: "Code ownership",
                    me: "100% yours, full handover docs",
                    agency: "Depends on contract terms",
                    inhouse: "Yours, but bus factor risk",
                    meGood: true, agencyGood: null, inhouseGood: null,
                  },
                  {
                    label: "Risk",
                    me: "Weekly demos, fixed scope",
                    agency: "Scope creep & handoff gaps",
                    inhouse: "Wrong hire = months lost",
                    meGood: true, agencyGood: false, inhouseGood: false,
                  },
                ] as const).map((row, i) => {
                  const isLast = i === 5;
                  const cellBase = "px-4 py-3.5 text-center text-xs text-muted-foreground";
                  const meCellBg = "bg-blue-500/5 border-x border-blue-500/30";
                  const otherCellBg = "bg-card border-x border-border";
                  const lastMeRound = isLast ? "rounded-b-2xl border-b border-blue-500/30" : "";
                  const lastOtherRound = isLast ? "rounded-b-2xl border-b border-border" : "";
                  return (
                    <tr key={row.label} className={i % 2 === 0 ? "" : "bg-muted/10"}>
                      <td className="py-3.5 pr-4 text-xs font-medium text-foreground/80">{row.label}</td>
                      <td className={cn(cellBase, meCellBg, lastMeRound)}>
                        <span className="flex flex-col items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="font-medium text-foreground/90">{row.me}</span>
                        </span>
                      </td>
                      <td className={cn(cellBase, otherCellBg, lastOtherRound)}>
                        <span className="flex flex-col items-center gap-1">
                          {row.agencyGood === false ? (
                            <Minus className="h-4 w-4 text-red-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          {row.agency}
                        </span>
                      </td>
                      <td className={cn(cellBase, otherCellBg, lastOtherRound)}>
                        <span className="flex flex-col items-center gap-1">
                          {row.inhouseGood === false ? (
                            <Minus className="h-4 w-4 text-red-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          {row.inhouse}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section bg-muted/20">
        <div className="page-container max-w-3xl">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Questions I get asked first
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card p-5 open:bg-card"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="text-sm sm:text-base font-medium pr-2">{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final lead form */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />
              Free 24-hour quote
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Let&apos;s scope your project
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Tell me what you&apos;re building. I&apos;ll reply with a written estimate
              within 24 hours — no sales call required.
            </p>
          </div>
          <ServiceLeadForm serviceTitle={service.eyebrow} />
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="page-section bg-muted/20 border-t border-border">
          <div className="page-container">
            <div className="mx-auto max-w-2xl text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Related services
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Often paired with {service.eyebrow.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => {
                const Icon = iconMap[r.iconName];
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group flex flex-col gap-2.5 rounded-2xl border border-border bg-card px-5 py-4 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-sm group-hover:text-blue-500 transition-colors">
                      {r.eyebrow}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {r.heroDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

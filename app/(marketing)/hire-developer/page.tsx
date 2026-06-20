import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Code2, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode } from "@/lib/seo/schema";
import { PageHero } from "@/components/layout/PageHero";
import { geoCountries } from "@/data/geo-pages";

const url = `${siteConfig.url}/hire-developer`;

export const metadata: Metadata = {
  title: "Hire a Full-Stack Developer - Gulf, US, UK & India",
  description:
    "Hire a remote full-stack developer for the Gulf, US, UK & India. React, Next.js, Node.js & PostgreSQL - timezone-aware delivery, free quote in 24 hours.",
  keywords: [
    "hire full stack developer",
    "hire developer UAE",
    "hire developer USA",
    "hire developer UK",
    "hire developer India",
    "hire React developer Dubai",
    "remote developer for hire",
    "hire Next.js developer",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    siteName: siteConfig.name,
    title: "Hire a Full-Stack Developer - Gulf, US, UK & India | Smit Parekh",
    description:
      "Remote full-stack developer for the Gulf, US, UK & India. React, Next.js & Node.js with timezone-aware delivery and same-day communication.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-hire-developer-gulf.png`,
        width: 1200,
        height: 630,
        alt: "Hire a Full-Stack Developer - Smit Parekh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a Full-Stack Developer - Gulf, US, UK & India",
    description: "Remote full-stack developer for the Gulf, US, UK & India. React, Next.js & Node.js, timezone-aware delivery.",
    images: [`${siteConfig.url}/images/smit-parekh-hire-developer-gulf.png`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack Developer for Hire - Gulf, US, UK & India",
  provider: personNode(),
  serviceType: "Full-Stack Web Development",
  description:
    "Freelance full-stack developer working remotely with businesses across the Gulf (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman), the United States, the United Kingdom, and India. React, Next.js, NestJS, PostgreSQL, and AWS.",
  url,
  areaServed: geoCountries.map((c) => ({ "@type": "Country", name: c.country })),
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Fixed-price and retainer engagements. Free quote within 24 hours.",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Hire a Developer", item: url },
  ],
};

export default function HireDeveloperHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Gulf · US · UK · India"
        title="Hire a Full-Stack Developer"
        description="Remote React, Next.js & Node.js development for businesses across the Gulf, the US, the UK, and India - timezone-aware delivery with same-day communication. Pick your region below."
        icon={MapPin}
        align="center"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {geoCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/hire-developer/${c.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <div className="flex items-center gap-2 text-blue-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{c.country}</span>
                </div>
                <h2 className="font-semibold text-lg leading-snug group-hover:text-blue-500 transition-colors">
                  Hire a Developer in {c.primaryCity}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.intro}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  UTC{c.utcOffset} · {c.timezoneLabel}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.cities.map((city) => (
                    <Badge key={city} variant="secondary" className="text-xs px-2 py-0.5">{city}</Badge>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-blue-500 font-medium mt-1">
                  View {c.country} page <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          {/* Gulf hub shortcut */}
          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-5 max-w-xl mx-auto text-center">
            <p className="text-sm font-medium mb-2">Looking for the Gulf / GCC region?</p>
            <p className="text-xs text-muted-foreground mb-4">UAE, Saudi Arabia, Qatar, Kuwait, Bahrain & Oman - all on one page.</p>
            <Link href="/hire-developer/gulf" className={cn(buttonVariants({ size: "sm" }), "gap-1.5 bg-blue-600 text-white hover:bg-blue-700")}>
              View Gulf Hub <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Outside these regions? I work with clients worldwide - send a brief and I&apos;ll reply within 24 hours.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 gap-2 font-semibold")}
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What I can build for you */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Services</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">What I can build for you</h2>
            <p className="mt-2 text-sm text-muted-foreground">Full-stack development, SEO, and AI - one engineer across the whole stack.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                icon: Code2,
                href: "/services/development",
                label: "Web Development",
                description: "React, Next.js, Node.js - MVP to enterprise. Fixed price, written scope.",
                services: ["MVPs & SaaS", "E-commerce", "APIs & Backend", "Mobile Apps"],
              },
              {
                icon: Search,
                href: "/services/marketing-and-seo",
                label: "SEO & Marketing",
                description: "Technical SEO, local SEO, AEO, GEO - done in code, not in a PDF.",
                services: ["Technical SEO", "Local SEO", "AI Search (AEO/GEO)", "CRO"],
              },
              {
                icon: Sparkles,
                href: "/services/products-and-ai",
                label: "AI Engineering",
                description: "LLM integration, RAG chatbots, AI agents - shipped with evals.",
                services: ["AI Integration", "AI Agents", "RAG Chatbots", "Full-stack AI"],
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-5 hover:border-blue-500/50 hover:bg-blue-500/[0.03] transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-blue-500" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-200 group-hover:text-blue-500 group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors mb-1">{s.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{s.description}</p>
                  <ul className="mt-auto space-y-1">
                    {s.services.map((item) => (
                      <li key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}>
              View all services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Smit */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <div className="mx-auto max-w-xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">About</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Who is Smit Parekh?</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                  I&apos;m a full-stack developer specialising in React, Next.js, Node.js, and production AI engineering.
                  I work directly with founders, product teams, and agencies across the Gulf, UK, US, and India - no middlemen, no hand-offs, one engineer accountable for the whole project.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  Projects are fixed-price with a written scope before work starts. You know exactly what you&apos;re
                  getting, when it ships, and what it costs - before I write a single line of code.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS", "OpenAI", "SEO"].map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[140px]">
                {[
                  { value: "20+", label: "MVPs shipped" },
                  { value: "4-8 wks", label: "Avg. time to live" },
                  { value: "Fixed", label: "Price, always" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-muted/50 p-3 text-center">
                    <p className="text-lg font-bold text-blue-500">{s.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { geoCountries } from "@/data/geo-pages";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";

const url = `${siteConfig.url}/hire-developer/gulf`;

export const metadata: Metadata = {
  title: "Hire a Developer in the Gulf / GCC - UAE, Saudi Arabia, Qatar, Kuwait",
  description:
    "Hire a remote full-stack developer for the Gulf and GCC region. React, Next.js, Node.js development for Dubai, Riyadh, Doha, Kuwait City, Manama & Muscat. Same-day communication, Gulf timezone overlap.",
  keywords: [
    "hire developer Gulf",
    "hire developer GCC",
    "hire developer UAE",
    "hire developer Dubai",
    "hire developer Saudi Arabia",
    "hire developer Qatar",
    "hire developer Kuwait",
    "hire React developer Gulf",
    "Next.js developer GCC",
    "remote developer Gulf region",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    siteName: siteConfig.name,
    title: "Hire a Full-Stack Developer in the Gulf / GCC | Smit Parekh",
    description:
      "Remote React, Next.js & Node.js development for Gulf and GCC businesses. UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman - timezone-aligned, same-day communication.",
  },
};

const gulfCountries = geoCountries.filter((c) =>
  ["uae", "saudi-arabia", "qatar", "kuwait", "bahrain", "oman"].includes(c.slug)
);

const reasons = [
  { title: "Gulf timezone - full working-day overlap", body: "UTC+3 to UTC+4 across the GCC means your afternoon and my afternoon overlap completely. Reviews, standups, and quick pivots happen live, not on a 12-hour delay." },
  { title: "GCC business culture understood", body: "Vision 2030, UAE digital economy, fast-decision fintech - I understand the pace, the approval hierarchies, and the need for reliable, on-time delivery that Gulf clients expect." },
  { title: "USD, AED, SAR, QAR - any currency", body: "Fixed-price projects and retainers invoiced in any GCC currency or USD. No payment friction, no hidden FX charges." },
  { title: "One engineer, end-to-end", body: "No agency middlemen, no junior proxies. The developer you scope the project with writes every line of code and handles deployment." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Hire a Developer", item: `${siteConfig.url}/hire-developer` },
    { "@type": "ListItem", position: 3, name: "Gulf / GCC", item: url },
  ],
};

export default function HireDeveloperGulfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Gulf · GCC"
        title="Hire a Developer in the Gulf Region"
        description="React, Next.js & Node.js development for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Timezone-aligned delivery with same-day communication across the GCC."
        icon={MapPin}
        align="center"
      />

      {/* Country grid */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">6 GCC countries</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Select your country for a dedicated page</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {gulfCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/hire-developer/${c.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 hover:bg-blue-500/[0.02] hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
              >
                <div className="flex items-center gap-2 text-blue-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{c.country}</span>
                </div>
                <p className="font-semibold text-sm leading-snug group-hover:text-blue-500 transition-colors">
                  Hire a Developer in {c.primaryCity}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{c.intro}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  UTC{c.utcOffset} · {c.timezoneLabel}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.cities.map((city) => (
                    <Badge key={city} variant="secondary" className="text-xs px-2 py-0.5">{city}</Badge>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-blue-500 font-medium">
                  View {c.country} page <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gulf clients hire me */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Why Gulf clients hire me</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Built for the Gulf. Delivered on time.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="h-9 w-9 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="text-sm font-semibold tracking-tight mb-1.5">{r.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "6", label: "GCC countries served" },
              { value: "UTC+3/+4", label: "Gulf timezone overlap" },
              { value: "24h", label: "Quote turnaround" },
              { value: "Fixed", label: "Price, no scope creep" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="start" className="page-section bg-muted">
        <div className="page-container max-w-2xl">
          <div className="mx-auto max-w-xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">Free quote · 24h</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Tell me what you are building</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your project brief. I will reply with a written estimate within 24 hours - no sales call needed.
            </p>
          </div>
          <ServiceLeadForm serviceTitle="Gulf / GCC Development" />
        </div>
      </section>
    </>
  );
}

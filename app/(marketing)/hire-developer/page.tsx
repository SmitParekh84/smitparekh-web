import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode } from "@/lib/seo/schema";
import { PageHero } from "@/components/layout/PageHero";
import { geoCountries } from "@/data/geo-pages";

const url = `${siteConfig.url}/hire-developer`;

export const metadata: Metadata = {
  title: "Hire a Full-Stack Developer in the Gulf — UAE, Saudi Arabia & GCC | Smit Parekh",
  description:
    "Hire a remote full-stack developer for the Gulf — UAE, Saudi Arabia, Qatar, Kuwait, Bahrain & Oman. React, Next.js, Node.js & PostgreSQL on a Gulf-timezone overlap. Free quote in 24 hours.",
  keywords: [
    "hire full stack developer Gulf",
    "hire developer UAE",
    "hire developer Saudi Arabia",
    "hire React developer Dubai",
    "freelance web developer GCC",
    "remote developer for hire Gulf",
    "hire Next.js developer Middle East",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    siteName: siteConfig.name,
    title: "Hire a Full-Stack Developer in the Gulf — UAE, Saudi Arabia & GCC | Smit Parekh",
    description:
      "Remote full-stack developer for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain & Oman. React, Next.js & Node.js on a Gulf-timezone overlap.",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a Full-Stack Developer in the Gulf — UAE, Saudi Arabia & GCC",
    description: "Remote full-stack developer for the GCC. React, Next.js & Node.js on a Gulf-timezone overlap.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack Developer for Hire — Gulf / GCC",
  provider: personNode(),
  serviceType: "Full-Stack Web Development",
  description:
    "Freelance full-stack developer working remotely with Gulf businesses across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. React, Next.js, NestJS, PostgreSQL, and AWS.",
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
        eyebrow="Gulf · GCC"
        title="Hire a Full-Stack Developer in the Gulf"
        description="Remote React, Next.js & Node.js development for businesses across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman — on a Gulf-timezone overlap, with same-day communication."
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

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Not in the Gulf? I work with clients worldwide — including the US, UK, Canada, and India.
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
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Smartphone, RefreshCw, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, devStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "Mobile Apps, Website Redesign & Maintenance | Smit Parekh",
  description:
    "React Native mobile apps for iOS and Android, website redesigns that protect your SEO, and ongoing maintenance retainers. One codebase, fixed price.",
  alternates: { canonical: `${siteConfig.url}/services/mobile-care` },
  keywords: ["mobile app development", "React Native developer", "Expo development", "iOS Android developer", "website redesign", "website maintenance"],
};

const services = [
  { href: "/services/mobile-app-development", label: "Mobile App Development", description: "React Native and Expo: one codebase, iOS and Android simultaneously without doubling cost." },
  { href: "/services/website-redesign", label: "Website Redesign", description: "Modernise your site without losing search rankings - redirects and SEO handled from day one of the spec." },
  { href: "/services/website-maintenance", label: "Website Maintenance", description: "Security updates, dependency upgrades, and fixes on a monthly retainer. Direct contact, no ticket queue." },
];

const differentiators = [
  { icon: Smartphone, title: "One codebase, both stores", body: "React Native with Expo: iOS and Android share 90% of the same code. Features ship on both platforms simultaneously." },
  { icon: RefreshCw, title: "Redesigns that protect SEO", body: "Redirect mapping, structured data, and canonical tags are in the spec from day one - not checked after launch when rankings already dropped." },
  { icon: Wrench, title: "Maintenance without a ticket queue", body: "Monthly retainer, direct contact. Small fixes done the same week, not queued behind other clients." },
];

const faqs = [
  { q: "How long does a React Native app take?", a: "Simple apps: 4 to 6 weeks. Complex features (real-time, payments, maps, offline): 8 to 12 weeks. Timeline is written into the scope document before build starts." },
  { q: "Do React Native apps feel native?", a: "Yes. React Native renders actual native UI components - UIKit on iOS, Material on Android. Expo adds push notifications, camera, and device APIs on top." },
  { q: "What does a maintenance retainer cover?", a: "Dependency and security updates, CMS updates with plugin compatibility testing, performance monitoring, bug fixes, and small content changes. Larger features are scoped and priced separately." },
];

export default function MobileCarePage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Mobile, Care & Redesign"
        icon={Smartphone}
        title="Launch, Redesign, or Maintain"
        description="Cross-platform mobile from one codebase. Redesigns that don't break rankings. Maintenance without a support ticket queue."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free quote
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services/development" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All dev services
          </Link>
        </div>
      </PageHero>

      <ServiceCol3Layout
        badge="3 services"
        heading="Launch, redesign, or keep it running."
        services={services}
        sharedIcon={Smartphone}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Why it works</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">One developer handles all three.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="h-9 w-9 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <p className="text-sm font-semibold tracking-tight mb-1.5">{d.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceStats stats={devStats} />

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container max-w-2xl">
          <div className="mx-auto max-w-xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">FAQ</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-semibold mb-1.5">{faq.q}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
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
            <h2 className="text-2xl font-semibold tracking-tight">What do you need?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Describe the app, the redesign, or the maintenance situation. I'll reply within 24 hours with a realistic plan and price.</p>
          </div>
          <ServiceLeadForm serviceTitle="Mobile, Care & Redesign" />
        </div>
      </section>
    </div>
  );
}

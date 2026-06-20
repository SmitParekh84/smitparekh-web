import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Layers, ShoppingCart, Zap, Globe } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, devStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "Web & E-commerce Development - MVP to Marketplace | Smit Parekh",
  description:
    "Custom web and e-commerce development: MVP in 4 to 8 weeks, SaaS, Shopify, WooCommerce, Next.js storefronts. Fixed price, written scope.",
  alternates: { canonical: `${siteConfig.url}/services/web-ecommerce` },
  keywords: ["web development services", "ecommerce development", "MVP development", "SaaS development", "Shopify development", "WordPress development", "Next.js ecommerce"],
};

const services = [
  { href: "/services/mvp-development", label: "MVP Development", description: "Idea to live product in 4 to 8 weeks with a signed scope before build starts." },
  { href: "/services/web-development", label: "Web Development", description: "End-to-end Next.js and Node.js builds - marketing site to complex multi-role platform." },
  { href: "/services/landing-page-development", label: "Landing Pages", description: "95+ Lighthouse, high-converting pages live in 48 hours." },
  { href: "/services/saas-development", label: "SaaS Development", description: "Multi-tenant with Stripe billing, RBAC, and an admin panel - built to scale without a rewrite." },
  { href: "/services/wordpress-development", label: "WordPress Development", description: "Custom themes, WooCommerce, and headless WordPress on a Next.js frontend." },
  { href: "/services/shopify-development", label: "Shopify Development", description: "Headless Next.js storefront on a Shopify backend - custom frontend, familiar admin." },
  { href: "/services/ecommerce-development", label: "E-commerce Development", description: "Custom commerce on Next.js: cart, checkout, inventory, and storefront - fully built and tested." },
];

const differentiators = [
  { icon: CheckCircle2, title: "Fixed price, written scope", body: "Scope, price, and timeline documented and signed before work begins. Changes are agreed in writing." },
  { icon: Layers, title: "One engineer, no handoffs", body: "The person you talk to writes every line. No middlemen, no juniors doing the work while seniors demo it." },
  { icon: Zap, title: "Live preview from week one", body: "You get a working URL in the first week. No surprises at the end." },
];

const faqs = [
  { q: "What is the minimum budget?", a: "Landing pages from ~$800. MVPs from ~$4,000. SaaS with billing and multi-tenancy from ~$8,000. Price depends on scope, written before work starts." },
  { q: "Do you handle design?", a: "Yes. You can provide Figma designs or describe the look and feel. If you don't have designs, I work from a brief or reference sites you like." },
  { q: "Can you migrate our existing site?", a: "Yes. WordPress to Next.js, WooCommerce to Shopify, legacy codebases to modern stacks. SEO redirects and content migration are part of the scope." },
];

export default function WebEcommercePage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Web & E-commerce"
        icon={Layers}
        title="From Idea to Live Product"
        description="Written scope, fixed price, one engineer who owns the whole thing - frontend to backend to deployment."
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

      {/* Breadcrumb */}
      <div className="page-container pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services/development" className="hover:text-foreground transition-colors">Development</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Web &amp; E-commerce</span>
        </nav>
      </div>

      <ServiceCol3Layout
        badge="7 services"
        heading="Which project type fits?"
        services={services}
        sharedIcon={ShoppingCart}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">How it's different</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">No surprises. No handoffs.</h2>
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
            <h2 className="text-2xl font-semibold tracking-tight">What are you building?</h2>
            <p className="mt-2 text-sm text-muted-foreground">A paragraph is enough. I will reply with a written estimate within 24 hours.</p>
          </div>
          <ServiceLeadForm serviceTitle="Web & E-commerce Development" />
        </div>
      </section>
    </div>
  );
}

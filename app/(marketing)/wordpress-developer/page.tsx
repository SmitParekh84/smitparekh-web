import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Globe, Zap, ShieldCheck,
  TrendingUp, Code2, Layers, Server, Star, Clock, Database,
} from "lucide-react";
import { SiNodedotjs, SiReact, SiTypescript, SiDocker } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a WordPress Developer - Themes, WooCommerce & Headless",
  description:
    "Hire a WordPress developer who builds without page builders. Custom PHP themes, WooCommerce stores, Gutenberg blocks, and headless WordPress with Next.js.",
  alternates: { canonical: `${siteConfig.url}/wordpress-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/wordpress-developer`,
    siteName: siteConfig.name,
    title: "Hire a WordPress Developer - Custom Themes & WooCommerce | Smit Parekh",
    description:
      "Custom WordPress themes, WooCommerce stores, and headless WP + Next.js. 95+ Lighthouse, no page builders. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-wordpress-developer.png`, width: 1200, height: 630, alt: "Hire a WordPress Developer - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a WordPress Developer - No Page Builders | Smit Parekh",
    description: "Custom WordPress themes, WooCommerce, headless WP. 95+ Lighthouse. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-wordpress-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire WordPress developer", "WordPress developer for hire", "freelance WordPress developer",
    "custom WordPress theme developer", "WooCommerce developer", "headless WordPress developer",
    "WordPress developer UK", "WordPress developer Canada", "WordPress developer USA",
    "WordPress Next.js developer", "Gutenberg block developer", "WordPress performance developer",
    "bespoke WordPress site", "hire WooCommerce developer", "WordPress PHP developer",
    "WordPress developer no page builder", "custom WordPress theme",
  ],
};

const results = [
  { value: "50+", label: "WordPress sites shipped - brochure, WooCommerce, and headless", icon: Star },
  { value: "95+", label: "Lighthouse score on every custom theme - no exceptions", icon: Zap },
  { value: "0", label: "Page builders used - Elementor, Divi, Avada - ever", icon: ShieldCheck },
  { value: "<2s", label: "LCP target on WooCommerce product pages on real 4G connections", icon: Clock },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "Bespoke WordPress Themes",
    description:
      "Hand-coded child themes and standalone themes - clean PHP 8.2, BEM CSS, design tokens, and a template hierarchy that makes sense. No Elementor, no Avada, no 80MB theme zip. Just fast, maintainable code.",
    tags: ["PHP 8.2", "BEM CSS", "WordPress", "Custom Theme"],
  },
  {
    icon: Database,
    title: "WooCommerce Stores",
    description:
      "Product catalogues, variable and grouped products, Stripe and PayPal integration, shipping rules, tax configuration, and a checkout flow optimised for conversion. Fully manageable by your team via the WooCommerce admin.",
    tags: ["WooCommerce", "Stripe", "PayPal", "Checkout"],
  },
  {
    icon: Layers,
    title: "Custom Gutenberg Blocks",
    description:
      "React-based blocks registered with block.json, full editor preview, TypeScript props, and server-side render fallbacks. Your content team gets a drag-and-drop interface; the HTML output is clean and semantic.",
    tags: ["Gutenberg", "React", "block.json", "ACF"],
  },
  {
    icon: Server,
    title: "Headless WordPress + Next.js",
    description:
      "WordPress as a CMS, Next.js as the front-end. WPGraphQL or the REST API, ISR for instant page loads, and a full preview mode so editors see exactly what will publish. Keep the familiar admin, gain the performance.",
    tags: ["Next.js", "WPGraphQL", "ISR", "Vercel"],
  },
  {
    icon: Zap,
    title: "WordPress Performance Turnarounds",
    description:
      "Inherited a slow WordPress site scoring 42 on Lighthouse? I audit the theme, plugins, server config, and caching setup, then fix each issue in order of impact. Most sites reach 90+ within a week.",
    tags: ["Lighthouse", "Redis Cache", "Cloudflare", "WebP"],
  },
  {
    icon: Globe,
    title: "SEO-Optimised from the Ground Up",
    description:
      "Rank Math or Yoast configured correctly, JSON-LD schema markup, XML sitemaps, canonical tags, and OG images. No duplicate meta, no thin pages, no conflicting plugins eating rankings you already earned.",
    tags: ["Rank Math", "Schema", "Sitemap", "Core Web Vitals"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "No page builders - ever",
    description:
      "Page builders generate 10-20× more HTML than hand-coded themes, load render-blocking JS bundles, and lock your content in proprietary shortcodes. A custom theme gives you clean output, full design control, and a Lighthouse score that doesn't embarrass you.",
  },
  {
    icon: Zap,
    title: "Performance is non-negotiable",
    description:
      "WordPress can score 95+ on Lighthouse - most sites don't because the theme was never built with performance in mind. I treat performance as a constraint, not a post-launch optimisation.",
  },
  {
    icon: TrendingUp,
    title: "SEO baked in, not bolted on",
    description:
      "I've seen too many WordPress sites with clean design and broken SEO - duplicate meta from plugins fighting each other, missing schema, and Lighthouse Core Web Vitals that tank organic rankings. I fix the foundation first.",
  },
  {
    icon: Server,
    title: "Full-stack context for headless builds",
    description:
      "When you go headless, the WordPress developer needs to understand the Next.js frontend too. I'm a full-stack developer - I've built both sides of headless CMS architectures and know where the pitfalls live.",
  },
];

const techStack = [
  { name: "WordPress / PHP", Icon: Globe },
  { name: "WooCommerce", Icon: Database },
  { name: "React / Gutenberg", Icon: SiReact },
  { name: "Next.js Headless", Icon: SiNodedotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Docker / WP Engine", Icon: SiDocker },
];

const faqs = [
  {
    q: "Why should I use a custom theme instead of Elementor or Divi?",
    a: "Three reasons: performance (custom themes score 90-98 on Lighthouse; most Elementor sites score 40-65), maintainability (custom PHP is readable by any developer; Elementor data is locked in JSON blobs), and future-proofing (your content isn't held hostage by a page builder's licensing model).",
  },
  {
    q: "Is headless WordPress worth the extra cost?",
    a: "For sites with 10K+ monthly visitors, a content team that needs the WP admin, or a brand that needs maximum performance, yes. For a 5-page brochure site, a well-optimised custom theme is more cost-effective. I'll tell you honestly which is right for your situation.",
  },
  {
    q: "Can you migrate my existing Elementor/Divi site to a custom theme?",
    a: "Yes. I export your current content, rebuild the theme from scratch, and migrate posts, pages, products, and media. URL structure is preserved with 301 redirects. Organic traffic is protected throughout the migration.",
  },
  {
    q: "WooCommerce or Shopify - which do you recommend?",
    a: "Shopify for straightforward product catalogues and teams that don't want to manage hosting or updates. WooCommerce for complex pricing rules, custom product types, or when you need deep integration with the rest of your WordPress site. Both are valid; the right choice depends on your team's capacity.",
  },
  {
    q: "What hosting do you recommend for WordPress?",
    a: "WP Engine or Kinsta for managed WordPress with built-in Redis caching and a CDN. Cloudflare on top of either for edge caching and DDoS protection. For headless, the Next.js frontend deploys to Vercel while WordPress stays on managed hosting.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Yes - monthly retainers cover WordPress core and plugin updates, security patches, uptime monitoring, and a monthly Lighthouse check to catch performance regressions early. Most clients stay on retainer for at least 3 months post-launch.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WordPress Developer for Hire",
  provider: personNode(),
  serviceType: "WordPress Development",
  description: "Freelance WordPress developer building custom themes, WooCommerce stores, Gutenberg blocks, and headless WordPress with Next.js. 95+ Lighthouse, no page builders.",
  url: `${siteConfig.url}/wordpress-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price engagements from $2,000. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
  ...serviceRatingFields(),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Hire a WordPress Developer", item: `${siteConfig.url}/wordpress-developer` },
  ],
};

export default function WordPressDeveloperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <Globe className="w-4 h-4" />
                WordPress · WooCommerce · Headless · 95+ Lighthouse
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                WordPress Development{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Without the Bloat
                </span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Custom PHP themes, WooCommerce stores, and headless WordPress with Next.js - built
                without page builders, scored 95+ on Lighthouse, and maintained with the discipline
                of a proper engineering engagement.
              </p>

              <ul className="space-y-2.5">
                {[
                  "No Elementor, Divi, or Avada - ever",
                  "95+ Lighthouse on every custom theme shipped",
                  "WooCommerce stores optimised for conversion, not just function",
                  "Headless WP + Next.js for maximum performance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-300 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services/wordpress-development"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 gap-2")}
                >
                  WordPress Services
                </Link>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/50">
                No commitment to enquire · Reply within 24 hours · UK, US, Canada & worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map(({ value, label, icon: Icon }) => (
                <div key={value} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/10">
                    <Icon className="w-5 h-5 text-blue-500 dark:text-cyan-300" />
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 leading-none dark:text-white">{value}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed dark:text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Tech strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="page-container py-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2 hidden sm:block">Stack</p>
            {techStack.map(({ name, Icon }) => (
              <span key={name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground/80">
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="WordPress Expertise"
            title="What I Build With WordPress"
            description="50+ sites shipped - none of them built on a page builder."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatIBuild.map(({ icon: Icon, title, description, tags }) => (
              <div key={title} className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all h-full">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base leading-snug mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="WordPress Development Done Properly"
            description="The difference shows on Lighthouse, in the codebase, and in your organic rankings."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Common Questions"
            title="Before You Reach Out"
            description="The questions every client asks - answered honestly."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedDeveloperPages currentSlug="wordpress-developer" />

      {/* CTA */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Available for WordPress projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a WordPress developer who won&apos;t use page builders?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with a written proposal - scope, timeline, and price. Custom theme, WooCommerce store, or headless - your call.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Start the Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services/wordpress-development"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 gap-2")}
                >
                  WordPress Service Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

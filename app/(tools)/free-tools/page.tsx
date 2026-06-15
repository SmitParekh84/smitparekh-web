import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Zap, ShieldCheck, Brain, RefreshCw,
  CheckCircle, Users, Wrench, LogIn,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import FreeToolsFAQ from "@/components/tools/FreeToolsFAQ";
import ToolsCategoryFilter from "@/components/tools/ToolsCategoryFilter";

const TOOLS_COUNT = toolsSEO.length;

export const metadata: Metadata = {
  title: "Free Online Tools - Background Remover, ATS Checker & More",
  description:
    `${TOOLS_COUNT} free browser-based tools - AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, JSON formatter, base64 encoder/decoder, YouTube thumbnail downloader, SEO analyzer, and more. No signup, no cost. Available worldwide.`,
  alternates: { canonical: `${siteConfig.url}/free-tools` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/free-tools`,
    title: "Free Online Tools by Smit Parekh - No Signup Required",
    description:
      `${TOOLS_COUNT} free browser-based tools - background remover, ATS resume checker, LinkedIn generator, QR code maker, JSON formatter, base64 encoder, YouTube thumbnail downloader, SEO analyzer & more. No signup, no cost. Used globally.`,
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-free-developer-tools.png`,
        width: 1200,
        height: 630,
        alt: "Free Online Developer Tools by Smit Parekh - No Signup Required",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Free Online Tools by Smit Parekh - No Signup Required",
    description:
      `${TOOLS_COUNT} free browser-based tools - background remover, ATS resume checker, LinkedIn generator, QR codes, JSON formatter, base64 encoder & more. No signup, used globally.`,
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-free-developer-tools.png`,
        width: 1200,
        height: 630,
        alt: "Free Online Developer Tools by Smit Parekh - No Signup Required",
      },
    ],
  },
  keywords: [
    // Core intent
    "free online tools",
    "free web tools no signup",
    "free developer tools",
    "free productivity tools",
    "AI tools free",
    "free browser based tools",
    "free tools no registration",
    "100% free online tools",
    // Tools
    "background remover free",
    "ATS resume checker free",
    "LinkedIn post generator free",
    "QR code generator free",
    "word counter online",
    "SEO analyzer free",
    "free image tools",
    "free career tools",
    "image compressor free",
    "password generator free",
    "LinkedIn video downloader free",
    "meta tag checker free",
    "youtube thumbnail downloader free",
    "json formatter online",
    "base64 encoder decoder free",
    // Geo - US
    "free online tools USA",
    "free tools no signup United States",
    "free developer tools United States",
    // Geo - UK
    "free online tools UK",
    "free web tools United Kingdom",
    "free developer tools UK",
    // Geo - Canada
    "free online tools Canada",
    "free developer tools Canada",
    // Geo - India
    "free online tools India",
    "free AI tools India",
    // Global
    "free tools online 2026",
  ],
};

const features = [
  { icon: CheckCircle, title: "Zero Paywalls, Ever", description: "No trial countdown, no 'feature locked' banners, no credit card required. Every tool is free today and will still be free next year." },
  { icon: ShieldCheck, title: "Files Deleted Immediately", description: "Uploads are processed in memory and deleted the moment your result is ready. Nothing is stored, logged, or used for AI training. Ever." },
  { icon: Users, title: "No Signup to Start", description: "Open any tool and start working in seconds. If you want 10× more daily uses and a personal dashboard, one Google sign-in takes 5 seconds - still free." },
  { icon: Brain, title: "Production-Grade AI", description: "Background removal, ATS scoring, LinkedIn post generation, and SEO analysis - the same quality as paid tools, at zero cost." },
  { icon: Zap, title: `All ${TOOLS_COUNT} Tools, One Place`, description: "Stop bookmarking a different site for each task. Image, Content, SEO, Career, and Dev tools - all here, all free, searchable by category." },
  { icon: RefreshCw, title: "Built & Maintained by a Developer", description: "Not a VC-backed tool farm. Built by a full-stack developer who uses these tools weekly. Feedback actually ships - usually within days." },
];

const steps = [
  { step: "01", title: "Choose Your Tool", description: `Browse ${TOOLS_COUNT} tools by category - Image, Content, SEO, Career, or Dev. Use the filter or scroll the full list. No account needed to start.` },
  { step: "02", title: "Paste or Upload", description: "Drop a file, paste a URL, or type your input. No complex setup, no documentation to read, no waiting in a queue." },
  { step: "03", title: "Copy or Download", description: "One click to copy your text or download your file. Sign in free for a personal dashboard and 10× higher daily limits across all tools." },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Online Tools - No Signup Required",
  description: `${TOOLS_COUNT} free browser-based tools - AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, JSON formatter, base64 encoder/decoder, and more. Available in US, UK, Canada, India, and worldwide. No account needed.`,
  url: `${siteConfig.url}/free-tools`,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: "Smit Parekh",
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Person",
    name: "Smit Parekh",
    url: siteConfig.url,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteConfig.url}/free-tools` },
    ],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Tools by Smit Parekh",
  description: "Free browser-based tools with no signup required - AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, and more. Used in US, UK, Canada, India, and worldwide.",
  url: `${siteConfig.url}/free-tools`,
  numberOfItems: toolsSEO.length,
  itemListElement: toolsSEO.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: tool.title.split(" - ")[0],
      description: tool.description,
      url: `${siteConfig.url}/free-tools/${tool.slug}`,
      applicationCategory: "WebApplication",
      operatingSystem: "Web Browser",
      inLanguage: "en",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        eligibleRegion: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "India" },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteConfig.aggregateRating.ratingValue,
        reviewCount: siteConfig.aggregateRating.reviewCount,
        bestRating: siteConfig.aggregateRating.bestRating,
        worstRating: siteConfig.aggregateRating.worstRating,
      },
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are all these tools really free?", acceptedAnswer: { "@type": "Answer", text: "Yes - every tool is completely free, forever. No hidden fees, no trial periods, no credit card required." } },
    { "@type": "Question", name: "Do I need to create an account?", acceptedAnswer: { "@type": "Answer", text: "No account, no signup, no email. Just open a tool and use it immediately." } },
    { "@type": "Question", name: "What happens to my uploaded files?", acceptedAnswer: { "@type": "Answer", text: "Files uploaded for processing are used only to generate the result and are deleted immediately after. Nothing is stored." } },
    { "@type": "Question", name: "Can I use the results commercially?", acceptedAnswer: { "@type": "Answer", text: "Yes. All outputs can be used in personal and commercial projects without attribution." } },
    { "@type": "Question", name: "How accurate is the AI background remover?", acceptedAnswer: { "@type": "Answer", text: "The background remover uses the rembg u2net model, which performs well on portraits, products, and objects with clear edges." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteConfig.url}/free-tools` },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Smit Parekh",
  url: siteConfig.url,
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.x,
  ],
  knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "Full Stack Development", "Free Web Tools"],
};

export default function FreeToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Hero */}
      <PageHero
        eyebrow="Free Tools"
        icon={Wrench}
        title="Stop Paying for Tools You Use Twice a Week"
        description={`${toolsSEO.length} browser-based tools - background remover, ATS resume checker, LinkedIn post generator, and more. Open it, use it, done. No account, no cost, no nonsense.`}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/85">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-300" /> No account required</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-300" /> Files deleted immediately</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-300" /> Free forever, no trial</span>
        </div>
      </PageHero>

      {/* Sign-in CTA banner */}
      <section className="border-b border-border bg-blue-500/5">
        <div className="page-container py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                <span className="font-semibold">You&apos;re on the free plan - 3 uses per tool per day.</span>
                <span className="text-muted-foreground ml-1.5">Sign in with Google for 10× more daily uses + a personal dashboard. No password, no cost, 5 seconds.</span>
              </span>
            </div>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 transition-colors shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in free
            </Link>
          </div>
        </div>
      </section>

      {/* SEO intro - server-rendered so search engines see real content above the client-rendered grid */}
      <section className="page-container pt-10">
        <div className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            A growing collection of {TOOLS_COUNT} free, browser-based utilities for developers,
            marketers, designers, and job seekers. Most tools run entirely on your device - files
            and text never leave the browser, so your data stays private. AI-powered tools (background
            removal, ATS resume scoring, LinkedIn post generation, SEO audits) are processed
            securely and deleted immediately after the result is returned. No signup required to
            start, no watermarks on output, and no daily-limit paywalls. Sign in free with Google
            to unlock 10× higher daily limits and a personal usage dashboard.
          </p>
        </div>
      </section>

      {/* Tools Grid + Filter */}
      <section className="page-section" id="tools">
        <div className="page-container">
          <ToolsCategoryFilter />
        </div>
      </section>

      {/* Server-rendered list of every tool - guarantees crawlers see all internal links
          even before the client filter hydrates. Doubles as an A-Z index for users. */}
      <section className="page-section border-t border-border bg-muted/10" id="all-tools">
        <div className="page-container">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
              Complete Tool Index
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              All {TOOLS_COUNT} Free Tools
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Every tool on this site, in one alphabetical list - open any one to start using it
              immediately.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...toolsSEO]
              .sort((a, b) => a.slug.localeCompare(b.slug))
              .map((tool) => {
                const name = tool.title.split(" - ")[0];
                return (
                  <li key={tool.slug}>
                    <Link
                      href={`/free-tools/${tool.slug}`}
                      className="block rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 hover:bg-blue-500/[0.03] transition-colors h-full"
                    >
                      <p className="font-semibold text-sm mb-1.5">{name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Why These Tools Are Different</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Not another tool graveyard with a freemium trap</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              No trial countdowns, no locked features, no email capture walls. Just tools that work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="page-section">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Open. Use. Done. That&apos;s really it.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">FAQ</p>
            <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
          </div>
          <FreeToolsFAQ />
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container">
          <div className="rounded-3xl border border-border bg-muted/30 px-8 py-12 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">No credit card. No expiry. No catch.</p>
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              Every tool is free - today and always
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Sign in free with Google for 10× more daily uses and a personal dashboard that tracks everything. Or just start using tools right now - no account needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#tools"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
              >
                Browse All Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card hover:bg-accent font-semibold px-6 py-3 text-sm transition-colors"
              >
                <LogIn className="w-4 h-4" /> Sign in Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

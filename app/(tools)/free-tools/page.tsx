import type { Metadata } from "next";
import Link from "next/link";
import {
  Eraser, PenLine, FileText, Globe, QrCode, Hash,
  Minimize2, ArrowLeftRight, Download, Search, Lock,
  ArrowRight, Zap, ShieldCheck, Brain, RefreshCw,
  CheckCircle, Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import FreeToolsFAQ from "@/components/tools/FreeToolsFAQ";

export const metadata: Metadata = {
  title: "Free Online Tools — Background Remover, Resume Checker, QR Code Generator & More",
  description:
    "11 free browser-based tools — AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, word counter, SEO analyzer, and more. No signup, no cost.",
  alternates: { canonical: `${siteConfig.url}/free-tools` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/free-tools`,
    title: "Free Online Tools by Smit Parekh",
    description:
      "11 free browser-based tools — background remover, resume checker, LinkedIn generator, QR codes & more. No signup required.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
        alt: "Free Online Tools by Smit Parekh",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Free Online Tools by Smit Parekh",
    description:
      "11 free browser-based tools — background remover, ATS resume checker, LinkedIn generator, QR codes & more. No signup required.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
        alt: "Free Online Tools by Smit Parekh",
      },
    ],
  },
  keywords: [
    "free online tools", "free web tools no signup", "free developer tools",
    "free productivity tools", "AI tools free", "background remover free",
    "ATS resume checker free", "LinkedIn post generator", "QR code generator free",
    "word counter online", "SEO analyzer free", "free image tools", "free career tools",
  ],
};

const toolIconMap: Record<string, React.FC<{ className?: string }>> = {
  "background-remover": Eraser,
  "viral-linkedin-post-generator": PenLine,
  "ats-resume-checker": FileText,
  "meta-tag-checker": Globe,
  "qr-code-generator": QrCode,
  "word-counter": Hash,
  "image-compressor": Minimize2,
  "image-converter": ArrowLeftRight,
  "linkedin-media-downloader": Download,
  "seo-analyzer": Search,
  "password-generator": Lock,
};

const toolCategoryMap: Record<string, string> = {
  "background-remover": "Image",
  "viral-linkedin-post-generator": "Content",
  "ats-resume-checker": "Career",
  "meta-tag-checker": "SEO",
  "qr-code-generator": "Dev",
  "word-counter": "Content",
  "image-compressor": "Image",
  "image-converter": "Image",
  "linkedin-media-downloader": "Content",
  "seo-analyzer": "SEO",
  "password-generator": "Security",
};

const popularSlugs = new Set(["background-remover", "viral-linkedin-post-generator"]);
const newSlugs = new Set(["ats-resume-checker"]);

const features = [
  { icon: CheckCircle, title: "100% Free Forever", description: "Every tool is free with no hidden costs, trials, or subscription tiers. Use them as much as you need." },
  { icon: Zap, title: "Lightning Fast", description: "Results in seconds. Browser-based tools run locally; AI tools use optimised server pipelines." },
  { icon: ShieldCheck, title: "Private & Secure", description: "Uploaded files are processed and deleted immediately — never stored, never shared, never used for training." },
  { icon: Brain, title: "AI-Powered", description: "Background removal, post generation, ATS scoring, and SEO analysis all use production-grade AI models." },
  { icon: Users, title: "No Account Required", description: "No signup, no email, no OAuth. Open a tool and use it — every single time." },
  { icon: RefreshCw, title: "Continuously Improved", description: "New tools and improvements ship regularly based on real feedback from developers and marketers." },
];

const steps = [
  { step: "01", title: "Pick a Tool", description: "Browse the collection below and choose the tool that fits your task — image, content, SEO, or career." },
  { step: "02", title: "Input Your Data", description: "Upload a file, paste a URL, or type your content. The interface tells you exactly what it needs." },
  { step: "03", title: "Get Instant Results", description: "Download your processed image, copy your generated text, or read your detailed analysis — in seconds." },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Tools by Smit Parekh",
  description: "Free browser-based tools with no signup required — AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, and more.",
  url: `${siteConfig.url}/free-tools`,
  numberOfItems: toolsSEO.length,
  itemListElement: toolsSEO.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: tool.title.split(" — ")[0],
      description: tool.description,
      url: `${siteConfig.url}/free-tools/${tool.slug}`,
      applicationCategory: "WebApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are all these tools really free?", acceptedAnswer: { "@type": "Answer", text: "Yes — every tool is completely free, forever. No hidden fees, no trial periods, no credit card required." } },
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

export default function FreeToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="page-section pt-24 sm:pt-28 pb-0">
        <div className="page-container text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">Free Tools</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Free Online Tools
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            {toolsSEO.length} browser-based tools — no signup, no account, no cost.
            Built for developers, marketers, and professionals.
          </p>
          {/* Trust bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No account required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No data stored</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> 100% free forever</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="page-section" id="tools">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolsSEO.map((tool) => {
              const Icon = toolIconMap[tool.slug] ?? Globe;
              const category = toolCategoryMap[tool.slug] ?? "Tool";
              const isPopular = popularSlugs.has(tool.slug);
              const isNew = newSlugs.has(tool.slug);
              const shortTitle = tool.title.split(" — ")[0];

              return (
                <Link
                  key={tool.slug}
                  href={`/free-tools/${tool.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors shrink-0">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">{category}</Badge>
                      {isPopular && <Badge className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 border-blue-500/20">Popular</Badge>}
                      {isNew && <Badge className="text-xs px-2 py-0.5 bg-cyan-400/10 text-cyan-500 border-cyan-400/20">New</Badge>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-base leading-snug mb-1.5 group-hover:text-blue-500 transition-colors">
                      {shortTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-blue-500 font-medium mt-auto">
                    Use for free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Why Use These Tools</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built for professionals who value their time</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Every tool is designed to solve a real problem fast — no friction, no paywalls.
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Three steps — that's it</h2>
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
        <div className="page-container text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to get started?</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Pick any tool above — no signup, no download, no waiting. Just results.
          </p>
          <Link
            href="#tools"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

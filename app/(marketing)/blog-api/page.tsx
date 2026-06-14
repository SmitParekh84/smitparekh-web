import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  Code2,
  Sparkles,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  FileJson,
  CheckCircle2,
  Rocket,
  Building2,
  Briefcase,
  BookOpen,
  Gift,
  Heart,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Headless Blog API — Add a Blog to Any Site in Minutes",
  description:
    "A free, hosted headless blog API for any developer. Power your Next.js project, business site, or SaaS dashboard with JSON endpoints, Markdown content, image hosting, drafts, categories, and tags — no CMS to maintain, no credit card.",
  alternates: { canonical: `${siteConfig.url}/blog-api` },
  robots: { index: true, follow: true },
  keywords: [
    "free blog API",
    "free headless blog API",
    "headless blog API",
    "blog API",
    "blog as a service",
    "Next.js blog API",
    "JSON blog API",
    "headless CMS alternative",
    "free headless CMS",
    "blog backend",
    "REST blog API",
    "hosted blog API",
    "Markdown blog API",
    "blog API for business website",
    "embed blog into website",
    "add a blog to my site",
    "headless blog for SaaS",
    "blog API X-API-Key",
    "free blog backend for developers",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/blog-api`,
    title: "Free Headless Blog API — Add a Blog to Any Site in Minutes",
    description:
      "A free, hosted headless blog API for any developer. Markdown content, JSON endpoints, image hosting, drafts, categories, and tags. Plug it into Next.js, your business site, or your SaaS. No CMS to maintain.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-blog-api.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh — Headless Blog API",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Free Headless Blog API — Add a Blog to Any Site in Minutes",
    description:
      "A free hosted blog API with Markdown, JSON, image hosting, drafts, categories, tags. Plug it into Next.js, your business site, or your SaaS.",
    images: [`${siteConfig.url}/images/smit-parekh-blog-api.png`],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Smit Parekh Headless Blog API",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${siteConfig.url}/blog-api`,
  description:
    "A hosted, multi-tenant headless blog API. Use it to add a blog to your Next.js project, business site, or SaaS dashboard. JSON endpoints, Markdown content, image hosting, drafts, categories, and tags.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Person",
    name: "Smit Parekh",
    url: siteConfig.url,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a headless blog API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A headless blog API exposes your blog posts as JSON over HTTP. You manage posts in our dashboard (or via the API itself) and render them however you want on your own site — Next.js, Astro, Nuxt, plain HTML, a SaaS dashboard, anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to sign up to use the Blog API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sign in, request a tenant in your dashboard, and once approved you get an API key. Every request you make is scoped to your tenant — your posts never mix with anyone else's.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use it with Next.js, React, or my business website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The API returns plain JSON with Markdown content, so it works with Next.js, React, Astro, Nuxt, Remix, WordPress, plain HTML, or any backend. We provide ready-to-paste fetch examples in the dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "Is image hosting included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload cover images directly from the dashboard or via the upload endpoint. Images are stored on a CDN and returned as fast, optimized URLs.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free during the current beta. Reasonable rate limits apply per tenant. Pricing for higher tiers will be announced in the changelog.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Blog API", item: `${siteConfig.url}/blog-api` },
  ],
};

const stats = [
  { value: "100%", label: "Free for developers" },
  { value: "6", label: "REST endpoints" },
  { value: "JSON", label: "+ Markdown content" },
  { value: "CDN", label: "image hosting included" },
];

const comparison = [
  {
    feature: "Setup time",
    api: "Minutes — copy a key, fetch JSON",
    wordpress: "Hours — host, install, secure, update",
    cms: "An afternoon of config + billing setup",
  },
  {
    feature: "Hosting & maintenance",
    api: "None — fully hosted for you",
    wordpress: "You own servers, updates & security",
    cms: "Hosted, but vendor lock-in",
  },
  {
    feature: "Cost",
    api: "Free during beta, no credit card",
    wordpress: "Hosting + plugins + your time",
    cms: "Free tier, then per-seat pricing",
  },
  {
    feature: "Frontend freedom",
    api: "Any stack — JSON in, render anywhere",
    wordpress: "Themes, or headless with extra work",
    cms: "Headless, but schema-locked",
  },
  {
    feature: "Best for",
    api: "Devs adding a blog to an existing app",
    wordpress: "Standalone content sites",
    cms: "Large editorial teams",
  },
];

const useCases = [
  {
    icon: Rocket,
    title: "Your Next.js side project",
    description:
      "Add a /blog route to your Next.js, Astro, or Nuxt app in an afternoon. Fetch posts at build time for ISR, or at request time — both work.",
    cta: "Build pattern",
    href: "#how-it-works",
  },
  {
    icon: Building2,
    title: "Your business or agency site",
    description:
      "Run a content marketing blog on your company site without standing up WordPress. Manage posts in our dashboard, render them on your domain.",
    cta: "See use cases",
    href: "#use-cases",
  },
  {
    icon: Briefcase,
    title: "Your SaaS or product dashboard",
    description:
      "Surface release notes, tutorials, or a 'What's new' panel inside your app. The API is stateless and CDN-friendly — drop it anywhere.",
    cta: "See endpoints",
    href: "#endpoints",
  },
];

const features = [
  {
    icon: FileJson,
    title: "JSON over HTTP",
    description:
      "Predictable REST endpoints with Markdown content, slugs, tags, categories, read time, and timestamps. No GraphQL learning curve.",
  },
  {
    icon: KeyRound,
    title: "Scoped API keys",
    description:
      "Every tenant gets a key. Pass it as X-API-Key and you can only read and write your own posts. Regenerate keys any time.",
  },
  {
    icon: ImageIcon,
    title: "Image hosting included",
    description:
      "Upload cover images via the dashboard or the upload endpoint. Stored on a CDN and returned as optimized URLs — no S3 to wire up.",
  },
  {
    icon: Sparkles,
    title: "Drafts, categories & tags",
    description:
      "Save drafts, toggle publish state, tag posts, group by category, and mark featured posts — all from a clean dashboard.",
  },
  {
    icon: Zap,
    title: "Fast & cached",
    description:
      "List endpoints respond in tens of milliseconds. Frontend frameworks can revalidate on demand or stale-while-revalidate as they like.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-tenant isolation",
    description:
      "Your posts and images are isolated per tenant. No accidental cross-tenant reads, ever. Soft-delete on every destructive call.",
  },
];

const steps = [
  {
    n: "1",
    title: "Sign in and request a tenant",
    description:
      "Go to your dashboard, request a tenant with your name. Most requests are approved within 24 hours.",
  },
  {
    n: "2",
    title: "Copy your API key",
    description:
      "Once approved you'll see an X-API-Key in your dashboard. Store it as an environment variable in your project.",
  },
  {
    n: "3",
    title: "POST your first post",
    description:
      "Create posts via the dashboard or with a single POST request. The API returns the post as JSON, ready to render.",
  },
];

const fetchExample = `// app/blog/page.tsx (Next.js 15+)
const POSTS_URL = "https://api.smitparekh.co.in/api/v1/blogs";

export const revalidate = 86400; // refresh daily; this page rarely changes

async function getPosts() {
  const res = await fetch(POSTS_URL, {
    headers: { "X-API-Key": process.env.BLOG_API_KEY! },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to load posts");
  const { data } = await res.json();
  return data;
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p._id}>
          <a href={\`/blog/\${p.slug}\`}>{p.title}</a>
        </li>
      ))}
    </ul>
  );
}`;

const endpoints = [
  { method: "GET", path: "/api/v1/blogs", description: "List all published posts" },
  { method: "GET", path: "/api/v1/blogs/:id", description: "Fetch a single post by ID or slug" },
  { method: "POST", path: "/api/v1/blogs", description: "Create a new post (saved as draft)" },
  { method: "PUT", path: "/api/v1/blogs/:id", description: "Update fields on an existing post" },
  { method: "PATCH", path: "/api/v1/blogs/:id/publish", description: "Toggle publish state" },
  { method: "DELETE", path: "/api/v1/blogs/:id", description: "Soft-delete a post" },
];

const methodColor: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  POST: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  PUT: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  PATCH: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  DELETE: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const faqs = [
  {
    q: "What is a headless blog API?",
    a: "A headless blog API exposes your blog posts as JSON over HTTP. You manage posts in our dashboard (or via the API itself) and render them on any frontend you want — Next.js, Astro, Nuxt, plain HTML, or a SaaS dashboard.",
  },
  {
    q: "Do I need to sign up to use it?",
    a: "Yes. Sign in to the dashboard, request a tenant, and once approved you get an API key. Every request is scoped to your tenant.",
  },
  {
    q: "Can I use it with Next.js, React, or my business website?",
    a: "Yes. JSON in, Markdown out. Works with Next.js, React, Astro, Nuxt, Remix, WordPress, plain HTML, or any backend.",
  },
  {
    q: "Is image hosting included?",
    a: "Yes. Upload cover images from the dashboard or via the upload endpoint. We store them on a CDN and return optimized URLs.",
  },
  {
    q: "How much does it cost?",
    a: "Free during the current beta. Reasonable rate limits per tenant. Pricing for higher tiers will be announced in the changelog.",
  },
  {
    q: "Can I export my posts later?",
    a: "Yes. Every list and detail endpoint returns full Markdown content, so a single GET pulls everything you've written.",
  },
];

export default function BlogApiLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
        eyebrow="Free Blog API"
        title="Add a blog to any site in minutes — for free"
        description="A free, hosted headless blog API for Next.js projects, business sites, and SaaS dashboards. Markdown content, JSON endpoints, image hosting, drafts, categories, and tags — no CMS to maintain, no credit card."
        icon={BookOpen}
        align="center"
      />

      {/* CTAs under hero */}
      <section className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/blog/onboarding"
              className={cn(buttonVariants({ size: "lg" }), "gap-1.5 w-full sm:w-auto")}
            >
              Get your API key
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#endpoints"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-1.5 w-full sm:w-auto"
              )}
            >
              See the API
              <Code2 className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Free during beta · Approval within 24 hours · No credit card required
          </p>

          {/* Trust / stats strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card px-4 py-3 text-center"
              >
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="page-section pt-0">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              Built for
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Plug a blog into whatever you&apos;re building
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              You write posts in the dashboard. We hand back JSON. You render it
              however your stack wants — at build time, at request time, or on
              the edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases.map((u) => {
              const Icon = u.icon;
              return (
                <div
                  key={u.title}
                  className="rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 transition-colors"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{u.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {u.description}
                  </p>
                  <Link
                    href={u.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-1.5 transition-all"
                  >
                    {u.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              How it works
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              From zero to first post in three steps
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              No SQL to migrate. No CMS to deploy. No server to maintain.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold text-white">
                  {s.n}
                </div>
                <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features grid */}
      <section className="page-section pt-0">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              What you get
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              A focused feature set built for real production traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              Code example
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Drop this in your Next.js app
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Server-side fetch with ISR. One file. No client SDK to install.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-neutral-950 dark:bg-neutral-900 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <span className="font-mono text-xs text-neutral-400">
                app/blog/page.tsx
              </span>
              <span className="font-mono text-xs text-neutral-400">Next.js</span>
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-neutral-100 font-mono">
              <code>{fetchExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              Endpoints
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              A tiny REST surface area
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Six endpoints. Every one returns JSON.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <ul className="divide-y divide-border">
              {endpoints.map((ep) => (
                <li
                  key={`${ep.method}-${ep.path}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 py-4"
                >
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold",
                      methodColor[ep.method]
                    )}
                  >
                    {ep.method}
                  </span>
                  <code className="font-mono text-sm text-foreground">{ep.path}</code>
                  <span className="text-sm text-muted-foreground sm:ml-auto">
                    {ep.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Full docs with copy-paste fetch examples are inside your dashboard at{" "}
            <Link
              href="/dashboard/blog/api-docs"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              /dashboard/blog/api-docs
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              How it compares
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Blog API vs. WordPress vs. a headless CMS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              If you just need a blog inside an app you already have, a hosted JSON
              API beats standing up a whole CMS.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="w-[160px] pb-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground" />
                  <th className="pb-3 px-4">
                    <div className="rounded-t-2xl bg-gradient-to-b from-blue-500/15 to-blue-500/5 border border-b-0 border-blue-500/30 px-4 py-3 text-center">
                      <p className="font-bold text-base text-blue-500">Blog API</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">This product</p>
                    </div>
                  </th>
                  <th className="pb-3 px-4">
                    <div className="rounded-t-2xl border border-b-0 border-border bg-card px-4 py-3 text-center">
                      <p className="font-semibold text-base">WordPress</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Self-hosted</p>
                    </div>
                  </th>
                  <th className="pb-3 px-4">
                    <div className="rounded-t-2xl border border-b-0 border-border bg-card px-4 py-3 text-center">
                      <p className="font-semibold text-base">Headless CMS</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">SaaS</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => {
                  const isLast = i === comparison.length - 1;
                  const cellBase = "px-4 py-3.5 text-center text-xs text-muted-foreground align-top";
                  const meCellBg = "bg-blue-500/5 border-x border-blue-500/30";
                  const otherCellBg = "bg-card border-x border-border";
                  return (
                    <tr key={row.feature} className={i % 2 === 0 ? "" : "bg-muted/10"}>
                      <td className="py-3.5 pr-4 text-xs font-medium text-foreground/80 align-top">
                        {row.feature}
                      </td>
                      <td
                        className={cn(
                          cellBase,
                          meCellBg,
                          isLast && "rounded-b-2xl border-b border-blue-500/30"
                        )}
                      >
                        <span className="flex flex-col items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="font-medium text-foreground/90">{row.api}</span>
                        </span>
                      </td>
                      <td className={cn(cellBase, otherCellBg, isLast && "rounded-b-2xl border-b border-border")}>
                        {row.wordpress}
                      </td>
                      <td className={cn(cellBase, otherCellBg, isLast && "rounded-b-2xl border-b border-border")}>
                        {row.cms}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why it's free */}
      <section className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">
                  <Heart className="mr-1 h-3 w-3 text-rose-500" />
                  Why it&apos;s free
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Free for every developer — here&apos;s the honest reason
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I built this Blog API for my own projects, and running it for other
                  developers costs me almost nothing extra — so it&apos;s free for anyone to
                  use. It&apos;s also the clearest demo of how I build: a multi-tenant,
                  documented, production API that you can actually plug in today. If it
                  saves you a weekend, great. And if you later need a custom API, a SaaS
                  backend, or a full web app built the same way, you already know what
                  you&apos;ll get.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/dashboard/blog/onboarding"
                    className={cn(buttonVariants({ size: "default" }), "gap-1.5")}
                  >
                    Get your free API key
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services/api-development"
                    className={cn(buttonVariants({ variant: "outline", size: "default" }), "gap-1.5")}
                  >
                    Need a custom API?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section pt-0">
        <div className="page-container max-w-3xl">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card p-5 open:bg-muted/30"
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

      {/* Final CTA */}
      <section className="page-section pt-0">
        <div className="page-container max-w-4xl">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 p-8 sm:p-12 text-center">
            <Badge variant="secondary" className="mb-4">
              <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />
              Free during beta
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Get your API key and ship a blog this week
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Sign in, request a tenant, copy your key. Most approvals land
              within 24 hours.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard/blog/onboarding"
                className={cn(buttonVariants({ size: "lg" }), "gap-1.5 w-full sm:w-auto")}
              >
                Request my API key
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-1.5 w-full sm:w-auto"
                )}
              >
                Talk to Smit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

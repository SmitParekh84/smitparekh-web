import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Terminal,
  GitBranch,
  Globe,
  Settings,
  Rocket,
  AlertCircle,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { BookCallButton } from "@/components/cal/BookCallButton";

export const metadata: Metadata = {
  title: "How to Deploy Next.js to Vercel: Step-by-Step Guide (2026)",
  description:
    "Deploy your Next.js app to Vercel in 15 minutes. Step-by-step: create app → push to GitHub → import to Vercel → configure env vars → custom domain. Includes environment variable setup, preview deployments, and production gotchas from a developer who ships Next.js every week.",
  alternates: { canonical: `${siteConfig.url}/nextjs-vercel-guide` },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `${siteConfig.url}/nextjs-vercel-guide`,
    siteName: siteConfig.name,
    title: "How to Deploy Next.js to Vercel: Step-by-Step Guide (2026)",
    description:
      "Deploy your Next.js app to Vercel in 15 minutes — GitHub import, env vars, custom domain, preview deployments, and production gotchas.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 1200,
        height: 630,
        alt: "How to Deploy Next.js to Vercel — Step-by-Step Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "How to Deploy Next.js to Vercel: Step-by-Step Guide (2026)",
    description:
      "Deploy Next.js to Vercel in 15 min. GitHub import, env vars, custom domain, preview deploys, and gotchas.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home.png` }],
  },
  keywords: [
    "deploy next.js to vercel",
    "how to deploy next.js app to vercel step by step",
    "vercel next.js deployment guide 2026",
    "next.js vercel deployment tutorial",
    "deploy next.js vercel step by step 2026",
    "next.js vercel environment variables",
    "vercel deploy next.js guide",
    "next.js vercel deployment best practices",
    "how to deploy to vercel step by step 2026",
    "next.js 15 vercel deployment",
    "vercel github next.js deployment",
    "next.js app router vercel deploy",
    "vercel preview deployments next.js",
    "next.js production deployment vercel",
  ],
};

const steps = [
  {
    number: 1,
    icon: Terminal,
    title: "Create (or prepare) your Next.js app",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    badge: "~2 min",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          If you don&apos;t have an app yet, scaffold one with the official CLI. For
          App Router (recommended for new projects in 2026):
        </p>
        <pre className="bg-neutral-900 text-neutral-100 rounded-xl border border-border p-4 text-sm overflow-x-auto mb-4">
          <code>npx create-next-app@latest my-app --typescript --tailwind --app --src-dir</code>
        </pre>
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Already have an app?</p>
            <p className="text-sm text-muted-foreground">
              Make sure your <code className="text-cyan-500 bg-cyan-500/10 px-1 rounded">package.json</code> has a{" "}
              <code className="text-cyan-500 bg-cyan-500/10 px-1 rounded">build</code> script (Next.js adds this automatically).
              Vercel detects Next.js projects automatically — no Dockerfile needed.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    number: 2,
    icon: GitBranch,
    title: "Push your code to GitHub",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    badge: "~3 min",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          Vercel deploys directly from your Git repository. Push to GitHub (GitLab
          and Bitbucket also work, but GitHub gives the richest integration).
        </p>
        <pre className="bg-neutral-900 text-neutral-100 rounded-xl border border-border p-4 text-sm overflow-x-auto mb-4">
          <code>{`git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/your-username/my-app.git
git push -u origin main`}</code>
        </pre>
        <div className="bg-blue-500/8 border border-blue-500/20 rounded-lg p-4 flex gap-3">
          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Vercel creates a <strong className="text-foreground">preview deployment</strong> for every branch and
            pull request automatically — you don&apos;t need to configure anything for this.
          </p>
        </div>
      </>
    ),
  },
  {
    number: 3,
    icon: Rocket,
    title: "Import your project to Vercel",
    color: "text-green-500 bg-green-500/10 border-green-500/20",
    badge: "~5 min",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          Go to{" "}
          <span className="text-blue-500 font-medium">vercel.com</span>, sign up or log in with
          GitHub, then click <strong className="text-foreground">Add New → Project</strong> and
          select your repository.
        </p>
        <ol className="space-y-3 mb-4">
          {[
            "Vercel detects Next.js automatically — the build command and output directory are pre-filled",
            "Leave the Framework Preset as Next.js (do not change this)",
            'Add any environment variables in the "Environment Variables" section before clicking Deploy',
            "Click Deploy — your first deployment takes 60–120 seconds",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Critical:</strong> If your app uses{" "}
            <code className="text-cyan-500 bg-cyan-500/10 px-1 rounded">process.env.SECRET_KEY</code> in server
            code, add the variable here — not after. A deployment without required env vars will
            either fail the build or break at runtime.
          </p>
        </div>
      </>
    ),
  },
  {
    number: 4,
    icon: Settings,
    title: "Configure environment variables correctly",
    color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    badge: "Do this right",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          Vercel scopes environment variables to three environments. Using the wrong
          scope is the most common source of &quot;works in preview, broken in prod&quot; bugs.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border mb-4">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border">Scope</th>
                <th className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border">When it&apos;s active</th>
                <th className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border">Example use</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Production", "main branch deploys only", "Live DB, live Stripe key"],
                ["Preview", "every branch / PR deploy", "Staging DB, Stripe test key"],
                ["Development", "vercel dev locally", "Local DB, mock keys"],
              ].map(([scope, when, use]) => (
                <tr key={scope} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{scope}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{when}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3">
          <div className="bg-red-500/8 border border-red-500/20 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Never prefix secrets with NEXT_PUBLIC_</p>
              <p className="text-sm text-muted-foreground">
                <code className="text-cyan-500 bg-cyan-500/10 px-1 rounded">NEXT_PUBLIC_</code> variables are
                baked into the browser JavaScript bundle. Anyone can read them in DevTools.
                Use this prefix only for things safe to expose: your Supabase anon key, your public API URL.
              </p>
            </div>
          </div>
          <div className="bg-blue-500/8 border border-blue-500/20 rounded-lg p-4 flex gap-3">
            <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              After adding or changing environment variables in the Vercel dashboard,
              you <strong className="text-foreground">must redeploy</strong> for the changes to take effect.
              Env var changes alone don&apos;t trigger a new deploy.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    number: 5,
    icon: Globe,
    title: "Connect a custom domain",
    color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    badge: "~5 min",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          Your deployment gets a free <code className="text-cyan-500 bg-cyan-500/10 px-1 rounded">*.vercel.app</code>{" "}
          URL immediately. To use a custom domain:
        </p>
        <ol className="space-y-3 mb-4">
          {[
            "In your Vercel project, go to Settings → Domains → Add",
            "Enter your domain (e.g. myapp.com) and click Add",
            "Vercel shows you two DNS records to add: an A record for the apex domain and a CNAME for www",
            "Add those records in your domain registrar (Cloudflare, Namecheap, GoDaddy, etc.)",
            "SSL (HTTPS) is provisioned automatically — no certificate setup required",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
        <div className="bg-blue-500/8 border border-blue-500/20 rounded-lg p-4 flex gap-3">
          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Propagation usually takes 1–10 minutes on Cloudflare, up to 48 hours on other registrars.
            Vercel checks domain health automatically and sends you an email once it&apos;s active.
          </p>
        </div>
      </>
    ),
  },
];

const faq = [
  {
    q: "How long does deploying Next.js to Vercel take?",
    a: "Your first deployment takes about 60–120 seconds for a typical Next.js app. After that, incremental rebuilds (only changed pages) are usually under 30 seconds. Zero-config CI/CD means every git push to main triggers a new production deploy automatically.",
  },
  {
    q: "Is Vercel free for Next.js apps?",
    a: "Yes — Vercel's Hobby plan is free forever for personal projects. It includes unlimited deployments, 100 GB bandwidth/month, preview deployments on every PR, and automatic HTTPS. The Pro plan ($20/month per member) adds team collaboration, more bandwidth, and enterprise features.",
  },
  {
    q: "Can I deploy Next.js App Router on Vercel?",
    a: "Yes, and Vercel has first-class support for App Router features: Server Components, Server Actions, Parallel Routes, and streaming. Vercel built the App Router architecture, so all features work out of the box without any extra configuration.",
  },
  {
    q: "Where do I add environment variables for a Vercel Next.js deployment?",
    a: "Go to your Vercel project → Settings → Environment Variables. Add them there before deploying. After adding variables, you must trigger a new deployment for them to take effect — env var changes alone don't redeploy. Never commit .env files to git.",
  },
  {
    q: "Does Vercel create preview deployments automatically?",
    a: "Yes. Every branch push and pull request gets its own preview URL (e.g. my-app-git-feature-xyz-username.vercel.app). The preview inherits your Preview environment variables, not Production ones — which is exactly what you want for staging databases and test API keys.",
  },
  {
    q: "What's the difference between Vercel and self-hosting Next.js?",
    a: "Vercel is the zero-config path: push to git, done. Self-hosting (on a VPS, Docker, or AWS) gives you more control over infrastructure costs and data residency, but requires you to manage Node.js process management, reverse proxies (nginx), SSL renewal, and scaling. For most projects, Vercel is the right default choice — switch to self-hosting only when Vercel's pricing or data residency requirements become a constraint.",
  },
];

const gotchas = [
  {
    title: "Missing env vars = silent runtime failures",
    desc: "Vercel builds succeed even when required env vars are missing — the error only shows at request time. Always check the Deployments → Runtime Logs tab after each deploy.",
  },
  {
    title: "process.env changes need a redeploy",
    desc: "Unlike code changes, editing env vars in the Vercel dashboard doesn't auto-deploy. Go to Deployments, find your latest build, and click Redeploy (without clearing cache) to pick up the new values.",
  },
  {
    title: "Hobby plan has a 10-second serverless timeout",
    desc: "Serverless functions on the Hobby plan time out after 10 seconds. If you have long-running API routes (AI completions, PDF exports, large DB queries), upgrade to Pro (60s limit) or move them to Edge Functions / background tasks.",
  },
  {
    title: "Large node_modules bloat build time",
    desc: "Vercel caches node_modules between builds, but the initial build for a heavy project can be slow. Use package imports (barrel shaking) and audit heavy dependencies — a 50 MB node_modules is often avoidable.",
  },
];

export default function NextjsVercelGuidePage() {
  const base = siteConfig.url;
  const url = `${base}/nextjs-vercel-guide`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Deploy Next.js to Vercel",
    description:
      "Deploy a Next.js application to Vercel in 5 steps: create the app, push to GitHub, import to Vercel, configure environment variables, and connect a custom domain.",
    totalTime: "PT15M",
    tool: [
      { "@type": "HowToTool", name: "Next.js" },
      { "@type": "HowToTool", name: "Vercel" },
      { "@type": "HowToTool", name: "GitHub" },
      { "@type": "HowToTool", name: "Node.js" },
    ],
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      position: s.number,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "How to Deploy Next.js to Vercel", item: url },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Deploy Next.js to Vercel: Step-by-Step Guide (2026)",
    description:
      "Deploy your Next.js app to Vercel in 15 minutes. Step-by-step: create app, push to GitHub, import to Vercel, configure env vars, connect custom domain.",
    url,
    datePublished: "2026-05-13",
    dateModified: "2026-05-13",
    author: {
      "@type": "Person",
      name: "Smit Parekh",
      url: base,
    },
    publisher: {
      "@type": "Person",
      name: "Smit Parekh",
      url: base,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
    keywords: "next.js, vercel, deployment, step by step, 2026",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-12 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        <div className="page-container relative max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Deploy Next.js to Vercel</span>
          </nav>
          <Badge variant="secondary" className="bg-white/15 text-white border-white/30 backdrop-blur-sm mb-4">
            Step-by-Step Guide · 2026
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            How to Deploy Next.js<br className="hidden sm:block" /> to Vercel
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed">
            From a fresh Next.js app to a live production URL in 15 minutes.
            Covers GitHub import, environment variables, custom domains, preview
            deployments, and the gotchas that trip up most developers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "App Router compatible",
              "Next.js 15 / 16",
              "Free Hobby plan",
              "Zero-config CI/CD",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs text-white/90 bg-white/15 border border-white/20 rounded-full px-3 py-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="page-section">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">The Process</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              5 steps to deploy Next.js on Vercel
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Each step takes 2–5 minutes. The whole process is under 15 minutes on your first deployment.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex gap-5 sm:gap-6"
                >
                  {/* connector line */}
                  {step.number < steps.length && (
                    <div
                      className="absolute left-6 top-14 w-px bg-border"
                      style={{ height: "calc(100% + 2rem)" }}
                      aria-hidden
                    />
                  )}
                  {/* step number */}
                  <div className="shrink-0 relative z-10">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", step.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold">
                        Step {step.number}: {step.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">{step.badge}</Badge>
                    </div>
                    {step.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Gotchas */}
      <section className="page-section bg-muted/20">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">Watch Out</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              4 gotchas that catch developers off-guard
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Things Vercel&apos;s docs don&apos;t always make obvious until you&apos;ve hit them in production.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gotchas.map((g) => (
              <div key={g.title} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-3 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <h3 className="font-semibold text-foreground leading-snug">{g.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related reading */}
      <section className="page-section bg-muted/20">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Go Deeper</p>
            <h2 className="text-2xl font-bold tracking-tight">
              Related guides on this site
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                href: "/production-nextjs",
                title: "Production Next.js Architecture Guide",
                desc: "The full checklist: App Router patterns, ISR, security headers, Core Web Vitals, and structured data — everything beyond the deploy step.",
                badge: "Best Practices",
              },
              {
                href: "/blog/deploy-nextjs-on-vercel-in-2026-a-beginners-guide",
                title: "Deploy Next.js on Vercel: A Beginner's Narrative",
                desc: "Longer narrative walkthrough of the full Vercel setup, from zero to a monitored production deployment with analytics.",
                badge: "Blog Post",
              },
              {
                href: "/nextjs-developer",
                title: "Hire a Next.js Developer",
                desc: "Need someone to handle the architecture, deployment pipeline, and production setup for you? Let's talk.",
                badge: "Services",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <Badge variant="secondary" className="self-start text-xs">{card.badge}</Badge>
                <h3 className="font-bold leading-snug group-hover:text-blue-500 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-blue-500 font-medium mt-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
            <ExternalLink className="w-3.5 h-3.5" />
            Need help with your deployment?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Skip the setup — hire a Next.js developer
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
            I set up production-grade Next.js apps on Vercel every week: zero-config
            CI/CD, preview deployments, TypeScript strict, 95+ Lighthouse, structured
            data, and monitoring from day one. Free quote in 24 hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/nextjs-developer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Hire a Next.js Developer
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              Get a Free Quote
            </Link>
            <BookCallButton size="lg" variant="outline" label="Book a 15-min call" className="gap-2" />
          </div>
        </div>
      </section>
    </>
  );
}

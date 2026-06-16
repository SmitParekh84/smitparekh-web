import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Cloud, ShieldCheck, Zap,
  TrendingUp, Server, Database, Star, Clock, BarChart3, Code2,
} from "lucide-react";
import { SiDocker, SiNodedotjs, SiPostgresql } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields, aggregateRatingSchema } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire an AWS Developer - Architecture, Serverless & DevOps",
  description:
    "Hire an AWS developer experienced across EC2, RDS, S3, Lambda, CloudFront, ECS, and CDK. CI/CD pipelines, zero-downtime deploys, 99.9% uptime.",
  alternates: { canonical: `${siteConfig.url}/aws-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/aws-developer`,
    siteName: siteConfig.name,
    title: "Hire an AWS Developer - Production Cloud Architecture | Smit Parekh",
    description:
      "AWS cloud architecture, serverless, CI/CD, and zero-downtime deploys. 99.9% uptime across deployed projects. Serving clients worldwide.",
    images: [{ url: `${siteConfig.url}/images/hire-aws-developer.png`, width: 1200, height: 630, alt: "Hire an AWS Developer - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire an AWS Developer - 99.9% Uptime | Smit Parekh",
    description: "AWS cloud architecture, serverless APIs, CI/CD pipelines. Free architecture review in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-aws-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire AWS developer", "AWS developer for hire", "freelance AWS developer",
    "AWS cloud architect", "AWS developer UK", "AWS developer Canada", "AWS developer USA",
    "remote AWS developer", "AWS Lambda developer", "serverless AWS developer",
    "AWS EC2 developer", "AWS RDS developer", "AWS CDK developer",
    "DevOps AWS developer", "cloud infrastructure developer", "AWS DevOps engineer",
    "hire cloud developer", "AWS certified developer", "AWS Node.js developer",
  ],
};

const results = [
  { value: "99.9%", label: "Uptime target maintained across all AWS-deployed production services", icon: TrendingUp },
  { value: "~40%", label: "Average AWS cost reduction achieved on first infrastructure review", icon: BarChart3 },
  { value: "<5min", label: "Median deploy time after CI/CD pipeline setup with GitHub Actions", icon: Clock },
  { value: "0", label: "Production credential leaks after secrets migration to AWS Secrets Manager", icon: ShieldCheck },
];

const whatIBuild = [
  {
    icon: Server,
    title: "EC2 & ECS Production Infrastructure",
    description:
      "VPCs with public/private subnets, auto-scaling groups, Application Load Balancers, and containerised workloads on ECS Fargate. Built with Terraform or AWS CDK so it's version-controlled, reproducible, and not held together with hope.",
    tags: ["EC2", "ECS Fargate", "ALB", "VPC"],
  },
  {
    icon: Zap,
    title: "Serverless APIs with Lambda",
    description:
      "Event-driven Lambda functions, API Gateway with custom authorisers, SQS/SNS queues, and DynamoDB for low-latency lookups. Cold-start optimised, typed with TypeScript, and wired to CloudWatch for observability.",
    tags: ["Lambda", "API Gateway", "SQS", "DynamoDB"],
  },
  {
    icon: Database,
    title: "Managed Databases - RDS & Aurora",
    description:
      "PostgreSQL on RDS or Aurora Serverless v2 - Multi-AZ for production, read replicas for reporting workloads, automated backups, and parameter group tuning for sub-100ms query times.",
    tags: ["RDS", "Aurora", "PostgreSQL", "Multi-AZ"],
  },
  {
    icon: Cloud,
    title: "CDN & Static Assets with CloudFront + S3",
    description:
      "CloudFront distributions in front of S3 origins, Lambda@Edge for request manipulation, OAC bucket policies, cache policies per content type, and signed URLs for private media.",
    tags: ["CloudFront", "S3", "Lambda@Edge", "OAC"],
  },
  {
    icon: Code2,
    title: "Infrastructure as Code with CDK & Terraform",
    description:
      "Every resource in code - no manual console clicks, no config drift. AWS CDK for TypeScript-first shops, Terraform for multi-cloud or greenfield infra. Environments are reproducible and team-reviewable.",
    tags: ["AWS CDK", "Terraform", "GitHub Actions", "IaC"],
  },
  {
    icon: BarChart3,
    title: "Observability - CloudWatch, Alarms & Dashboards",
    description:
      "Structured JSON logs, CloudWatch metric filters, composite alarms on p95 latency and error rates, and SNS alerts to Slack or PagerDuty. You know something is wrong before your users do.",
    tags: ["CloudWatch", "X-Ray", "SNS", "Sentry"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "Everything in code - no console cowboys",
    description:
      "I don't click around the AWS console and call it done. Every resource is Terraform or CDK, every change is a pull request, and every environment can be torn down and rebuilt in minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Security as a first-class requirement",
    description:
      "Least-privilege IAM roles, secrets in Secrets Manager (never env vars), VPC isolation, Security Groups as allowlists, and dependency scanning in CI. The boring stuff that prevents the 3am call.",
  },
  {
    icon: BarChart3,
    title: "Cost-aware architecture from day one",
    description:
      "Right-sizing matters. Reserved instances for steady-state workloads, Spot for batch, S3 lifecycle policies, and CloudFront to cut data transfer. Most projects reduce their AWS bill 30-50% in the first review.",
  },
  {
    icon: TrendingUp,
    title: "Full-stack context - not just infrastructure",
    description:
      "I'm also a backend and frontend developer. That means the infrastructure I design matches how the application actually behaves - no hand-off gap between dev and ops.",
  },
];

const techStack = [
  { name: "AWS EC2 / ECS", Icon: FaAws },
  { name: "Lambda / API GW", Icon: FaAws },
  { name: "RDS / Aurora", Icon: FaAws },
  { name: "Docker", Icon: SiDocker },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
];

const faqs = [
  {
    q: "Are you AWS certified?",
    a: "I work with AWS daily in production and have deep hands-on experience across the core services. I prioritise real-world delivery over certification badges - though I'm in the process of formalising that with the SAA exam.",
  },
  {
    q: "Can you migrate our existing infrastructure to AWS?",
    a: "Yes. I start with a discovery audit of your current setup, produce a migration plan with a risk-ranked change order, and run migrations environment-by-environment with zero-downtime cutovers where possible.",
  },
  {
    q: "Terraform or CDK - which do you recommend?",
    a: "CDK when your team is primarily TypeScript/JavaScript - you get type safety and reuse patterns from the language you already know. Terraform when you need multi-cloud flexibility or have existing Terraform state. Both are fine choices; I've shipped production infra with each.",
  },
  {
    q: "Can you reduce our AWS bill without breaking anything?",
    a: "Usually yes, significantly. Common wins: over-provisioned EC2 instances, missing lifecycle policies on S3 and RDS snapshots, CloudFront not in front of S3, and Lambda functions with default 1GB memory when 256MB is enough. Most audits find 30-50% in recoverable spend.",
  },
  {
    q: "Do you handle the deployment pipeline as well?",
    a: "Yes - GitHub Actions CI/CD, Docker builds, ECR pushes, and ECS/Lambda deploys are all part of the setup. Preview environments per PR and a production deploy gate on passing tests are the standard configuration.",
  },
  {
    q: "How long does a typical AWS infrastructure setup take?",
    a: "A basic setup - VPC, EC2/ECS, RDS, S3, CloudFront, and CI/CD - runs 1-2 weeks. A full production-grade infra with multiple environments, monitoring, alerting, and IaC takes 2-4 weeks. Complex multi-region or multi-account setups are scoped per engagement.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AWS Developer for Hire",
  provider: personNode(),
  serviceType: "AWS Cloud Architecture & DevOps",
  description: "Freelance AWS developer with production experience across EC2, RDS, Lambda, ECS, CDK, and Terraform. CI/CD pipelines, 99.9% uptime, cost optimisation, and zero-downtime deploys.",
  url: `${siteConfig.url}/aws-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price and retainer engagements. Free architecture review within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Hire an AWS Developer", item: `${siteConfig.url}/aws-developer` },
  ],
};

export default function AwsDeveloperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema()) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <FaAws className="w-4 h-4" />
                AWS Cloud · DevOps · Infrastructure as Code
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                AWS Infrastructure{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Built to Scale
                </span>{" "}
                Without Surprises
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Most cloud outages trace back to infrastructure that was clicked together, not coded.
                I build AWS environments in CDK or Terraform - version-controlled, reproducible,
                and monitored before they go live.
              </p>

              <ul className="space-y-2.5">
                {[
                  "99.9% uptime across all deployed production services",
                  "Everything in code - AWS CDK or Terraform, no console cowboys",
                  "~40% average cost reduction on first infrastructure review",
                  "CI/CD pipelines with auto-rollback on test failure",
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
                  Get a Free Architecture Review
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services/devops-consulting"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 gap-2")}
                >
                  DevOps Services
                </Link>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/50">
                No commitment to enquire · Reply within 24 hours · Worldwide
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
            label="AWS Expertise"
            title="What I Build on AWS"
            description="Production infrastructure that holds up when traffic spikes, engineers leave, and requirements change."
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
            title="The Difference Between AWS Experience and AWS Discipline"
            description="Anyone can spin up an EC2 instance. The gap shows when the team grows, traffic spikes, and the bill arrives."
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

      <RelatedDeveloperPages currentSlug="aws-developer" />

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
                <span className="text-sm font-medium">Available for AWS projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire an AWS developer who ships to production?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply with a free architecture review or a written proposal - scope, timeline, and price - within 24 hours.
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
                  href="/services/devops-consulting"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 gap-2")}
                >
                  See DevOps Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

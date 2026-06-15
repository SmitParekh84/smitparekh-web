import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  Star,
  Code2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  {
    icon: Code2,
    label: "30+ production apps shipped",
    sub: "FinTech, SaaS, AI startups & e-commerce",
  },
  {
    icon: Zap,
    label: "95+ Lighthouse scores, guaranteed",
    sub: "Performance baked in from day one",
  },
  {
    icon: ShieldCheck,
    label: "AWS Certified Solutions Architect",
    sub: "Infrastructure decisions you can trust",
  },
  {
    icon: Star,
    label: "Direct, async-first communication",
    sub: "You talk to who writes every line of code",
  },
] as const;

const STACK_LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Tailwind CSS",
  "Docker",
];

export function ServiceMeetDeveloper() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo column */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-sky-500/10 to-cyan-400/20 blur-2xl" />
              <Image
                src="/images/smit-parekh-about-full-stack-developer.png"
                alt="Smit Parekh — Full-Stack Web Developer based in Gujarat, India"
                width={480}
                height={560}
                sizes="(max-width: 768px) 90vw, 480px"
                className="relative rounded-3xl object-cover w-full shadow-xl shadow-blue-500/10 ring-1 ring-border"
                priority={false}
              />
              {/* floating badge */}
              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-lg">
                <BadgeCheck className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold leading-tight">AWS Certified</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    Solutions Architect
                  </p>
                </div>
              </div>
              {/* location badge */}
              <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-md text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-blue-500" />
                Gujarat, India · available worldwide
              </div>
            </div>
          </div>

          {/* Content column */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Who you&apos;ll work with
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              I&apos;m Smit Parekh — a full-stack developer who writes{" "}
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                every single line of your code
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              With 4+ years of experience shipping production systems for FinTech, SaaS, and
              AI startups, I work as a senior individual contributor — no juniors on your
              project, no account managers between you and the work. Every commit, every
              architecture decision, every deployment lands on my machine first.
            </p>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              I specialise in the TypeScript ecosystem — React & Next.js on the frontend,
              Node.js / NestJS on the backend, PostgreSQL for data, and AWS for infrastructure.
              I&apos;ve built headless e-commerce stores, multi-tenant SaaS platforms, real-time
              dashboards, AI-powered tools, and performance-first marketing sites. The common
              thread: clean code, zero tech-debt handover docs, and measurable business results.
            </p>

            {/* Highlights grid */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-tight">{label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-tight">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Stack chips */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                My daily stack
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK_LABELS.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5"
                )}
              >
                Full story
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5"
                )}
              >
                See past work
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="#start"
                className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
              >
                Work with me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

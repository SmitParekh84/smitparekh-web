"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Workflow,
  Boxes,
  Network,
  GitBranch,
  Check,
  BadgeCheck,
  Package,
  Zap,
  Star,
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiExpress, SiPython, SiGraphql,
  SiPostgresql, SiMongodb, SiSupabase, SiRedis, SiElasticsearch,
  SiApachekafka, SiRabbitmq, SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { homeData, aboutStats } from "@/data/home";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
  UpworkIcon,
  WebsiteIcon,
} from "@/components/icons/SocialIcons";
import { GridGlowBackground } from "@/components/ui/GridGlowBackground";

const socialIcons = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  x: XIcon,
  upwork: UpworkIcon,
  marketixpert: WebsiteIcon,
} as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// NOTE: no `opacity` in these variants on purpose. Framer Motion serializes
// the `hidden` state into the SSR HTML; an opacity:0 hero means FCP/LCP can't
// fire until JS hydrates and animates it in (was costing ~4s FCP / ~9s LCP in
// field data). Animating transform-only keeps the entrance while letting the
// above-the-fold content paint immediately on the server.
const item = {
  hidden: { y: 24 },
  visible: { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const imageVariant = {
  hidden: { scale: 0.92 },
  visible: {
    scale: 1,
    transition: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const floatCard = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay, type: "spring" as const, stiffness: 200, damping: 20 },
  },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center  overflow-hidden ">
      <GridGlowBackground />
      <div className="page-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Availability + scarcity */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/70 backdrop-blur text-sm font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available now · 1 project slot open this month
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05]"
              variants={item}
            >
              Ship your product with{" "}
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                one senior developer
              </span>
              , not a slow agency.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={item}
            >
              I build and ship production web apps end-to-end — React &amp; Next.js front end,
              Node/NestJS APIs, PostgreSQL, and AWS. One engineer who owns the whole stack, for
              founders across the Gulf, US, UK &amp; India.
            </motion.p>

            {/* Trust ticks */}
            <motion.ul
              className="mt-5 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 list-none p-0"
              variants={item}
            >
              {[
                "10+ production apps shipped",
                "95+ Lighthouse, real data",
                "Written quote in 24 hours",
              ].map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80"
                >
                  <Check className="h-4 w-4 text-blue-500 shrink-0" />
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div className="mt-7 flex flex-col gap-3" variants={item}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 border-0 bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25 hover:opacity-95 hover:shadow-blue-500/40"
                  )}
                >
                  Get a free quote in 24h
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
                >
                  <Briefcase className="w-4 h-4" />
                  See my work
                </Link>
              </div>
              <p className="text-xs text-muted-foreground text-center lg:text-left">
                No commitment to enquire · You talk to the person who writes every line of code.
              </p>
            </motion.div>

            {/* Social proof */}
            {/* <motion.div
              className="mt-7 flex items-center justify-center lg:justify-start gap-3.5"
              variants={item}
            >
              <div className="flex">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="-ml-2 first:ml-0 h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br from-blue-200 to-cyan-100 dark:from-blue-500/40 dark:to-cyan-400/30"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  <span className="font-semibold text-foreground">Rated 5.0</span> · trusted by
                  founders in FinTech, SaaS &amp; e-commerce
                </p>
              </div>
            </motion.div> */}

            {/* Social links */}
            <motion.div
              className="mt-6 flex items-center justify-center lg:justify-start gap-4"
              variants={item}
            >
              {homeData.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                const isEmail = social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Photo + results combo */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Brand halo */}
              <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-blue-500/20 via-sky-500/10 to-cyan-400/20 blur-2xl" />

              {/* AWS certification badge */}
              <motion.div
                className="absolute -top-4 right-6 z-20 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-lg text-xs font-semibold"
                variants={floatCard(0.5)}
                initial="hidden"
                animate="visible"
              >
                <BadgeCheck className="h-4 w-4 text-cyan-400" />
                AWS Certified · Solutions Architect
              </motion.div>

              {/* Photo */}
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-muted shadow-2xl"
                variants={imageVariant}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={homeData.imageSrc}
                  alt="Smit Parekh — Full-Stack Developer"
                  fill
                  sizes="(max-width: 640px) 90vw, 380px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Floating proof chips */}
              <motion.div
                className="absolute top-8 -left-5 sm:-left-8 z-20 flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 backdrop-blur px-3.5 py-2.5 shadow-xl"
                variants={floatCard(0.6)}
                initial="hidden"
                animate="visible"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                  <Package className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-none">10+</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Apps shipped</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-24 -right-4 sm:-right-8 z-20 flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 backdrop-blur px-3.5 py-2.5 shadow-xl"
                variants={floatCard(0.75)}
                initial="hidden"
                animate="visible"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-none">95+</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Lighthouse score</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 left-6 z-20 flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 backdrop-blur px-3.5 py-2.5 shadow-xl"
                variants={floatCard(0.9)}
                initial="hidden"
                animate="visible"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                  <Star className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-none">{aboutStats.years}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">In production</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-medium">
            Tech Stack
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {(() => {
              const heroTech: { name: string; Icon: React.ComponentType<{ className?: string }> }[] = [
                { name: "React", Icon: SiReact },
                { name: "Next.js", Icon: SiNextdotjs },
                { name: "TypeScript", Icon: SiTypescript },
                { name: "Tailwind CSS", Icon: SiTailwindcss },
                { name: "Node.js", Icon: SiNodedotjs },
                { name: "NestJS", Icon: SiNestjs },
                { name: "Express", Icon: SiExpress },
                { name: "Python", Icon: SiPython },
                { name: "GraphQL", Icon: SiGraphql },
                { name: "REST APIs", Icon: Network },
                { name: "Microservices", Icon: Boxes },
                { name: "Event-Driven Architecture", Icon: Workflow },
                { name: "PostgreSQL", Icon: SiPostgresql },
                { name: "MongoDB", Icon: SiMongodb },
                { name: "Supabase", Icon: SiSupabase },
                { name: "Redis", Icon: SiRedis },
                { name: "Elasticsearch", Icon: SiElasticsearch },
                { name: "Kafka", Icon: SiApachekafka },
                { name: "RabbitMQ", Icon: SiRabbitmq },
                { name: "AWS", Icon: FaAws },
                { name: "Docker", Icon: SiDocker },
                { name: "CI/CD", Icon: GitBranch },
              ];
              const chipClass =
                "inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium";
              return (
                <div className="flex w-max animate-marquee">
                  <ul className="flex shrink-0 gap-2 sm:gap-3 pr-2 sm:pr-3 list-none m-0 p-0">
                    {heroTech.map(({ name, Icon }, i) => (
                      <li key={`hero-tech-a-${i}`} className={chipClass}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500/90 shrink-0" />
                        {name}
                      </li>
                    ))}
                  </ul>
                  <ul
                    aria-hidden="true"
                    className="flex shrink-0 gap-2 sm:gap-3 pr-2 sm:pr-3 list-none m-0 p-0"
                  >
                    {heroTech.map(({ name, Icon }, i) => (
                      <li key={`hero-tech-b-${i}`} className={chipClass}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500/90 shrink-0" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

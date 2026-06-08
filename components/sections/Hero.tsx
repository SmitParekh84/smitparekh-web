"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Workflow, Boxes, Network, GitBranch, Wrench } from "lucide-react";
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
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useTrackResumeEvent } from "@/hooks/api/use-resume-events";

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
  visible: { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

const imageVariant = {
  hidden: { scale: 0.92 },
  visible: {
    scale: 1,
    transition: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as any },
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
  const trackResumeEvent = useTrackResumeEvent();

  return (
    <AuroraBackground as="section" className="min-h-screen flex items-center pt-16">
      <div className="page-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-6 text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                Available for new projects
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight"
              variants={item}
            >
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                Hi, I&apos;m
              </span>{" "}
              Smit Parekh
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg font-medium text-primary/90 leading-relaxed"
              variants={item}
            >
              {homeData.subtitle}
            </motion.p>

            <motion.p
              className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto lg:mx-0"
              variants={item}
            >
              {homeData.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3 pt-1"
              variants={item}
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                >
                  Let&apos;s Work Together
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2"
                  )}
                >
                  <Briefcase className="w-4 h-4" />
                  See My Work
                </Link>
              </div>
              <p className="text-xs text-muted-foreground text-center lg:text-left">
                <Link
                  href="/free-tools"
                  onClick={() => trackResumeEvent.mutate("button_click")}
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Wrench className="w-3 h-3" />
                  Or try 14 free online tools — no account needed
                </Link>
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-4 pt-1"
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

          {/* Right: Image + Stats */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <motion.div
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-border bg-muted shadow-2xl"
                variants={imageVariant}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={homeData.imageSrc}
                  alt="Smit Parekh - Full Stack Developer"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-6 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl"
                variants={floatCard(0.6)}
                initial="hidden"
                animate="visible"
              >
                <p className="text-2xl font-bold leading-none">{aboutStats.years}</p>
                <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
              </motion.div>

              <motion.div
                className="absolute -top-5 -right-6 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl"
                variants={floatCard(0.75)}
                initial="hidden"
                animate="visible"
              >
                <p className="text-2xl font-bold leading-none">{aboutStats.certifications}</p>
                <p className="text-xs text-muted-foreground mt-1">Certifications</p>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -right-10 hidden lg:block bg-card border border-border rounded-2xl px-4 py-3 shadow-xl"
                variants={floatCard(0.9)}
                initial="hidden"
                animate="visible"
              >
                <p className="text-2xl font-bold leading-none">{aboutStats.companies}</p>
                <p className="text-xs text-muted-foreground mt-1">Clients</p>
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
    </AuroraBackground>
  );
}

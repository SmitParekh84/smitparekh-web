"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { homeData, aboutStats, cvLink } from "@/data/home";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "@/components/icons/SocialIcons";
import { AuroraBackground } from "@/components/ui/aurora-background";

const socialIcons = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  x: XIcon,
} as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
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
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1"
              variants={item}
            >
              <Link
                href="/free-tools"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Explore Free Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2"
                )}
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
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
                <p className="text-xs text-muted-foreground mt-1">Companies</p>
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
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 1.0 } },
            }}
          >
            {[
              // Frontend
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              // Backend
              "Node.js",
              "NestJS",
              "Express",
              "Python",
              "GraphQL",
              "REST APIs",
              "Microservices",
              "Event-Driven Architecture",
              // Data
              "PostgreSQL",
              "MongoDB",
              "Redis",
              "Elasticsearch",
              "Kafka",
              "RabbitMQ",
              // AWS
              "AWS EC2",
              "AWS S3",
              "AWS Lambda",
              "AWS RDS",
              "AWS ECS",
              "AWS CloudFront",
              "AWS API Gateway",
              "AWS SQS",
              "AWS SNS",
              "AWS CloudWatch",
              "AWS IAM",
              // DevOps
              "Docker",
              "Kubernetes",
              "Terraform",
              "GitHub Actions",
              "CI/CD",
            ].map(
              (tech) => (
                <motion.div
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                  }}
                >
                  <Badge variant="secondary" className="text-xs px-3 py-1">
                    {tech}
                  </Badge>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}

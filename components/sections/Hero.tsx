import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
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

export default function Hero() {
  return (
    <AuroraBackground as="section" className="min-h-screen flex items-center pt-16">
      <div className="page-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              Available for new projects
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                Hi, I&apos;m
              </span>{" "}
              Smit Parekh
            </h1>

            <p className="text-base sm:text-lg font-medium text-primary/90 leading-relaxed">
              {homeData.subtitle}
            </p>

            <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              {homeData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
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
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
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
            </div>
          </div>

          {/* Right: Image + Stats */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-border bg-muted shadow-2xl">
                <Image
                  src={homeData.imageSrc}
                  alt="Smit Parekh — Full Stack Developer"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -bottom-5 -left-6 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-2xl font-bold leading-none">
                  {aboutStats.years}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Years Experience
                </p>
              </div>

              <div className="absolute -top-5 -right-6 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-2xl font-bold leading-none">
                  {aboutStats.certifications}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Certifications
                </p>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-10 hidden lg:block bg-card border border-border rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-2xl font-bold leading-none">
                  {aboutStats.companies}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Companies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-16 lg:mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-medium">
            Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "React",
              "Node.js",
              "TypeScript",
              "PostgreSQL",
              "AWS",
              "Docker",
              "Next.js",
              "NestJS",
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}

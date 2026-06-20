import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { footerData, type SocialPlatform } from "@/data/footer";
import { siteConfig } from "@/data/site";
import { developerPages } from "@/data/developer-pages";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  MailIcon,
  UpworkIcon,
} from "@/components/icons/SocialIcons";

const socialIcons: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  instagram: InstagramIcon,
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  upwork: UpworkIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Top accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,40,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[72rem] h-[22rem] rounded-full bg-blue-500/6 blur-3xl"
        aria-hidden
      />

      <div className="page-container py-14 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image
                src="/Smit-Logo.svg"
                alt="Smit Parekh"
                width={32}
                height={32}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-bold text-lg tracking-tight group-hover:text-blue-500 transition-colors">
                {footerData.title}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {footerData.subtitle}. Building production-grade web apps with
              React, Next.js, Node.js &amp; TypeScript.
            </p>

            <div className="flex flex-col gap-2 pt-1 text-sm text-muted-foreground">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                {siteConfig.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Available worldwide - remote
              </span>
            </div>

            {/* Status pill */}
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                siteConfig.availability.accepting
                  ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
              }`}
            >
              <span className="relative flex h-2 w-2">
                {siteConfig.availability.accepting && (
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"
                  />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    siteConfig.availability.accepting
                      ? "bg-green-500"
                      : "bg-amber-500"
                  }`}
                />
              </span>
              {siteConfig.availability.accepting
                ? "Available for new projects"
                : "Not currently available"}
            </div>

            <div className="flex gap-2 pt-1">
              {footerData.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                const isEmail = social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    className="grid place-items-center w-9 h-9 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue-500/50 hover:bg-blue-500/8 hover:scale-105 transition-all duration-150"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Mini CTA */}
            <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">
                Ready to build?
              </p>
              <p className="text-sm text-muted-foreground leading-snug mb-3">
                Let&apos;s turn your idea into a production-ready product.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors group"
              >
                Start a conversation
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Work With Me */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-blue-500">
              Work With Me
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/hire-me"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-150"
                >
                  Hire Me
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-150"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/for-students"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-150"
                >
                  For Students
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-150"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.social.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all"
                >
                  Upwork
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Free Tools */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-blue-500">
              Free Tools
            </h4>
            <ul className="space-y-2.5">
              {footerData.toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/free-tools"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:underline"
                >
                  View all tools
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        {/* HTML sitemap - internal links from every page boost crawl + ranking
            for deep service pages that have no nav links. */}
        <nav aria-label="Site map" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-blue-500">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "/feedback", label: "Feedback" },
                { href: "/changelog", label: "Changelog" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 col-span-2 sm:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-blue-500">
              Hire as a Specialist
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {developerPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-blue-500">
              Engage
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hire-me" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hire Me
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/free-tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/for-students" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  For Students
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground/70 tracking-wide">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
            <Link
              href="/sitemap-html"
              className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              Site Map
            </Link>
            {footerData.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";

/**
 * Author / authority block shown in the left column of every service page,
 * beside the sticky lead form. Two jobs:
 *  1. UX — fills the vertical gap left by the tall sticky form so the column
 *     reads as balanced instead of empty below the "trusted by" chips.
 *  2. SEO / E-E-A-T — puts a real person, photo, and credentials on the page
 *     (Google rewards demonstrable authorship), plus internal links to
 *     /portfolio and /about that strengthen the page's quality signal.
 *
 * Facts here mirror the published Person schema on the homepage — no new
 * metrics are invented.
 */

const CREDENTIALS = [
  "AWS Certified Solutions Architect",
  "4+ years shipping production web apps",
  "20+ live systems across FinTech, SaaS & AI",
] as const;

export function ServiceAuthorBio() {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Image
            src="/images/Smit-Parekh-Home.png"
            alt="Smit Parekh — Full-Stack Web Developer"
            width={72}
            height={72}
            sizes="72px"
            className="h-16 w-16 rounded-2xl object-cover ring-1 ring-border bg-cream-100"
          />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-card">
            <BadgeCheck className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-semibold tracking-tight leading-tight">
            Smit Parekh
          </p>
          <p className="text-sm text-muted-foreground leading-tight">
            Full-Stack Developer
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            Gujarat, India · available worldwide
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        I&apos;m the only person who touches your code. You talk directly to the
        senior developer writing every line — no account managers, no juniors,
        no handoffs. React, Next.js, Node.js, TypeScript and PostgreSQL, end to
        end.
      </p>

      <ul className="mt-4 space-y-2">
        {CREDENTIALS.map((c) => (
          <li
            key={c}
            className="flex items-start gap-2 text-sm text-foreground/90"
          >
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          See my work
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link
          href="/about"
          className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          More about me
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

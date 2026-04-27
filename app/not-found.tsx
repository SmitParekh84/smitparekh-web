import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Home, Search, FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist or has been moved. Head back home or explore the rest of the site.",
  robots: { index: false, follow: true },
};

const popularLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/tools", label: "Free Tools" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="page-section pt-32 pb-24">
      <div className="page-container max-w-2xl text-center">
        <div className="rounded-2xl border border-border bg-card p-10 sm:p-14">
          <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileQuestion className="h-7 w-7" />
          </div>

          <p className="text-sm font-mono text-muted-foreground mb-2">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            This page wandered off
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            The link may be broken, the page might have moved, or the URL was
            mistyped. Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link href="/" className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
              <Home className="h-3.5 w-3.5" />
              Back to home
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5"
              )}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Report a broken link
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center justify-center gap-1.5">
              <Search className="h-3 w-3" />
              Popular destinations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-primary border border-border rounded-md px-3 py-1.5 hover:border-primary/40 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Col2Category {
  icon: LucideIcon;
  href: string;
  title: string;
  description: string;
  /** Optional chip list of services inside this subcategory */
  services?: { label: string; href?: string }[];
}

interface ServiceCol2LayoutProps {
  /** Badge text e.g. "4 service areas" */
  badge: string;
  heading: string;
  categories: Col2Category[];
}

/**
 * Col2 category card grid - hub-style exploratory layout.
 * Used by: /services/development, /services/marketing-and-seo, /services/products-and-ai
 *
 * Visual identity: large cards (p-7), gradient icon well, hover-reveal CTA row.
 * Changing this component updates all 3 Col2 pages simultaneously.
 */
export function ServiceCol2Layout({ badge, heading, categories }: ServiceCol2LayoutProps) {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="mx-auto max-w-xl text-center mb-10">
          <Badge variant="secondary" className="mb-3">{badge}</Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 hover:border-blue-500/40 hover:bg-blue-500/[0.03] hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
              >
                {/* icon + arrow row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-400/10 flex items-center justify-center shrink-0 ring-1 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground/20 mt-1 transition-all duration-200 group-hover:text-blue-500 group-hover:translate-x-1" />
                </div>
                {/* title + description */}
                <p className="text-base font-semibold text-foreground group-hover:text-blue-500 transition-colors mb-2">{cat.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cat.description}</p>
                {/* optional service chips */}
                {cat.services && cat.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cat.services.map((s) => (
                      <span
                        key={s.label}
                        className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground group-hover:border-blue-500/25 transition-colors"
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                )}
                {/* hover-reveal explore cta */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-500 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  Explore services <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

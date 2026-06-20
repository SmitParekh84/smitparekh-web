import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Col3Service {
  href: string;
  label: string;
  description: string;
  /** Per-item icon - if omitted, `sharedIcon` on the layout is used */
  icon?: LucideIcon;
  /** Optional accent badge (e.g. "Ready to use", "50% off") */
  badge?: string;
}

interface ServiceCol3LayoutProps {
  /** Badge text e.g. "7 services" */
  badge: string;
  heading: string;
  services: Col3Service[];
  /** Fallback icon used when a service has no per-item icon */
  sharedIcon?: LucideIcon;
}

/**
 * Col3 service card grid - compact, action-oriented layout.
 * Used by: web-ecommerce, frontend-performance, backend-apis, mobile-care,
 *           seo-services, ai-growth, ai-engineering, products-programs
 *
 * Visual identity: compact cards (p-5), small icon square, 2-3 col grid.
 * Changing this component updates all 8 Col3 pages simultaneously.
 */
export function ServiceCol3Layout({ badge, heading, services, sharedIcon }: ServiceCol3LayoutProps) {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="mx-auto max-w-xl text-center mb-10">
          <Badge variant="secondary" className="mb-3">{badge}</Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => {
            const Icon = s.icon ?? sharedIcon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-5 hover:border-blue-500/50 hover:bg-blue-500/[0.03] transition-all duration-200"
              >
                {/* icon row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    {Icon && (
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-blue-500" />
                      </div>
                    )}
                    {s.badge && (
                      <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-500 ring-1 ring-inset ring-cyan-400/20 whitespace-nowrap">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/25 shrink-0 transition-all duration-200 group-hover:text-blue-500 group-hover:translate-x-1" />
                </div>
                {/* text */}
                <p className="text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors mb-1">{s.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

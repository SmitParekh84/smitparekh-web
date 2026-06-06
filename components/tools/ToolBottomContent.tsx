import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getToolExtraContent } from "@/data/tools-extra-content";

interface Props {
  slug: string;
  toolName: string;
}

/**
 * Bottom-of-page content section for every free tool:
 *  - Unique long-form SEO prose where authored (data/tools-extra-content.ts)
 *  - A shared lead-generation CTA that turns free-tool traffic into inquiries
 *    for paid development / SEO work (rendered on ALL tool pages).
 */
export default function ToolBottomContent({ slug, toolName }: Props) {
  const extra = getToolExtraContent(slug);

  return (
    <section className="page-container pb-16">
      <div className="max-w-2xl mx-auto">
        {/* Unique SEO prose (only when authored for this tool) */}
        {extra && extra.sections.length > 0 && (
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2 text-center">
              Good to know
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
              More about {toolName}
            </h2>
            <div className="space-y-6">
              {extra.sections.map((s) => (
                <article
                  key={s.heading}
                  className="rounded-xl border border-border bg-card p-5 sm:p-6"
                >
                  <h3 className="font-semibold text-base mb-2">{s.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Lead-gen CTA — appears on every tool page */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-400/10 p-6 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-background/60 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Built &amp; maintained by Smit Parekh
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            This tool is free. Need something custom built?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            These tools are made and kept free by a full-stack developer who ships
            production web apps, internal tools, AI features, and SEO for founders and
            teams worldwide. If you need a custom tool, an automation, or a complete
            website or web app, get a free quote in 24 hours.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 font-semibold")}
            >
              Get a free quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              See services
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <Link href="/full-stack-ai-developer" className="hover:text-foreground transition-colors">
              Full-Stack AI Developer
            </Link>
            <span aria-hidden>·</span>
            <Link href="/ai-seo-consultant" className="hover:text-foreground transition-colors">
              SEO · AEO · GEO
            </Link>
            <span aria-hidden>·</span>
            <Link href="/portfolio" className="hover:text-foreground transition-colors">
              Case studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

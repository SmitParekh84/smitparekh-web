import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsSEO } from "@/data/tools-seo";

interface Props {
  relatedSlugs: string[];
}

export default function RelatedTools({ relatedSlugs }: Props) {
  const tools = relatedSlugs
    .map((slug) => toolsSEO.find((t) => t.slug === slug))
    .filter(Boolean) as (typeof toolsSEO)[0][];

  if (tools.length === 0) return null;

  return (
    <section className="page-container pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
            More Free Tools
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Related Tools</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const shortTitle = tool.title.split(" — ")[0];
            const shortDesc = tool.description.split(". ")[0] + ".";
            return (
              <Link
                key={tool.slug}
                href={`/free-tools/${tool.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-blue-500/40 transition-colors"
              >
                <p className="font-semibold text-sm mb-1.5 group-hover:text-blue-500 transition-colors">
                  {shortTitle}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {shortDesc}
                </p>
                <span className="mt-3 flex items-center gap-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it free <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

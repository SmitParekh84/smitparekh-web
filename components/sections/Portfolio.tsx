import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredProjects } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section className="page-section">
      <div className="page-container">
        <SectionHeader
          label="Selected Work"
          title="Real Products. Real Results."
          description="A sample of production applications built for clients across FinTech, SaaS, and enterprise — each solving a genuine business problem at scale."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div
                className={cn(
                  "h-40 bg-gradient-to-br flex items-end p-5",
                  project.gradient
                )}
              >
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                >
                  {project.category}
                </Badge>
              </div>

              <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-sm text-blue-500 font-medium mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 5).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 5 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 text-muted-foreground">
                      +{project.tags.length - 5}
                    </Badge>
                  )}
                </div>

                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors mt-auto"
                >
                  View Case Study
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

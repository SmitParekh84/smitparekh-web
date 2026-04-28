"use client";

import Link from "next/link";
import { ArrowRight, Eraser, PenLine, FileText, Globe, QrCode, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredTools } from "@/data/tools-showcase";
import { FadeInSection, StaggerGrid, StaggerItem } from "@/components/ui/motion";

const iconMap = {
  Eraser,
  PenLine,
  FileText,
  Globe,
  QrCode,
  Hash,
} as const;

type IconName = keyof typeof iconMap;

export default function FeaturedTools() {
  return (
    <section className="page-section bg-muted/20">
      <div className="page-container">
        <FadeInSection>
          <SectionHeader
            label="Free Tools"
            title="Free Tools Used by Thousands"
            description="Browser-based utilities that save hours of manual work - no account, no subscription, no catch."
          />
        </FadeInSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10" delay={0.05}>
          {featuredTools.map((tool) => {
            const Icon = iconMap[tool.iconName as IconName];
            return (
              <StaggerItem key={tool.slug}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-cyan-400/40 hover:shadow-lg h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-400/10 group-hover:bg-cyan-400/15 transition-colors">
                      {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div className="flex gap-1.5">
                      {tool.isPopular && (
                        <Badge className="text-[10px] px-2 py-0.5 bg-blue-500/15 text-blue-400 border-blue-500/20 hover:bg-blue-500/15">
                          Popular
                        </Badge>
                      )}
                      {tool.isNew && (
                        <Badge className="text-[10px] px-2 py-0.5 bg-cyan-400/15 text-cyan-400 border-cyan-400/20 hover:bg-cyan-400/15">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm leading-snug mb-1">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <Link
                    href={`/free-tools/${tool.slug}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5 text-xs mt-auto w-full justify-center"
                    )}
                  >
                    Use Free
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <FadeInSection className="text-center" delay={0.2}>
          <Link
            href="/free-tools"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            Browse All Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}

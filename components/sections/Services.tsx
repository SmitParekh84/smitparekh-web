"use client";

import {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Search,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/data/services";
import { FadeInSection, StaggerGrid, StaggerItem } from "@/components/ui/motion";

const iconMap = {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Search,
  Megaphone,
} as const;

export default function Services() {
  return (
    <section className="page-section">
      <div className="page-container">
        <FadeInSection>
          <SectionHeader
            label="Services"
            title="End-to-End Web Development"
            description="One partner for the full product lifecycle — no juggling multiple vendors, no gaps in ownership."
          />
        </FadeInSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10" delay={0.05}>
          {services.map((service) => {
            const Icon = iconMap[service.iconName];
            return (
              <StaggerItem key={service.title}>
                <div className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 h-full">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base leading-snug mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <ul className="space-y-1.5 mt-auto">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <FadeInSection className="text-center" delay={0.2}>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}

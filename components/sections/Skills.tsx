"use client";

import { PackageCheck, Layers, MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInSection, StaggerGrid, StaggerItem } from "@/components/ui/motion";

const values = [
  {
    icon: PackageCheck,
    title: "Production-Grade Delivery",
    description:
      "Every application is built to the standard of enterprise software - tested, documented, and architected to scale. Not a proof of concept. A product.",
  },
  {
    icon: Layers,
    title: "Full Ownership, Zero Hand-offs",
    description:
      "One point of contact from brief to deployment. Design, development, infrastructure, and support - handled end-to-end so nothing falls through the gaps.",
  },
  {
    icon: MessageSquare,
    title: "Clear Process, No Surprises",
    description:
      "Structured milestones, regular check-ins, and transparent progress updates throughout. You always know where the project stands.",
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "NestJS",
  "PostgreSQL", "MongoDB", "AWS", "Docker", "Redis",
  "Socket.io", "Tailwind CSS", "GraphQL", "REST APIs",
];

// Split into two rows for opposite-direction marquees
const row1 = techStack.slice(0, Math.ceil(techStack.length / 2));
const row2 = techStack.slice(Math.ceil(techStack.length / 2));

export default function Skills() {
  return (
    <section className="page-section bg-muted/20">
      <div className="page-container">
        <FadeInSection>
          <SectionHeader
            label="The Approach"
            title="What You Get Working With Me"
            description="The difference between a developer and a development partner."
          />
        </FadeInSection>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14" delay={0.05}>
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 h-full">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeInSection className="text-center" delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Technologies I Work With
          </p>

          {/* Marquee wrapper — overflow hidden + edge fade masks */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {/* Row 1 — scrolls left */}
            <div className="flex w-max gap-2 sm:gap-3 mb-2 sm:mb-3 animate-marquee">
              <ul className="flex shrink-0 gap-2 sm:gap-3 list-none m-0 p-0">
                {row1.map((tech, i) => (
                  <li
                    key={`r1-a-${i}`}
                    className="whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <ul
                aria-hidden="true"
                className="flex shrink-0 gap-2 sm:gap-3 list-none m-0 p-0"
              >
                {row1.map((tech, i) => (
                  <li
                    key={`r1-b-${i}`}
                    className="whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="flex w-max gap-2 sm:gap-3 animate-marquee-reverse">
              <ul className="flex shrink-0 gap-2 sm:gap-3 list-none m-0 p-0">
                {row2.map((tech, i) => (
                  <li
                    key={`r2-a-${i}`}
                    className="whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <ul
                aria-hidden="true"
                className="flex shrink-0 gap-2 sm:gap-3 list-none m-0 p-0"
              >
                {row2.map((tech, i) => (
                  <li
                    key={`r2-b-${i}`}
                    className="whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

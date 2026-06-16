"use client";

import { PackageCheck, Layers, MessageSquare, Code2, Server, Database, Cloud } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiPostgresql, SiMongodb,
  SiRedis, SiSocketdotio, SiGraphql, SiDocker, SiSupabase,
  SiVercel, SiNetlify,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInSection, StaggerGrid, StaggerItem } from "@/components/ui/motion";
import type { ComponentType } from "react";

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

type IconType = ComponentType<{ className?: string }>;

const techCategories: {
  label: string;
  Icon: IconType;
  accent: string;
  items: { name: string; Icon: IconType }[];
}[] = [
  {
    label: "Frontend",
    Icon: Code2,
    accent: "from-blue-500/20 to-blue-500/0 text-blue-500",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    label: "Backend",
    Icon: Server,
    accent: "from-emerald-500/20 to-emerald-500/0 text-emerald-500",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "Socket.io", Icon: SiSocketdotio },
    ],
  },
  {
    label: "Database",
    Icon: Database,
    accent: "from-purple-500/20 to-purple-500/0 text-purple-500",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Redis", Icon: SiRedis },
    ],
  },
  {
    label: "Cloud & DevOps",
    Icon: Cloud,
    accent: "from-amber-500/20 to-amber-500/0 text-amber-500",
    items: [
      { name: "AWS", Icon: FaAws },
      { name: "Vercel", Icon: SiVercel },
      { name: "Netlify", Icon: SiNetlify },
      { name: "Docker", Icon: SiDocker },
    ],
  },
];

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

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" delay={0.05}>
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

        <FadeInSection delay={0.08}>
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Built to a higher bar
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
              Fast by Default, Clean Under the Hood
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Perfect Lighthouse scores and strongly-typed, maintainable code aren&apos;t
              extras — they&apos;re the baseline on every build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-1 items-center justify-center">
                <Image
                  src="/images/home/performance.png"
                  alt="Lighthouse 100 scores — Performance, SEO, and Best Practices"
                  width={1200}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium">
                100/100 Core Web Vitals &amp; SEO
              </p>
            </div>
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-1 items-center justify-center">
                <Image
                  src="/images/home/code-window.png"
                  alt="Clean, strongly-typed React and TypeScript code"
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium">
                Typed, tested, production-ready code
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Technologies I Work With
            </p>
          </div>

          <StaggerGrid
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            delay={0.05}
          >
            {techCategories.map(({ label, Icon: CatIcon, accent, items }) => {
              const [gradientCls, textCls] = (() => {
                const parts = accent.split(" ");
                return [parts.slice(0, -1).join(" "), parts[parts.length - 1]];
              })();
              return (
                <StaggerItem key={label}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${gradientCls} opacity-60`}
                    />
                    <div className="relative flex items-center gap-2.5 mb-4">
                      <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-background/60 border border-border ${textCls}`}>
                        <CatIcon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-sm tracking-tight">
                        {label}
                      </h3>
                    </div>
                    <ul className="relative flex flex-col gap-1.5 list-none m-0 p-0">
                      {items.map(({ name, Icon }) => (
                        <li
                          key={name}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-foreground/85 transition-colors hover:bg-muted/50"
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${textCls}`} />
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </FadeInSection>
      </div>
    </section>
  );
}

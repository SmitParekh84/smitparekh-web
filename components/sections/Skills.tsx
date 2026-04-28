"use client";

import { PackageCheck, Layers, MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInSection, StaggerGrid, StaggerItem, motion } from "@/components/ui/motion";

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
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
            }}
          >
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 rounded-full border border-border bg-card text-sm text-foreground/80 font-medium"
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </FadeInSection>
      </div>
    </section>
  );
}

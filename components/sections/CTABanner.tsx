"use client";

import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FadeInSection } from "@/components/ui/motion";

export default function CTABanner() {
  return (
    <section className="page-section">
      <div className="page-container">
        <FadeInSection direction="none">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

            <div className="relative space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Start a Project
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Have a Project in Mind?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Most clients go from first message to scoped proposal within 48 hours.
                Tell me what you&apos;re building - let&apos;s see if we&apos;re a fit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold"
                  )}
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                  )}
                >
                  <Briefcase className="w-4 h-4" />
                  See Client Work
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { faqData } from "@/data/faq";
import { FadeInSection, StaggerGrid, StaggerItem } from "@/components/ui/motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="page-section bg-muted/70">
      <div className="page-container">
        <FadeInSection>
          <SectionHeader
            label="Common Questions"
            title="Everything You Need to Know"
            description="Straight answers before we get started."
          />
        </FadeInSection>

        <StaggerGrid className="max-w-3xl mx-auto space-y-3" delay={0.05}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={index}>
                <div
                  className={cn(
                    "rounded-xl border bg-card transition-colors",
                    isOpen ? "border-blue-500/40" : "border-border"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex items-center justify-between w-full px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-sm pr-4">{item.question}</span>
                    <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex"
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}

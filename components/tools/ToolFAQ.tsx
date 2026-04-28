"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ToolFAQItem } from "@/data/tools-faq";

interface Props {
  faqs: ToolFAQItem[];
  toolName: string;
}

export default function ToolFAQ({ faqs, toolName }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">FAQ</p>
          <h2 className="text-2xl font-bold tracking-tight">
            {toolName} - Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Everything you need to know before you start.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={cn(
                  "rounded-xl border bg-card transition-colors",
                  isOpen ? "border-blue-500/40" : "border-border"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm pr-4 leading-snug">{item.question}</span>
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as any }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

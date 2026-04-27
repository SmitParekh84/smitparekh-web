"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Are all these tools really free?",
    answer: "Yes — every tool is completely free, forever. No hidden fees, no trial periods, no credit card required. They're built as a public resource for developers, marketers, and professionals.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account, no signup, no email. Just open a tool and use it. Some tools (like the background remover) process your file on a server and return the result — nothing is stored after the request completes.",
  },
  {
    question: "What happens to my uploaded files?",
    answer: "Files uploaded for processing (images, resumes) are used only to generate the result and are deleted immediately after. Nothing is stored on disk or linked to any user profile.",
  },
  {
    question: "Can I use the results commercially?",
    answer: "Yes. The outputs — removed backgrounds, generated QR codes, compressed images, AI posts — can be used in personal and commercial projects without attribution.",
  },
  {
    question: "How accurate is the AI background remover?",
    answer: "The background remover uses the rembg model (u2net), which performs well on portraits, products, and objects with clear edges. For complex backgrounds or fine hair detail, results may vary — you can always run it again with a higher-contrast crop.",
  },
];

export default function FreeToolsFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-xl border bg-card transition-colors ${isOpen ? "border-blue-500/40" : "border-border"}`}
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
                  key="a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as any }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

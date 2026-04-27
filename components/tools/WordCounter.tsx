"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

function analyze(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const readingTime = Math.max(1, Math.ceil(words.length / 238));

  const freq: Record<string, number> = {};
  const stopwords = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","is","are","was","were","it","its","this","that","i","you","he","she","we","they","be","been","have","has","had","do","does","did","will","would","can","could","should","may","might","not"]);
  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    if (clean.length > 2 && !stopwords.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });

  const keywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({ word, count, density: ((count / words.length) * 100).toFixed(1) }));

  return { words: words.length, chars, charsNoSpace, sentences, paragraphs, readingTime, keywords };
}

const stats = [
  { key: "words", label: "Words" },
  { key: "chars", label: "Characters" },
  { key: "charsNoSpace", label: "No Spaces" },
  { key: "sentences", label: "Sentences" },
  { key: "paragraphs", label: "Paragraphs" },
  { key: "readingTime", label: "Read (min)" },
] as const;

export default function WordCounter() {
  const [text, setText] = useState("");
  const result = useMemo(() => analyze(text), [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        rows={8}
        className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm resize-y focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground leading-relaxed"
      />

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {stats.map(({ key, label }) => (
          <motion.div
            key={key}
            layout
            className="flex flex-col items-center rounded-xl border border-border bg-card p-3"
          >
            <span className="text-2xl font-bold text-blue-500 tabular-nums">
              {result[key]}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
          </motion.div>
        ))}
      </div>

      {result.keywords.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <p className="text-sm font-semibold">Keyword Density</p>
          </div>
          <div className="divide-y divide-border">
            {result.keywords.map(({ word, count, density }) => (
              <div key={word} className="flex items-center gap-3 px-4 py-2.5">
                <span className="text-sm font-medium w-32 truncate">{word}</span>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Number(density) * 10)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">
                  {count}× ({density}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {text && (
        <button
          onClick={() => setText("")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Clear text
        </button>
      )}
    </div>
  );
}

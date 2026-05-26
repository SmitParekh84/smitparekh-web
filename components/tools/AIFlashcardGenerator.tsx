"use client";

import { useState } from "react";
import { Loader2, Sparkles, Copy, Check, Download } from "lucide-react";
import { useGenerateFlashcards } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";
import type { FlashcardsResponse } from "@/lib/api";

const LEVELS = [
  { value: "high-school", label: "High school" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
] as const;

export default function AIFlashcardGenerator() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(20);
  const [level, setLevel] = useState<(typeof LEVELS)[number]["value"]>("undergraduate");
  const [result, setResult] = useState<FlashcardsResponse | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const mutation = useGenerateFlashcards();
  const { checkQuota, status } = useToolQuota("ai-flashcard-generator");

  const run = async () => {
    if (topic.trim().length < 3) return;
    const q = await checkQuota();
    if (!q.allowed) return setLoginOpen(true);
    mutation.mutate(
      { topic: topic.trim(), count, level },
      {
        onSuccess: (data) => {
          setResult(data);
          setRevealed({});
        },
        onError: () => toast.error("Generation failed", "Please try again."),
      },
    );
  };

  const downloadCsv = () => {
    if (!result) return;
    const csv = result.cards
      .map((c) => `"${c.front.replace(/"/g, '""')}","${c.back.replace(/"/g, '""')}"`)
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.topic.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-flashcards.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result.cards, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied", "Flashcards JSON copied.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Topic <span className="text-red-400">*</span>
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Krebs cycle, French Revolution causes, React hooks…"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">How many cards</label>
            <input
              type="number"
              min={5}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as typeof level)}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
            >
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={run}
          disabled={mutation.isPending || topic.trim().length < 3}
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate {count} flashcards
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">{result.cards.length} cards on {result.topic}</h3>
            <div className="flex gap-2">
              <button
                onClick={copyJson}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy JSON"}
              </button>
              <button
                onClick={downloadCsv}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5" /> Anki CSV
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {result.cards.map((c, i) => (
              <button
                key={i}
                onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                className="text-left rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 transition-colors min-h-[120px]"
              >
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {revealed[i] ? "Answer" : "Question"} · #{i + 1}
                </div>
                <p className="text-sm">{revealed[i] ? c.back : c.front}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <LoginGateModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        toolName="AI Flashcard Generator"
        returnTo="/free-tools/ai-flashcard-generator"
      />
    </div>
  );
}

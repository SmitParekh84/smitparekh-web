"use client";

import { useState } from "react";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { useParaphrase } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";
import type { ParaphraseResponse } from "@/lib/api";

const MODES = [
  { value: "academic", label: "Academic", hint: "essays, research" },
  { value: "formal", label: "Formal", hint: "reports, emails" },
  { value: "casual", label: "Casual", hint: "blogs, social" },
] as const;

export default function AIParaphraser() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<(typeof MODES)[number]["value"]>("academic");
  const [result, setResult] = useState<ParaphraseResponse | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const mutation = useParaphrase();
  const { checkQuota, status } = useToolQuota("ai-paraphraser");

  const run = async () => {
    if (text.trim().length < 20) {
      toast.error("Need more text", "Paste at least 20 characters to paraphrase.");
      return;
    }
    const q = await checkQuota();
    if (!q.allowed) return setLoginOpen(true);
    mutation.mutate(
      { text: text.trim(), mode },
      {
        onSuccess: (data) => {
          setResult(data);
          setActiveTab(0);
        },
        onError: () => toast.error("Generation failed", "Please try again."),
      },
    );
  };

  const copyVariant = async (idx: number) => {
    if (!result) return;
    await navigator.clipboard.writeText(result.variants[idx].text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
    toast.success("Copied", `${result.variants[idx].label} variant copied.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Original text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          maxLength={8000}
          placeholder="Paste a paragraph you'd like rewritten in your own words…"
          className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{text.length.toLocaleString()} / 8,000 characters</span>
          <span>{text.trim().split(/\s+/).filter(Boolean).length} words</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === m.value
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-border hover:border-blue-500/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
                <span className="ml-1.5 text-[10px] opacity-70">{m.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={run}
          disabled={mutation.isPending || text.trim().length < 20}
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Paraphrasing…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Paraphrase ({mode})
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="flex gap-1 border-b border-border overflow-x-auto">
            {result.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === i
                    ? "border-blue-500 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {result.variants[activeTab] && (
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {result.variants[activeTab].text}
                </p>
              </div>
              <button
                onClick={() => copyVariant(activeTab)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium"
              >
                {copiedIdx === activeTab ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIdx === activeTab ? "Copied" : "Copy this version"}
              </button>
            </div>
          )}

          {result.notes && (
            <p className="text-xs text-muted-foreground italic">{result.notes}</p>
          )}
        </div>
      )}

      <LoginGateModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        toolName="AI Paraphraser"
        returnTo="/free-tools/ai-paraphraser"
      />
    </div>
  );
}

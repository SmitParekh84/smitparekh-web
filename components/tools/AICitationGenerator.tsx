"use client";

import { useState } from "react";
import { Loader2, Sparkles, Copy, Check, AlertTriangle } from "lucide-react";
import { useGenerateCitation } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";
import type { CitationResponse } from "@/lib/api";

const STYLES = ["APA", "MLA", "Chicago", "Harvard", "IEEE"] as const;

export default function AICitationGenerator() {
  const [source, setSource] = useState("");
  const [style, setStyle] = useState<(typeof STYLES)[number]>("APA");
  const [result, setResult] = useState<CitationResponse | null>(null);
  const [copied, setCopied] = useState<"full" | "in-text" | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const mutation = useGenerateCitation();
  const { checkQuota, status } = useToolQuota("ai-citation-generator");

  const run = async () => {
    if (source.trim().length < 5) return;
    const q = await checkQuota();
    if (!q.allowed) return setLoginOpen(true);
    mutation.mutate(
      { source: source.trim(), citationStyle: style },
      {
        onSuccess: setResult,
        onError: () => toast.error("Generation failed", "Please try again."),
      },
    );
  };

  const copy = async (text: string, kind: "full" | "in-text") => {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 2000);
    toast.success("Copied", "Citation copied.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Source <span className="text-red-400">*</span>
          </label>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            rows={4}
            placeholder="Paste a URL, DOI, ISBN, or full reference details (author, title, publisher, year)…"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Citation style</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  style === s
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-border hover:border-blue-500/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={run}
          disabled={mutation.isPending || source.trim().length < 5}
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating citation…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate {style} citation
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between items-start gap-3">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Full reference ({result.style})
              </div>
              <button
                onClick={() => copy(result.citation, "full")}
                className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400"
              >
                {copied === "full" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied === "full" ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-sm leading-relaxed">{result.citation}</p>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between items-start gap-3">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                In-text citation
              </div>
              <button
                onClick={() => copy(result.inText, "in-text")}
                className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400"
              >
                {copied === "in-text" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied === "in-text" ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-sm leading-relaxed font-mono">{result.inText}</p>
          </div>

          {result.warnings.length > 0 && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Double-check before submitting
                  </p>
                  <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
                    {result.warnings.map((w, i) => (
                      <li key={i}>• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <LoginGateModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        toolName="AI Citation Generator"
        returnTo="/free-tools/ai-citation-generator"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { useBuildEssayOutline } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";
import type { EssayOutline } from "@/lib/api";

const STYLES = ["APA", "MLA", "Chicago", "Harvard", "general"] as const;

export default function AIEssayOutliner() {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState(1000);
  const [style, setStyle] = useState<(typeof STYLES)[number]>("APA");
  const [stance, setStance] = useState("");
  const [result, setResult] = useState<EssayOutline | null>(null);
  const [copied, setCopied] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const mutation = useBuildEssayOutline();
  const { checkQuota, status } = useToolQuota("ai-essay-outliner");

  const run = async () => {
    if (topic.trim().length < 5) return;
    const q = await checkQuota();
    if (!q.allowed) return setLoginOpen(true);
    mutation.mutate(
      { topic: topic.trim(), wordCount, style, stance: stance.trim() || undefined },
      {
        onSuccess: setResult,
        onError: () => toast.error("Generation failed", "Please try again."),
      },
    );
  };

  const copyOutline = async () => {
    if (!result) return;
    const out = [
      `Essay topic: ${result.topic}`,
      `Citation style: ${result.citationStyle}`,
      "",
      `Hook: ${result.hook}`,
      `Thesis: ${result.thesis}`,
      "",
      ...result.sections.flatMap((s) => [
        `## ${s.heading} (~${s.wordTarget} words)`,
        ...s.points.map((p) => `- ${p}`),
        s.evidenceIdeas.length ? `Evidence: ${s.evidenceIdeas.join("; ")}` : "",
        "",
      ]),
      `Conclusion direction: ${result.conclusion}`,
      "",
      `Suggested sources: ${result.suggestedSources.join("; ")}`,
    ].join("\n");
    await navigator.clipboard.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied", "Outline copied.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Essay topic <span className="text-red-400">*</span>
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. The impact of social media on adolescent mental health"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Your stance (optional — AI will pick one if blank)
          </label>
          <input
            value={stance}
            onChange={(e) => setStance(e.target.value)}
            placeholder="e.g. social media's harm outweighs the benefits"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target word count</label>
            <input
              type="number"
              min={300}
              max={5000}
              step={100}
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Citation style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as typeof style)}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
            >
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={run}
          disabled={mutation.isPending || topic.trim().length < 5}
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Building outline…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Build essay outline
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="flex justify-between gap-3">
            <h3 className="text-base font-semibold">{result.topic}</h3>
            <button
              onClick={copyOutline}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy outline"}
            </button>
          </div>

          <div className="rounded-xl bg-muted/30 border border-border p-4 space-y-2 text-sm">
            <div>
              <span className="font-semibold">Hook: </span>
              {result.hook}
            </div>
            <div>
              <span className="font-semibold">Thesis: </span>
              {result.thesis}
            </div>
          </div>

          <ol className="space-y-3">
            {result.sections.map((s, i) => (
              <li key={i} className="rounded-xl border border-border p-4">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-semibold text-sm">{s.heading}</h4>
                  <span className="text-xs text-muted-foreground">~{s.wordTarget} words</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {s.points.map((p, pi) => (
                    <li key={pi} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-500">
                      {p}
                    </li>
                  ))}
                </ul>
                {s.evidenceIdeas.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">Evidence: </span>
                    {s.evidenceIdeas.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <div className="rounded-xl bg-muted/30 border border-border p-4 text-sm">
            <h4 className="font-semibold mb-1">Conclusion direction</h4>
            <p className="text-muted-foreground">{result.conclusion}</p>
          </div>

          {result.suggestedSources.length > 0 && (
            <div className="text-sm">
              <h4 className="font-semibold mb-2">Source ideas to research</h4>
              <ul className="flex flex-wrap gap-2">
                {result.suggestedSources.map((s, i) => (
                  <li key={i} className="text-xs rounded-full border border-border bg-muted/30 px-3 py-1">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <LoginGateModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        toolName="AI Essay Outliner"
        returnTo="/free-tools/ai-essay-outliner"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Sparkles, Copy, Check, FileText, BookOpen, GraduationCap } from "lucide-react";
import { useSummarizeNotes } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";
import type { NoteSummary } from "@/lib/api";

const DEPTHS = [
  { value: "brief", label: "Brief", hint: "5-7 bullets" },
  { value: "standard", label: "Standard", hint: "8-10 bullets + quiz" },
  { value: "deep", label: "Deep dive", hint: "15 bullets + 8 quiz" },
] as const;

export default function AINoteSummarizer() {
  const [text, setText] = useState("");
  const [depth, setDepth] = useState<(typeof DEPTHS)[number]["value"]>("standard");
  const [result, setResult] = useState<NoteSummary | null>(null);
  const [tab, setTab] = useState<"summary" | "flashcards" | "quiz">("summary");
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>({});
  const [copied, setCopied] = useState(false);
  const [loginGateOpen, setLoginGateOpen] = useState(false);
  const mutation = useSummarizeNotes();
  const { checkQuota, status } = useToolQuota("ai-note-summarizer");

  const run = async () => {
    if (text.trim().length < 50) {
      toast.error("Need more text", "Please paste at least 50 characters of notes.");
      return;
    }
    const quota = await checkQuota();
    if (!quota.allowed) {
      setLoginGateOpen(true);
      return;
    }
    mutation.mutate(
      { text: text.trim(), depth },
      {
        onSuccess: (data) => {
          setResult(data);
          setRevealed({});
          setQuizPicks({});
          setTab("summary");
        },
        onError: () => toast.error("Generation failed", "Please try again."),
      },
    );
  };

  const copyAll = async () => {
    if (!result) return;
    const out = [
      `# ${result.title}`,
      "",
      "## Summary",
      ...result.summary.map((s) => `- ${s}`),
      "",
      "## Key terms",
      ...result.keyTerms.map((t) => `- **${t.term}**: ${t.definition}`),
      "",
      "## Flashcards",
      ...result.flashcards.map((f, i) => `${i + 1}. Q: ${f.front}\n   A: ${f.back}`),
    ].join("\n");
    await navigator.clipboard.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied", "Study pack copied to clipboard.");
  };

  const downloadAnki = () => {
    if (!result) return;
    const csv = result.flashcards.map((f) => `"${f.front.replace(/"/g, '""')}","${f.back.replace(/"/g, '""')}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-flashcards.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Paste your lecture notes or textbook chapter</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          maxLength={30000}
          placeholder="Paste up to 30,000 characters - a chapter, lecture transcript, study guide…"
          className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{text.length.toLocaleString()} / 30,000 characters</span>
          <span>{text.trim().split(/\s+/).filter(Boolean).length} words</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Depth</label>
          <div className="flex flex-wrap gap-2">
            {DEPTHS.map((d) => (
              <button
                key={d.value}
                onClick={() => setDepth(d.value)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  depth === d.value
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-border hover:border-blue-500/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
                <span className="ml-1.5 text-[10px] opacity-70">{d.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={run}
          disabled={mutation.isPending || text.trim().length < 50}
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Building your study pack…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Summarize and create flashcards
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-5 pt-2 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{result.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={copyAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy all"}
              </button>
              <button
                onClick={downloadAnki}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Anki CSV
              </button>
            </div>
          </div>

          <div className="flex gap-1 border-b border-border overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: "summary", label: "Summary", icon: BookOpen },
              { id: "flashcards", label: `Flashcards (${result.flashcards.length})`, icon: FileText },
              { id: "quiz", label: `Quiz (${result.quiz.length})`, icon: GraduationCap },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as typeof tab)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    tab === t.id
                      ? "border-blue-500 text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {tab === "summary" && (
            <div className="space-y-4">
              <ul className="space-y-2">
                {result.summary.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-blue-500 font-semibold">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              {result.keyTerms.length > 0 && (
                <div className="rounded-xl border border-border bg-muted/20 p-4">
                  <h4 className="text-sm font-semibold mb-2">Key terms</h4>
                  <dl className="space-y-2">
                    {result.keyTerms.map((kt, i) => (
                      <div key={i} className="text-sm">
                        <dt className="font-medium text-foreground inline">{kt.term}: </dt>
                        <dd className="inline text-muted-foreground">{kt.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          )}

          {tab === "flashcards" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {result.flashcards.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                  className="text-left rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 transition-colors min-h-[120px]"
                >
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {revealed[i] ? "Answer" : "Question"} · #{i + 1}
                  </div>
                  <p className="text-sm">{revealed[i] ? f.back : f.front}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    {revealed[i] ? "Tap to flip back" : "Tap to reveal"}
                  </p>
                </button>
              ))}
            </div>
          )}

          {tab === "quiz" && (
            <div className="space-y-4">
              {result.quiz.map((q, i) => {
                const picked = quizPicks[i];
                return (
                  <div key={i} className="rounded-xl border border-border p-4">
                    <p className="text-sm font-medium mb-3">
                      {i + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const isPicked = picked === oi;
                        const isCorrect = oi === q.answerIndex;
                        const showState = picked !== undefined;
                        return (
                          <button
                            key={oi}
                            onClick={() => setQuizPicks((p) => ({ ...p, [i]: oi }))}
                            disabled={showState}
                            className={`block w-full text-left rounded-lg border px-3 py-2 text-sm transition-colors ${
                              showState && isCorrect
                                ? "border-emerald-500/50 bg-emerald-500/10"
                                : showState && isPicked && !isCorrect
                                  ? "border-red-500/50 bg-red-500/10"
                                  : "border-border hover:border-blue-500/30"
                            }`}
                          >
                            <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {picked !== undefined && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        {picked === q.answerIndex ? "✓ Correct. " : "✗ Not quite. "}
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <LoginGateModal open={loginGateOpen} onClose={() => setLoginGateOpen(false)} toolName="AI Note Summarizer" returnTo="/free-tools/ai-note-summarizer" />
    </div>
  );
}

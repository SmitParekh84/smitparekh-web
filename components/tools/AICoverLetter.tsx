"use client";

import { useState } from "react";
import { Loader2, Sparkles, Copy, Check, Download } from "lucide-react";
import { useGenerateCoverLetter } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";
import type { CoverLetterResponse } from "@/lib/api";

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "concise", label: "Concise" },
] as const;

export default function AICoverLetter() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]["value"]>("professional");
  const [result, setResult] = useState<CoverLetterResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const mutation = useGenerateCoverLetter();
  const { checkQuota, status } = useToolQuota("ai-cover-letter");

  const run = async () => {
    if (resume.trim().length < 50 || jd.trim().length < 50) {
      toast.error("Need more detail", "Paste your resume and the full job description.");
      return;
    }
    const q = await checkQuota();
    if (!q.allowed) return setLoginOpen(true);
    mutation.mutate(
      {
        resume: resume.trim(),
        jobDescription: jd.trim(),
        tone,
        name: name.trim() || undefined,
        role: role.trim() || undefined,
        company: company.trim() || undefined,
      },
      {
        onSuccess: setResult,
        onError: () => toast.error("Generation failed", "Please try again."),
      },
    );
  };

  const copyAll = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied", "Cover letter copied.");
  };

  const downloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${(company || role || "draft").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Software Engineer Intern"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Your resume <span className="text-red-400">*</span>
          </label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={10}
            maxLength={10000}
            placeholder="Paste your resume in plain text - skills, experience, projects, education…"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{resume.length.toLocaleString()} / 10,000</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Job description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={10}
            maxLength={10000}
            placeholder="Paste the full job description from the listing…"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{jd.length.toLocaleString()} / 10,000</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tone</label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                tone === t.value
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "border-border hover:border-blue-500/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={run}
        disabled={mutation.isPending || resume.trim().length < 50 || jd.trim().length < 50}
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white transition-colors"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Writing your cover letter…
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Generate cover letter
          </>
        )}
      </button>

      {result && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex justify-between gap-3">
            <h3 className="text-base font-semibold">Your cover letter</h3>
            <div className="flex gap-2">
              <button
                onClick={copyAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={downloadTxt}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-blue-500/40 px-3 py-1.5 text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-5 max-h-[600px] overflow-y-auto">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{result.letter}</pre>
          </div>
        </div>
      )}

      <LoginGateModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        toolName="AI Cover Letter Generator"
        returnTo="/free-tools/ai-cover-letter"
      />
    </div>
  );
}

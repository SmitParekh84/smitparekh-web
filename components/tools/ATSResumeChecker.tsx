"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  X,
  AlertCircle,
  Lock,
  Check,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyzeResume } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ATSNotifyModal } from "@/components/tools/ATSNotifyModal";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";

type Step = 1 | 2 | 3;

function ScoreRing({ score }: { score: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-muted" />
        <motion.circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center">
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        <p className="text-xs text-muted-foreground">/100</p>
      </div>
    </div>
  );
}

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Analyse" },
  { id: 3, label: "Report" },
];

interface StepCircleProps {
  index: Step;
  current: Step;
}

function StepCircle({ index, current }: StepCircleProps) {
  const isComplete = current > index;
  const isActive = current === index;
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors ${
        isActive
          ? "bg-blue-500 text-white border-blue-500"
          : isComplete
          ? "bg-blue-500/15 text-blue-500 border-blue-500/40"
          : "bg-muted text-muted-foreground border-border"
      }`}
    >
      {isComplete ? <Check className="w-4 h-4" /> : index}
    </div>
  );
}

export default function ATSResumeChecker() {
  const [flow, setFlow] = useState<1 | 2>(1);
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ score?: number; analysis?: string; recommendations?: string[] } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [loginGateOpen, setLoginGateOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useAnalyzeResume();
  const { checkQuota, isChecking, status } = useToolQuota("ats-resume-checker");

  const handleFile = (f: File) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
      toast.error("Invalid file", "Please upload a PDF or DOCX resume.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File too large", "Resume must be under 5 MB.");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const analyze = async () => {
    if (!file) return;
    const quota = await checkQuota();
    if (!quota.allowed) {
      setLoginGateOpen(true);
      return;
    }
    setStep(2);
    mutation.mutate(file, {
      onSuccess: (res) => {
        setResult({
          score: res.atsScore,
          analysis:
            res.summary ??
            res.sectionBreakdown.map((s) => `${s.section} (${s.score}/100): ${s.feedback}`).join("\n\n"),
          recommendations: res.recommendations,
        });
        setStep(3);
      },
      onError: () => {
        toast.error("Analysis failed", "Please try again with a valid resume file.");
        setStep(1);
      },
    });
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setStep(1);
  };

  const handleFlow2Click = () => {
    setNotifyOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Quota badge */}
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>
      {/* Flow selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setFlow(1)}
          className={`text-left rounded-2xl border-2 px-4 py-3 transition-colors ${
            flow === 1
              ? "border-blue-500 bg-blue-500/5"
              : "border-border hover:border-blue-500/40"
          }`}
        >
          <p className="text-sm font-semibold">Quick ATS Check</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Resume only → instant score
          </p>
        </button>
        <button
          type="button"
          onClick={handleFlow2Click}
          className="relative text-left rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-3 opacity-70 hover:opacity-100 hover:border-blue-500/40 transition-all"
        >
          <Badge
            variant="secondary"
            className="absolute -top-2 right-3 text-[10px] uppercase tracking-wide"
          >
            Coming Soon
          </Badge>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-sm font-semibold">Job Match Check</p>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Resume + JD → match score
          </p>
        </button>
      </div>

      {/* Stepper — Desktop horizontal */}
      <div className="hidden md:flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <StepCircle index={s.id} current={step} />
              <p
                className={`text-xs font-medium ${
                  step >= s.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-3 mb-6 rounded-full overflow-hidden bg-border">
                <div
                  className={`h-full transition-all duration-500 ${
                    step > s.id
                      ? "w-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stepper — Mobile vertical */}
      <div className="md:hidden flex items-center gap-3">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <StepCircle index={s.id} current={step} />
            <p
              className={`ml-2 text-xs font-medium ${
                step >= s.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </p>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 ml-2 rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    step > s.id ? "w-full bg-gradient-to-r from-blue-500 to-cyan-400" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            {!file ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const f = e.dataTransfer.files[0];
                  if (f) handleFile(f);
                }}
                onClick={() => inputRef.current?.click()}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer py-16 transition-colors ${
                  dragging
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-border hover:border-blue-500/50"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm font-medium">Drop your resume here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">PDF or DOCX · max 5 MB</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                  }}
                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {file && (
              <Button
                onClick={analyze}
                disabled={mutation.isPending || isChecking}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isChecking ? "Checking quota…" : "Next: Analyse"}
              </Button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 gap-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-sm font-medium">Analysing resume…</p>
            <p className="text-xs text-muted-foreground">This usually takes a few seconds.</p>
          </div>
        )}

        {step === 3 && result && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Score */}
              {result.score !== undefined && (
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-border bg-card p-6">
                  <ScoreRing score={result.score} />
                  <div>
                    <p className="text-lg font-bold">ATS Score</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-sm">
                      {result.score >= 75
                        ? "Great score! Your resume is well-optimised for ATS systems."
                        : result.score >= 50
                        ? "Good start. A few improvements will help you pass more filters."
                        : "Needs work. Follow the recommendations below to improve your score."}
                    </p>
                  </div>
                </div>
              )}

              {/* Analysis */}
              {result.analysis && (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <p className="text-sm font-semibold">Analysis</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {result.analysis}
                    </p>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <p className="text-sm font-semibold">Recommendations</p>
                  </div>
                  <ul className="divide-y divide-border">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 px-4 py-3">
                        <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-center pt-2">
                <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
                  <RotateCcw className="w-3.5 h-3.5 mr-2" />
                  Start Over
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <ATSNotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />
      <LoginGateModal
        open={loginGateOpen}
        onClose={() => setLoginGateOpen(false)}
        toolName="the ATS Resume Checker"
      />
    </div>
  );
}

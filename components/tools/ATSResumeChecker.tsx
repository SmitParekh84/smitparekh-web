"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyzeResume } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";

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

export default function ATSResumeChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ score?: number; analysis?: string; recommendations?: string[] } | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useAnalyzeResume();

  const handleFile = (f: File) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
      toast.error("Invalid file", "Please upload a PDF or DOCX resume.");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const analyze = () => {
    if (!file) return;
    mutation.mutate(file, {
      onSuccess: (res) => {
        setResult({
          score: res.atsScore,
          analysis: res.summary ?? res.sectionBreakdown.map((s) => `${s.section} (${s.score}/100): ${s.feedback}`).join("\n\n"),
          recommendations: res.recommendations,
        });
      },
      onError: () => {
        toast.error("Analysis failed", "Please try again with a valid resume file.");
      },
    });
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer py-16 transition-colors ${
            dragging ? "border-blue-500 bg-blue-500/5" : "border-border hover:border-blue-500/50"
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
          <p className="text-xs text-muted-foreground mt-1">PDF or DOCX — max 5 MB</p>
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
          <button onClick={() => { setFile(null); setResult(null); }} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {file && (
        <button
          onClick={analyze}
          disabled={mutation.isPending}
          className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {mutation.isPending ? "Analysing resume…" : "Check ATS Score"}
        </button>
      )}

      <AnimatePresence>
        {result && (
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

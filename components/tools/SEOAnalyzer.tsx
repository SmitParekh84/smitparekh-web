"use client";

import { useState } from "react";
import {
  Search, Mail, CheckCircle2, XCircle, MinusCircle,
  AlertTriangle, Gauge, FileText, Zap, Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyzeSeo } from "@/hooks/api/use-meta";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type CheckStatus = "pass" | "neutral" | "fail";
type Priority = "high" | "medium" | "low";
type ScoreColor = "green" | "orange" | "yellow" | "red";

interface SeoCheck {
  status: CheckStatus;
  name: string;
  description: string;
  value?: string;
}

interface SeoRecommendation {
  priority: Priority;
  title: string;
  description: string;
  steps?: string[];
}

interface SeoData {
  seoScore?: number;
  scoreColor?: ScoreColor;
  scoreDescription?: string;
  url?: string;
  title?: string;
  loadingSpeed?: string;
  analysisDate?: string;
  checks?: Record<string, SeoCheck>;
  onPageSeo?: Record<string, unknown>;
  performanceMetrics?: { pageSize?: string; loadTime?: string; requestCount?: string };
  recommendations?: SeoRecommendation[];
}

const TABS = [
  { id: "overview",        label: "Overview",       icon: Gauge },
  { id: "onpage",          label: "On-Page SEO",    icon: FileText },
  { id: "performance",     label: "Performance",    icon: Zap },
  { id: "recommendations", label: "Recommendations",icon: Lightbulb },
] as const;
type TabId = typeof TABS[number]["id"];

function ScoreGauge({ score, color }: { score: number; color: ScoreColor }) {
  const r = 45;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const stroke =
    color === "green" ? "#10B981" :
    color === "orange" || color === "yellow" ? "#F59E0B" : "#EF4444";
  const textCls =
    color === "green" ? "text-emerald-500" :
    color === "orange" || color === "yellow" ? "text-amber-500" : "text-red-500";
  const label =
    color === "green" ? "Excellent" :
    color === "orange" || color === "yellow" ? "Average" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[128px] h-[128px]">
        <svg width="128" height="128" viewBox="0 0 120 120" className="-rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor"
            strokeWidth="10" className="text-border" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={stroke}
            strokeWidth="10" strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-bold tabular-nums leading-none", textCls)}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">/ 100</span>
        </div>
      </div>
      <span className={cn("text-sm font-semibold", textCls)}>{label}</span>
    </div>
  );
}

function OnPageValue({ value }: { value: unknown }) {
  if (typeof value === "string") return <p className="text-sm">{value}</p>;
  if (typeof value === "boolean") return <p className="text-sm">{value ? "Yes" : "No"}</p>;
  if (typeof value === "number") return <p className="text-sm">{value}</p>;
  if (Array.isArray(value))
    return <p className="text-sm">{value.length === 0 ? "None found" : value.join(", ")}</p>;
  if (value !== null && typeof value === "object") {
    return (
      <div className="mt-1 space-y-1">
        {Object.entries(value as Record<string, unknown>).map(([sk, sv]) => (
          <div key={sk} className="flex gap-2 text-xs">
            <span className="text-muted-foreground shrink-0 capitalize">
              {sk.replace(/([A-Z])/g, " $1")}:
            </span>
            <span className="break-all">
              {Array.isArray(sv) ? (sv.length === 0 ? "None" : sv.join(", ")) : String(sv ?? " - ")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return <p className="text-sm text-muted-foreground">Not available</p>;
}

export default function SEOAnalyzer() {
  const [url, setUrl]               = useState("");
  const [email, setEmail]           = useState("");
  const [sendReport, setSendReport] = useState(false);
  const [result, setResult]         = useState<SeoData | null>(null);
  const [activeTab, setActiveTab]   = useState<TabId>("overview");
  const mutation = useAnalyzeSeo();

  const analyze = () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    if (sendReport && (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
      toast.error("Invalid email", "Enter a valid email to receive the report.");
      return;
    }

    const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    mutation.mutate(
      {
        url: withProtocol,
        email: sendReport && email.trim() ? email.trim() : undefined,
        generatePdf: sendReport || undefined,
      },
      {
        onSuccess: (res) => {
          // api.post returns res.data directly - use `res`, not `res.data`
          setResult(res as unknown as SeoData);
          setActiveTab("overview");
          toast.success("Analysis complete!", sendReport && email ? "Report sent to your email." : undefined);
        },
        onError: () => toast.error("Analysis failed", "Check the URL and try again."),
      },
    );
  };

  const score = result?.seoScore ?? 0;
  const color: ScoreColor =
    result?.scoreColor ?? (score >= 80 ? "green" : score >= 60 ? "orange" : "red");

  const checks = result?.checks ? Object.entries(result.checks) : [];
  const passed  = checks.filter(([, c]) => c.status === "pass").length;
  const neutral = checks.filter(([, c]) => c.status === "neutral").length;
  const failed  = checks.filter(([, c]) => c.status === "fail").length;

  return (
    <div className="space-y-5">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium block mb-1.5">Website URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        {/* Toggle: send PDF report */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none group">
          <div className="relative shrink-0">
            <input type="checkbox" className="peer sr-only"
              checked={sendReport} onChange={(e) => setSendReport(e.target.checked)} />
            <div className="w-9 h-5 rounded-full border border-border bg-muted peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Send PDF report to my email
          </span>
        </label>

        <AnimatePresence>
          {sendReport && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={analyze}
        disabled={!url.trim() || mutation.isPending}
        className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        {mutation.isPending ? "Analysing…" : "Run SEO Audit"}
      </button>

      {/* ── Loading ────────────────────────────────────────────────────────── */}
      {mutation.isPending && (
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
          <p className="text-sm text-muted-foreground">Analysing website SEO factors…</p>
        </div>
      )}

      {/* ── Results ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {result && !mutation.isPending && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Score card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <ScoreGauge score={score} color={color} />

                <div className="flex-1 min-w-0 space-y-3 text-center sm:text-left">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-0.5">
                      SEO Score
                    </p>
                    {result.scoreDescription && (
                      <p className="text-sm text-muted-foreground">{result.scoreDescription}</p>
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    {result.url && (
                      <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                        <span className="text-muted-foreground">URL:</span>
                        <span className="font-medium truncate max-w-xs">{result.url}</span>
                      </div>
                    )}
                    {result.title && (
                      <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                        <span className="text-muted-foreground">Title:</span>
                        <span className="truncate max-w-xs">{result.title}</span>
                      </div>
                    )}
                    {result.loadingSpeed && (
                      <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                        <span className="text-muted-foreground">Load Speed:</span>
                        <span>{result.loadingSpeed}</span>
                      </div>
                    )}
                    {result.analysisDate && (
                      <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                        <span className="text-muted-foreground">Analysed:</span>
                        <span>{new Date(result.analysisDate).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Pass/neutral/fail pills */}
                  {checks.length > 0 && (
                    <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                      {[
                        { n: passed,  label: "Passed",  cls: "bg-emerald-500/10 text-emerald-600" },
                        { n: neutral, label: "Neutral", cls: "bg-muted text-muted-foreground" },
                        { n: failed,  label: "Failed",  cls: "bg-red-500/10 text-red-500" },
                      ].map(({ n, label, cls }) => (
                        <span key={label} className={cn("text-xs font-medium px-2.5 py-1 rounded-full", cls)}>
                          {n} {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex border-b border-border overflow-x-auto scrollbar-none">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors shrink-0",
                      activeTab === id
                        ? "border-blue-500 text-blue-500"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-4 max-h-[480px] overflow-y-auto">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-2">
                    {checks.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-6">No checks available.</p>
                    ) : (
                      checks.map(([key, check]) => (
                        <div
                          key={key}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl border",
                            check.status === "pass"
                              ? "bg-emerald-500/5 border-emerald-500/20"
                              : check.status === "neutral"
                              ? "bg-muted/30 border-border"
                              : "bg-red-500/5 border-red-500/20",
                          )}
                        >
                          <div className="shrink-0 mt-0.5">
                            {check.status === "pass" ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : check.status === "neutral" ? (
                              <MinusCircle className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{check.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{check.description}</p>
                            {check.value && (
                              <p className="text-xs font-mono mt-1 text-foreground/60 break-all">{check.value}</p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* On-Page SEO */}
                {activeTab === "onpage" && (
                  <div className="space-y-2">
                    {!result.onPageSeo ? (
                      <p className="text-sm text-muted-foreground text-center py-6">No on-page data available.</p>
                    ) : (
                      Object.entries(result.onPageSeo).map(([key, value]) => (
                        <div key={key} className="rounded-xl border border-border p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                          </p>
                          <OnPageValue value={value} />
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Performance */}
                {activeTab === "performance" && (
                  <div>
                    {!result.performanceMetrics ? (
                      <p className="text-sm text-muted-foreground text-center py-6">No performance data available.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { label: "Page Size",     value: result.performanceMetrics.pageSize },
                          { label: "Load Time",     value: result.performanceMetrics.loadTime },
                          { label: "Request Count", value: result.performanceMetrics.requestCount },
                        ].map(({ label, value }) => (
                          <div key={label} className="rounded-xl border border-border bg-muted/20 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500 mb-1">{value ?? " - "}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Recommendations */}
                {activeTab === "recommendations" && (
                  <div className="space-y-3">
                    {!result.recommendations || result.recommendations.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        No specific recommendations. Your site looks good!
                      </p>
                    ) : (
                      result.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className={cn(
                            "rounded-xl border p-4",
                            rec.priority === "high"
                              ? "border-red-500/25 bg-red-500/5"
                              : rec.priority === "medium"
                              ? "border-amber-500/25 bg-amber-500/5"
                              : "border-emerald-500/25 bg-emerald-500/5",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle
                              className={cn(
                                "w-4 h-4 shrink-0 mt-0.5",
                                rec.priority === "high" ? "text-red-400" :
                                rec.priority === "medium" ? "text-amber-400" : "text-emerald-500",
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <p className="text-sm font-semibold">{rec.title}</p>
                                <span
                                  className={cn(
                                    "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
                                    rec.priority === "high"
                                      ? "bg-red-500/15 text-red-500"
                                      : rec.priority === "medium"
                                      ? "bg-amber-500/15 text-amber-500"
                                      : "bg-emerald-500/15 text-emerald-600",
                                  )}
                                >
                                  {rec.priority} priority
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{rec.description}</p>
                              {rec.steps && rec.steps.length > 0 && (
                                <ol className="mt-2.5 space-y-1">
                                  {rec.steps.map((step, si) => (
                                    <li key={si} className="text-xs flex gap-2">
                                      <span className="text-blue-500 shrink-0 font-medium">{si + 1}.</span>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

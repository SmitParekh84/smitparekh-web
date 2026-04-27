"use client";

import { useState, type ReactNode } from "react";
import { Search, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyzeSeo } from "@/hooks/api/use-meta";
import { toast } from "@/lib/toast";

export default function SEOAnalyzer() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const mutation = useAnalyzeSeo();

  const analyze = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    mutation.mutate(
      { url: withProtocol, email: email.trim() || undefined },
      {
        onSuccess: (res) => {
          setResult(res.data as Record<string, unknown>);
          toast.success("Analysis complete!", email ? "Results also sent to your email." : undefined);
        },
        onError: () => {
          toast.error("Analysis failed", "Please check the URL and try again.");
        },
      },
    );
  };

  const renderValue = (val: unknown): string => {
    if (val === null || val === undefined) return "N/A";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "number") return String(val);
    if (typeof val === "string") return val;
    if (Array.isArray(val)) return val.slice(0, 3).join(", ") + (val.length > 3 ? `… (+${val.length - 3})` : "");
    return JSON.stringify(val);
  };

  const renderData = (data: unknown, depth = 0): ReactNode => {
    if (data === null || data === undefined) return null;
    if (typeof data !== "object" || Array.isArray(data)) {
      return <p className="text-sm text-muted-foreground">{renderValue(data)}</p>;
    }

    const entries = Object.entries(data as Record<string, unknown>);
    if (depth > 0) {
      return (
        <div className="space-y-2 pl-3 border-l border-border">
          {entries.map(([k, v]) => (
            <div key={k}>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{k.replace(/_/g, " ")}</p>
              <p className="text-sm mt-0.5">{renderValue(v)}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {entries.map(([k, v]) => {
          const isObj = v !== null && typeof v === "object" && !Array.isArray(v);
          const isOpen = expanded === k;
          return (
            <div key={k} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => { if (isObj) setExpanded(isOpen ? null : k); }}
                className={`flex items-center justify-between w-full px-4 py-3 text-left ${isObj ? "cursor-pointer hover:bg-muted/30" : "cursor-default"}`}
              >
                <span className="text-sm font-medium capitalize">{k.replace(/_/g, " ")}</span>
                <div className="flex items-center gap-2">
                  {!isObj && <span className="text-sm text-muted-foreground max-w-48 truncate">{renderValue(v)}</span>}
                  {isObj && (isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />)}
                </div>
              </button>
              {isObj && isOpen && (
                <div className="px-4 pb-4 border-t border-border bg-muted/10">
                  <div className="pt-3">{renderData(v, 1) as ReactNode}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Website URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            Email for Report <span className="text-muted-foreground text-xs font-normal">(optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <button
        onClick={analyze}
        disabled={!url.trim() || mutation.isPending}
        className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        {mutation.isPending ? "Analysing…" : "Run SEO Audit"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">SEO Report</h3>
              <p className="text-xs text-muted-foreground">
                {url.startsWith("http") ? url : `https://${url}`}
              </p>
            </div>
            {renderData(result)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

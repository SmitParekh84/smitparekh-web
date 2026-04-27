"use client";

import { useState } from "react";
import { Search, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { metaApi } from "@/lib/api";
import { toast } from "@/lib/toast";

const IMPORTANT_TAGS = ["title", "description", "og:title", "og:description", "og:image", "og:url", "twitter:card", "twitter:title", "canonical"];

function getTagStatus(key: string, value: string | string[] | undefined): "good" | "warn" | "missing" {
  if (!value || (Array.isArray(value) && value.length === 0)) return "missing";
  const str = Array.isArray(value) ? value[0] : value;
  if (key === "title" && (str.length < 30 || str.length > 60)) return "warn";
  if (key === "description" && (str.length < 70 || str.length > 160)) return "warn";
  return "good";
}

export default function MetaTagChecker() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<Record<string, string | string[] | undefined> | null>(null);

  const mutation = useMutation({
    mutationFn: (u: string) => metaApi.getTags(u),
    onSuccess: (d) => setData(d),
    onError: () => toast.error("Failed to fetch", "Make sure the URL is accessible and includes https://"),
  });

  const check = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    mutation.mutate(withProtocol);
  };

  const StatusIcon = ({ status }: { status: "good" | "warn" | "missing" }) => {
    if (status === "good") return <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />;
    if (status === "warn") return <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />;
    return <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
  };

  const allTags = data ? Object.entries(data) : [];
  const importantEntries = IMPORTANT_TAGS.map((key) => ({
    key,
    value: data?.[key],
    status: data ? getTagStatus(key, data[key]) : ("missing" as const),
  }));
  const otherEntries = allTags.filter(([k]) => !IMPORTANT_TAGS.includes(k));

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">https://</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="example.com"
            className="w-full rounded-xl border border-border bg-muted/30 pl-16 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={check}
          disabled={!url.trim() || mutation.isPending}
          className="rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-5 py-3 font-semibold transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {mutation.isPending ? "Checking…" : "Check"}
        </button>
      </div>

      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Score summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Good", count: importantEntries.filter((e) => e.status === "good").length, color: "text-green-400", bg: "bg-green-500/10" },
                { label: "Warning", count: importantEntries.filter((e) => e.status === "warn").length, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                { label: "Missing", count: importantEntries.filter((e) => e.status === "missing").length, color: "text-red-400", bg: "bg-red-500/10" },
              ].map(({ label, count, color, bg }) => (
                <div key={label} className={`rounded-xl border border-border ${bg} p-3 text-center`}>
                  <p className={`text-2xl font-bold ${color}`}>{count}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Important tags */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold">Key SEO Tags</p>
              </div>
              <div className="divide-y divide-border">
                {importantEntries.map(({ key, value, status }) => (
                  <div key={key} className="flex items-start gap-3 px-4 py-3">
                    <StatusIcon status={status} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-muted-foreground">{key}</p>
                      {value ? (
                        <p className="text-sm mt-0.5 truncate">
                          {Array.isArray(value) ? value[0] : value}
                        </p>
                      ) : (
                        <p className="text-sm mt-0.5 text-red-400 italic">Not found</p>
                      )}
                    </div>
                    {value && typeof value === "string" && (key === "title" || key === "description") && (
                      <span className="text-xs text-muted-foreground shrink-0">{value.length} chars</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Other tags */}
            {otherEntries.length > 0 && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <p className="text-sm font-semibold">Other Meta Tags</p>
                </div>
                <div className="divide-y divide-border max-h-64 overflow-y-auto">
                  {otherEntries.map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 px-4 py-2.5">
                      <p className="text-xs font-mono text-muted-foreground w-36 shrink-0">{key}</p>
                      <p className="text-xs text-foreground/80 min-w-0 break-words">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

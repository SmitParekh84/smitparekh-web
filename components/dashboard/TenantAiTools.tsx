"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Lightbulb, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPreferences } from "@/lib/blog-categories";
import { useGenerateMyTopics } from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";

interface TenantAiToolsProps {
  preferences?: BlogPreferences;
  onApplyTopic: (topic: string) => void;
}

/**
 * Auto-loading AI topic suggestions for the blog editor. Reads the tenant's
 * saved niche/categories (configured on the Blog Settings page) and fetches
 * ideas on mount - the tenant never has to type a seed. Category tabs come from
 * the saved categories; Refresh re-rolls the current tab.
 */
export function TenantAiTools({ preferences, onApplyTopic }: TenantAiToolsProps) {
  const cats = preferences?.categories ?? [];
  const hasNiche = !!(preferences?.niche || preferences?.audience || cats.length);
  const tabs = ["All", ...cats];

  const [activeCat, setActiveCat] = useState("All");
  const [topics, setTopics] = useState<string[]>([]);
  const gen = useGenerateMyTopics();
  const fetchedRef = useRef(false);

  async function load(category: string) {
    setActiveCat(category);
    try {
      const res = await gen.mutateAsync(category === "All" ? undefined : category);
      setTopics(res.data.topics);
    } catch {
      toast.error("Couldn't generate topics", "Try again in a moment.");
    }
  }

  // Auto-load once on mount (like the admin panel) when a niche is configured.
  useEffect(() => {
    if (fetchedRef.current || !hasNiche) return;
    fetchedRef.current = true;
    void load("All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNiche]);

  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
          <Lightbulb className="h-4 w-4" />
          Topic ideas
        </div>
        {hasNiche && (
          <button
            type="button"
            onClick={() => load(activeCat)}
            disabled={gen.isPending}
            aria-label="Refresh suggestions"
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            {gen.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      {!hasNiche ? (
        <p className="text-xs text-muted-foreground">
          Set your blog niche to get tailored ideas.{" "}
          <Link href="/dashboard/blog/settings" className="text-blue-500 hover:underline">
            Set up preferences →
          </Link>
        </p>
      ) : (
        <>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => load(t)}
                disabled={gen.isPending}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-colors disabled:opacity-50",
                  activeCat === t
                    ? "bg-blue-500 text-white"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {gen.isPending && activeCat === t ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                {t}
              </button>
            ))}
          </div>

          {gen.isPending && topics.length === 0 ? (
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-9 w-full animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : topics.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onApplyTopic(t)}
                  title="Click to use this title"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-left text-xs leading-snug transition-colors hover:border-blue-500/60 hover:bg-blue-500/5"
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No ideas yet - hit refresh.</p>
          )}
        </>
      )}
    </div>
  );
}

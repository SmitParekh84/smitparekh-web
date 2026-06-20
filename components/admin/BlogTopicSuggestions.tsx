"use client";

import { useEffect, useRef } from "react";
import { Loader2, RefreshCw, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenerateBlogTopics } from "@/hooks/use-blogs";
import { toast } from "@/lib/toast";

interface BlogTopicSuggestionsProps {
  onPick: (topic: string) => void;
  disabled?: boolean;
  seed?: string;
  site?: "smit" | "marketixpert";
  className?: string;
}

/**
 * Shows 3-4 trending, SEO-focused blog topic ideas under the AI prompt textarea.
 * Click a chip → fills the prompt textarea (the user still hits Generate manually).
 * The refresh icon re-rolls the list when ideas don't fit.
 */
export function BlogTopicSuggestions({
  onPick,
  disabled,
  seed,
  site,
  className,
}: BlogTopicSuggestionsProps) {
  const generateTopics = useGenerateBlogTopics();
  const fetchedRef = useRef(false);

  const topics = generateTopics.data?.data?.topics ?? [];
  const isLoading = generateTopics.isPending;

  async function load(seedOverride?: string) {
    try {
      await generateTopics.mutateAsync({ seed: seedOverride ?? seed, site });
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Try refreshing in a moment.";
      toast.error("Couldn't load ideas", msg);
    }
  }

  // Auto-load once on mount so chips are visible immediately.
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("mt-2", className)}>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
          <span>
            {seed
              ? "Ideas based on your prompt"
              : site === "marketixpert"
              ? "Ideas for MarketiXpert (SEO / Web Design / PPC)"
              : "Trending ideas (US / CA / UK / IN)"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => load()}
          disabled={disabled || isLoading}
          aria-label="Refresh suggestions"
          title="Refresh suggestions"
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors",
            "hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {isLoading && topics.length === 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-40 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      ) : topics.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onPick(t)}
              disabled={disabled}
              title="Click to use as prompt"
              className={cn(
                "w-full rounded-xl border border-border bg-background px-3 py-2 text-left text-xs leading-snug",
                "transition-colors hover:border-blue-500/60 hover:bg-blue-500/5",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          No ideas yet - hit refresh.
        </p>
      )}
    </div>
  );
}

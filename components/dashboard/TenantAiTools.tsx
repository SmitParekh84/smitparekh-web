"use client";

import { useState } from "react";
import { Loader2, Lightbulb, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, type BlogPreferences } from "@/lib/blog-categories";
import { useUpdateMyPreferences, useGenerateMyTopics } from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";

interface TenantAiToolsProps {
  preferences?: BlogPreferences;
  onApplyTopic: (topic: string) => void;
}

/**
 * Niche/audience + category preferences (saved to the tenant) and an AI topic
 * generator whose tabs come from the selected categories. Mounts only once the
 * tenant data is available, so its state initialises correctly from props.
 */
export function TenantAiTools({ preferences, onApplyTopic }: TenantAiToolsProps) {
  const [niche, setNiche] = useState(preferences?.niche ?? "");
  const [audience, setAudience] = useState(preferences?.audience ?? "");
  const [cats, setCats] = useState<string[]>(preferences?.categories ?? []);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [topics, setTopics] = useState<string[]>([]);

  const savePrefs = useUpdateMyPreferences();
  const genTopics = useGenerateMyTopics();

  function toggleCat(c: string) {
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function handleSave() {
    try {
      await savePrefs.mutateAsync({ niche, audience, categories: cats });
      toast.success("Preferences saved", "AI suggestions will use these.");
    } catch {
      toast.error("Save failed", "Could not save preferences.");
    }
  }

  async function handleGenerate(category: string) {
    setActiveCat(category);
    try {
      const res = await genTopics.mutateAsync(category === "All" ? undefined : category);
      setTopics(res.data.topics);
    } catch {
      toast.error("Couldn't generate topics", "Try again in a moment.");
    }
  }

  // Generation tabs: the categories the tenant selected, plus an "All" option.
  const tabs = ["All", ...cats];

  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
        <Lightbulb className="h-4 w-4" />
        Topic ideas
      </div>

      {/* Niche + audience */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ai-niche" className="text-xs">
            Your blog niche
          </Label>
          <Textarea
            id="ai-niche"
            rows={2}
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Practical web dev tutorials for indie SaaS founders"
            className="resize-y text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ai-audience" className="text-xs">
            Target audience
          </Label>
          <Input
            id="ai-audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Early-stage founders, junior developers"
            className="h-9 text-sm"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-3">
        <Label className="text-xs">Categories you write about</Label>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {BLOG_CATEGORIES.map((c) => {
            const selected = cats.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCat(c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  selected
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-border bg-background text-muted-foreground hover:border-blue-500/60"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSave}
          disabled={savePrefs.isPending}
          className="gap-1.5"
        >
          {savePrefs.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save preferences
        </Button>
      </div>

      {/* Generation tabs */}
      <div className="mt-4 border-t border-blue-500/20 pt-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleGenerate(t)}
              disabled={genTopics.isPending}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-colors disabled:opacity-50",
                activeCat === t
                  ? "bg-blue-500 text-white"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {genTopics.isPending && activeCat === t ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              {t}
            </button>
          ))}
        </div>

        {topics.length > 0 ? (
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
          <p className="text-xs text-muted-foreground">
            Pick a tab to generate {tabs.length > 1 ? "category-specific" : ""} title ideas from your niche.
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WallpaperUploader } from "@/components/admin/WallpaperUploader";
import { WallpaperEditCard } from "@/components/admin/WallpaperEditCard";
import { useAdminWallpapers } from "@/hooks/api/use-wallpapers";

type Tab = "all" | "draft" | "published";

export default function AdminWallpapersPage() {
  const [tab, setTab] = useState<Tab>("all");
  const { data: wallpapers, isLoading, isError, refetch } = useAdminWallpapers();

  const categorySuggestions = useMemo(() => {
    const set = new Set<string>();
    (wallpapers ?? []).forEach((w) => w.category && set.add(w.category));
    return Array.from(set).sort();
  }, [wallpapers]);

  const filtered = useMemo(() => {
    const list = wallpapers ?? [];
    if (tab === "draft") return list.filter((w) => !w.isPublished);
    if (tab === "published") return list.filter((w) => w.isPublished);
    return list;
  }, [wallpapers, tab]);

  const draftCount = (wallpapers ?? []).filter((w) => !w.isPublished).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">Wallpapers</h1>
        <p className="text-[13px] text-muted-foreground">
          Upload wallpapers, add details, and publish them to the public gallery.
        </p>
      </div>

      <div className="theme-wallpapers">
        <WallpaperUploader />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {(
          [
            { key: "all", label: "All" },
            { key: "draft", label: "Drafts" },
            { key: "published", label: "Published" },
          ] as { key: Tab; label: string }[]
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              tab === t.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            {t.key === "draft" && draftCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/15 px-1 text-[10px] font-semibold text-amber-600">
                {draftCount}
              </span>
            )}
            {tab === t.key && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="px-6 py-12 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            Could not load wallpapers. Is the backend running?
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {tab === "all"
              ? "No wallpapers yet. Upload some above."
              : `No ${tab} wallpapers.`}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((w) => (
            <WallpaperEditCard
              key={w._id}
              wallpaper={w}
              categorySuggestions={categorySuggestions}
            />
          ))}
        </div>
      )}
    </div>
  );
}

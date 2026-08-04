"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { deviceLabels } from "@/lib/wallpaper-format";
import type { WallpaperCategory, WallpaperDevice } from "@/types";

const DEVICES: (WallpaperDevice | "all")[] = ["all", "phone", "tablet", "desktop"];

interface WallpaperFiltersProps {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  device: WallpaperDevice | "all";
  onDevice: (v: WallpaperDevice | "all") => void;
  categories: WallpaperCategory[];
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function WallpaperFilters({
  search,
  onSearch,
  category,
  onCategory,
  device,
  onDevice,
  categories,
}: WallpaperFiltersProps) {
  return (
    <div className="sticky top-16 z-20 border-b border-border bg-background/85 py-3 backdrop-blur-md">
      <div className="page-container space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search wallpapers..."
            className="pl-9 pr-9"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Device chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DEVICES.map((d) => (
            <Chip key={d} active={device === d} onClick={() => onDevice(d)}>
              {d === "all" ? "All devices" : deviceLabels[d]}
            </Chip>
          ))}
        </div>

        {/* Category chips (built from what actually exists) */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={category === "All"} onClick={() => onCategory("All")}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c.name}
                active={category === c.name}
                onClick={() => onCategory(c.name)}
              >
                {c.name}
                <span className="ml-1 opacity-60">{c.count}</span>
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

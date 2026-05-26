"use client";

import { cn } from "@/lib/utils";

export type DateRangeMode = "day" | "week" | "month" | "year";

export interface DateRange {
  mode: DateRangeMode;
  from: string; // ISO date string yyyy-mm-dd
  to: string;
}

const PRESETS: { label: string; mode: DateRangeMode }[] = [
  { label: "Today", mode: "day" },
  { label: "Week", mode: "week" },
  { label: "Month", mode: "month" },
  { label: "Year", mode: "year" },
];

function toISO(d: Date) {
  return d.toISOString().split("T")[0];
}

export function rangeFor(mode: DateRangeMode): DateRange {
  const now = new Date();
  const to = toISO(now);
  const from = new Date(now);

  if (mode === "day") {
    return { mode, from: to, to };
  }
  if (mode === "week") {
    from.setDate(now.getDate() - now.getDay());
    return { mode, from: toISO(from), to };
  }
  if (mode === "month") {
    from.setDate(1);
    return { mode, from: toISO(from), to };
  }
  // year
  from.setMonth(0, 1);
  return { mode, from: toISO(from), to };
}

interface DateRangeFilterProps {
  value: DateRangeMode;
  onChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangeFilter({ value, onChange, className }: DateRangeFilterProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-border bg-muted/40 p-1",
        className,
      )}
    >
      {PRESETS.map(({ label, mode }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(rangeFor(mode))}
          className={cn(
            "px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
            value === mode
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

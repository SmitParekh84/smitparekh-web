"use client";

import { Sparkles, Infinity as InfinityIcon } from "lucide-react";
import type { QuotaResult } from "@/hooks/api/use-tool-quota";

/**
 * Compact pill that shows "X / Y free uses left today" or unlimited.
 * Pass the `status` returned by useToolQuota.
 */
export function QuotaBadge({ status }: { status: QuotaResult | null }) {
  if (!status) return null;
  if (status.unlimited) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
        <InfinityIcon className="w-3 h-3" />
        Unlimited
      </span>
    );
  }
  if (status.remaining === null || status.quota === undefined) return null;

  const low = status.remaining <= 1;
  const out = status.remaining === 0;

  const cls = out
    ? "border-red-500/30 bg-red-500/10 text-red-500"
    : low
      ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
      : "border-blue-500/30 bg-blue-500/10 text-blue-500";

  const label =
    status.tier === "user"
      ? `${status.remaining} of ${status.quota} left today`
      : `${status.remaining} of ${status.quota} free uses left`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${cls}`}
    >
      <Sparkles className="w-3 h-3" />
      {label}
      {status.tier === "guest" && !out && (
        <span className="text-muted-foreground ml-1 hidden sm:inline">· Sign in for more</span>
      )}
    </span>
  );
}

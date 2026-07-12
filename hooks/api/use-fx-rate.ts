"use client";

import { useQuery } from "@tanstack/react-query";
import { FALLBACK_USD_INR_RATE } from "@/lib/currency";

/**
 * Live USD→INR rate for invoice-total display, fetched from our own
 * `/api/fx-rate` route (which caches the upstream call to once a day).
 * Returns the fixed fallback rate until the value loads or if it fails —
 * callers can always use the returned number directly.
 */
export function useUsdInrRate(): number {
  const { data } = useQuery({
    queryKey: ["fx", "usd-inr"],
    queryFn: async () => {
      const res = await fetch("/api/fx-rate");
      if (!res.ok) throw new Error("Failed to load exchange rate");
      const json = await res.json();
      const rate = Number(json?.rate);
      return Number.isFinite(rate) && rate > 0 ? rate : FALLBACK_USD_INR_RATE;
    },
    staleTime: 24 * 60 * 60 * 1000, // a day — matches the server cache window
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
  return data ?? FALLBACK_USD_INR_RATE;
}

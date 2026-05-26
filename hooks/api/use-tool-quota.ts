"use client";

import { useCallback, useEffect, useState } from "react";
import { getSessionId } from "@/lib/session";

export interface QuotaResult {
  allowed: boolean;
  remaining: number | null;
  quota?: number;
  tier?: "guest" | "user";
  unlimited?: boolean;
  code?: "QUOTA_EXCEEDED";
}

export interface UseToolQuota {
  checkQuota: () => Promise<QuotaResult>;
  refreshStatus: () => Promise<void>;
  isChecking: boolean;
  status: QuotaResult | null;
  lastResult: QuotaResult | null;
}

/**
 * Manages quota for a tool slug.
 * - `checkQuota()`: POST /use — consumes a slot, returns result.
 * - `refreshStatus()`: GET /use — reads current remaining without consuming.
 * - `status`: cached read-only status (auto-fetched on mount).
 */
export function useToolQuota(slug: string): UseToolQuota {
  const [isChecking, setIsChecking] = useState(false);
  const [lastResult, setLastResult] = useState<QuotaResult | null>(null);
  const [status, setStatus] = useState<QuotaResult | null>(null);

  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/tools/${slug}/use`, {
        method: "GET",
        headers: { "X-Session-ID": getSessionId() },
        cache: "no-store",
      });
      const data = (await res.json().catch(() => ({}))) as Partial<QuotaResult>;
      setStatus({
        allowed: data.allowed ?? true,
        remaining: data.remaining ?? null,
        quota: data.quota,
        tier: data.tier,
        unlimited: data.unlimited,
      });
    } catch {
      /* silent — UI just won't show remaining */
    }
  }, [slug]);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  const checkQuota = useCallback(async (): Promise<QuotaResult> => {
    setIsChecking(true);
    try {
      const res = await fetch(`/api/tools/${slug}/use`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": getSessionId(),
        },
      });

      const data = (await res.json().catch(() => ({}))) as Partial<QuotaResult>;

      if (res.status === 429) {
        const result: QuotaResult = {
          allowed: false,
          remaining: 0,
          quota: data.quota,
          tier: data.tier,
          code: "QUOTA_EXCEEDED",
        };
        setLastResult(result);
        setStatus(result);
        return result;
      }

      const result: QuotaResult = {
        allowed: data.allowed ?? true,
        remaining: data.remaining ?? null,
        quota: data.quota,
        tier: data.tier,
        unlimited: data.unlimited,
      };
      setLastResult(result);
      setStatus(result);
      return result;
    } catch {
      const result: QuotaResult = { allowed: true, remaining: null, unlimited: true };
      setLastResult(result);
      return result;
    } finally {
      setIsChecking(false);
    }
  }, [slug]);

  return { checkQuota, refreshStatus, isChecking, status, lastResult };
}

"use client";

import { useCallback, useState } from "react";
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
  isChecking: boolean;
  lastResult: QuotaResult | null;
}

/**
 * Calls `POST /api/tools/{slug}/use` to gate a tool invocation.
 * Returns the result so callers can decide whether to proceed or open the
 * login gate modal.
 */
export function useToolQuota(slug: string): UseToolQuota {
  const [isChecking, setIsChecking] = useState(false);
  const [lastResult, setLastResult] = useState<QuotaResult | null>(null);

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
      return result;
    } catch {
      // Network failure → fail open so users aren't blocked.
      const result: QuotaResult = { allowed: true, remaining: null, unlimited: true };
      setLastResult(result);
      return result;
    } finally {
      setIsChecking(false);
    }
  }, [slug]);

  return { checkQuota, isChecking, lastResult };
}

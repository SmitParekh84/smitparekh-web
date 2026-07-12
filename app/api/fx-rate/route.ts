import { NextResponse } from "next/server";
import { FALLBACK_USD_INR_RATE } from "@/lib/currency";

/**
 * USD→INR exchange rate for invoice-total display.
 *
 * The upstream fetch is cached in Next's Data Cache for a day (`revalidate`),
 * so frankfurter.app (free, no API key, ECB reference rates) is hit at most
 * once per day no matter how many visitors load the portal. If it's ever
 * unreachable we fall back to the fixed rate — the totals are display-only, so
 * a slightly stale rate is fine and never blocks the page.
 */

const ONE_DAY = 86_400;

// Route stays dynamic; the daily caching lives on the fetch below, so a
// transient upstream failure isn't cached as a fallback for a whole day.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR", {
      next: { revalidate: ONE_DAY },
    });
    if (!res.ok) throw new Error(`FX API responded ${res.status}`);
    const data = await res.json();
    const rate = Number(data?.rates?.INR);
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("FX API returned no usable rate");
    return NextResponse.json({ rate, source: "frankfurter", date: data?.date ?? null });
  } catch {
    return NextResponse.json({ rate: FALLBACK_USD_INR_RATE, source: "fallback", date: null });
  }
}

/**
 * Currency helpers for the client-portal / admin invoice views.
 *
 * Invoices are each stored in their own currency (USD or INR). Summary totals,
 * however, must be shown in a single display currency so we never add rupees to
 * dollars. Conversion uses a fixed rate (an edge case — a client is normally
 * billed in one currency), configurable via `NEXT_PUBLIC_USD_INR_RATE`.
 */

export type Currency = "USD" | "INR";

/**
 * Fallback USD→INR rate used until the live daily rate loads, or if the rate
 * API is unreachable. Optionally overridable via `NEXT_PUBLIC_USD_INR_RATE`,
 * but setting it is not required — the app fetches a fresh daily rate itself.
 */
export const FALLBACK_USD_INR_RATE = (() => {
  const raw = Number(process.env.NEXT_PUBLIC_USD_INR_RATE);
  return Number.isFinite(raw) && raw > 0 ? raw : 83;
})();

export const currencySymbol = (c: Currency) => (c === "INR" ? "₹" : "$");

/** Convert an amount between USD and INR. `rate` = INR per 1 USD. */
export function convert(
  amount: number,
  from: Currency,
  to: Currency,
  rate: number = FALLBACK_USD_INR_RATE
): number {
  if (from === to) return amount;
  return from === "USD" ? amount * rate : amount / rate;
}

/** Format an amount in its currency, e.g. `$1,200.00` / `₹450.00`. */
export function formatMoney(amount: number, currency: Currency): string {
  return `${currencySymbol(currency)}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Sum a list of invoices into a single display currency.
 * Each invoice is converted from its own currency into `display` first.
 */
export function sumInDisplayCurrency(
  invoices: { amount: number; currency: Currency }[],
  display: Currency,
  rate: number = FALLBACK_USD_INR_RATE
): number {
  return invoices.reduce(
    (total, inv) => total + convert(inv.amount, inv.currency, display, rate),
    0
  );
}

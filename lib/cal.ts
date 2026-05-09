/**
 * Cal.com booking config — single source of truth so we can swap event
 * types or links without hunting through the codebase.
 *
 * Used by:
 *   - <CalProvider /> in app/layout.tsx (loads the SDK + syncs theme)
 *   - <BookCallButton /> wherever a "Book a call" CTA appears
 *   - the AI contact-reply prompt (backend) when including a scheduling link
 */
export const CAL = {
  namespace: "15min" as const,
  link: "smit-parekh/15min" as const,
  layout: "month_view" as const,
  /** Public booking URL (used in emails/links where SDK can't run). */
  publicUrl: "https://cal.com/smit-parekh/15min",
};

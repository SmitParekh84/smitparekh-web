// Metric → analytics image-card helper.
// Service pages show "proof" stats (one value + label each). To build trust we
// render each stat as a 1:1 light-mode analytics card. Until a real image is
// dropped in, the card shows a styled placeholder + (in dev) the exact prompt
// to generate that image. This module derives the visual type and the prompt
// from the stat itself, so every current and future service page gets distinct,
// tailored prompts with zero per-page authoring.

export type MetricVisual =
  | "trend" // upward line/area chart - growth %, multipliers, "x→y"
  | "gauge" // circular progress ring - scores like 95+, 100, 99.9%
  | "counter" // ascending bars + big number - "N+" counts
  | "speed" // speedometer - "<100ms", "<2.5s" latency targets
  | "duration" // clock/timeline - "5 days", "48h", "4-8 wks"
  | "shield" // check/shield - "0" (zero bad things) + security badges
  | "rank" // podium - "Top 3"
  | "rating" // stars - "4.5★"
  | "badge"; // labeled chip - text values like "Stripe", "Geo-grid"

/** Classify a proof stat into a visual archetype for its analytics card. */
export function classifyMetric(value: string, label = ""): MetricVisual {
  const v = value.trim();
  const ctx = `${v} ${label}`;

  if (v === "0") return "shield";
  if (/★/.test(v)) return "rating";
  if (/^top\s*\d/i.test(v)) return "rank";
  if (/→/.test(v) || /×|x$/i.test(v)) return "trend";

  // Latency / speed targets: a comparator with a time unit.
  if (/[<≤]/.test(v) && /(ms|s|min|h)\b/i.test(v)) return "speed";

  // Time spans expressed as durations (no comparator).
  if (/\d/.test(v) && /(day|days|wk|wks|week|hour|hr|h\b|min)\b/i.test(v))
    return "duration";

  if (v.includes("%")) {
    if (/uptime/i.test(ctx) || (!/^[+\-~]/.test(v) && parseFloat(v) >= 90))
      return "gauge";
    return "trend";
  }

  // "N+" or numbers with k/m → a count.
  if (/\+$/.test(v) || /^\d+(\.\d+)?\s*[km]\+?$/i.test(v)) return "counter";

  // A bare number that isn't a count is usually a score.
  if (/^\d/.test(v)) return "counter";

  return "badge";
}

const VISUAL_CLAUSE: Record<MetricVisual, string> = {
  trend:
    "a smooth upward-trending line-and-area chart with a blue-to-cyan gradient fill under the line and a small green ▲ delta chip",
  gauge:
    "a circular progress ring filled with a blue-to-cyan gradient sweeping most of the way around, with the value centered inside the ring",
  counter:
    "a row of four ascending bar-chart columns in a blue-to-cyan gradient with the big number sitting above them",
  speed:
    "a sleek semicircular speedometer / latency gauge with the needle resting near the fast end and a blue-to-cyan gradient arc",
  duration:
    "a minimal timeline-and-clock motif with a single blue-to-cyan progress marker partway along it",
  shield:
    "a calm shield-with-checkmark emblem in emerald green sitting on a soft radial glow",
  rank:
    "a clean three-step winners' podium with the #1 position raised and highlighted in a blue-to-cyan gradient",
  rating:
    "a row of five rating stars filled with a blue-to-cyan gradient and a subtle soft reflection beneath",
  badge:
    "a single labeled pill/badge with one relevant minimalist line icon, finished in a blue-to-cyan accent",
};

/**
 * Build the image-generation prompt for a single metric card.
 * Distinct per metric because value + label + visual archetype all vary.
 */
export function buildMetricImagePrompt(
  value: string,
  label: string,
  serviceName: string,
  visual: MetricVisual = classifyMetric(value, label),
): string {
  return [
    "Light-mode UI metric card, 1:1 square aspect ratio, on a clean white to very-light-gray (#FFFFFF to #F8FAFC) background.",
    `Show ONE single KPI: the value "${value}" rendered large in a bold geometric sans-serif, with the caption "${label}" beneath it in muted slate-gray.`,
    `Include ${VISUAL_CLAUSE[visual]}.`,
    "Brand accent is a deep blue #0628FF to cyan #00C5EC gradient. Modern SaaS analytics-dashboard aesthetic: soft drop shadow, ~20px rounded corners, generous padding, a faint background grid.",
    `Context: a "${serviceName}" service results card. No logos, no watermark, no human faces, no extra paragraphs, no gibberish or lorem text. Crisp, high-detail, product-screenshot quality.`,
  ].join(" ");
}

/** Deterministic public path where the generated image for a card should live. */
export function metricImagePath(slug: string, index: number): string {
  return `/service-metrics/${slug}-${index + 1}.png`;
}

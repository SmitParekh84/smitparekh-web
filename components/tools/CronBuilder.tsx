"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const PRESETS: { label: string; expr: string }[] = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every 5 minutes", expr: "*/5 * * * *" },
  { label: "Every 15 minutes", expr: "*/15 * * * *" },
  { label: "Every hour", expr: "0 * * * *" },
  { label: "Every day @ midnight", expr: "0 0 * * *" },
  { label: "Every day @ 9 AM", expr: "0 9 * * *" },
  { label: "Every Monday @ 9 AM", expr: "0 9 * * 1" },
  { label: "Weekdays @ 9 AM", expr: "0 9 * * 1-5" },
  { label: "1st of month @ midnight", expr: "0 0 1 * *" },
  { label: "Every Sunday", expr: "0 0 * * 0" },
];

const FIELD_NAMES = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"] as const;
const FIELD_RANGES: [number, number][] = [
  [0, 59],
  [0, 23],
  [1, 31],
  [1, 12],
  [0, 6],
];
const DOW_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface FieldSet {
  values: Set<number>;
  raw: string;
}

function parseField(part: string, min: number, max: number, names?: string[]): FieldSet | null {
  const raw = part.trim();
  if (!raw) return null;
  const set = new Set<number>();
  for (const seg of raw.split(",")) {
    let s = seg.trim();
    let step = 1;
    if (s.includes("/")) {
      const [base, st] = s.split("/");
      step = parseInt(st, 10);
      if (!step || step < 1) return null;
      s = base;
    }
    let lo: number, hi: number;
    if (s === "*") {
      lo = min;
      hi = max;
    } else if (s.includes("-")) {
      const [a, b] = s.split("-");
      lo = nameToNum(a, min, max, names);
      hi = nameToNum(b, min, max, names);
      if (Number.isNaN(lo) || Number.isNaN(hi)) return null;
    } else {
      const n = nameToNum(s, min, max, names);
      if (Number.isNaN(n)) return null;
      lo = n;
      hi = n;
    }
    if (lo < min || hi > max || lo > hi) return null;
    for (let i = lo; i <= hi; i += step) set.add(i);
  }
  return { values: set, raw };
}

function nameToNum(s: string, min: number, max: number, names?: string[]): number {
  const t = s.trim().toLowerCase();
  if (names) {
    const idx = names.findIndex((n) => n.toLowerCase().startsWith(t));
    if (idx !== -1) return idx + min;
  }
  const n = parseInt(t, 10);
  return Number.isInteger(n) ? n : NaN;
}

interface ParsedCron {
  minute: FieldSet;
  hour: FieldSet;
  day: FieldSet;
  month: FieldSet;
  dow: FieldSet;
}

function parseCron(expr: string): { ok: ParsedCron | null; error?: string } {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { ok: null, error: "Cron expression must have 5 fields: minute hour day month dow" };
  }
  const minute = parseField(parts[0], 0, 59);
  const hour = parseField(parts[1], 0, 23);
  const day = parseField(parts[2], 1, 31);
  const month = parseField(parts[3], 1, 12, MONTH_NAMES);
  const dow = parseField(parts[4], 0, 6, DOW_NAMES);
  if (!minute) return { ok: null, error: "Invalid minute field" };
  if (!hour) return { ok: null, error: "Invalid hour field" };
  if (!day) return { ok: null, error: "Invalid day-of-month field" };
  if (!month) return { ok: null, error: "Invalid month field" };
  if (!dow) return { ok: null, error: "Invalid day-of-week field" };
  return { ok: { minute, hour, day, month, dow } };
}

function describeField(set: FieldSet, totalMin: number, totalMax: number, names?: string[]): string {
  const total = totalMax - totalMin + 1;
  if (set.values.size === total) return "every";
  const sorted = [...set.values].sort((a, b) => a - b);
  // detect step
  if (sorted.length > 1) {
    const step = sorted[1] - sorted[0];
    let isStep = step >= 2;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] - sorted[i - 1] !== step) {
        isStep = false;
        break;
      }
    }
    if (isStep && sorted[0] === totalMin && sorted[sorted.length - 1] + step > totalMax) {
      return `every ${step}`;
    }
  }
  if (names) return sorted.map((n) => names[n - totalMin]).join(", ");
  return sorted.join(", ");
}

function describeCron(p: ParsedCron): string {
  const minDesc = describeField(p.minute, 0, 59);
  const hourDesc = describeField(p.hour, 0, 23);
  const dayDesc = describeField(p.day, 1, 31);
  const monthDesc = describeField(p.month, 1, 12, MONTH_NAMES);
  const dowDesc = describeField(p.dow, 0, 6, DOW_NAMES);

  const parts: string[] = [];

  // time
  if (minDesc === "every" && hourDesc === "every") parts.push("Every minute");
  else if (minDesc.startsWith("every ")) {
    const n = minDesc.split(" ")[1];
    parts.push(`Every ${n} minutes`);
  } else if (minDesc === "every") parts.push("Every minute");
  else if (hourDesc === "every") parts.push(`At minute ${minDesc} of every hour`);
  else if (hourDesc.startsWith("every ")) parts.push(`At minute ${minDesc}, every ${hourDesc.split(" ")[1]} hours`);
  else {
    const hours = [...p.hour.values].sort((a, b) => a - b);
    const mins = [...p.minute.values].sort((a, b) => a - b);
    if (hours.length === 1 && mins.length === 1) {
      const h = hours[0];
      const m = mins[0];
      const hh = h.toString().padStart(2, "0");
      const mm = m.toString().padStart(2, "0");
      parts.push(`At ${hh}:${mm}`);
    } else {
      parts.push(`At minute ${minDesc} past hour ${hourDesc}`);
    }
  }

  if (dayDesc !== "every") parts.push(`on day ${dayDesc} of the month`);
  if (monthDesc !== "every") parts.push(`in ${monthDesc}`);
  if (dowDesc !== "every") parts.push(`on ${dowDesc}`);

  return parts.join(", ");
}

function nextRuns(p: ParsedCron, count = 5): Date[] {
  const results: Date[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  let cur = new Date(now.getTime() + 60_000);
  let safety = 0;
  while (results.length < count && safety < 366 * 24 * 60) {
    safety++;
    if (
      p.minute.values.has(cur.getMinutes()) &&
      p.hour.values.has(cur.getHours()) &&
      p.day.values.has(cur.getDate()) &&
      p.month.values.has(cur.getMonth() + 1) &&
      p.dow.values.has(cur.getDay())
    ) {
      results.push(new Date(cur));
    }
    cur = new Date(cur.getTime() + 60_000);
  }
  return results;
}

export default function CronBuilder() {
  const [expr, setExpr] = useState("*/15 * * * *");
  const [copied, setCopied] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const parsed = useMemo(() => parseCron(expr), [expr]);
  const upcoming = useMemo(
    () => (parsed.ok ? nextRuns(parsed.ok, 5) : []),
    [parsed],
  );

  async function copy() {
    await navigator.clipboard.writeText(expr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const fields = expr.trim().split(/\s+/);
  const validFields = parsed.ok;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Cron expression</label>
        <div className="flex gap-2">
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            spellCheck={false}
            className="flex-1 rounded-lg border border-border bg-muted/20 px-3 py-2 text-base font-mono outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-muted/20 px-3 hover:bg-muted/40"
            aria-label="Copy"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Field labels */}
      <div className="grid grid-cols-5 gap-2 text-center">
        {FIELD_NAMES.map((label, i) => (
          <div key={label} className="rounded-lg border border-border bg-muted/20 p-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="font-mono text-sm mt-1">{fields[i] ?? " - "}</div>
            <div className="text-[10px] text-muted-foreground">
              {FIELD_RANGES[i][0]}–{FIELD_RANGES[i][1]}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      {validFields ? (
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-1">
            Schedule
          </div>
          <p className="text-sm">{describeCron(validFields)}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          {parsed.error}
        </div>
      )}

      {/* Next runs */}
      {validFields && upcoming.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Next 5 runs (your local time)
          </div>
          <ul className="space-y-1 text-sm font-mono">
            {upcoming.map((d) => (
              <li key={d.toISOString()} className="flex items-center justify-between border-b border-border/40 pb-1 last:border-0">
                <span>{d.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((d.getTime() - nowMs) / 60_000)} min
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-1.5">
        <div className="text-xs font-medium text-muted-foreground">Common presets</div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.expr}
              onClick={() => setExpr(p.expr)}
              className="text-xs rounded-full border border-border bg-muted/20 px-3 py-1 hover:bg-blue-500/10 hover:border-blue-500/40 transition-colors"
            >
              <span className="font-mono mr-1.5 text-blue-500">{p.expr}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

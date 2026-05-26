"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Copy, Check } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "volume" | "area" | "speed" | "time" | "data";

interface Unit {
  key: string;
  label: string;
  // factor relative to base unit (or null for special e.g. temperature)
  toBase?: (v: number) => number;
  fromBase?: (v: number) => number;
  factor?: number;
}

const UNITS: Record<Category, Unit[]> = {
  length: [
    { key: "mm", label: "Millimeter", factor: 0.001 },
    { key: "cm", label: "Centimeter", factor: 0.01 },
    { key: "m", label: "Meter", factor: 1 },
    { key: "km", label: "Kilometer", factor: 1000 },
    { key: "in", label: "Inch", factor: 0.0254 },
    { key: "ft", label: "Foot", factor: 0.3048 },
    { key: "yd", label: "Yard", factor: 0.9144 },
    { key: "mi", label: "Mile", factor: 1609.344 },
  ],
  weight: [
    { key: "mg", label: "Milligram", factor: 0.001 },
    { key: "g", label: "Gram", factor: 1 },
    { key: "kg", label: "Kilogram", factor: 1000 },
    { key: "t", label: "Metric Ton", factor: 1_000_000 },
    { key: "oz", label: "Ounce", factor: 28.3495 },
    { key: "lb", label: "Pound", factor: 453.592 },
    { key: "st", label: "Stone", factor: 6350.29 },
  ],
  temperature: [
    { key: "C", label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    { key: "F", label: "Fahrenheit", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
    { key: "K", label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  volume: [
    { key: "ml", label: "Milliliter", factor: 0.001 },
    { key: "l", label: "Liter", factor: 1 },
    { key: "m3", label: "Cubic Meter", factor: 1000 },
    { key: "tsp", label: "Teaspoon (US)", factor: 0.00492892 },
    { key: "tbsp", label: "Tablespoon (US)", factor: 0.0147868 },
    { key: "floz", label: "Fluid Ounce (US)", factor: 0.0295735 },
    { key: "cup", label: "Cup (US)", factor: 0.236588 },
    { key: "pt", label: "Pint (US)", factor: 0.473176 },
    { key: "qt", label: "Quart (US)", factor: 0.946353 },
    { key: "gal", label: "Gallon (US)", factor: 3.78541 },
  ],
  area: [
    { key: "mm2", label: "Sq Millimeter", factor: 0.000001 },
    { key: "cm2", label: "Sq Centimeter", factor: 0.0001 },
    { key: "m2", label: "Sq Meter", factor: 1 },
    { key: "ha", label: "Hectare", factor: 10000 },
    { key: "km2", label: "Sq Kilometer", factor: 1_000_000 },
    { key: "in2", label: "Sq Inch", factor: 0.00064516 },
    { key: "ft2", label: "Sq Foot", factor: 0.092903 },
    { key: "ac", label: "Acre", factor: 4046.86 },
    { key: "mi2", label: "Sq Mile", factor: 2_589_988.11 },
  ],
  speed: [
    { key: "mps", label: "Meters / second", factor: 1 },
    { key: "kmh", label: "Kilometers / hour", factor: 1 / 3.6 },
    { key: "mph", label: "Miles / hour", factor: 0.44704 },
    { key: "knot", label: "Knot", factor: 0.514444 },
    { key: "fps", label: "Feet / second", factor: 0.3048 },
  ],
  time: [
    { key: "ms", label: "Millisecond", factor: 0.001 },
    { key: "s", label: "Second", factor: 1 },
    { key: "min", label: "Minute", factor: 60 },
    { key: "h", label: "Hour", factor: 3600 },
    { key: "d", label: "Day", factor: 86400 },
    { key: "wk", label: "Week", factor: 604800 },
    { key: "yr", label: "Year (365 d)", factor: 31_536_000 },
  ],
  data: [
    { key: "B", label: "Byte", factor: 1 },
    { key: "KB", label: "Kilobyte (1000)", factor: 1000 },
    { key: "MB", label: "Megabyte (1000²)", factor: 1_000_000 },
    { key: "GB", label: "Gigabyte (1000³)", factor: 1_000_000_000 },
    { key: "TB", label: "Terabyte (1000⁴)", factor: 1_000_000_000_000 },
    { key: "KiB", label: "Kibibyte (1024)", factor: 1024 },
    { key: "MiB", label: "Mebibyte (1024²)", factor: 1024 * 1024 },
    { key: "GiB", label: "Gibibyte (1024³)", factor: 1024 ** 3 },
    { key: "TiB", label: "Tebibyte (1024⁴)", factor: 1024 ** 4 },
  ],
};

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  volume: "Volume",
  area: "Area",
  speed: "Speed",
  time: "Time",
  data: "Data Size",
};

function convert(value: number, from: Unit, to: Unit): number {
  // Temperature special case
  if (from.toBase && to.fromBase) {
    return to.fromBase(from.toBase(value));
  }
  if (from.factor != null && to.factor != null) {
    return (value * from.factor) / to.factor;
  }
  return value;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || (abs < 1e-4 && abs > 0)) return n.toExponential(6);
  return Number(n.toFixed(8)).toString();
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [fromKey, setFromKey] = useState("m");
  const [toKey, setToKey] = useState("ft");
  const [input, setInput] = useState("1");
  const [copied, setCopied] = useState(false);

  const units = UNITS[category];
  const fromUnit = units.find((u) => u.key === fromKey) ?? units[0];
  const toUnit = units.find((u) => u.key === toKey) ?? units[1] ?? units[0];

  const value = parseFloat(input);
  const result = useMemo(
    () => (Number.isFinite(value) ? convert(value, fromUnit, toUnit) : NaN),
    [value, fromUnit, toUnit],
  );

  function changeCategory(c: Category) {
    setCategory(c);
    const u = UNITS[c];
    setFromKey(u[0].key);
    setToKey((u[1] ?? u[0]).key);
  }

  function swap() {
    setFromKey(toKey);
    setToKey(fromKey);
  }

  async function copy() {
    await navigator.clipboard.writeText(formatNum(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(UNITS) as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => changeCategory(c)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              category === c
                ? "border-blue-500 bg-blue-500/10 text-blue-500 font-medium"
                : "border-border bg-muted/20 text-muted-foreground hover:text-foreground"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-3 items-end">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">From</label>
          <select
            value={fromKey}
            onChange={(e) => setFromKey(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {units.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-base font-mono outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <button
          onClick={swap}
          className="self-center sm:self-end mb-1 mx-auto p-2.5 rounded-full border border-border bg-muted/20 hover:bg-blue-500/10 hover:border-blue-500/40 transition-colors"
          aria-label="Swap units"
        >
          <ArrowDownUp className="w-4 h-4" />
        </button>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">To</label>
          <select
            value={toKey}
            onChange={(e) => setToKey(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {units.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
          <div className="flex items-stretch gap-2">
            <div className="flex-1 rounded-lg border border-border bg-blue-500/5 px-3 py-2 text-base font-mono select-all break-all">
              {formatNum(result)}
            </div>
            <button
              onClick={copy}
              className="rounded-lg border border-border bg-muted/20 px-3 hover:bg-muted/40 transition-colors"
              aria-label="Copy"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/20 p-3 text-xs text-muted-foreground">
        <strong className="text-foreground">{formatNum(value)}</strong>{" "}
        <span>{fromUnit.label}</span> = <strong className="text-foreground">{formatNum(result)}</strong>{" "}
        <span>{toUnit.label}</span>
      </div>
    </div>
  );
}

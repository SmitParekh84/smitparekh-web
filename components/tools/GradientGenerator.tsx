"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Plus, X, Shuffle } from "lucide-react";

type GradType = "linear" | "radial" | "conic";

interface Stop {
  id: string;
  color: string;
  pos: number;
}

const PRESETS: Stop[][] = [
  [
    { id: "a", color: "#3b82f6", pos: 0 },
    { id: "b", color: "#06b6d4", pos: 100 },
  ],
  [
    { id: "a", color: "#ec4899", pos: 0 },
    { id: "b", color: "#8b5cf6", pos: 50 },
    { id: "c", color: "#3b82f6", pos: 100 },
  ],
  [
    { id: "a", color: "#f59e0b", pos: 0 },
    { id: "b", color: "#ef4444", pos: 100 },
  ],
  [
    { id: "a", color: "#10b981", pos: 0 },
    { id: "b", color: "#059669", pos: 100 },
  ],
  [
    { id: "a", color: "#0f172a", pos: 0 },
    { id: "b", color: "#1e293b", pos: 100 },
  ],
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function buildCss(type: GradType, angle: number, stops: Stop[]): string {
  const sorted = [...stops].sort((a, b) => a.pos - b.pos);
  const list = sorted.map((s) => `${s.color} ${s.pos}%`).join(", ");
  if (type === "linear") return `linear-gradient(${angle}deg, ${list})`;
  if (type === "radial") return `radial-gradient(circle, ${list})`;
  return `conic-gradient(from ${angle}deg, ${list})`;
}

function CopyBtn({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium hover:border-blue-500/40"
    >
      {done ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? "Copied" : label}
    </button>
  );
}

export default function GradientGenerator() {
  const [type, setType] = useState<GradType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>(PRESETS[0]);

  const css = useMemo(() => buildCss(type, angle, stops), [type, angle, stops]);
  const fullRule = `background: ${css};`;
  const tailwindArbitrary = useMemo(() => {
    const inner = css.replace(/\s+/g, "_");
    return `bg-[${inner}]`;
  }, [css]);

  return (
    <div className="space-y-5">
      <div
        className="aspect-[2/1] w-full rounded-xl border border-border shadow-inner"
        style={{ background: css }}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Type</p>
            <div className="flex gap-2">
              {(["linear", "radial", "conic"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 rounded-md border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                    type === t
                      ? "border-blue-500 bg-blue-500/10 text-blue-500"
                      : "border-border bg-background hover:border-blue-500/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {type !== "radial" && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">Angle</p>
                <span className="text-xs font-mono">{angle}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Color stops</p>
              <button
                type="button"
                onClick={() =>
                  setStops((s) => [...s, { id: uid(), color: "#888888", pos: 50 }])
                }
                className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium hover:border-blue-500/40"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {stops.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={s.color}
                    onChange={(e) =>
                      setStops((arr) => arr.map((x) => (x.id === s.id ? { ...x, color: e.target.value } : x)))
                    }
                    className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                  />
                  <input
                    type="text"
                    value={s.color}
                    onChange={(e) =>
                      setStops((arr) => arr.map((x) => (x.id === s.id ? { ...x, color: e.target.value } : x)))
                    }
                    className="w-24 rounded-md border border-border bg-background px-2 py-1 font-mono text-xs"
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={s.pos}
                    onChange={(e) =>
                      setStops((arr) =>
                        arr.map((x) => (x.id === s.id ? { ...x, pos: Number(e.target.value) } : x)),
                      )
                    }
                    className="flex-1 accent-blue-500"
                  />
                  <span className="w-10 text-right font-mono text-xs">{s.pos}%</span>
                  {stops.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setStops((arr) => arr.filter((x) => x.id !== s.id))}
                      className="rounded-md border border-border p-1 text-muted-foreground hover:text-red-500 hover:border-red-500/40"
                      aria-label={`Remove stop ${idx + 1}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStops(p.map((s) => ({ ...s, id: uid() })))}
                  className="h-9 w-14 rounded-md border border-border"
                  style={{ background: buildCss("linear", 135, p) }}
                  aria-label={`Preset ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  const rand = (): Stop => ({
                    id: uid(),
                    color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`,
                    pos: 0,
                  });
                  const a = rand();
                  const b = { ...rand(), pos: 100 };
                  setStops([a, b]);
                  setAngle(Math.floor(Math.random() * 360));
                }}
                className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-3 text-xs font-medium hover:border-blue-500/40"
              >
                <Shuffle className="h-3.5 w-3.5" /> Random
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Out label="CSS value" value={css} />
          <Out label="CSS rule" value={fullRule} />
          <Out label="Tailwind arbitrary" value={tailwindArbitrary} />
        </div>
      </div>
    </div>
  );
}

function Out({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <p className="text-xs font-semibold">{label}</p>
        <CopyBtn value={value} />
      </div>
      <pre className="m-0 overflow-auto bg-muted/30 px-3 py-2 font-mono text-[11px] whitespace-pre-wrap break-all">
        {value}
      </pre>
    </div>
  );
}

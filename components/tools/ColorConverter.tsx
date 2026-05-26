"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hexToRgb(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 4) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function rgbToHex({ r, g, b, a }: RGB): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  let s = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) s += Math.round(a * 255).toString(16).padStart(2, "0");
  return s.toUpperCase();
}

function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number, a = 1): RGB {
  const sn = s / 100,
    ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
}

export default function ColorConverter() {
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246, a: 1 });
  const [hexInput, setHexInputState] = useState("#3B82F6");
  const [copied, setCopied] = useState<string>("");

  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const hex = useMemo(() => rgbToHex(rgb), [rgb]);

  // Keep hexInput in sync when rgb changes via non-hex inputs.
  // We avoid useEffect by deriving instead — only update local state
  // when the user is NOT actively typing in the hex field.
  function setRgbAndHex(next: RGB) {
    setRgb(next);
    setHexInputState(rgbToHex(next));
  }

  const formats = useMemo(
    () => [
      { name: "HEX", value: hex },
      {
        name: "RGB",
        value:
          rgb.a < 1
            ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`
            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      },
      {
        name: "HSL",
        value:
          rgb.a < 1
            ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${rgb.a.toFixed(2)})`
            : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      },
      { name: "CSS", value: `--color: ${hex};` },
    ],
    [hex, rgb, hsl],
  );

  function handleHexChange(v: string) {
    setHexInputState(v);
    const parsed = hexToRgb(v);
    if (parsed) setRgb(parsed);
  }

  function setRgbField(k: keyof RGB, v: number) {
    const next = {
      ...rgb,
      [k]: k === "a" ? clamp(v, 0, 1) : clamp(Math.round(v), 0, 255),
    };
    setRgbAndHex(next);
  }

  function setHslField(k: "h" | "s" | "l", v: number) {
    const nextHsl = { ...hsl, [k]: v };
    const r = hslToRgb(
      clamp(Math.round(nextHsl.h), 0, 360),
      clamp(Math.round(nextHsl.s), 0, 100),
      clamp(Math.round(nextHsl.l), 0, 100),
      rgb.a,
    );
    setRgbAndHex(r);
  }

  async function handleCopy(name: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(name);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="space-y-4">
      <div
        className="h-32 rounded-xl border border-border shadow-inner relative overflow-hidden"
        style={{
          backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
          backgroundImage:
            rgb.a < 1
              ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
              : undefined,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">HEX</label>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
            spellCheck={false}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Native picker</label>
          <input
            type="color"
            value={hex.slice(0, 7)}
            onChange={(e) => {
              const p = hexToRgb(e.target.value);
              if (p) setRgbAndHex({ ...p, a: rgb.a });
            }}
            className="w-full h-9 rounded-lg border border-border bg-muted/20 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {(["r", "g", "b"] as const).map((k) => (
          <div key={k} className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase">{k}</label>
            <input
              type="number"
              min={0}
              max={255}
              value={rgb[k]}
              onChange={(e) => setRgbField(k, Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted/20 px-2 py-1.5 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
            />
          </div>
        ))}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground uppercase">A</label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={rgb.a}
            onChange={(e) => setRgbField("a", Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-muted/20 px-2 py-1.5 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">H ({hsl.h}°)</label>
          <input
            type="range"
            min={0}
            max={360}
            value={hsl.h}
            onChange={(e) => setHslField("h", Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">S ({hsl.s}%)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.s}
            onChange={(e) => setHslField("s", Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">L ({hsl.l}%)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.l}
            onChange={(e) => setHslField("l", Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        {formats.map((f) => (
          <div
            key={f.name}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2"
          >
            <span className="text-xs font-semibold text-blue-500 w-12">{f.name}</span>
            <code className="text-xs font-mono flex-1 truncate select-all">{f.value}</code>
            <button
              onClick={() => handleCopy(f.name, f.value)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              {copied === f.name ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied === f.name ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

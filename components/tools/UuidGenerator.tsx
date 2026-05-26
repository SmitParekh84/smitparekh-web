"use client";

import { useCallback, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const NIL = "00000000-0000-0000-0000-000000000000";
const MAX_NIL = "ffffffff-ffff-ffff-ffff-ffffffffffff";

function uuidv4Fallback(): string {
  // RFC4122 v4 fallback if crypto.randomUUID is unavailable
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return `${h.slice(0, 4).join("")}-${h.slice(4, 6).join("")}-${h.slice(6, 8).join("")}-${h.slice(8, 10).join("")}-${h.slice(10, 16).join("")}`;
}

function uuidv4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return uuidv4Fallback();
}

function uuidv7(): string {
  // Time-ordered UUID v7 (Unix ms timestamp + random)
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  const ts = Date.now();
  const tsHi = Math.floor(ts / 0x100000000);
  const tsLo = ts >>> 0;
  bytes[0] = (tsHi >>> 8) & 0xff;
  bytes[1] = tsHi & 0xff;
  bytes[2] = (tsLo >>> 24) & 0xff;
  bytes[3] = (tsLo >>> 16) & 0xff;
  bytes[4] = (tsLo >>> 8) & 0xff;
  bytes[5] = tsLo & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
  const h = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return `${h.slice(0, 4).join("")}-${h.slice(4, 6).join("")}-${h.slice(6, 8).join("")}-${h.slice(8, 10).join("")}-${h.slice(10, 16).join("")}`;
}

type Version = "v4" | "v7" | "nil" | "max";

interface Options {
  version: Version;
  count: number;
  uppercase: boolean;
  noHyphens: boolean;
  braces: boolean;
}

function generate(opts: Options): string[] {
  const arr: string[] = [];
  for (let i = 0; i < opts.count; i++) {
    let id =
      opts.version === "v4"
        ? uuidv4()
        : opts.version === "v7"
        ? uuidv7()
        : opts.version === "nil"
        ? NIL
        : MAX_NIL;
    if (opts.noHyphens) id = id.replace(/-/g, "");
    if (opts.uppercase) id = id.toUpperCase();
    if (opts.braces) id = `{${id}}`;
    arr.push(id);
  }
  return arr;
}

export default function UuidGenerator() {
  const [opts, setOpts] = useState<Options>({
    version: "v4",
    count: 5,
    uppercase: false,
    noHyphens: false,
    braces: false,
  });
  const [ids, setIds] = useState<string[]>(() =>
    generate({ version: "v4", count: 5, uppercase: false, noHyphens: false, braces: false }),
  );
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const regen = useCallback(() => setIds(generate(opts)), [opts]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Version">
          <select
            value={opts.version}
            onChange={(e) => setOpts((o) => ({ ...o, version: e.target.value as Version }))}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="v4">UUID v4 (random)</option>
            <option value="v7">UUID v7 (time-ordered)</option>
            <option value="nil">NIL (all zero)</option>
            <option value="max">MAX (all f)</option>
          </select>
        </Field>
        <Field label="Count">
          <input
            type="number"
            min={1}
            max={1000}
            value={opts.count}
            onChange={(e) => setOpts((o) => ({ ...o, count: Math.max(1, Math.min(1000, Number(e.target.value) || 1)) }))}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm font-mono"
          />
        </Field>
        <label className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={opts.uppercase}
            onChange={(e) => setOpts((o) => ({ ...o, uppercase: e.target.checked }))}
          />
          <span>UPPERCASE</span>
        </label>
        <label className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={opts.noHyphens}
            onChange={(e) => setOpts((o) => ({ ...o, noHyphens: e.target.checked }))}
          />
          <span>No hyphens</span>
        </label>
        <label className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={opts.braces}
            onChange={(e) => setOpts((o) => ({ ...o, braces: e.target.checked }))}
          />
          <span>{"Wrap {…}"}</span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={regen}
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Generate
        </button>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(ids.join("\n"));
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 1500);
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:border-blue-500/40"
        >
          {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copiedAll ? "Copied" : "Copy all"}
        </button>
      </div>

      <ul className="divide-y divide-border rounded-lg border border-border bg-muted/30">
        {ids.map((id, i) => (
          <li key={i} className="flex items-center justify-between gap-3 px-3 py-2">
            <code className="break-all font-mono text-xs">{id}</code>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(id);
                setCopiedIdx(i);
                setTimeout(() => setCopiedIdx(null), 1200);
              }}
              className="shrink-0 rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium hover:border-blue-500/40"
            >
              {copiedIdx === i ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground">
        UUIDs are generated locally using the Web Crypto API. Nothing is sent to a server.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

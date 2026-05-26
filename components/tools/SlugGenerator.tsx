"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

interface Options {
  separator: string;
  lowercase: boolean;
  stripStop: boolean;
  maxLength: number;
  collapseDashes: boolean;
}

const STOPWORDS = new Set([
  "a", "an", "and", "as", "at", "be", "but", "by", "for", "if", "in", "is", "it",
  "of", "on", "or", "the", "to", "with", "from", "this", "that", "we", "you",
]);

function slugify(text: string, opts: Options): string {
  let s = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  // ascii fold for common ligatures
  s = s.replace(/ß/g, "ss").replace(/œ/gi, "oe").replace(/æ/gi, "ae");
  if (opts.lowercase) s = s.toLowerCase();
  s = s.replace(/['"`’]/g, "");
  // split into tokens by non-alphanumerics
  let tokens = s.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (opts.stripStop) tokens = tokens.filter((t) => !STOPWORDS.has(t.toLowerCase()));
  let out = tokens.join(opts.separator || "-");
  if (opts.collapseDashes && opts.separator) {
    const sep = opts.separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(`${sep}{2,}`, "g"), opts.separator);
    out = out.replace(new RegExp(`^${sep}|${sep}$`, "g"), "");
  }
  if (opts.maxLength > 0 && out.length > opts.maxLength) {
    out = out.slice(0, opts.maxLength);
    if (opts.separator) {
      const idx = out.lastIndexOf(opts.separator);
      if (idx > opts.maxLength * 0.6) out = out.slice(0, idx);
    }
  }
  return out;
}

const SAMPLE = `10 Best React Hooks You Should Know in 2025
How to Build a Portfolio with Next.js & Tailwind
Über die Größe der Frühstücksbox`;

export default function SlugGenerator() {
  const [input, setInput] = useState(SAMPLE);
  const [opts, setOpts] = useState<Options>({
    separator: "-",
    lowercase: true,
    stripStop: false,
    maxLength: 80,
    collapseDashes: true,
  });
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const lines = useMemo(() => input.split(/\r?\n/), [input]);
  const slugs = useMemo(
    () => lines.map((l) => (l.trim() ? slugify(l, opts) : "")),
    [lines, opts],
  );

  const allText = slugs.join("\n");

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Separator">
          <select
            value={opts.separator}
            onChange={(e) => setOpts((o) => ({ ...o, separator: e.target.value }))}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="-">- (hyphen)</option>
            <option value="_">_ (underscore)</option>
            <option value=".">. (dot)</option>
            <option value="">none</option>
          </select>
        </Field>
        <Field label="Max length">
          <input
            type="number"
            min={0}
            max={200}
            value={opts.maxLength}
            onChange={(e) => setOpts((o) => ({ ...o, maxLength: Number(e.target.value) }))}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm font-mono"
          />
        </Field>
        <label className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={opts.lowercase}
            onChange={(e) => setOpts((o) => ({ ...o, lowercase: e.target.checked }))}
          />
          <span>Lowercase</span>
        </label>
        <label className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={opts.stripStop}
            onChange={(e) => setOpts((o) => ({ ...o, stripStop: e.target.checked }))}
          />
          <span>Strip stop words</span>
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Input — one per line</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            rows={14}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Paste titles or strings, one per line"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Slugs</label>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(allText);
                setCopiedAll(true);
                setTimeout(() => setCopiedAll(false), 1500);
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium hover:border-blue-500/40"
            >
              {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedAll ? "Copied" : "Copy all"}
            </button>
          </div>
          <div className="max-h-[24rem] overflow-auto rounded-lg border border-border bg-muted/30">
            {slugs.length === 0 || slugs.every((s) => !s) ? (
              <p className="p-4 text-sm text-muted-foreground">Type something to see slugs.</p>
            ) : (
              <ul className="divide-y divide-border">
                {slugs.map((slug, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 px-3 py-2">
                    <code className="break-all font-mono text-xs">{slug || <span className="text-muted-foreground italic">(empty)</span>}</code>
                    {slug && (
                      <button
                        type="button"
                        onClick={async () => {
                          await navigator.clipboard.writeText(slug);
                          setCopiedIdx(i);
                          setTimeout(() => setCopiedIdx(null), 1200);
                        }}
                        className="shrink-0 rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium hover:border-blue-500/40"
                      >
                        {copiedIdx === i ? "Copied" : "Copy"}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
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

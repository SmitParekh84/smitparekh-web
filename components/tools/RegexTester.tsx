"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Trash2, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

const COMMON_PATTERNS: { label: string; pattern: string; flags: string }[] = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL", pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*", flags: "g" },
  { label: "Phone (intl)", pattern: "\\+?[1-9]\\d{1,14}", flags: "g" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { label: "UUID", pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}", flags: "gi" },
  { label: "Date YYYY-MM-DD", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])", flags: "g" },
  { label: "Time HH:MM", pattern: "(?:[01]\\d|2[0-3]):[0-5]\\d", flags: "g" },
  { label: "Hex color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "g" },
  { label: "Slug", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", flags: "" },
  { label: "Username", pattern: "^[a-zA-Z0-9_]{3,20}$", flags: "" },
  { label: "Positive int", pattern: "^[1-9]\\d*$", flags: "" },
  { label: "Whitespace", pattern: "\\s+", flags: "g" },
];

const FLAG_DESCRIPTIONS: Record<string, string> = {
  g: "Global - find all matches",
  i: "Case-insensitive",
  m: "Multiline - ^ and $ match line breaks",
  s: "Dotall - . matches newlines",
  u: "Unicode",
  y: "Sticky - match from lastIndex",
};

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [replace, setReplace] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { matches, error, regex, replaced } = useMemo(() => {
    if (!pattern) {
      return { matches: [] as MatchInfo[], error: "", regex: null as RegExp | null, replaced: "" };
    }
    try {
      const re = new RegExp(pattern, flags);
      const out: MatchInfo[] = [];
      if (text) {
        if (flags.includes("g")) {
          for (const m of text.matchAll(re)) {
            out.push({
              match: m[0],
              index: m.index ?? 0,
              groups: m.slice(1),
            });
          }
        } else {
          const m = text.match(re);
          if (m) {
            out.push({
              match: m[0],
              index: m.index ?? 0,
              groups: m.slice(1),
            });
          }
        }
      }
      const rep = showReplace && text ? text.replace(re, replace) : "";
      return { matches: out, error: "", regex: re, replaced: rep };
    } catch (e) {
      return {
        matches: [] as MatchInfo[],
        error: e instanceof Error ? e.message : "Invalid regex",
        regex: null,
        replaced: "",
      };
    }
  }, [pattern, flags, text, replace, showReplace]);

  function toggleFlag(f: string) {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  }

  function highlightedText() {
    if (!regex || !text || matches.length === 0) {
      return <span className="text-muted-foreground">{text || "Matches will be highlighted here…"}</span>;
    }
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    matches.forEach((m, i) => {
      if (m.index > cursor) parts.push(<span key={`t-${i}`}>{text.slice(cursor, m.index)}</span>);
      parts.push(
        <mark
          key={`m-${i}`}
          className="bg-blue-500/30 text-foreground rounded px-0.5"
          title={`Match ${i + 1}`}
        >
          {m.match}
        </mark>,
      );
      cursor = m.index + m.match.length;
      if (m.match.length === 0) cursor += 1;
    });
    if (cursor < text.length) parts.push(<span key="end">{text.slice(cursor)}</span>);
    return parts;
  }

  async function handleCopy(val: string) {
    await navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowPatterns((p) => !p)}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Common patterns
          {showPatterns ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {showPatterns && (
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-muted/20 p-3">
            {COMMON_PATTERNS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => { setPattern(p.pattern); setFlags(p.flags || "g"); setShowPatterns(false); }}
                className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Pattern</label>
        <div className="flex items-stretch gap-2">
          <span className="flex items-center px-2 rounded-lg border border-border bg-muted/20 text-muted-foreground text-xs font-mono">
            /
          </span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="^[a-z]+$"
            className="flex-1 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
            spellCheck={false}
          />
          <span className="flex items-center px-2 rounded-lg border border-border bg-muted/20 text-muted-foreground text-xs font-mono">
            /{flags}
          </span>
        </div>
        {error && (
          <p className="text-xs text-red-500 font-mono">{error}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {Object.entries(FLAG_DESCRIPTIONS).map(([f, desc]) => (
          <button
            key={f}
            onClick={() => toggleFlag(f)}
            title={desc}
            className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
              flags.includes(f)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-muted/20 border-border hover:bg-muted text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => {
            setPattern("");
            setText("");
            setReplace("");
          }}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Test String</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to test against the regex…"
          className="w-full h-32 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 resize-none transition-shadow"
          spellCheck={false}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Highlighted Result · {matches.length} match{matches.length === 1 ? "" : "es"}
        </label>
        <div className="rounded-lg border border-border bg-muted/10 p-3 text-xs font-mono whitespace-pre-wrap break-words min-h-[3rem]">
          {highlightedText()}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={showReplace}
            onChange={(e) => setShowReplace(e.target.checked)}
            className="rounded border-border"
          />
          Replace mode
        </label>
        {showReplace && (
          <>
            <input
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              placeholder="Replacement string ($1, $2 for groups)"
              className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
              spellCheck={false}
            />
            <div className="rounded-lg border border-border bg-muted/10 p-3 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">Output</span>
                {replaced && (
                  <button
                    onClick={() => handleCopy(replaced)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
              <p className="text-xs font-mono whitespace-pre-wrap break-words text-foreground/90">
                {replaced || <span className="text-muted-foreground">Replaced text appears here…</span>}
              </p>
            </div>
          </>
        )}
      </div>

      {matches.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/10 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowDetails((d) => !d)}
            className="flex items-center justify-between w-full px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
          >
            <span>Match details ({matches.length})</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showDetails && (
            <div className="px-3 pb-3 space-y-2 max-h-64 overflow-y-auto border-t border-border pt-2">
              {matches.map((m, i) => (
                <div key={i} className="text-xs font-mono border-l-2 border-blue-500 pl-2">
                  <div>
                    <span className="text-muted-foreground">#{i + 1} @ {m.index}:</span>{" "}
                    <span className="text-blue-500">{JSON.stringify(m.match)}</span>
                  </div>
                  {m.groups.length > 0 && (
                    <div className="text-muted-foreground mt-0.5">
                      {m.groups.map((g, gi) => (
                        <div key={gi}>
                          Group {gi + 1}: {g === undefined ? "undefined" : JSON.stringify(g)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

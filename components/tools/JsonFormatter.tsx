"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle, Minimize2, Maximize2, Trash2 } from "lucide-react";

type Mode = "format" | "minify";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  function process(raw: string, m: Mode, spaces: number) {
    if (!raw.trim()) { setOutput(""); setError(""); return; }
    try {
      const parsed = JSON.parse(raw);
      setError("");
      if (m === "format") {
        setOutput(JSON.stringify(parsed, null, spaces));
      } else {
        setOutput(JSON.stringify(parsed));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function handleInput(val: string) {
    setInput(val);
    process(val, mode, indent);
  }

  function handleMode(m: Mode) {
    setMode(m);
    process(input, m, indent);
  }

  function handleIndent(n: number) {
    setIndent(n);
    process(input, mode, n);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
          <button
            onClick={() => handleMode("format")}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
              mode === "format" ? "bg-blue-500 text-white" : "hover:bg-muted"
            }`}
          >
            <Maximize2 className="w-3 h-3" /> Beautify
          </button>
          <button
            onClick={() => handleMode("minify")}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors border-l border-border ${
              mode === "minify" ? "bg-blue-500 text-white" : "hover:bg-muted"
            }`}
          >
            <Minimize2 className="w-3 h-3" /> Minify
          </button>
        </div>

        {mode === "format" && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Indent:</span>
            {[2, 4].map((n) => (
              <button
                key={n}
                onClick={() => handleIndent(n)}
                className={`w-7 h-7 rounded-lg border text-xs font-medium transition-colors ${
                  indent === n ? "bg-blue-500 text-white border-blue-500" : "border-border hover:bg-muted"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleClear}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder='{"name": "Smit", "role": "developer"}'
            className="w-full h-52 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 resize-none transition-shadow"
            spellCheck={false}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">
              {mode === "format" ? "Formatted" : "Minified"} Output
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Output appears here…"
              className="w-full h-52 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none resize-none text-muted-foreground"
              spellCheck={false}
            />
            {error && (
              <div className="absolute inset-0 rounded-lg border border-red-500/30 bg-red-500/5 p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-500 font-mono leading-relaxed">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {output && (
        <p className="text-xs text-muted-foreground text-right">
          {output.length.toLocaleString()} characters
        </p>
      )}
    </div>
  );
}

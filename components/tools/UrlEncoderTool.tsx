"use client";

import { useState } from "react";
import { Copy, Check, ArrowLeftRight, Trash2 } from "lucide-react";

type Mode = "encode" | "decode";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);
  const [component, setComponent] = useState(true);

  function process(val: string, m: Mode, comp: boolean) {
    if (!val) {
      setOutput("");
      setError("");
      return;
    }
    try {
      if (m === "encode") {
        setOutput(comp ? encodeURIComponent(val) : encodeURI(val));
      } else {
        setOutput(comp ? decodeURIComponent(val) : decodeURI(val));
      }
      setError("");
    } catch {
      setError(
        m === "decode"
          ? "Invalid URL-encoded string - check for malformed % sequences."
          : "Encoding failed.",
      );
      setOutput("");
    }
  }

  function handleInput(val: string) {
    setInput(val);
    process(val, mode, component);
  }

  function setModeAndProcess(m: Mode) {
    setMode(m);
    process(input, m, component);
  }

  function setComponentAndProcess(c: boolean) {
    setComponent(c);
    process(input, mode, c);
  }

  function handleSwap() {
    const next: Mode = mode === "encode" ? "decode" : "encode";
    setMode(next);
    setInput(output);
    process(output, next, component);
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
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
          <button
            onClick={() => setModeAndProcess("encode")}
            className={`px-3 py-1.5 transition-colors ${
              mode === "encode" ? "bg-blue-500 text-white" : "hover:bg-muted"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setModeAndProcess("decode")}
            className={`px-3 py-1.5 border-l border-border transition-colors ${
              mode === "decode" ? "bg-blue-500 text-white" : "hover:bg-muted"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
          <button
            onClick={() => setComponentAndProcess(true)}
            className={`px-3 py-1.5 transition-colors ${
              component ? "bg-cyan-500 text-white" : "hover:bg-muted"
            }`}
            title="Encodes reserved chars like ?, &, =, /"
          >
            Component
          </button>
          <button
            onClick={() => setComponentAndProcess(false)}
            className={`px-3 py-1.5 border-l border-border transition-colors ${
              !component ? "bg-cyan-500 text-white" : "hover:bg-muted"
            }`}
            title="Preserves URL structure (?, &, =, /)"
          >
            Full URL
          </button>
        </div>

        <button
          onClick={handleSwap}
          disabled={!output}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          title="Swap input and output"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" /> Swap
        </button>

        <button
          onClick={handleClear}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            {mode === "encode" ? "Plain URL / Text" : "Encoded String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter URL or text to encode…"
                : "Paste %-encoded string to decode…"
            }
            className="w-full h-48 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 resize-none transition-shadow"
            spellCheck={false}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">
              {mode === "encode" ? "Encoded Output" : "Decoded Text"}
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Output appears here…"
              className="w-full h-48 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none resize-none text-muted-foreground"
              spellCheck={false}
            />
            {error && (
              <div className="absolute inset-0 rounded-lg border border-red-500/30 bg-red-500/5 p-3 flex items-start gap-2">
                <p className="text-xs text-red-500 font-mono leading-relaxed">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {output && !error && (
        <p className="text-xs text-muted-foreground text-right">
          {input.length} chars → {output.length} chars
        </p>
      )}
    </div>
  );
}

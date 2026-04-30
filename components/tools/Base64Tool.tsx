"use client";

import { useState, useRef } from "react";
import { Copy, Check, ArrowLeftRight, Trash2, Upload } from "lucide-react";

type Mode = "encode" | "decode";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function process(val: string, m: Mode) {
    if (!val) { setOutput(""); setError(""); return; }
    try {
      if (m === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(val))));
      } else {
        setOutput(decodeURIComponent(escape(atob(val.trim()))));
      }
      setError("");
    } catch {
      setError(m === "decode" ? "Invalid Base64 string — check your input." : "Encoding failed.");
      setOutput("");
    }
  }

  function handleInput(val: string) {
    setInput(val);
    process(val, mode);
  }

  function handleSwap() {
    const next: Mode = mode === "encode" ? "decode" : "encode";
    setMode(next);
    setInput(output);
    process(output, next);
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

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];
      setMode("encode");
      setInput(`[File: ${file.name}]`);
      setOutput(base64);
      setError("");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
          <button
            onClick={() => { setMode("encode"); process(input, "encode"); }}
            className={`px-3 py-1.5 transition-colors ${
              mode === "encode" ? "bg-blue-500 text-white" : "hover:bg-muted"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode("decode"); process(input, "decode"); }}
            className={`px-3 py-1.5 border-l border-border transition-colors ${
              mode === "decode" ? "bg-blue-500 text-white" : "hover:bg-muted"
            }`}
          >
            Decode
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
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Upload className="w-3.5 h-3.5" /> Encode File
        </button>
        <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />

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
          <label className="text-xs font-medium text-muted-foreground">
            {mode === "encode" ? "Plain Text" : "Base64 String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode…" : "Paste Base64 string to decode…"}
            className="w-full h-48 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 resize-none transition-shadow"
            spellCheck={false}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
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
          {mode === "encode" && (
            <span className="ml-2 text-cyan-500">
              (~{Math.round((output.length / Math.max(input.length, 1) - 1) * 100)}% larger)
            </span>
          )}
        </p>
      )}
    </div>
  );
}

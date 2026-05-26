"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Download, Eye, Code2 } from "lucide-react";

const SAMPLE = `# Welcome to the Markdown Editor

Type **markdown** on the left and see the _live preview_ on the right.

## Features

- Live preview as you type
- GitHub-flavored markdown
- Copy HTML or download as \`.md\`

## Code

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Tip: Use **###** for sub-headings and \`-\` for bullets.

[Visit smitparekh.co.in](https://smitparekh.co.in)
`;

type View = "split" | "edit" | "preview";

export default function MarkdownEditor() {
  const [md, setMd] = useState(SAMPLE);
  const [view, setView] = useState<View>("split");
  const [copied, setCopied] = useState<string>("");

  const stats = useMemo(() => {
    const words = md.trim() ? md.trim().split(/\s+/).length : 0;
    const lines = md.split("\n").length;
    const minutes = Math.max(1, Math.round(words / 200));
    return { words, lines, chars: md.length, minutes };
  }, [md]);

  async function copyMd() {
    await navigator.clipboard.writeText(md);
    setCopied("md");
    setTimeout(() => setCopied(""), 1500);
  }

  async function copyHtml() {
    const div = document.querySelector("#md-preview");
    if (!div) return;
    await navigator.clipboard.writeText(div.innerHTML);
    setCopied("html");
    setTimeout(() => setCopied(""), 1500);
  }

  function download() {
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-border bg-muted/20 p-0.5">
          {(["edit", "split", "preview"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                view === v ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "edit" ? "Editor" : v === "preview" ? "Preview" : "Split"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={copyMd}
            className="flex items-center gap-1.5 text-xs rounded-lg border border-border bg-muted/20 px-3 py-1.5 hover:bg-muted/40"
          >
            {copied === "md" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            Markdown
          </button>
          <button
            onClick={copyHtml}
            className="flex items-center gap-1.5 text-xs rounded-lg border border-border bg-muted/20 px-3 py-1.5 hover:bg-muted/40"
          >
            {copied === "html" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Code2 className="w-3.5 h-3.5" />}
            HTML
          </button>
          <button
            onClick={download}
            className="flex items-center gap-1.5 text-xs rounded-lg border border-border bg-muted/20 px-3 py-1.5 hover:bg-muted/40"
          >
            <Download className="w-3.5 h-3.5" /> .md
          </button>
        </div>
      </div>

      <div
        className={`grid gap-3 ${
          view === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {(view === "edit" || view === "split") && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Code2 className="w-3.5 h-3.5" /> Markdown
            </div>
            <textarea
              value={md}
              onChange={(e) => setMd(e.target.value)}
              spellCheck={false}
              className="w-full h-[480px] rounded-xl border border-border bg-muted/20 p-4 text-sm font-mono leading-relaxed outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
            />
          </div>
        )}
        {(view === "preview" || view === "split") && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="w-3.5 h-3.5" /> Preview
            </div>
            <div
              id="md-preview"
              className="prose prose-sm dark:prose-invert max-w-none h-[480px] overflow-auto rounded-xl border border-border bg-card p-5"
            >
              <ReactMarkdown>{md}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3">
        <span>Words: <strong className="text-foreground">{stats.words}</strong></span>
        <span>Characters: <strong className="text-foreground">{stats.chars}</strong></span>
        <span>Lines: <strong className="text-foreground">{stats.lines}</strong></span>
        <span>Reading: <strong className="text-foreground">{stats.minutes} min</strong></span>
      </div>
    </div>
  );
}

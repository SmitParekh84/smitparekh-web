"use client";

import { useCallback, useState } from "react";
import { Copy, Check, Upload, X, Image as ImageIcon } from "lucide-react";

interface FileState {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  base64Only: string;
}

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function CopyBtn({ value, label }: { value: string; label: string }) {
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

export default function ImageToBase64() {
  const [file, setFile] = useState<FileState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  const onFile = useCallback((f: File) => {
    setError(null);
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file (PNG, JPG, GIF, SVG, WebP, AVIF).");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("Max file size is 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Only = dataUrl.split(",")[1] ?? "";
      setFile({
        name: f.name,
        size: f.size,
        type: f.type,
        dataUrl,
        base64Only,
      });
    };
    reader.onerror = () => setError("Could not read file.");
    reader.readAsDataURL(f);
  }, []);

  return (
    <div className="space-y-5">
      {!file ? (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
            drag ? "border-blue-500 bg-blue-500/5" : "border-border bg-muted/20 hover:border-blue-500/40"
          }`}
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">Drop image here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, SVG, WebP, AVIF up to 10 MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
        </label>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.type} · {fmtBytes(file.size)} · base64 size: {fmtBytes(Math.ceil((file.base64Only.length * 3) / 4))}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium hover:border-red-500/40 hover:text-red-500"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Preview</p>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-[conic-gradient(#0001_25%,transparent_0_50%,#0001_0_75%,transparent_0)] bg-[length:16px_16px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.dataUrl}
                  alt={file.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Block
                label="Data URL"
                value={file.dataUrl}
                hint="Use directly as <img src> or url() in CSS"
              />
              <Block
                label="Base64 only"
                value={file.base64Only}
                hint="No data: prefix"
              />
              <Block
                label="HTML <img>"
                value={`<img src="${file.dataUrl}" alt="${file.name}" />`}
                hint="Drop into HTML"
              />
              <Block
                label="CSS background"
                value={`background-image: url('${file.dataUrl}');`}
                hint="Inline CSS rule"
              />
            </div>
          </div>
        </>
      )}

      {error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Block({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <div>
          <p className="text-xs font-semibold">{label}</p>
          <p className="text-[10px] text-muted-foreground">{hint}</p>
        </div>
        <CopyBtn value={value} label="Copy" />
      </div>
      <pre className="m-0 max-h-32 overflow-auto bg-muted/30 px-3 py-2 font-mono text-[11px] whitespace-pre-wrap break-all">
        {value.length > 8000 ? value.slice(0, 8000) + "…" : value}
      </pre>
    </div>
  );
}

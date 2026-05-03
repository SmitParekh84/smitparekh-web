"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Copy, Check, Upload, X } from "lucide-react";

type Mode = "text" | "emoji" | "upload";

const SIZES = [16, 32, 48, 64, 128, 180, 192, 512] as const;

const SAMPLE_EMOJIS = ["🚀", "⚡", "🎯", "💡", "🔥", "✨", "📈", "🛠️", "🧠", "📦"];
const FONT_FAMILIES = [
  "Inter, system-ui, sans-serif",
  "'Times New Roman', Georgia, serif",
  "'Courier New', monospace",
  "'Comic Sans MS', cursive",
];

interface Style {
  text: string;
  fg: string;
  bg: string;
  shape: "square" | "rounded" | "circle";
  font: string;
  bold: boolean;
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

function drawFavicon(
  ctx: CanvasRenderingContext2D,
  size: number,
  style: Style,
  uploadImg: HTMLImageElement | null,
  mode: Mode,
) {
  ctx.clearRect(0, 0, size, size);
  // background
  ctx.fillStyle = style.bg;
  if (style.shape === "circle") {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (style.shape === "rounded") {
    const r = size * 0.22;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, size, size);
  }

  if (mode === "upload" && uploadImg) {
    const pad = size * 0.1;
    ctx.drawImage(uploadImg, pad, pad, size - pad * 2, size - pad * 2);
    return;
  }

  const t = style.text || "?";
  const isEmoji = mode === "emoji";
  const fontSize = isEmoji ? size * 0.7 : size * (t.length === 1 ? 0.66 : t.length === 2 ? 0.5 : 0.4);
  ctx.fillStyle = style.fg;
  ctx.font = `${style.bold ? "700 " : "500 "}${fontSize}px ${style.font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(t, size / 2, size / 2 + fontSize * 0.04);
}

export default function FaviconGenerator() {
  const [mode, setMode] = useState<Mode>("text");
  const [style, setStyle] = useState<Style>({
    text: "S",
    fg: "#ffffff",
    bg: "#3b82f6",
    shape: "rounded",
    font: FONT_FAMILIES[0],
    bold: true,
  });
  const [uploadImg, setUploadImg] = useState<HTMLImageElement | null>(null);
  const [version, setVersion] = useState(0);
  const canvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});

  useEffect(() => {
    SIZES.forEach((sz) => {
      const c = canvasRefs.current[sz];
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      drawFavicon(ctx, sz, style, uploadImg, mode);
    });
  }, [style, uploadImg, mode, version]);

  const onUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setUploadImg(img);
      setMode("upload");
      setVersion((v) => v + 1);
    };
    img.src = url;
  };

  const downloadOne = (size: number) => {
    const c = canvasRefs.current[size];
    if (!c) return;
    c.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `favicon-${size}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const downloadAll = async () => {
    for (const size of SIZES) downloadOne(size);
  };

  const htmlSnippet = useMemo(
    () =>
      `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />`,
    [],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["text", "emoji", "upload"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              if (m === "emoji") setStyle((s) => ({ ...s, text: SAMPLE_EMOJIS[0] }));
              if (m === "text") setStyle((s) => ({ ...s, text: s.text.length === 0 ? "S" : s.text }));
            }}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              mode === m
                ? "border-blue-500 bg-blue-500/10 text-blue-500"
                : "border-border bg-background hover:border-blue-500/40"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr,1.2fr]">
        <div className="space-y-4 rounded-xl border border-border bg-card p-4">
          {mode === "text" && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Letters (1–3)</p>
              <input
                type="text"
                maxLength={3}
                value={style.text}
                onChange={(e) => setStyle((s) => ({ ...s, text: e.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono"
              />
            </div>
          )}
          {mode === "emoji" && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Emoji</p>
              <input
                type="text"
                value={style.text}
                onChange={(e) => setStyle((s) => ({ ...s, text: e.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-base"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SAMPLE_EMOJIS.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setStyle((s) => ({ ...s, text: em }))}
                    className="h-9 w-9 rounded-md border border-border bg-background text-lg hover:border-blue-500/40"
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          )}
          {mode === "upload" && (
            <div>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-muted/20 px-4 py-6 text-sm hover:border-blue-500/40">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span>{uploadImg ? "Replace image" : "Upload image (any size)"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onUpload(f);
                  }}
                />
              </label>
              {uploadImg && (
                <button
                  type="button"
                  onClick={() => {
                    setUploadImg(null);
                    setMode("text");
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500"
                >
                  <X className="h-3 w-3" /> Remove uploaded image
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Foreground">
              <input
                type="color"
                value={style.fg}
                onChange={(e) => setStyle((s) => ({ ...s, fg: e.target.value }))}
                className="h-9 w-full cursor-pointer rounded border border-border bg-transparent"
              />
            </Field>
            <Field label="Background">
              <input
                type="color"
                value={style.bg}
                onChange={(e) => setStyle((s) => ({ ...s, bg: e.target.value }))}
                className="h-9 w-full cursor-pointer rounded border border-border bg-transparent"
              />
            </Field>
          </div>
          <Field label="Shape">
            <div className="flex gap-2">
              {(["square", "rounded", "circle"] as const).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => setStyle((s) => ({ ...s, shape: sh }))}
                  className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    style.shape === sh
                      ? "border-blue-500 bg-blue-500/10 text-blue-500"
                      : "border-border bg-background hover:border-blue-500/40"
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>
          </Field>
          {mode !== "upload" && (
            <>
              <Field label="Font">
                <select
                  value={style.font}
                  onChange={(e) => setStyle((s) => ({ ...s, font: e.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                >
                  {FONT_FAMILIES.map((f) => (
                    <option key={f} value={f}>
                      {f.split(",")[0].replace(/['"]/g, "")}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={style.bold}
                  onChange={(e) => setStyle((s) => ({ ...s, bold: e.target.checked }))}
                />
                <span>Bold</span>
              </label>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Preview at every size</p>
              <button
                type="button"
                onClick={downloadAll}
                className="inline-flex items-center gap-1.5 rounded-md border border-blue-500 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-500 hover:bg-blue-500/15"
              >
                <Download className="h-3.5 w-3.5" /> Download all PNGs
              </button>
            </div>
            <div className="flex flex-wrap items-end gap-4">
              {SIZES.map((sz) => (
                <div key={sz} className="flex flex-col items-center gap-1.5">
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[sz] = el;
                    }}
                    width={sz}
                    height={sz}
                    style={{ width: Math.min(sz, 96), height: Math.min(sz, 96) }}
                    className="rounded border border-border bg-[conic-gradient(#0001_25%,transparent_0_50%,#0001_0_75%,transparent_0)] bg-[length:8px_8px]"
                  />
                  <button
                    type="button"
                    onClick={() => downloadOne(sz)}
                    className="text-[10px] font-mono text-muted-foreground hover:text-blue-500"
                  >
                    {sz}×{sz} ↓
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <p className="text-xs font-semibold">HTML head snippet</p>
              <CopyBtn value={htmlSnippet} />
            </div>
            <pre className="m-0 overflow-auto bg-muted/30 px-3 py-2 font-mono text-[11px]">{htmlSnippet}</pre>
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

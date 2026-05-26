"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FORMATS = ["jpeg", "png", "webp"] as const;
type Format = typeof FORMATS[number];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<Format>("webp");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [converting, setConverting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const convert = useCallback(() => {
    if (!file || !preview) return;
    setConverting(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setResult({ url, size: blob.size });
          setConverting(false);
        },
        `image/${format}`,
        quality / 100,
      );
    };
    img.src = preview;
  }, [file, preview, format, quality]);

  const download = () => {
    if (!result || !file) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = file.name.replace(/\.[^.]+$/, `.${format}`);
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer py-10 transition-colors ${
          dragging ? "border-blue-500 bg-blue-500/5" : "border-border hover:border-blue-500/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {preview ? (
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="max-h-40 max-w-full rounded-lg object-contain" />
            <p className="text-sm text-muted-foreground">{file?.name} - {formatBytes(file?.size ?? 0)}</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm font-medium">Drop image here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP, GIF supported</p>
          </>
        )}
        {file && (
          <button
            onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null); }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Output Format</label>
          <div className="flex gap-2">
            {FORMATS.map((f) => (
              <button
                key={f}
                onClick={() => { setFormat(f); setResult(null); }}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium uppercase transition-colors ${
                  format === f ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border bg-card text-muted-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {format !== "png" && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Quality</label>
              <span className="text-sm text-blue-500 font-semibold">{quality}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }}
              className="w-full accent-blue-500"
            />
          </div>
        )}
      </div>

      <button
        onClick={convert}
        disabled={!file || converting}
        className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
      >
        <ImageIcon className="w-4 h-4" />
        {converting ? "Converting…" : "Convert Image"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-green-400">Conversion complete</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {file && `${formatBytes(file.size)}`} → {formatBytes(result.size)}
                {file && result.size < file.size && (
                  <span className="text-green-400 ml-1">
                    ({Math.round((1 - result.size / file.size) * 100)}% smaller)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={download}
              className="flex items-center gap-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

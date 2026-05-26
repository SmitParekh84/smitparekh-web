"use client";

import { useState, useRef } from "react";
import { Upload, Download, X, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompressImage } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const FORMATS = ["jpeg", "png", "webp"] as const;
type Format = typeof FORMATS[number];

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<Format>("jpeg");
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useCompressImage();

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error("Invalid file", "Please upload an image.");
      return;
    }
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const compress = () => {
    if (!file) return;
    mutation.mutate(
      { image: file, options: { quality, format } },
      {
        onSuccess: (blob) => {
          if (result?.url) URL.revokeObjectURL(result.url);
          setResult({ url: URL.createObjectURL(blob), size: blob.size });
          toast.success("Image compressed!", `Saved ${Math.round((1 - blob.size / file.size) * 100)}% of the original size.`);
        },
        onError: () => {
          toast.error("Compression failed", "Please try again.");
        },
      },
    );
  };

  const download = () => {
    if (!result || !file) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = file.name.replace(/\.[^.]+$/, `-compressed.${format}`);
    a.click();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
  };

  const savings = file && result ? Math.round((1 - result.size / file.size) * 100) : 0;

  return (
    <div className="space-y-6">
      {!file ? (
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
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer py-14 transition-colors ${
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
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
            <Upload className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm font-medium">Drop image here or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP - max 20 MB</p>
        </div>
      ) : (
        <div className="relative rounded-xl border border-border overflow-hidden flex items-center justify-center bg-muted/20 min-h-48 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview!} alt="Preview" className="max-h-48 max-w-full object-contain" />
          <button onClick={reset} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-3 left-3 rounded-lg bg-card/80 backdrop-blur border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {file.name} - {formatBytes(file.size)}
          </div>
        </div>
      )}

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
      </div>

      <button
        onClick={compress}
        disabled={!file || mutation.isPending}
        className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
      >
        <Minimize2 className="w-4 h-4" />
        {mutation.isPending ? "Compressing…" : "Compress Image"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-green-500/30 bg-green-500/5 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-green-400">Compressed successfully</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatBytes(file!.size)} → {formatBytes(result.size)}
                </p>
              </div>
              <button
                onClick={download}
                className="flex items-center gap-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Size reduction</span>
                <span className="text-green-400 font-semibold">{savings}% smaller</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${savings}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

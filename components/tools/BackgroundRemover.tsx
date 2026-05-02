"use client";

import { useState, useRef } from "react";
import { Upload, Download, X, Eraser } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRemoveBackground } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"original" | "result">("original");
  const [loginGateOpen, setLoginGateOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useRemoveBackground();
  const { checkQuota, isChecking, status } = useToolQuota("background-remover");

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error("Invalid file", "Please upload an image file.");
      return;
    }
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(f);
    setResultUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const removeBackground = async () => {
    if (!file) return;
    const quota = await checkQuota();
    if (!quota.allowed) {
      setLoginGateOpen(true);
      return;
    }
    mutation.mutate(file, {
      onSuccess: (blob) => {
        setResultUrl(URL.createObjectURL(blob));
        setActiveTab("result");
        toast.success("Background removed!", "Your image is ready to download.");
      },
      onError: () => {
        toast.error("Processing failed", "Please try again or use a different image.");
      },
    });
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = file.name.replace(/\.[^.]+$/, "-no-bg.png");
    a.click();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setActiveTab("original");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QuotaBadge status={status} />
      </div>
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
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer py-16 transition-colors ${
            dragging ? "border-blue-500 bg-blue-500/5" : "border-border hover:border-blue-500/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm font-medium">Drop your image here or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP - max 10 MB</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Tabs */}
          {resultUrl && (
            <div className="flex rounded-xl border border-border bg-muted/30 p-1 gap-1">
              {(["original", "result"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors capitalize ${
                    activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {tab === "result" ? "Background Removed" : "Original"}
                </button>
              ))}
            </div>
          )}

          {/* Image preview */}
          <div className="relative rounded-xl border border-border overflow-hidden bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGklEQVQoU2NkYGD4z8BQDwAEgAF/QualIQAAAABJRU5ErkJggg==')] bg-repeat">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center min-h-64 p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeTab === "result" && resultUrl ? resultUrl : preview!}
                  alt={activeTab}
                  className="max-h-64 max-w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
            <button
              onClick={reset}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            {file.name} - {formatBytes(file.size)}
          </p>
        </div>
      )}

      {file && (
        <div className="flex gap-3">
          <button
            onClick={removeBackground}
            disabled={mutation.isPending || isChecking}
            className="flex-1 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
          >
            <Eraser className="w-4 h-4" />
            {isChecking ? "Checking…" : mutation.isPending ? "Processing…" : "Remove Background"}
          </button>
          {resultUrl && (
            <button
              onClick={download}
              className="flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Tip:</strong> Works best on photos with clear subjects - portraits, products, animals. AI-powered via rembg - transparent PNG output.
        </p>
      </div>

      <LoginGateModal
        open={loginGateOpen}
        onClose={() => setLoginGateOpen(false)}
        toolName="the Background Remover"
      />
    </div>
  );
}

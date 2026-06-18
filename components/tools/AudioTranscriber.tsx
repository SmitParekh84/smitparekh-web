"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Copy, Check, Download, FileAudio, Languages } from "lucide-react";
import { useTranscribeAudio } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";
import { QuotaBadge } from "@/components/tools/QuotaBadge";

const ACCEPTED = "audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/webm,audio/ogg,audio/flac,audio/aac,audio/mp4,audio/x-m4a";
const MAX_MB = 10;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Map whisper language codes to readable names; falls back to the raw code.
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", hi: "Hindi", gu: "Gujarati", es: "Spanish", fr: "French",
  de: "German", it: "Italian", pt: "Portuguese", ru: "Russian", ja: "Japanese",
  ko: "Korean", zh: "Chinese", ar: "Arabic", nl: "Dutch", tr: "Turkish",
};

export default function AudioTranscriber() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loginGateOpen, setLoginGateOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useTranscribeAudio();
  const { checkQuota, isChecking, status } = useToolQuota("audio-to-text");

  // Revoke the object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("audio/")) {
      toast.error("Invalid file", "Please upload an audio file (mp3, wav, m4a, etc.).");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      toast.error("File too large", `Please upload an audio file under ${MAX_MB} MB.`);
      return;
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setFile(f);
    setTranscript(null);
    setLanguage(null);
    setAudioUrl(URL.createObjectURL(f));
  };

  const transcribe = async () => {
    if (!file) return;
    const quota = await checkQuota();
    if (!quota.allowed) {
      setLoginGateOpen(true);
      return;
    }
    mutation.mutate(file, {
      onSuccess: (result) => {
        if (!result.text) {
          toast.error("No speech detected", "We couldn't find any spoken words in this audio.");
          setTranscript("");
          setLanguage(result.language);
          return;
        }
        setTranscript(result.text);
        setLanguage(result.language);
        toast.success("Transcription complete!", "Your text is ready to copy.");
      },
      onError: (err) => {
        toast.error("Transcription failed", err instanceof Error ? err.message : "Please try again.");
      },
    });
  };

  const copy = async () => {
    if (!transcript) return;
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    if (!transcript || !file) return;
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.[^.]+$/, "") + "-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setFile(null);
    setAudioUrl(null);
    setTranscript(null);
    setLanguage(null);
  };

  const languageLabel = language
    ? LANGUAGE_NAMES[language] ?? language.toUpperCase()
    : null;

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
            accept={ACCEPTED}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm font-medium">Drop your audio file here or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">MP3, WAV, M4A, AAC, FLAC, OGG, WebM - max {MAX_MB} MB</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File + player */}
          <div className="relative rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex items-center gap-3 mb-3 pr-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 shrink-0">
                <FileAudio className="w-5 h-5 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
            </div>
            {audioUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio controls src={audioUrl} className="w-full" />
            )}
            <button
              onClick={reset}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Transcribe button */}
          <button
            onClick={transcribe}
            disabled={mutation.isPending || isChecking}
            className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
          >
            <FileAudio className="w-4 h-4" />
            {isChecking ? "Checking…" : mutation.isPending ? "Transcribing…" : "Transcribe Audio"}
          </button>
          {mutation.isPending && (
            <p className="text-xs text-muted-foreground text-center">
              Transcribing on CPU - this can take up to a few minutes for longer clips. The first run after idle may be slower while the service wakes up.
            </p>
          )}
        </div>
      )}

      {/* Result */}
      {transcript !== null && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">Transcript</h3>
              {languageLabel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-300 px-2 py-0.5 text-xs font-medium">
                  <Languages className="w-3 h-3" /> {languageLabel}
                </span>
              )}
            </div>
            {transcript && (
              <div className="flex gap-2">
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card hover:bg-muted px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={download}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card hover:bg-muted px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> .txt
                </button>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-border bg-card p-4 max-h-80 overflow-y-auto">
            {transcript ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">{transcript}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No speech detected in this audio.</p>
            )}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Tip:</strong> Clear speech with minimal background noise transcribes best. Audio is processed securely and not stored. Powered by OpenAI&apos;s Whisper model (faster-whisper) - language is auto-detected.
        </p>
      </div>

      <LoginGateModal
        open={loginGateOpen}
        onClose={() => setLoginGateOpen(false)}
        toolName="the Audio to Text Transcriber"
      />
    </div>
  );
}

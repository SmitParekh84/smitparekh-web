"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Copy, Check, Download, FileAudio, Languages, Loader2, RotateCcw, AlertTriangle } from "lucide-react";
import { useTranscribeAudio } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { transcribeApi, ApiError } from "@/lib/api";
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

// Phase drives the loading UI so a slow/cold Hugging Face Space never looks frozen.
type Phase = "idle" | "warming" | "transcribing";

export default function AudioTranscriber() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loginGateOpen, setLoginGateOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [coldStart, setColdStart] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useTranscribeAudio();
  const { checkQuota, isChecking, status } = useToolQuota("audio-to-text");

  const busy = phase !== "idle";

  // Revoke the object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Tick an elapsed-seconds counter while the request is in flight so the user
  // always sees forward motion, even during a long cold start.
  useEffect(() => {
    if (!busy) return;
    setElapsed(0);
    const started = performance.now();
    const id = setInterval(() => {
      setElapsed(Math.floor((performance.now() - started) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [busy]);

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
    if (!file || busy) return;
    setErrorMsg(null);
    setColdStart(false);
    const quota = await checkQuota();
    if (!quota.allowed) {
      setLoginGateOpen(true);
      return;
    }

    // Warm the (possibly asleep) Space first so the transcription request
    // doesn't get stuck waiting through the container's whole cold start.
    setPhase("warming");
    await transcribeApi.warmUp();

    setPhase("transcribing");
    mutation.mutate(file, {
      onSuccess: (result) => {
        setPhase("idle");
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
        setPhase("idle");
        // A timeout / network drop / 5xx almost always means the free Space was
        // waking up or briefly overloaded — a second attempt usually succeeds.
        const message = err instanceof Error ? err.message : "";
        const isWakeUp =
          /timeout|network|ECONNAB|ETIMEDOUT/i.test(message) ||
          (err instanceof ApiError && [0, 502, 503, 504].includes(err.status));
        setColdStart(isWakeUp);
        setErrorMsg(
          isWakeUp
            ? "The transcription service was waking up and didn't respond in time. It's usually ready on a second try."
            : message || "Something went wrong. Please try again.",
        );
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
    if (busy) return;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setFile(null);
    setAudioUrl(null);
    setTranscript(null);
    setLanguage(null);
    setErrorMsg(null);
    setColdStart(false);
  };

  const languageLabel = language
    ? LANGUAGE_NAMES[language] ?? language.toUpperCase()
    : null;

  // What we tell the user right now — shifts as time passes so it never reads
  // as a hung request during a cold start.
  const statusText =
    phase === "warming"
      ? "Waking up the transcription service — the first run after idle can take up to a minute…"
      : elapsed < 8
        ? "Uploading your audio…"
        : elapsed < 30
          ? "Transcribing on CPU — this can take a little while for longer clips…"
          : "Still working — almost there. Longer clips take a few minutes…";

  // Reassuring, unknown-duration progress that eases toward ~92% and never stalls.
  const progressPct = Math.min(92, Math.round(100 * (1 - Math.exp(-elapsed / 22))));

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
              disabled={busy}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {busy ? (
            /* Live progress — keeps a slow / cold service from ever looking frozen */
            <div className="rounded-xl border border-blue-500/25 bg-blue-500/[0.06] p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 shrink-0 animate-spin text-blue-500" />
                <span className="text-sm font-medium">
                  {phase === "warming" ? "Waking up the service…" : "Transcribing your audio…"}
                </span>
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">{elapsed}s</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-500/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-[width] duration-1000 ease-out"
                  style={{ width: `${Math.max(6, progressPct)}%` }}
                />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{statusText}</p>
            </div>
          ) : (
            /* Transcribe button */
            <button
              onClick={transcribe}
              disabled={isChecking}
              className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
            >
              <FileAudio className="w-4 h-4" />
              {isChecking ? "Checking…" : errorMsg ? "Try Again" : "Transcribe Audio"}
            </button>
          )}

          {/* Inline error with a clear retry path */}
          {!busy && errorMsg && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {coldStart ? "Service was waking up" : "Transcription failed"}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{errorMsg}</p>
                <button
                  onClick={transcribe}
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Try again
                </button>
              </div>
            </div>
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

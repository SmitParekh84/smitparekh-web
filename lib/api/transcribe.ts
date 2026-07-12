import { ApiError } from "./client";
import { isPythonApiEnabled, pythonApiClient } from "./python-client";

export interface TranscriptionResult {
  /** The full transcript text. */
  text: string;
  /** Detected language code, e.g. "en". */
  language: string;
  /** Audio duration in seconds. */
  duration: number;
}

// The Python service runs on a free Hugging Face Space that sleeps when idle.
// A cold start = container boot + whisper model load, which can take well over
// a minute. We warm the Space via the cheap /api/health endpoint first so the
// actual transcription request doesn't have to wait through the whole boot.
const WARMUP_TIMEOUT_MS = 180_000; // patient: covers a full cold start
const TRANSCRIBE_TIMEOUT_MS = 180_000; // CPU transcription of longer clips

export const transcribeApi = {
  /**
   * Wake the Python tools Space (if asleep) and wait until it responds healthy.
   * Never throws — returns `true` if the service is reachable, `false` if the
   * warm-up ping itself failed (caller can still attempt, or surface a hint).
   */
  warmUp: async (): Promise<boolean> => {
    if (!isPythonApiEnabled || !pythonApiClient) return false;
    try {
      await pythonApiClient.get("/api/health", { timeout: WARMUP_TIMEOUT_MS });
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Transcribe an uploaded audio file to text via the Python tools service
   * (`POST /api/transcribe`, faster-whisper). Python-only - there is no Node
   * fallback, so this throws a clear error when the service isn't configured.
   */
  transcribe: async (file: File): Promise<TranscriptionResult> => {
    if (!isPythonApiEnabled || !pythonApiClient) {
      throw new ApiError(
        503,
        "The transcription service is not available right now. Please try again later.",
      );
    }
    const form = new FormData();
    form.append("file", file);
    const res = await pythonApiClient.post<TranscriptionResult>("/api/transcribe", form, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: TRANSCRIBE_TIMEOUT_MS,
    });
    return res.data;
  },
};

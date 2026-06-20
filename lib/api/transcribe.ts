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

export const transcribeApi = {
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
    });
    return res.data;
  },
};

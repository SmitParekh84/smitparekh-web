"use client";

import { useMutation } from "@tanstack/react-query";
import {
  qrCodeApi,
  mediaApi,
  resumeApi,
  generatePostApi,
  removeBgApi,
  toolsApi,
  studentToolsApi,
  type QrCodePayload,
  type LinkedInMediaPayload,
  type GeneratePostPayload,
  type CompressOptions,
  type NotifyToolPayload,
  type NoteSummarizerPayload,
  type FlashcardsPayload,
  type EssayOutlinePayload,
  type CitationPayload,
  type ParaphrasePayload,
  type CoverLetterPayload,
} from "@/lib/api";

export function useGenerateQr() {
  return useMutation({ mutationFn: (payload: QrCodePayload) => qrCodeApi.generate(payload) });
}

export function useGenerateQrImage() {
  return useMutation({
    mutationFn: (payload: QrCodePayload) => qrCodeApi.generateImage(payload),
  });
}

export function useDownloadLinkedInMedia() {
  return useMutation({
    mutationFn: (payload: LinkedInMediaPayload) => mediaApi.downloadLinkedIn(payload),
  });
}

export function useAnalyzeResume() {
  return useMutation({ mutationFn: (file: File) => resumeApi.analyze(file) });
}

export function useGeneratePost() {
  return useMutation({
    mutationFn: (payload: GeneratePostPayload) => generatePostApi.generate(payload),
  });
}

export function useRemoveBackground() {
  return useMutation({ mutationFn: (image: File) => removeBgApi.removeBackground(image) });
}

export function useCompressImage() {
  return useMutation({
    mutationFn: ({ image, options }: { image: File; options?: CompressOptions }) =>
      removeBgApi.compressImage(image, options),
  });
}

export function useCompressBulk() {
  return useMutation({
    mutationFn: ({ images, options }: { images: File[]; options?: CompressOptions }) =>
      removeBgApi.compressBulk(images, options),
  });
}

export function useNotifyTool() {
  return useMutation({
    mutationFn: (payload: NotifyToolPayload) => toolsApi.notify(payload),
  });
}

// ─── Phase 4: College student AI tools ───────────────────────
export function useSummarizeNotes() {
  return useMutation({
    mutationFn: (payload: NoteSummarizerPayload) => studentToolsApi.summarizeNotes(payload),
  });
}

export function useGenerateFlashcards() {
  return useMutation({
    mutationFn: (payload: FlashcardsPayload) => studentToolsApi.generateFlashcards(payload),
  });
}

export function useBuildEssayOutline() {
  return useMutation({
    mutationFn: (payload: EssayOutlinePayload) => studentToolsApi.buildEssayOutline(payload),
  });
}

export function useGenerateCitation() {
  return useMutation({
    mutationFn: (payload: CitationPayload) => studentToolsApi.generateCitation(payload),
  });
}

export function useParaphrase() {
  return useMutation({
    mutationFn: (payload: ParaphrasePayload) => studentToolsApi.paraphrase(payload),
  });
}

export function useGenerateCoverLetter() {
  return useMutation({
    mutationFn: (payload: CoverLetterPayload) => studentToolsApi.generateCoverLetter(payload),
  });
}

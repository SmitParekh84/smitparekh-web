"use client";

import { useMutation } from "@tanstack/react-query";
import {
  qrCodeApi,
  mediaApi,
  resumeApi,
  generatePostApi,
  removeBgApi,
  toolsApi,
  type QrCodePayload,
  type LinkedInMediaPayload,
  type GeneratePostPayload,
  type CompressOptions,
  type NotifyToolPayload,
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

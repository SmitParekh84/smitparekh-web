"use client";

import { useMutation } from "@tanstack/react-query";
import { contactApi, type ContactPayload, type CvDownloadPayload } from "@/lib/api";

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => contactApi.submit(payload),
  });
}

export function useCvDownload() {
  return useMutation({
    mutationFn: (payload: CvDownloadPayload) => contactApi.cvDownload(payload),
  });
}

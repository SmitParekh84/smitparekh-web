"use client";

import { useMutation } from "@tanstack/react-query";
import { socialApi, type GenerateShareCaptionPayload } from "@/lib/api/social";

export function useGenerateShareCaption() {
  return useMutation({
    mutationFn: (payload: GenerateShareCaptionPayload) =>
      socialApi.generateCaption(payload),
  });
}

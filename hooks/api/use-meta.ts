"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { metaApi, queryKeys, type SeoAnalyzePayload } from "@/lib/api";

export function useMetaTags(url: string) {
  return useQuery({
    queryKey: queryKeys.meta.tags(url),
    queryFn: () => metaApi.getTags(url).then((r) => r.data),
    enabled: Boolean(url),
  });
}

export function useSeoReports() {
  return useQuery({
    queryKey: queryKeys.meta.seoReports(),
    queryFn: () => metaApi.listSeoReports().then((r) => r.data),
  });
}

export function useAnalyzeSeo() {
  return useMutation({
    mutationFn: (payload: SeoAnalyzePayload) => metaApi.analyzeSeo(payload),
  });
}

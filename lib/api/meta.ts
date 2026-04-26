import { api } from "./client";

export interface MetaTagsResponse {
  success: boolean;
  data: Record<string, string | string[] | undefined>;
}

export interface SeoAnalyzePayload {
  url: string;
  email?: string;
}

export interface SeoAnalyzeResponse {
  success: boolean;
  data: unknown;
  reportId?: string;
}

export interface SeoReportListResponse {
  success: boolean;
  data: Array<{
    _id: string;
    url: string;
    email?: string;
    createdAt: string;
  }>;
}

export const metaApi = {
  getTags: (url: string) => api.get<MetaTagsResponse>("/meta-tags", { params: { url } }),
  analyzeSeo: (payload: SeoAnalyzePayload) =>
    api.post<SeoAnalyzeResponse>("/seo-analyze", payload),
  listSeoReports: () => api.get<SeoReportListResponse>("/seo-reports"),
};

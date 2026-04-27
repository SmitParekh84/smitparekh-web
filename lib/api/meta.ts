import { api } from "./client";

// Backend returns the tags object directly (no {success,data} wrapper)
export type MetaTagsResponse = Record<string, string>;

export interface SeoAnalyzePayload {
  url: string;
  email?: string;
}

// Backend returns a rich SEO data object directly
export type SeoAnalyzeResponse = Record<string, unknown>;

export interface SeoReportListResponse {
  reports: Array<{
    _id: string;
    url: string;
    email?: string;
    date: string;
  }>;
  pagination: {
    totalReports: number;
    totalPages: number;
    currentPage: number;
    reportsPerPage: number;
  };
}

export const metaApi = {
  getTags: (url: string) => api.get<MetaTagsResponse>("/meta-tags", { params: { url } }),
  // Backend reads url/email from req.body (now fixed) via POST
  analyzeSeo: (payload: SeoAnalyzePayload) =>
    api.post<SeoAnalyzeResponse>("/seo-analyze", payload),
  listSeoReports: () => api.get<SeoReportListResponse>("/seo-reports"),
};

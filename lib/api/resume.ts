import { api } from "./client";

export interface ResumeAnalysisResponse {
  success: boolean;
  analysis: string;
  score?: number;
  recommendations?: string[];
}

export const resumeApi = {
  analyze: (file: File) => {
    const form = new FormData();
    form.append("resume", file);
    return api.postForm<ResumeAnalysisResponse>("/resume-analyze", form);
  },
};

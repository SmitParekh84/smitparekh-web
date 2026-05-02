import { api } from "./client";

// Matches what the backend actually returns from Gemini analysis
export interface ResumeAnalysisResponse {
  atsScore: number;
  missingKeywords: string[];
  sectionBreakdown: Array<{
    section: string;
    rating: string;    // e.g. "Excellent", "Good", "Needs Work"
    comments: string;
  }>;
  bulletSuggestions: Array<{
    original: string;
    improved: string;
  }>;
  summary?: string;
  recommendations?: string[];
}

export const resumeApi = {
  analyze: (file: File, jobDescription?: string) => {
    const form = new FormData();
    form.append("resume", file);
    if (jobDescription?.trim()) form.append("jobDescription", jobDescription.trim());
    return api.postForm<ResumeAnalysisResponse>("/resume-analyze", form);
  },
};

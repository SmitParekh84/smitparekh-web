import { api } from "./client";

export type ResumeEventType = "button_click" | "view" | "download";

export interface ResumeEventStatsResponse {
  totals: {
    button_click: number;
    view: number;
    download: number;
  };
  daily: Array<{
    date: string;
    button_click: number;
    view: number;
    download: number;
  }>;
}

export const resumeEventsApi = {
  track: (type: ResumeEventType) =>
    api.post<{ success: boolean }>("/resume-events", { type }),
  getStats: (days = 30) =>
    api.get<ResumeEventStatsResponse>(`/admin/resume-events/stats?days=${days}`),
};

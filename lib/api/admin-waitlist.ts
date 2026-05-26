import { api } from "./client";

export interface WaitlistEmail {
  email: string;
  joinedAt: string;
}

export interface WaitlistGroup {
  tool: string;
  count: number;
  emails: WaitlistEmail[];
}

export const adminWaitlistApi = {
  list: () =>
    api.get<{ success: boolean; total: number; data: WaitlistGroup[] }>("/admin/waitlist"),
};

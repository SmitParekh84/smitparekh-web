import type { Metadata } from "next";
import { UserShell } from "@/components/user/UserShell";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <UserShell>{children}</UserShell>;
}

"use client";

import { UserGuard } from "@/components/user/UserGuard";
import { UserSidebar } from "@/components/user/UserSidebar";
import { UserTopbar } from "@/components/user/UserTopbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function UserShell({ children }: { children: React.ReactNode }) {
  return (
    <UserGuard>
      <TooltipProvider delay={150}>
        <SidebarProvider className="h-svh">
          <UserSidebar />
          <SidebarInset className="overflow-y-auto">
            <UserTopbar />
            <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-6xl">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </UserGuard>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { ClientTopbar } from "@/components/client/ClientTopbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The login page shares this layout but must render without the portal chrome.
  if (pathname === "/client/login") {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delay={150}>
      <SidebarProvider className="h-svh">
        <ClientSidebar />
        <SidebarInset className="overflow-y-auto">
          <ClientTopbar />
          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

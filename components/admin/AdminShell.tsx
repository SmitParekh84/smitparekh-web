"use client";

import { usePathname } from "next/navigation";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The login page lives inside the admin route group so it can share the
  // (admin) parent layout, but it must NOT render the protected shell.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <TooltipProvider delay={150}>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <AdminTopbar />
            <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </AdminGuard>
  );
}

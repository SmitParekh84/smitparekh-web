"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ChevronRight, LogOut, Moon, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useClientMe } from "@/hooks/api/use-clients";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const TITLES: Record<string, string> = {
  "/client/dashboard": "Dashboard",
  "/client/requirements": "Requirements",
  "/client/project": "Project",
  "/client/invoices": "Invoices",
  "/client/account": "Account",
};

function resolveTitle(pathname: string): string {
  return TITLES[pathname] ?? "Client Portal";
}

export function ClientTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { data } = useClientMe();
  const client = data?.data;

  const displayName = client?.name || client?.email || "Client";
  const email = client?.email ?? "";
  const initials =
    displayName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "C";

  async function handleLogout() {
    await createClient().auth.signOut();
    router.replace("/client/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2">
        <span className="text-xs text-muted-foreground">Client Portal</span>
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/60" />
        <h1 className="truncate text-sm font-medium">{resolveTitle(pathname)}</h1>
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="relative"
        >
          <Sun className="absolute h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 px-2")}
          >
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarFallback className="rounded-lg bg-blue-500/15 text-blue-500 text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
              {displayName}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-0.5">
                <span className="text-sm font-medium truncate">{displayName}</span>
                <span className="text-xs text-muted-foreground truncate">{email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

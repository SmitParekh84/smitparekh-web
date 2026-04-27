"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TITLES: Record<string, string> = {
  "/admin": "Overview",
  "/admin/projects": "Projects",
  "/admin/projects/new": "New project",
  "/admin/feedback": "Feedback",
  "/admin/tools": "Tools",
  "/admin/settings": "Settings",
};

function resolveTitle(pathname: string): string {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/admin/projects/")) return "Edit project";
  return "Admin";
}

export function AdminTopbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const title = resolveTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="text-xs text-muted-foreground">Admin</span>
        <h1 className="truncate text-sm font-semibold">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative"
        >
          <Sun className="absolute h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          aria-label="View site"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")}
        >
          <ExternalLinkIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">View site</span>
        </Link>
      </div>
    </header>
  );
}

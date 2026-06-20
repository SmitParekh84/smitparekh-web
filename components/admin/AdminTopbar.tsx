"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  ChevronRight,
  Search,
  ExternalLink as ExternalLinkIcon,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clearAdminToken } from "@/lib/api";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

const TITLES: Record<string, string> = {
  "/admin": "Overview",
  "/admin/projects": "Projects",
  "/admin/projects/new": "New project",
  "/admin/blogs": "Blog",
  "/admin/blogs/new": "New post",
  "/admin/contacts": "Contacts",
  "/admin/feedback": "Feedback",
  "/admin/waitlist": "Waitlist",
  "/admin/chats": "Chats",
  "/admin/tools": "Tools",
  "/admin/resume": "Resume",
  "/admin/users": "Users",
  "/admin/tenants": "Tenants",
  "/admin/settings": "Settings",
};

function resolveTitle(pathname: string): string {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/admin/projects/")) return "Edit project";
  if (pathname.startsWith("/admin/blogs/")) return "Edit blog";
  if (pathname.startsWith("/admin/tenants/")) return "Tenant blogs";
  if (pathname.startsWith("/admin/tools/")) return "Tool";
  return "Admin";
}

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { session } = useSupabaseSession();
  const title = resolveTitle(pathname);

  const meta = session?.user?.user_metadata ?? {};
  const displayName: string = meta.full_name ?? meta.name ?? "Smit Parekh";
  const avatarUrl: string | undefined = meta.avatar_url;
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    await clearAdminToken();
    router.replace("/admin/login");
  }

  function handleSwitchUser() {
    toast.info("Coming soon", "Multi-account switching is a future feature.");
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      {/* Breadcrumb: Admin › PageTitle */}
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2">
        <span className="text-xs text-muted-foreground">Admin</span>
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/60" />
        <h1 className="truncate text-sm font-medium">{title}</h1>
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Global search - UI only; wiring is future work (see README). */}
        <div className="relative hidden w-56 md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search…"
            aria-label="Search admin"
            className="h-8 pl-8 text-sm"
          />
        </div>

        {/* Theme toggle */}
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

        {/* View site */}
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

        <Separator orientation="vertical" className="h-5 mx-1" />

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 px-2")}
          >
            <Avatar className="h-7 w-7 rounded-lg">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
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
                <span className="text-xs text-muted-foreground truncate">
                  {session?.user?.email ?? "admin"}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/settings")} className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSwitchUser} className="gap-2 text-muted-foreground">
              <UserRound className="h-4 w-4" />
              Switch user
              <span className="ml-auto text-xs bg-muted rounded px-1">Soon</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

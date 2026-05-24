"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  ExternalLink,
  LogOut,
  ChevronsUpDown,
  Settings,
  FileText,
  BookOpen,
  Code2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { useMyTenant } from "@/hooks/api/use-tenant";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV_MAIN = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Tools", href: "/dashboard/tools", icon: Wrench },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

const NAV_LINKS = [
  { title: "Free Tools", href: "/free-tools", icon: ExternalLink },
  { title: "View site", href: "/", icon: ExternalLink },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BlogNavSection({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(() => pathname.startsWith("/dashboard/blog"));
  const { data: tenant, isLoading } = useMyTenant();

  const isBlogActive = pathname.startsWith("/dashboard/blog");

  const subItems = (() => {
    if (isLoading) return null;
    if (!tenant) {
      return [{ title: "Get Started", href: "/dashboard/blog/onboarding", icon: BookOpen }];
    }
    if (tenant.status === "pending" || tenant.status === "rejected") {
      return [
        { title: "Status", href: "/dashboard/blog/onboarding", icon: BookOpen },
        { title: "Blog Settings", href: "/dashboard/blog/settings", icon: Settings },
        { title: "API Docs", href: "/dashboard/blog/api-docs", icon: Code2 },
      ];
    }
    return [
      { title: "My Blogs", href: "/dashboard/blog", icon: FileText },
      { title: "Blog Settings", href: "/dashboard/blog/settings", icon: Settings },
      { title: "API Docs", href: "/dashboard/blog/api-docs", icon: Code2 },
    ];
  })();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isBlogActive}
        tooltip="Blog"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        <span>Blog</span>
        <ChevronRight
          className={cn(
            "ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </SidebarMenuButton>

      {open && subItems && (
        <SidebarMenuSub>
          {subItems.map((item) => (
            <SidebarMenuSubItem key={item.href}>
              <SidebarMenuSubButton
                render={<Link href={item.href} />}
                isActive={isActive(pathname, item.href)}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSupabaseSession();

  const meta = session?.user?.user_metadata ?? {};
  const displayName: string =
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    session?.user?.email ??
    "User";
  const avatarUrl: string | undefined = meta.avatar_url as string | undefined;
  const email: string = session?.user?.email ?? "";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-500 text-white text-xs font-bold shrink-0">
                {initials || "U"}
              </div>
              <div className="flex flex-col gap-0.5 leading-none min-w-0">
                <span className="font-semibold text-sm">My Dashboard</span>
                <span className="text-xs text-muted-foreground truncate">
                  {siteConfig.name}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={isActive(pathname, item.href)}
                    tooltip={item.title}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <BlogNavSection pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Quick links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_LINKS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} target="_blank" rel="noreferrer" />}
                    tooltip={item.title}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  />
                }
              >
                <Avatar className="h-7 w-7 rounded-lg shrink-0">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                  <AvatarFallback className="rounded-lg bg-blue-500/15 text-blue-500 text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none min-w-0">
                  <span className="font-semibold text-sm truncate">{displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-52">
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

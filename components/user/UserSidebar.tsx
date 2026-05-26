"use client";

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
  MessageSquare,
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

type NavItem = { title: string; href: string; icon: typeof FileText };

const NAV_DASHBOARD: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Tools", href: "/dashboard/tools", icon: Wrench },
];

const NAV_ACCOUNT: NavItem[] = [
  { title: "Help & feedback", href: "/dashboard/help", icon: MessageSquare },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSupabaseSession();
  const { data: tenant, isLoading: tenantLoading } = useMyTenant();

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

  // Blog section adapts to the tenant's onboarding status — same logic as before,
  // just rendered as a flat section to match the redesign.
  const blogItems: NavItem[] | null = (() => {
    if (tenantLoading) return null;
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
      { title: "My Posts", href: "/dashboard/blog", icon: FileText },
      { title: "Blog Settings", href: "/dashboard/blog/settings", icon: Settings },
      { title: "API Docs", href: "/dashboard/blog/api-docs", icon: Code2 },
    ];
  })();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  function renderItems(items: NavItem[]) {
    return items.map((item) => (
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
    ));
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
            <SidebarMenu>{renderItems(NAV_DASHBOARD)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Blog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {blogItems === null ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading…</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                renderItems(blogItems)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(NAV_ACCOUNT)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/free-tools" target="_blank" rel="noreferrer" />}
                  tooltip="Free tools"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Free tools</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  MessageSquare,
  MessagesSquare,
  Wrench,
  Settings2,
  LogOut,
  ChevronsUpDown,
  UserRound,
  Users,
  Building2,
  FileBadge,
  Bell,
  Briefcase,
  Receipt,
  ImageIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
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
import { Badge } from "@/components/ui/badge";
import { clearAdminToken } from "@/lib/api";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { useAdminContactsUnreadCount } from "@/hooks/api/use-admin-contacts";
import { siteConfig } from "@/data/site";

// Grouped nav - mirrors the redesign's Workspace / Team / Account sections.
const NAV_SECTIONS = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", href: "/admin", icon: LayoutDashboard },
      { title: "Projects", href: "/admin/projects", icon: FolderKanban },
      { title: "Wallpapers", href: "/admin/wallpapers", icon: ImageIcon },
      { title: "Blog", href: "/admin/blogs", icon: FileText },
      { title: "Contacts", href: "/admin/contacts", icon: Mail },
      { title: "Feedback", href: "/admin/feedback", icon: MessageSquare },
      { title: "Waitlist", href: "/admin/waitlist", icon: Bell },
      { title: "Chats", href: "/admin/chats", icon: MessagesSquare },
      { title: "Tools", href: "/admin/tools", icon: Wrench },
      { title: "Resume", href: "/admin/resume", icon: FileBadge },
    ],
  },
  {
    label: "Team",
    items: [
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Tenants", href: "/admin/tenants", icon: Building2 },
      { title: "Clients", href: "/admin/clients", icon: Briefcase },
      { title: "Invoices", href: "/admin/invoices", icon: Receipt },
    ],
  },
  {
    label: "Account",
    items: [{ title: "Settings", href: "/admin/settings", icon: Settings2 }],
  },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSupabaseSession();
  const { data: unreadContacts = 0 } = useAdminContactsUnreadCount();

  const meta = session?.user?.user_metadata ?? {};
  const displayName: string = meta.full_name ?? meta.name ?? "Smit Parekh";
  const avatarUrl: string | undefined = meta.avatar_url;
  const email: string = session?.user?.email ?? "admin";
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

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin" />}>
              <Image
                src="/Smit-Logo.svg"
                alt="Smit Parekh"
                width={32}
                height={32}
                className="size-8"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Admin</span>
                <span className="truncate text-xs text-muted-foreground">
                  {siteConfig.name}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_SECTIONS.map((section, i) => (
          <SidebarGroup key={section.label} className={i === 0 ? undefined : "mt-1"}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const showContactsPill =
                    item.href === "/admin/contacts" && unreadContacts > 0;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        tooltip={item.title}
                        isActive={isActive(pathname, item.href)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        {showContactsPill && (
                          <Badge className="ml-auto h-5 min-w-5 rounded-full bg-blue-500 px-1.5 text-[10px] font-semibold text-white hover:bg-blue-500">
                            {unreadContacts > 99 ? "99+" : unreadContacts}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
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
                <Avatar className="h-8 w-8 rounded-lg">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                  <AvatarFallback className="rounded-lg bg-blue-500/15 text-blue-500 font-semibold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="start"
                sideOffset={8}
                className="min-w-56 rounded-lg"
              >
                {/* Current account */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                      <AvatarFallback className="rounded-lg bg-blue-500/15 text-blue-500 font-semibold text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5 min-w-0">
                      <span className="text-sm font-medium truncate">{displayName}</span>
                      <span className="text-xs text-muted-foreground truncate">{email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* View user dashboard */}
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard")}
                  className="gap-2"
                >
                  <UserRound className="size-4" />
                  My Dashboard
                </DropdownMenuItem>

                {/* Switch to the client project portal */}
                <DropdownMenuItem
                  onClick={() => router.push("/client/dashboard")}
                  className="gap-2"
                >
                  <Briefcase className="size-4" />
                  Client portal
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => router.push("/admin/settings")}
                  className="gap-2"
                >
                  <Settings2 className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive gap-2">
                  <LogOut className="size-4" />
                  Log out
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
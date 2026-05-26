"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, LayoutDashboard, LogOut, User, Code2, TrendingUp, Package, LayoutGrid } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems, mobileNavItems } from "@/data/navigation";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { createClient } from "@/lib/supabase/client";
import type { FeaturedNavTool } from "@/lib/featured-nav-tools";

const SERVICE_CAT_ICONS: Record<string, typeof Code2> = {
  "Development": Code2,
  "Marketing & SEO": TrendingUp,
  "Products & AI": Package,
  "Browse": LayoutGrid,
};

const linkItems = navItems.filter(
  (item) =>
    item.href !== "/" &&
    item.href !== "/contact" &&
    item.href !== "/hire-me" &&
    !item.dropdown &&
    !item.categories
);

const servicesNavItem = navItems.find((item) => item.href === "/services");

const NAV_GROUP_ORDER: ReadonlyArray<FeaturedNavTool["group"]> = [
  "Image",
  "Content",
  "Career",
  "Developer",
  "Productivity",
];

function groupTools(tools: FeaturedNavTool[]) {
  const map = new Map<FeaturedNavTool["group"], FeaturedNavTool[]>();
  tools.forEach((t) => {
    const list = map.get(t.group) ?? [];
    list.push(t);
    map.set(t.group, list);
  });
  return NAV_GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
    title: g,
    items: (map.get(g) ?? []).sort((a, b) => a.order - b.order),
  }));
}

export default function Navbar({
  featuredNavTools,
}: {
  featuredNavTools: FeaturedNavTool[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeServiceGroup, setActiveServiceGroup] = useState(0);
  const [activeServiceSub, setActiveServiceSub] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { session } = useSupabaseSession();

  const toolsGroups = useMemo(() => groupTools(featuredNavTools), [featuredNavTools]);
  const showToolsDropdown = toolsGroups.length > 0;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Close Tools dropdown when clicking outside */
  useEffect(() => {
    if (!toolsOpen) return;
    const handle = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [toolsOpen]);

  /* Close Services dropdown when clicking outside */
  useEffect(() => {
    if (!servicesOpen) return;
    const handle = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [servicesOpen]);

  /* Reset category + sub-category when Services dropdown closes */
  useEffect(() => {
    if (!servicesOpen) {
      setActiveServiceGroup(0);
      setActiveServiceSub(0);
    }
  }, [servicesOpen]);

  /* Close user menu when clicking outside */
  useEffect(() => {
    if (!userMenuOpen) return;
    const handle = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [userMenuOpen]);

  async function handleLogout() {
    setUserMenuOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  /* Close dropdowns and mobile menu on navigation */
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setToolsOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/*
        At the top: floating pill with transparent gap above it (pointer-events-none
        lets clicks pass through that gap). When scrolled: header fills from the
        viewport top with a solid blur so no white gap shows through.
      */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300",
          scrolled
            ? "pt-2 bg-background/95 backdrop-blur-2xl border-b border-border"
            : "pt-4"
        )}
      >
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-2 rounded-2xl px-3 h-12 w-full max-w-4xl transition-all duration-300",
            scrolled
              ? "border border-transparent shadow-none"
              : "bg-card/80 backdrop-blur-xl border border-border/70 shadow-md shadow-black/5"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image
              src="/Smit-Logo.svg"
              alt="Smit Parekh"
              width={26}
              height={26}
              priority
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-semibold text-sm hidden sm:block">
              Smit Parekh
            </span>
          </Link>

          {/* Desktop links - centered */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {linkItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2.5 py-1.5 text-sm rounded-xl transition-colors",
                  pathname === item.href
                    ? "text-foreground font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Services - 3-level mega menu */}
            {servicesNavItem?.categories && (
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 text-sm rounded-xl transition-colors",
                    servicesNavItem.categories
                      .flatMap((c) => c.subCategories)
                      .flatMap((s) => s.items)
                      .some((i) => pathname.startsWith(i.href))
                      ? "text-foreground font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>

                {servicesOpen && (() => {
                  const activeCat = servicesNavItem.categories[activeServiceGroup] ?? servicesNavItem.categories[0];
                  const activeSub = activeCat.subCategories[activeServiceSub] ?? activeCat.subCategories[0];
                  return (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(96vw,900px)]">
                      <div className="bg-popover border border-border rounded-2xl shadow-2xl shadow-black/25 overflow-hidden">
                        <div className="flex min-h-[220px]">

                          {/* Column 1: Main categories */}
                          <div className="w-40 shrink-0 bg-muted/40 dark:bg-muted/20 border-r border-border p-3 flex flex-col gap-0.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 pb-2">
                              Category
                            </p>
                            {servicesNavItem.categories.map((cat, i) => {
                              const Icon = SERVICE_CAT_ICONS[cat.title] ?? LayoutGrid;
                              const isActive = activeServiceGroup === i;
                              return (
                                <button
                                  key={cat.title}
                                  onMouseEnter={() => { setActiveServiceGroup(i); setActiveServiceSub(0); }}
                                  onClick={() => { setActiveServiceGroup(i); setActiveServiceSub(0); }}
                                  className={cn(
                                    "flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-150",
                                    isActive
                                      ? "bg-background text-foreground font-medium shadow-sm ring-1 ring-border"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                  )}
                                >
                                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-blue-500" : "")} />
                                  <span className="flex-1">{cat.title}</span>
                                  {isActive && <ChevronDown className="w-3 h-3 -rotate-90 text-blue-500 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          {/* Column 2: Sub-categories */}
                          <div className="w-44 shrink-0 border-r border-border p-3 flex flex-col gap-0.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 pb-2">
                              {activeCat.title}
                            </p>
                            {activeCat.subCategories.map((sub, i) => {
                              const isActive = activeServiceSub === i;
                              return (
                                <button
                                  key={sub.title}
                                  onMouseEnter={() => setActiveServiceSub(i)}
                                  onClick={() => setActiveServiceSub(i)}
                                  className={cn(
                                    "flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-150",
                                    isActive
                                      ? "bg-accent text-foreground font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                                  )}
                                >
                                  <span className="flex-1">{sub.title}</span>
                                  <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded-full shrink-0 transition-colors",
                                    isActive ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : "bg-muted text-muted-foreground"
                                  )}>
                                    {sub.items.length}
                                  </span>
                                  {isActive && <ChevronDown className="w-3 h-3 -rotate-90 text-blue-500 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          {/* Column 3: Pages — 3-col card grid */}
                          <div className="flex-1 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-0.5">
                              {activeSub.title}
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {activeSub.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex flex-col gap-1 p-3 rounded-xl border border-border hover:border-blue-500/40 hover:bg-blue-500/5 transition-all"
                                >
                                  <span className="text-sm font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                    {item.label}
                                  </span>
                                  {item.description && (
                                    <span className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                                      {item.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
                          <p className="text-xs text-muted-foreground">
                            Free quote in 24 hours — no sales call required.
                          </p>
                          <Link
                            href="/contact"
                            onClick={() => setServicesOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Start a project
                            <ChevronDown className="h-3 w-3 -rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Free Tools - click-to-open dropdown */}
            {showToolsDropdown && (
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => setToolsOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 text-sm rounded-xl transition-colors",
                    pathname.startsWith("/free-tools")
                      ? "text-foreground font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  )}
                >
                  Free Tools
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      toolsOpen && "rotate-180"
                    )}
                  />
                </button>

                {toolsOpen && (() => {
                  const groupCount = Math.max(toolsGroups.length, 1);
                  // Up to 4 categories: one row. 5+: wrap into rows of 3.
                  const cols = groupCount <= 4 ? groupCount : 3;
                  return (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 max-w-[calc(100vw-2rem)]"
                    style={{ width: `${cols * 240 + 40}px` }}
                  >
                    <div className="bg-popover border border-border rounded-2xl shadow-2xl shadow-black/25 p-5">
                      {/* Header row — links to the full landing page */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Most Popular Tools</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Hand-picked picks our visitors love
                          </p>
                        </div>
                        <Link
                          href="/free-tools"
                          onClick={() => setToolsOpen(false)}
                          className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          Browse all 31 tools
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                      <div
                        className={cn(
                          "grid gap-x-5 gap-y-4",
                          cols === 1 && "grid-cols-1",
                          cols === 2 && "grid-cols-2",
                          cols === 3 && "grid-cols-3",
                          cols === 4 && "grid-cols-4",
                        )}
                      >
                        {toolsGroups.map((group) => (
                          <div key={group.title}>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                              {group.title}
                            </p>
                            <ul className="space-y-0.5">
                              {group.items.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => setToolsOpen(false)}
                                    className="block px-2 py-1.5 rounded-xl hover:bg-accent transition-colors"
                                  >
                                    <span className="text-sm font-medium">
                                      {sub.label}
                                    </span>
                                    {sub.description && (
                                      <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                                        {sub.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold">Looking for something else?</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Explore our full catalog of free online tools.
                          </p>
                        </div>
                        <Link
                          href="/free-tools"
                          onClick={() => setToolsOpen(false)}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "gap-1.5 shrink-0 rounded-xl"
                          )}
                        >
                          See all tools
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-8 w-8 rounded-xl"
              )}
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>

            {/* User avatar (logged in) OR Hire Me (guest) - desktop only */}
            {session ? (
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-accent transition-colors"
                  aria-label="User menu"
                >
                  {session.user.user_metadata?.avatar_url ? (
                    <img
                      src={session.user.user_metadata.avatar_url}
                      alt={session.user.user_metadata?.full_name ?? "User"}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-border"
                    />
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </span>
                  )}
                  <span className="text-sm font-medium max-w-[96px] truncate hidden lg:block">
                    {session.user.user_metadata?.full_name?.split(" ")[0] ?? "Account"}
                  </span>
                  <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full pt-2 w-56">
                    <div className="bg-popover border border-border rounded-2xl shadow-xl shadow-black/10 p-1.5 space-y-0.5">
                      {/* User info header */}
                      <div className="px-3 py-2 border-b border-border mb-1">
                        <p className="text-xs font-semibold truncate">
                          {session.user.user_metadata?.full_name ?? "User"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-accent transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                        My Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-destructive/10 hover:text-destructive transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "hidden md:flex h-8 text-xs px-3.5 rounded-xl"
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "hidden md:flex h-8 text-xs px-3.5 rounded-xl"
                  )}
                >
                  Hire Me
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden h-8 w-8 rounded-xl"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop - click to close */}
          <div
            className="absolute inset-0 bg-background/92 backdrop-blur-2xl"
            onClick={() => setMobileOpen(false)}
          />

          <nav className="relative z-10 flex flex-col px-6 pt-24 pb-10 h-full">
            <div className="flex-1 overflow-y-auto space-y-1 pb-2">
              {mobileNavItems
                .filter((item) => item.href !== "/services" && item.href !== "/for-students")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex w-full items-center px-4 py-3.5 text-lg font-medium rounded-2xl transition-colors",
                      pathname === item.href
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Services accordion */}
              {servicesNavItem?.categories && (
                <div>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3.5 text-lg font-medium rounded-2xl transition-colors",
                      servicesNavItem.categories
                        .flatMap((c) => c.subCategories)
                        .flatMap((s) => s.items)
                        .some((i) => pathname.startsWith(i.href))
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    )}
                  >
                    Services
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        mobileServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {servicesNavItem.categories
                        .flatMap((c) => c.subCategories)
                        .flatMap((s) => s.items)
                        .map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex flex-col px-4 py-3 text-base rounded-2xl transition-colors",
                              pathname === sub.href
                                ? "text-foreground bg-accent"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                            )}
                          >
                            <span className="font-medium">{sub.label}</span>
                            {sub.description && (
                              <span className="text-xs mt-0.5 leading-snug opacity-70">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {!session && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 rounded-2xl")}
                >
                  Sign in
                </Link>
              )}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ size: "lg" }), !session ? "flex-1" : "w-full", "rounded-2xl")}
              >
                Hire Me
              </Link>
            </div>

            {/* Mobile: user actions when logged in */}
            {session && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-muted/50">
                  {session.user.user_metadata?.avatar_url ? (
                    <img
                      src={session.user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
                    />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {session.user.user_metadata?.full_name ?? "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full rounded-2xl gap-2")}
                >
                  <LayoutDashboard className="w-4 h-4" /> My Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full rounded-2xl gap-2 text-destructive hover:text-destructive")}
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, LayoutDashboard, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems, mobileNavItems } from "@/data/navigation";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { createClient } from "@/lib/supabase/client";

const linkItems = navItems.filter(
  (item) => item.href !== "/" && item.href !== "/contact" && !item.dropdown
);
const toolsItem = navItems.find((item) => !!item.dropdown);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const toolsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { session } = useSupabaseSession();

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

  /* Close mobile menu on navigation */
  useEffect(() => setMobileOpen(false), [pathname]);

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
                  "px-3 py-1.5 text-sm rounded-xl transition-colors",
                  pathname === item.href
                    ? "text-foreground font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Free Tools - click-to-open dropdown */}
            {toolsItem && (
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => setToolsOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl transition-colors",
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

                {toolsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[640px]">
                    <div className="bg-popover border border-border rounded-2xl shadow-2xl shadow-black/25 p-5">
                      <div className="grid grid-cols-3 gap-5">
                        {toolsItem.dropdown?.map((group) => (
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

                      {toolsItem.featured && (
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold">
                              {toolsItem.featured.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {toolsItem.featured.description}
                            </p>
                          </div>
                          <Link
                            href={toolsItem.featured.href}
                            onClick={() => setToolsOpen(false)}
                            className={cn(
                              buttonVariants({ variant: "outline", size: "sm" }),
                              "gap-1.5 shrink-0 rounded-xl"
                            )}
                          >
                            {toolsItem.featured.cta}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "hidden md:flex h-8 text-xs px-3.5 rounded-xl"
                )}
              >
                Hire Me
              </Link>
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
            <div className="flex-1 space-y-1">
              {mobileNavItems.map((item) => (
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
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ size: "lg" }), "w-full rounded-2xl")}
            >
              Hire Me
            </Link>

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

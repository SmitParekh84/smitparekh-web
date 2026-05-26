"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { FeaturedNavTool } from "@/lib/featured-nav-tools";

const NO_SHELL_PREFIXES = ["/admin", "/dashboard", "/login"];

function hideShell(pathname: string) {
  return NO_SHELL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function ConditionalNavbar({
  featuredNavTools,
}: {
  featuredNavTools: FeaturedNavTool[];
}) {
  const pathname = usePathname();
  if (hideShell(pathname)) return null;
  return <Navbar featuredNavTools={featuredNavTools} />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (hideShell(pathname)) return null;
  return <Footer />;
}

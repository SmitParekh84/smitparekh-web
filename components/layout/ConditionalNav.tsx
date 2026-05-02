"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NO_SHELL_PREFIXES = ["/admin", "/dashboard", "/login"];

function hideShell(pathname: string) {
  return NO_SHELL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (hideShell(pathname)) return null;
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (hideShell(pathname)) return null;
  return <Footer />;
}

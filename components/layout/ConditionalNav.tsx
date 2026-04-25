"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}

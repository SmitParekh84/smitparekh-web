"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export function ConditionalChat() {
  const pathname = usePathname();
  // Hide chatbot from the admin area and client portal - it's a visitor-facing tool only.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/client")) return null;
  return <ChatWidget />;
}

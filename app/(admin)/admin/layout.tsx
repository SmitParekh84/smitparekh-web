import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Smit Parekh",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-bold text-foreground hover:text-blue-500 transition-colors"
            >
              Admin Dashboard
            </Link>
            <span className="hidden sm:block text-muted-foreground/40">|</span>
            <Link
              href="/admin/projects/new"
              className="hidden sm:block text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              + New Project
            </Link>
          </div>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
          >
            View Site ↗
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}

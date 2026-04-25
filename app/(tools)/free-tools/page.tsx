import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools",
  description: "Free developer and productivity tools built by Smit Parekh — available to everyone, no login required.",
};

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">Free Tools</h1>
        <p className="text-muted-foreground mt-4">Coming soon.</p>
      </div>
    </main>
  );
}

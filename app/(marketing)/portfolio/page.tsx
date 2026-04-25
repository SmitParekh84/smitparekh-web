import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse projects built by Smit Parekh — web apps, tools, and full-stack solutions.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground mt-4">Coming soon.</p>
      </div>
    </main>
  );
}

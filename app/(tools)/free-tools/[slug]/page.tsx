import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title,
    description: `Use the free ${title} tool — no login required.`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold capitalize">{slug.replace(/-/g, " ")}</h1>
        <p className="text-muted-foreground mt-4">Tool coming soon.</p>
      </div>
    </main>
  );
}

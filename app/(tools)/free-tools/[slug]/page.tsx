import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { toolsSEO, getToolSEO } from "@/data/tools-seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolsSEO.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolSEO(slug);

  if (tool) {
    return {
      title: tool.title,
      description: tool.description,
      keywords: tool.keywords,
      alternates: { canonical: `${siteConfig.url}/free-tools/${slug}` },
      openGraph: {
        title: tool.title,
        description: tool.description,
        url: `${siteConfig.url}/free-tools/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: tool.title,
        description: tool.description,
      },
    };
  }

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} — Free Online Tool`,
    description: `Use the free ${title} tool — no account required.`,
    alternates: { canonical: `${siteConfig.url}/free-tools/${slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolSEO(slug);

  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">
          {tool?.title.split(" — ")[0] ?? slug.replace(/-/g, " ")}
        </h1>
        <p className="text-muted-foreground mt-4">Tool coming soon.</p>
      </div>
    </main>
  );
}

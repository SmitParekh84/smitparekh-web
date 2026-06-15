import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { toolsSEO } from "@/data/tools-seo";
import ToolRenderer from "@/components/tools/ToolRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolsSEO.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = toolsSEO.find((t) => t.slug === slug);
  const name = tool?.title.split(" - ")[0] ?? slug;
  return { title: `${name} - Admin`, robots: { index: false } };
}

export default async function AdminToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolsSEO.find((t) => t.slug === slug);
  const name = tool?.title.split(" - ")[0] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/tools"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
          <p className="text-xs text-muted-foreground">Running within admin - quota applies as normal</p>
        </div>
      </div>

      <ToolRenderer slug={slug} />
    </div>
  );
}

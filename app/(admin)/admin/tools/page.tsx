"use client";

import Link from "next/link";
import {
  ImageOff,
  ImageDown,
  QrCode,
  FileText,
  Briefcase,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolItem {
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "image" | "content" | "documentation" | "social";
  status: "live" | "beta";
}

const TOOLS: ToolItem[] = [
  {
    slug: "remove-background",
    name: "Background remover",
    description:
      "Strip the background from any image. Routes to the Python service when configured.",
    icon: ImageOff,
    category: "image",
    status: "live",
  },
  {
    slug: "compress-image",
    name: "Image compressor",
    description: "Shrink JPG / PNG / WebP files without losing quality.",
    icon: ImageDown,
    category: "image",
    status: "live",
  },
  {
    slug: "qr-code",
    name: "QR code generator",
    description: "Generate styled QR codes from URLs, vCards, or plain text.",
    icon: QrCode,
    category: "content",
    status: "live",
  },
  {
    slug: "resume-analyzer",
    name: "Resume analyzer",
    description: "Upload a PDF and get AI-powered feedback on the content.",
    icon: FileText,
    category: "documentation",
    status: "live",
  },
  {
    slug: "linkedin-media",
    name: "LinkedIn media downloader",
    description: "Pull videos and images from LinkedIn post URLs.",
    icon: Briefcase,
    category: "social",
    status: "beta",
  },
  {
    slug: "generate-post",
    name: "AI post generator",
    description: "Spin up SEO-friendly social posts in seconds.",
    icon: Sparkles,
    category: "content",
    status: "beta",
  },
];

const CATEGORY_LABEL: Record<ToolItem["category"], string> = {
  image: "Image",
  content: "Content",
  documentation: "Documentation",
  social: "Social",
};

export default function ToolsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Tools</h2>
        <p className="text-sm text-muted-foreground">
          Quick links to the public tools and their backing endpoints.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Card key={tool.slug} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <tool.icon className="h-5 w-5" />
                </span>
                <Badge
                  variant={tool.status === "beta" ? "secondary" : "default"}
                  className="text-[10px] uppercase tracking-wide"
                >
                  {tool.status}
                </Badge>
              </div>
              <CardTitle className="mt-3 text-base">{tool.name}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex items-center justify-between gap-2 pt-0">
              <span className="text-xs text-muted-foreground">
                {CATEGORY_LABEL[tool.category]}
              </span>
              <Link
                href={`/free-tools/${tool.slug}`}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
              >
                Open
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

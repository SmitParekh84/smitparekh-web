"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Loading = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
  </div>
);

const toolMap: Record<string, React.ComponentType> = {
  "password-generator": dynamic(() => import("./PasswordGenerator"), { loading: Loading }),
  "word-counter": dynamic(() => import("./WordCounter"), { loading: Loading }),
  "image-converter": dynamic(() => import("./ImageConverter"), { loading: Loading }),
  "qr-code-generator": dynamic(() => import("./QRCodeGenerator"), { loading: Loading }),
  "background-remover": dynamic(() => import("./BackgroundRemover"), { loading: Loading }),
  "image-compressor": dynamic(() => import("./ImageCompressor"), { loading: Loading }),
  "viral-linkedin-post-generator": dynamic(() => import("./LinkedInPostGenerator"), { loading: Loading }),
  "ats-resume-checker": dynamic(() => import("./ATSResumeChecker"), { loading: Loading }),
  "meta-tag-checker": dynamic(() => import("./MetaTagChecker"), { loading: Loading }),
  "seo-analyzer": dynamic(() => import("./SEOAnalyzer"), { loading: Loading }),
  "linkedin-media-downloader": dynamic(() => import("./LinkedInMediaDownloader"), { loading: Loading }),
};

interface Props {
  slug: string;
}

export default function ToolRenderer({ slug }: Props) {
  const Tool = toolMap[slug];

  if (!Tool) {
    return (
      <div className="rounded-xl border border-border bg-muted/20 p-8 text-center">
        <p className="text-muted-foreground text-sm">This tool is coming soon.</p>
      </div>
    );
  }

  return <Tool />;
}

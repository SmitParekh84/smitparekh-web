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
  "youtube-thumbnail-downloader": dynamic(() => import("./YouTubeThumbnailDownloader"), { loading: Loading }),
  "json-formatter": dynamic(() => import("./JsonFormatter"), { loading: Loading }),
  "base64-encoder-decoder": dynamic(() => import("./Base64Tool"), { loading: Loading }),
  "url-encoder-decoder": dynamic(() => import("./UrlEncoderTool"), { loading: Loading }),
  "hash-generator": dynamic(() => import("./HashGenerator"), { loading: Loading }),
  "regex-tester": dynamic(() => import("./RegexTester"), { loading: Loading }),
  "color-converter": dynamic(() => import("./ColorConverter"), { loading: Loading }),
  "pomodoro-timer": dynamic(() => import("./PomodoroTimer"), { loading: Loading }),
  "world-clock": dynamic(() => import("./WorldClock"), { loading: Loading }),
  "unit-converter": dynamic(() => import("./UnitConverter"), { loading: Loading }),
  "markdown-editor": dynamic(() => import("./MarkdownEditor"), { loading: Loading }),
  "cron-builder": dynamic(() => import("./CronBuilder"), { loading: Loading }),
  "lorem-ipsum": dynamic(() => import("./LoremIpsumGenerator"), { loading: Loading }),
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

export interface ToolSEO {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

export const toolsSEO: ToolSEO[] = [
  {
    slug: "background-remover",
    title: "Background Remover — Free AI Image Background Removal",
    description:
      "Remove image backgrounds instantly with AI. 100% free, no signup, no watermark. Works on photos, logos, and product images in seconds.",
    keywords: [
      "background remover free",
      "remove background from image",
      "AI background remover",
      "image background removal free online",
      "remove photo background",
      "free background eraser",
      "transparent background maker",
    ],
  },
  {
    slug: "viral-linkedin-post-generator",
    title: "LinkedIn Post Generator — Free AI Viral Post Writer",
    description:
      "Generate high-engagement LinkedIn posts with AI. Create hooks, structure, and formatting that drives impressions — free, no account needed.",
    keywords: [
      "LinkedIn post generator free",
      "AI LinkedIn post writer",
      "viral LinkedIn post generator",
      "LinkedIn content generator",
      "LinkedIn post ideas",
      "free LinkedIn post maker",
    ],
  },
  {
    slug: "ats-resume-checker",
    title: "ATS Resume Checker — Free Resume Scanner & Score",
    description:
      "Check your ATS resume score instantly. Get AI-powered suggestions to pass applicant tracking systems and land more interviews — free.",
    keywords: [
      "ATS resume checker free",
      "resume ATS scanner",
      "ATS score checker",
      "resume checker free online",
      "applicant tracking system resume",
      "resume optimization tool",
      "free resume analyzer",
    ],
  },
  {
    slug: "meta-tag-checker",
    title: "Meta Tag Checker — Free SEO Meta Tag Analyzer",
    description:
      "Analyse your website's meta tags instantly. Check title, description, OG tags, and Twitter cards for SEO issues — free online tool.",
    keywords: [
      "meta tag checker free",
      "SEO meta tag analyzer",
      "check meta tags online",
      "meta description checker",
      "open graph tag checker",
      "website SEO checker",
      "free meta tag tool",
    ],
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator — Free Custom QR Code Maker",
    description:
      "Generate custom QR codes for URLs, text, email, or contact info. Download in high resolution — free, no account required.",
    keywords: [
      "QR code generator free",
      "custom QR code maker",
      "free QR code creator",
      "QR code for URL",
      "generate QR code online",
      "free QR code download",
    ],
  },
  {
    slug: "word-counter",
    title: "Word Counter — Free Online Word & Character Count Tool",
    description:
      "Count words, characters, sentences, and reading time instantly. Track keyword density for SEO — free, works in your browser.",
    keywords: [
      "word counter free",
      "online word counter",
      "character counter",
      "word count tool",
      "reading time calculator",
      "keyword density checker",
      "free word counter online",
    ],
  },
  {
    slug: "image-compressor",
    title: "Image Compressor — Free Online Image Size Reducer",
    description:
      "Compress images without losing quality. Reduce JPEG, PNG, and WebP file sizes instantly — free, no upload limit, no account.",
    keywords: [
      "image compressor free",
      "compress image online",
      "reduce image size free",
      "image file size reducer",
      "JPEG compressor free",
      "PNG compressor online",
      "free image optimizer",
    ],
  },
  {
    slug: "image-converter",
    title: "Image Converter — Free Online Image Format Converter",
    description:
      "Convert images between JPEG, PNG, WebP, and more. Fast, free, browser-based — no software to install, no account required.",
    keywords: [
      "image converter free",
      "convert image format online",
      "JPEG to PNG converter",
      "PNG to WebP converter",
      "free image format converter",
      "online image converter",
    ],
  },
  {
    slug: "linkedin-media-downloader",
    title: "LinkedIn Media Downloader — Free LinkedIn Video & Image Downloader",
    description:
      "Download videos and images from LinkedIn posts for free. Fast, no login, works directly in your browser.",
    keywords: [
      "LinkedIn video downloader free",
      "download LinkedIn video",
      "LinkedIn media downloader",
      "save LinkedIn video",
      "LinkedIn image downloader",
      "free LinkedIn downloader",
    ],
  },
  {
    slug: "seo-analyzer",
    title: "SEO Analyzer — Free Website SEO Audit Tool",
    description:
      "Run a free SEO audit on any webpage. Check title tags, headings, meta description, links, and Core Web Vitals — instant results.",
    keywords: [
      "SEO analyzer free",
      "website SEO audit",
      "free SEO checker",
      "SEO audit tool online",
      "on-page SEO checker",
      "website SEO analysis",
      "free website SEO tool",
    ],
  },
  {
    slug: "password-generator",
    title: "Password Generator — Free Strong Random Password Maker",
    description:
      "Generate strong, secure, random passwords instantly. Customise length and character types — free, runs in your browser, nothing stored.",
    keywords: [
      "password generator free",
      "strong password generator",
      "random password generator",
      "secure password maker",
      "free online password generator",
      "complex password generator",
    ],
  },
];

export function getToolSEO(slug: string): ToolSEO | undefined {
  return toolsSEO.find((t) => t.slug === slug);
}

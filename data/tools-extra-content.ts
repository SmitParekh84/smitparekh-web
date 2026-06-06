// Extra long-form SEO content rendered at the BOTTOM of each free-tool page
// (below the tool, how-it-works, FAQ and related tools).
//
// Kept in a separate file from tools-content.ts so the large per-tool content
// map stays untouched. Author a unique entry here per tool — duplicate/thin
// content hurts rankings, so each block must be specific to its tool.
//
// Tools without an entry still get the shared lead-gen CTA from
// <ToolBottomContent>; only the prose sections are gated on an entry existing.

export interface ToolExtraSection {
  heading: string;
  body: string;
}

export interface ToolExtraContent {
  sections: ToolExtraSection[];
}

export const toolExtraContent: Record<string, ToolExtraContent> = {
  "background-remover": {
    sections: [
      {
        heading: "Why remove image backgrounds online instead of in Photoshop?",
        body: "Manual masking in Photoshop or GIMP can take ten to twenty minutes per image, and the result is only as good as your patience with the pen tool around hair and fur. An AI background remover does the same job in seconds with consistently clean edges, which is why e-commerce teams, marketplaces, and social media managers reach for it when they have dozens of product shots to process. Because there is no subscription and no per-image credit system, you can run a whole catalogue through it without watching a counter.",
      },
      {
        heading: "Is it safe to upload my images?",
        body: "Your file is sent securely to the AI processor purely to compute the cutout, and it is deleted immediately afterwards — nothing is stored, logged, or reused. There are no watermarks added to the output, so the transparent PNG you download is production-ready for an online store, a deck, or a composite design. If you need backgrounds removed at scale or wired into your own product, that is exactly the kind of automation I build as a developer.",
      },
    ],
  },
  "image-compressor": {
    sections: [
      {
        heading: "How image compression improves your Core Web Vitals",
        body: "Images are the single biggest contributor to page weight on most websites, and a heavy hero image is the usual culprit behind a poor Largest Contentful Paint (LCP) score. Compressing images to 30–60% of their original size before you upload them is one of the fastest, cheapest performance wins available — it shrinks LCP, cuts bandwidth bills, and makes pages feel instant on mobile data. This tool runs entirely in your browser using the Canvas API, so your images never leave your device.",
      },
      {
        heading: "JPEG, PNG or WebP — which should you choose?",
        body: "Use WebP for photographs and complex images on the web; it typically beats JPEG by 25–35% at the same visual quality. Keep PNG for graphics that need transparency or crisp edges like logos and screenshots. JPEG remains the safe choice when you need maximum compatibility with older systems. A quality setting of 75–80% is the sweet spot for most web images — high enough to look clean, low enough to make a real dent in file size.",
      },
    ],
  },
  "image-converter": {
    sections: [
      {
        heading: "Convert images locally — no upload, no privacy worries",
        body: "Unlike most online converters that upload your file to a server, this tool uses your browser's Canvas API to convert images entirely on your device. That means your screenshots, designs, and personal photos never travel across the internet, and conversion still works even if your connection drops after the page loads. It is ideal for converting legacy JPEGs to WebP before a deploy, or swapping a PNG to JPEG to meet a platform's upload requirement.",
      },
    ],
  },
  "qr-code-generator": {
    sections: [
      {
        heading: "Where QR codes actually earn their keep",
        body: "A QR code is the cheapest bridge between your printed material and a web destination you control. Put one on a business card linking to your LinkedIn, on a restaurant table linking to a digital menu, on product packaging linking to setup instructions, or on an event badge linking to a vCard. Because the code only points to a URL, you can change what lives at that URL anytime without reprinting a single thing. Export at 600px for print so it stays crisp at any size.",
      },
    ],
  },
  "password-generator": {
    sections: [
      {
        heading: "What makes a password actually strong?",
        body: "Length matters far more than complexity — a 16-character random password is exponentially harder to crack than an 8-character one with a few symbols sprinkled in. The real risk for most people is reuse: one breached site exposes every account sharing that password. This generator uses the browser's Web Crypto API to create cryptographically secure values locally, so the password is never transmitted or logged. Pair it with a password manager like Bitwarden or 1Password and you never have to remember or reuse a password again.",
      },
    ],
  },
  "word-counter": {
    sections: [
      {
        heading: "Word count, reading time and keyword density in one place",
        body: "Writers juggle hard limits everywhere — a 280-character tweet, a 160-character meta description, a 1,500-word SEO article, a strict university essay cap. This counter updates every metric in real time as you type, including estimated reading time and a keyword-density table that shows which words you are leaning on too heavily. Everything runs locally in your browser, so the draft you paste in never leaves your device. It is a quiet but essential part of any content or SEO workflow.",
      },
    ],
  },
  "meta-tag-checker": {
    sections: [
      {
        heading: "Why your meta tags decide your click-through rate",
        body: "Your title tag and meta description are the storefront for every Google result — they decide whether a searcher clicks your link or a competitor's. Getting them right (titles around 50–60 characters, descriptions around 150–160) and ensuring Open Graph and Twitter Card tags are present means your pages look intentional both in search and when shared on social. This checker surfaces what a crawler actually sees so you can spot missing canonicals, truncated titles, or absent social tags before they cost you traffic.",
      },
    ],
  },
  "seo-analyzer": {
    sections: [
      {
        heading: "An on-page SEO check is the start, not the finish",
        body: "A quick analyzer is great for catching the obvious wins — missing headings, thin meta tags, images without alt text, no structured data. But ranking is won on the harder stuff a single scan can't fully grade: Core Web Vitals on real devices, internal linking, content depth versus the pages already ranking, and crawl/indexation health. Use this tool to fix the quick issues, then if you want the deeper work done and shipped, that is exactly what my SEO, technical SEO, and AEO/GEO services cover.",
      },
    ],
  },
  "ats-resume-checker": {
    sections: [
      {
        heading: "How applicant tracking systems read your resume",
        body: "Most mid-to-large companies run resumes through an Applicant Tracking System before a human ever sees them, and a poorly formatted resume — tables, columns, graphics, headers in the wrong place — can be parsed into nonsense and filtered out automatically. This checker scores how cleanly your resume parses and how well it matches a target job, then gives AI-powered suggestions to improve both. The goal is simple: get past the bot so your actual experience reaches a recruiter.",
      },
    ],
  },
  "json-formatter": {
    sections: [
      {
        heading: "Format, validate and debug JSON in your browser",
        body: "Malformed JSON is one of the most common sources of API bugs — a trailing comma or an unescaped quote breaks the whole payload. Beautifying JSON makes nested structures readable so you can actually see what an API returned, while validation catches syntax errors at the exact line. Because this runs entirely client-side, you can safely paste API responses, config files, and tokens without anything being sent to a server.",
      },
    ],
  },
  "viral-linkedin-post-generator": {
    sections: [
      {
        heading: "Consistency beats virality on LinkedIn",
        body: "The accounts that grow on LinkedIn are rarely the ones chasing a single viral hit — they are the ones that post useful things consistently. The hard part is the blank page, and that is what this generator removes: describe your idea, pick a tone, and get a structured draft with a hook, body, and takeaway you can refine with your own data and voice. Use it to keep a posting cadence without burning an hour on every draft, then make it yours before you publish.",
      },
    ],
  },
  "youtube-thumbnail-downloader": {
    sections: [
      {
        heading: "Grab any YouTube thumbnail in full resolution",
        body: "Thumbnails are research material — creators study what is working in their niche, marketers pull reference imagery, and editors grab a frame for a deck. This tool fetches the highest-resolution thumbnail YouTube has stored for any public video, instantly, from just the URL. Always respect copyright and the original creator's rights when reusing imagery; this is a research and reference utility, not a license to republish someone else's work.",
      },
    ],
  },
  "favicon-generator": {
    sections: [
      {
        heading: "One image, every favicon size browsers expect",
        body: "A favicon is a small detail that makes a site feel finished — and getting it wrong (a blurry 16px icon, a missing Apple touch icon) is surprisingly common. This generator takes a single image or piece of text and outputs the full set of sizes that browsers, bookmarks, and mobile home screens expect. Drop the files into your project and your site looks intentional in every tab and on every device.",
      },
    ],
  },
  "slug-generator": {
    sections: [
      {
        heading: "Why clean URL slugs matter for SEO",
        body: "A readable, keyword-rich slug like /free-tools/qr-code-generator tells both users and search engines what a page is about, while a messy one full of IDs and query strings tells them nothing. This tool converts any title into a clean, lowercase, hyphenated slug with accents and special characters stripped — exactly the format a CMS or static site generator wants. Small detail, real compounding SEO benefit across a whole site.",
      },
    ],
  },
  "hash-generator": {
    sections: [
      {
        heading: "MD5, SHA-1 and SHA-256 hashing, explained simply",
        body: "Hashes are one-way fingerprints of data — the same input always produces the same hash, but you can't reverse a hash back into the original. Developers use them to verify file integrity, compare values without storing the raw data, and generate checksums. Note that MD5 and SHA-1 are fine for non-security checksums but should never be used to hash passwords; use a purpose-built algorithm like bcrypt or Argon2 for that. This tool computes hashes entirely in your browser.",
      },
    ],
  },
  "ai-paraphraser": {
    sections: [
      {
        heading: "Rewrite text without losing the meaning",
        body: "A good paraphraser is not about dodging plagiarism checkers — it is about saying the same thing more clearly, in a different tone, or at a different length. Writers use it to tighten clumsy sentences, adapt formal copy for social media, or produce a second variant for A/B testing. The output is a starting point: read it, make sure it still says what you mean, and add the specifics only you know. AI drafts fast; you make it true.",
      },
    ],
  },
};

export function getToolExtraContent(slug: string): ToolExtraContent | undefined {
  return toolExtraContent[slug];
}

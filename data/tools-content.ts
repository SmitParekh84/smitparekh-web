export interface ToolHowItWorksStep {
  title: string;
  description: string;
}

export interface ToolUseCase {
  title: string;
  description: string;
}

export interface ToolContent {
  intro: string;
  howItWorks: ToolHowItWorksStep[];
  useCases: ToolUseCase[];
  relatedSlugs: string[];
}

export const toolContent: Record<string, ToolContent> = {
  "audio-to-text": {
    intro:
      "Turn any audio recording into accurate text in your browser - no signup, no software to install. Upload an MP3, WAV, M4A, AAC, FLAC, OGG, or WebM file and the tool transcribes the speech using OpenAI's Whisper model (via faster-whisper), auto-detecting the spoken language. When it's done you get a clean transcript you can copy to your clipboard with one click or download as a .txt file. It's ideal for turning voice notes, interviews, meetings, lectures, and podcast clips into searchable, editable text. Audio is processed securely and not stored - and the whole thing is completely free.",
    howItWorks: [
      { title: "Upload Your Audio", description: "Drag and drop or click to upload an audio file up to 10 MB (MP3, WAV, M4A, AAC, FLAC, OGG, or WebM). A built-in player lets you preview it." },
      { title: "Transcribe with AI", description: "Click Transcribe. The Whisper AI model processes your audio on the server, auto-detects the language, and converts speech to text - usually within a minute or two." },
      { title: "Copy or Download", description: "Read the transcript with its detected-language label, then copy it to your clipboard or download it as a .txt file ready for editing." },
    ],
    useCases: [
      { title: "Interviews and Meetings", description: "Transcribe recorded interviews, client calls, and team meetings into text you can search, quote, and turn into notes or minutes." },
      { title: "Content Creators", description: "Convert podcast episodes, YouTube voiceovers, and video clips into transcripts for show notes, captions, blog posts, and accessibility." },
      { title: "Students and Researchers", description: "Turn recorded lectures and voice memos into written notes you can review, highlight, and study from later." },
    ],
    relatedSlugs: ["word-counter", "ai-note-summarizer", "viral-linkedin-post-generator"],
  },
  "password-generator": {
    intro:
      "Generate strong, random passwords directly in your browser using the Web Crypto API. Choose any length from 4 to 64 characters and pick which character types you want - uppercase, lowercase, numbers, and symbols. The password is never sent to a server: every value is created locally so your secrets stay on your device. Use it for new accounts, API keys, encryption tokens, or admin resets - completely free, no signup, no rate limits, and no logging.",
    howItWorks: [
      { title: "Choose Your Settings", description: "Set the desired length (4-64 characters) and toggle uppercase, lowercase, numbers, and symbols on or off." },
      { title: "Generate Instantly", description: "A cryptographically secure password is created immediately in your browser using the Web Crypto API - nothing is sent to any server." },
      { title: "Copy and Secure", description: "Click the copy icon to grab the password and store it in a password manager like Bitwarden, 1Password, or KeePass." },
    ],
    useCases: [
      { title: "Account Security", description: "Create unique, strong passwords for every online account - banking, email, social media - and eliminate reuse across sites." },
      { title: "Developer Secrets", description: "Generate random API keys, secret tokens, and environment variables for development and production systems." },
      { title: "IT Administration", description: "Quickly provision strong default passwords for new users or reset credentials without manual guessing." },
    ],
    relatedSlugs: ["word-counter", "meta-tag-checker", "qr-code-generator"],
  },

  "word-counter": {
    intro:
      "Count words, characters, sentences, paragraphs, and reading time for any text in real time. Paste an article, essay, social-media post, or marketing copy and the stats update as you type. A keyword-density table shows your most-used words and their percentage share - essential for SEO drafts, blog editing, and academic writing within a strict count. Everything runs locally in your browser, so the text you paste never leaves your device. Free, instant, with no character limits or signup.",
    howItWorks: [
      { title: "Paste or Type Your Text", description: "Click in the textarea and type directly, or paste from any document. Results update in real time - no button needed." },
      { title: "Read Your Stats", description: "Words, characters, sentences, paragraphs, and estimated reading time appear instantly in the stat cards above." },
      { title: "Check Keyword Density", description: "Scroll to the keyword table to see your most-used words and their density percentages - essential for SEO content checks." },
    ],
    useCases: [
      { title: "Blog & Content Writers", description: "Hit your target word count for SEO articles or check reading time before publishing - no more guessing if 1,500 words is enough." },
      { title: "Social Media Managers", description: "Stay within Twitter's 280-character limit, LinkedIn's 3,000-character cap, and Instagram's 2,200-character ceiling in real time." },
      { title: "Students & Academics", description: "Verify your essay or assignment meets word count requirements instantly, with sentence and paragraph counts for formatting checks." },
    ],
    relatedSlugs: ["viral-linkedin-post-generator", "meta-tag-checker", "seo-analyzer"],
  },

  "image-converter": {
    intro:
      "Convert images between JPEG, PNG, and WebP entirely in your browser using the Canvas API. Drop a file, pick the output format, and tune the quality slider to balance file size against visual fidelity. Files never leave your device - conversion is fully client-side, private, and works offline once the page is loaded. Useful for shrinking JPEGs to WebP before deploying to a website, swapping screenshot formats for upload requirements, or batch-preparing assets for an online store.",
    howItWorks: [
      { title: "Upload Your Image", description: "Drag and drop or click to upload any JPEG, PNG, or WebP image. Preview appears immediately." },
      { title: "Choose Format and Quality", description: "Select the output format (JPEG, PNG, WebP) and adjust the quality slider to balance file size vs visual fidelity." },
      { title: "Convert and Download", description: "Click Convert - the browser processes the image entirely locally using the Canvas API - then download your file instantly." },
    ],
    useCases: [
      { title: "Web Developers", description: "Convert legacy JPEG images to WebP for 25-35% smaller file sizes and faster Core Web Vitals scores without losing visible quality." },
      { title: "Content Creators", description: "Convert screenshots and design assets between formats to meet platform-specific upload requirements in seconds." },
      { title: "E-commerce Teams", description: "Batch-prepare product images in the right format before uploading to Shopify, WooCommerce, or Amazon - no Photoshop needed." },
    ],
    relatedSlugs: ["background-remover", "image-compressor", "qr-code-generator"],
  },

  "qr-code-generator": {
    intro:
      "Generate scannable QR codes for URLs, plain text, contact info, or Wi-Fi credentials in seconds. Pick from three preset sizes - 200, 400, or 600 pixels - and download a high-resolution PNG ready for digital or print use. The codes are crisp enough for business cards, restaurant menus, event badges, posters, and product packaging without pixelation. No signup, no watermarks, no quotas - generate as many codes as you need, completely free, with downloads served straight from your browser.",
    howItWorks: [
      { title: "Enter Your Content", description: "Type or paste any URL, text, email address, or contact info into the input field. Press Enter or click Generate." },
      { title: "Choose Your Size", description: "Select Small (200px), Medium (400px), or Large (600px) depending on whether you're using the QR code digitally or in print." },
      { title: "Download and Use", description: "Download the high-resolution PNG and place it on your website, business card, packaging, or marketing materials." },
    ],
    useCases: [
      { title: "Marketing Campaigns", description: "Add QR codes to printed flyers, posters, and business cards to bridge offline and online - track scans via your destination URL." },
      { title: "Restaurant Menus", description: "Generate QR codes for digital menus so guests can scan instead of touching physical menus - update the menu URL anytime without reprinting." },
      { title: "Events and Networking", description: "Encode your LinkedIn profile URL or vCard in a QR code and add it to your name badge or presentation slides for instant contact sharing." },
    ],
    relatedSlugs: ["image-converter", "password-generator", "meta-tag-checker"],
  },

  "background-remover": {
    intro:
      "Remove image backgrounds automatically with an AI model (rembg) - no manual masking, no Photoshop. Upload any JPEG, PNG, or WebP photo and download a transparent PNG within seconds. The tool handles people, products, animals, and complex shapes like hair with clean, accurate edges. Use it for e-commerce product listings, professional headshots, marketing graphics, or composite designs without paying for Remove.bg subscriptions. Files are processed securely and deleted immediately after - no account required and no watermarks added.",
    howItWorks: [
      { title: "Upload Your Image", description: "Drag and drop your photo or click to upload. JPEG, PNG, and WebP are supported. The image is sent securely to the AI processor." },
      { title: "AI Removes the Background", description: "The AI model (rembg) analyses the image and precisely separates the subject from the background - typically in under 10 seconds." },
      { title: "Download Transparent PNG", description: "Preview the before and after, then download your transparent PNG ready for use in design software, presentations, or e-commerce." },
    ],
    useCases: [
      { title: "E-commerce Product Photos", description: "Remove cluttered backgrounds from product shots to create clean, professional images on white or transparent backgrounds for online stores." },
      { title: "Profile and Headshots", description: "Isolate your professional headshot from any background and place it on a clean colour or branded backdrop for LinkedIn and company bios." },
      { title: "Graphic Design", description: "Extract subjects from photos to composite them into banners, social media graphics, presentations, and marketing materials without Photoshop." },
    ],
    relatedSlugs: ["image-compressor", "image-converter", "qr-code-generator"],
  },

  "image-compressor": {
    intro:
      "Compress JPEG, PNG, and WebP images to drastically reduce file size without losing visible quality. Drop in your file, pick a target format, and tune the quality slider - most images compress to 30-60% of original size at 75% quality. Smaller images load faster, improve Core Web Vitals scores like LCP, and cut storage and bandwidth costs. Compression runs entirely in your browser using the Canvas API, so your images stay private. Free, instant, and works on phones and laptops alike.",
    howItWorks: [
      { title: "Upload Your Image", description: "Drag and drop or click to select a JPEG, PNG, or WebP image. A preview of the original appears immediately." },
      { title: "Set Quality and Format", description: "Choose your output format and drag the quality slider - 75-80% is the sweet spot for most web images." },
      { title: "Compress and Download", description: "Click Compress Image, see the exact size reduction percentage, and download your optimised file in one click." },
    ],
    useCases: [
      { title: "Web Performance", description: "Reduce image file sizes before uploading to your website and cut page load time - one of the biggest factors in Core Web Vitals scores." },
      { title: "Email Campaigns", description: "Keep email attachment sizes under 1 MB to improve deliverability and ensure images load fast for recipients on mobile data." },
      { title: "Social Media Posts", description: "Compress images before uploading to Instagram, LinkedIn, and Twitter to prevent the platform's own aggressive compression from degrading quality." },
    ],
    relatedSlugs: ["image-converter", "background-remover", "meta-tag-checker"],
  },

  "viral-linkedin-post-generator": {
    intro:
      "Generate engagement-ready LinkedIn posts with AI in seconds. Describe your topic, pick a tone - Professional, Casual, Inspirational, Story, or Educational - set the length, and the AI writes a post complete with a strong hook, a structured body, and a clear takeaway. Useful for founders building authority, job seekers attracting recruiters, and content marketers maintaining a posting cadence without burning hours on every draft. Generate as many drafts as you need free, refine with your own examples and data points, then post directly to LinkedIn.",
    howItWorks: [
      { title: "Enter Your Topic", description: "Describe what you want to post about - a lesson learned, a project update, a professional insight, or a story from your experience." },
      { title: "Select Tone and Length", description: "Choose from Professional, Casual, Inspirational, Story, or Educational. Set length (Short, Medium, Long) and optionally specify your target audience." },
      { title: "Generate, Refine, and Post", description: "Click Generate. Read the AI-crafted post, personalise with your own data points or anecdotes, copy it, and post directly to LinkedIn." },
    ],
    useCases: [
      { title: "Founders and CEOs", description: "Share lessons from building your company, product launches, or industry observations in a format proven to build authority and inbound leads." },
      { title: "Job Seekers", description: "Create posts about your skills, recent projects, or career milestones that attract recruiters and hiring managers in your target field." },
      { title: "Content Marketers", description: "Maintain a consistent LinkedIn posting schedule without spending hours writing each post - generate 5 posts in the time it used to take to write one." },
    ],
    relatedSlugs: ["word-counter", "ats-resume-checker", "linkedin-media-downloader"],
  },

  "ats-resume-checker": {
    intro:
      "Check whether your resume passes Applicant Tracking System (ATS) filters before you apply. Upload a PDF or DOCX and an AI evaluates it across formatting, keyword usage, section structure, and common ATS pitfalls - then returns an overall score with prioritised, specific improvements. Most companies with 50+ employees use ATS software to filter resumes before a recruiter ever sees them, so a misformatted file can sink an otherwise strong candidate. Free, private, and no account is required to run a full check.",
    howItWorks: [
      { title: "Upload Your Resume", description: "Drag and drop or click to upload your resume as a PDF or DOCX file. The file is sent securely for AI analysis." },
      { title: "Get Your ATS Score", description: "The AI evaluates your resume against ATS best practices - formatting, keyword usage, section structure, and common ATS pitfalls." },
      { title: "Review and Improve", description: "Read the detailed analysis and implement the recommendations to increase your score and improve your chances of passing ATS filters." },
    ],
    useCases: [
      { title: "Active Job Seekers", description: "Check your resume before applying to roles with large applicant pools where ATS filters are used - typically any company with 50+ employees." },
      { title: "Career Changers", description: "Ensure your resume translates your experience into the new industry's keywords and formats that ATS systems expect." },
      { title: "Fresh Graduates", description: "Avoid the most common formatting mistakes that cause ATS systems to misparse or reject graduate resumes - even strong candidates fail due to formatting issues." },
    ],
    relatedSlugs: ["ai-cover-letter", "viral-linkedin-post-generator", "word-counter"],
  },

  "meta-tag-checker": {
    intro:
      "Audit any URL's meta tags, Open Graph, Twitter Card, canonical, and robots directives in one click. Paste a website address and the tool fetches the live HTML, extracts every relevant tag, and flags issues with colour-coded severity - green for correct, yellow for warnings like overlong titles, red for missing essentials. Use it during SEO audits, before launches, or when a social share preview looks wrong on LinkedIn or WhatsApp. Completely free, with no signup, and works on any public page.",
    howItWorks: [
      { title: "Enter the URL", description: "Type or paste the full website URL you want to check. The tool fetches the live page and extracts all meta tags from the HTML." },
      { title: "Review the Analysis", description: "See a colour-coded breakdown - green for correct, yellow for warnings (e.g. title too long), red for missing critical tags." },
      { title: "Fix and Recheck", description: "Address the flagged issues in your CMS or code, then re-run the check to confirm all tags are now correct before publishing." },
    ],
    useCases: [
      { title: "SEO Audits", description: "Quickly verify meta tags on any page as part of a technical SEO audit - especially useful when inheriting a new client site." },
      { title: "Social Media Previews", description: "Check Open Graph tags to ensure your pages display the right image, title, and description when shared on LinkedIn, Facebook, and WhatsApp." },
      { title: "Pre-Launch Checks", description: "Run the checker on every important page before launch to catch missing meta descriptions, incorrect canonical tags, or forgotten noindex directives." },
    ],
    relatedSlugs: ["seo-analyzer", "word-counter", "password-generator"],
  },

  "seo-analyzer": {
    intro:
      "Run a fast on-page SEO audit on any public URL. The analyser checks 50+ ranking factors - titles, meta descriptions, heading structure, image alt text, internal links, schema markup, mobile readiness, and more - then returns a prioritised list of fixes ranked by impact. Useful for site owners diagnosing why a page won't rank, freelancers delivering professional client audits, and SEO teams catching regressions before they tank organic traffic. Free, with no account required, and an optional email delivery of the full report.",
    howItWorks: [
      { title: "Enter Your URL", description: "Type or paste the full URL of the page you want to analyse. Optionally add your email to receive the report by email." },
      { title: "Run the Audit", description: "The tool fetches the live page and evaluates it against 50+ on-page SEO factors including headings, meta tags, links, and structured data." },
      { title: "Implement the Recommendations", description: "Work through the prioritised recommendations - critical issues first - and re-run the audit after each batch of fixes." },
    ],
    useCases: [
      { title: "Website Owners", description: "Find and fix on-page SEO issues that are preventing your pages from ranking - without needing an expensive SEO consultant." },
      { title: "SEO Professionals", description: "Use as a quick-check tool during client audits or monthly reporting to spot regressions before they impact rankings." },
      { title: "Freelancers and Agencies", description: "Deliver a professional SEO audit report to clients showing exactly what needs fixing and in what priority order." },
    ],
    relatedSlugs: ["meta-tag-checker", "word-counter", "background-remover"],
  },

  "linkedin-media-downloader": {
    intro:
      "Download videos and images from public LinkedIn posts as MP4 or original-quality image files. Paste a LinkedIn post URL, click Get Media, and save the file directly - no signup, no watermarks, no third-party redirects, and no browser extensions. Use it to repurpose your own content on YouTube or Instagram, archive important industry posts, or save reference material from your network before posts get edited or deleted. Works on desktop and mobile, with files served straight from LinkedIn's own CDN.",
    howItWorks: [
      { title: "Copy the Post URL", description: "On LinkedIn, click the three-dot menu (⋯) on the post and select 'Copy link to post'. Make sure it's a public post." },
      { title: "Paste and Fetch", description: "Paste the LinkedIn post URL into the tool and click Get Media. The tool extracts the media link directly from the post." },
      { title: "Download the File", description: "Click Download to save the video (MP4) or image to your device. No login, no account, no watermarks." },
    ],
    useCases: [
      { title: "Content Repurposing", description: "Save your own LinkedIn videos and repurpose them on YouTube, Instagram, or your website without re-uploading the original file." },
      { title: "Market Research", description: "Download competitor or industry leader content for offline analysis, reference, and inspiration - for personal use only." },
      { title: "Archiving", description: "Keep a local copy of important LinkedIn posts and videos from your network before they are deleted or updated." },
    ],
    relatedSlugs: ["viral-linkedin-post-generator", "ats-resume-checker", "word-counter"],
  },

  "youtube-thumbnail-downloader": {
    intro:
      "Grab YouTube video thumbnails in every available quality - Maximum Resolution (1280×720), High, Medium, Default, and Standard - without screenshots, browser extensions, or editing tools. Paste any YouTube URL, Shorts link, embed code, or even a bare 11-character video ID, and download the JPG you need in one click. Useful for content creators recreating lost thumbnails, marketers studying competitor cover art for click-through-rate research, and developers building UI prototypes with real video data. Free, instant, and unlimited.",
    howItWorks: [
      { title: "Paste the YouTube URL", description: "Copy the link from any YouTube video, Short, or embed and paste it into the input field. Bare 11-character video IDs also work." },
      { title: "Get All Thumbnail Sizes", description: "Click 'Get Thumbnails' and the tool instantly fetches all available quality levels - from Max Resolution (1280×720) down to Standard - using YouTube's public CDN." },
      { title: "Download Your Chosen Quality", description: "Click Download next to the quality you need. The image saves to your device as a JPG. Use the external link icon to open the thumbnail in a new tab." },
    ],
    useCases: [
      { title: "Content Creators", description: "Download your own thumbnails for repurposing on other platforms, archiving before reuploading, or recreating a lost thumbnail file without redoing the design." },
      { title: "Marketers & Researchers", description: "Study competitor thumbnails and high-performing video cover art to improve your own click-through rates and A/B test design styles." },
      { title: "Developers & Designers", description: "Grab thumbnail images for mockups, UI prototypes, or testing your apps with real YouTube cover art - no manual screenshotting needed." },
    ],
    relatedSlugs: ["image-compressor", "background-remover", "image-converter"],
  },

  "json-formatter": {
    intro:
      "Beautify or minify JSON instantly in your browser. Paste a raw API response, config file, or database export and the tool formats it with 2- or 4-space indentation for readability - or collapses it into a single line for storage and transmission. Syntax errors are highlighted as you type so you can fix invalid commas, unquoted keys, and mismatched braces immediately. Everything runs locally - your JSON never leaves the browser tab. Free, with no size limit, no signup, and no rate limits.",
    howItWorks: [
      { title: "Paste Your JSON", description: "Copy raw JSON from an API response, config file, or database export and paste it into the input area. Formatting updates in real time as you type." },
      { title: "Choose Beautify or Minify", description: "Switch to Beautify for indented, human-readable JSON - choose 2 or 4-space indent. Switch to Minify to collapse everything into a single line for production or storage." },
      { title: "Copy the Output", description: "Click Copy next to the output panel to grab the formatted or minified JSON and paste it directly into your code editor, API client, or config file." },
    ],
    useCases: [
      { title: "API Developers", description: "Quickly inspect minified API responses during debugging without setting up a local environment - paste the raw response and read it instantly." },
      { title: "Frontend Engineers", description: "Validate JSON config files and environment schemas before deploying to catch syntax errors early - misplaced commas and unquoted keys are highlighted immediately." },
      { title: "DevOps & Backend Teams", description: "Minify JSON payloads before storing in databases or sending over the wire to reduce size, then beautify again when you need to read or edit them." },
    ],
    relatedSlugs: ["base64-encoder-decoder", "meta-tag-checker", "password-generator"],
  },

  "base64-encoder-decoder": {
    intro:
      "Encode and decode text and files between Base64 and their original form in your browser. Switch between encode and decode mode with a single toggle, or upload an image, PDF, or binary blob to convert it directly to a Base64 data URI. Useful for embedding small assets in CSS to cut HTTP requests, building HTTP Basic Auth headers, decoding JWT payload segments for inspection, and reading payloads found in logs. Conversion is fully client-side, so the data never leaves your device.",
    howItWorks: [
      { title: "Choose Encode or Decode", description: "Select Encode to convert plain text or a file to Base64. Select Decode to convert a Base64 string back to readable text. Switch modes with the toggle buttons." },
      { title: "Enter Text or Upload a File", description: "Type or paste text into the input area for instant encoding or decoding. To encode a file (image, PDF, binary), click 'Encode File' and select it from your device." },
      { title: "Copy the Result", description: "The output updates instantly. Click Copy to grab the result, or use the Swap button to flip the output back into the input for chained operations." },
    ],
    useCases: [
      { title: "Web Developers", description: "Encode images and fonts to Base64 data URIs to embed them directly in CSS or HTML - eliminating extra HTTP requests for small assets like icons and loading spinners." },
      { title: "API & Auth Engineers", description: "Encode credentials for HTTP Basic Authentication headers, decode JWT payload sections for inspection, and encode binary blobs for JSON transmission." },
      { title: "Security Researchers", description: "Decode Base64-encoded strings found in config files, log files, or network traffic to inspect payloads during security audits and penetration tests." },
    ],
    relatedSlugs: ["json-formatter", "password-generator", "meta-tag-checker"],
  },

  "url-encoder-decoder": {
    intro:
      "Encode or decode URLs and query parameters using percent-encoding without leaving the browser. Pick Component mode for safe escaping inside query-string values, or Full URL mode to encode an entire URL while preserving structural characters. Useful when debugging redirect loops, building tracking links with UTM parameters, decoding webhook payloads from logs, or reproducing security-test edge cases with special characters. Conversion happens entirely client-side, so values are never sent to a server. Instant, free, and with no signup or limits.",
    howItWorks: [
      { title: "Pick Encode or Decode", description: "Select Encode to convert plain text or a URL into percent-encoded form. Select Decode to convert a %-encoded string back into readable text." },
      { title: "Choose Mode", description: "Component mode escapes every reserved character - perfect for embedding values inside a query parameter. Full URL mode preserves URL structure characters and is for encoding an entire URL." },
      { title: "Copy the Output", description: "The output updates instantly. Click Copy to grab it, or Swap to flip the result back into the input for chained encode/decode steps." },
    ],
    useCases: [
      { title: "API & Backend Developers", description: "Build query strings safely, debug malformed redirect URLs, and decode user-submitted parameters when troubleshooting webhook payloads or OAuth flows." },
      { title: "Web & SEO Specialists", description: "Inspect tracking URLs with UTM parameters, decode encoded share links, and verify analytics URLs are properly escaped before launch." },
      { title: "QA & Security Engineers", description: "Reproduce edge cases by encoding special characters, decode payloads found in logs, and inspect URLs during penetration tests." },
    ],
    relatedSlugs: ["base64-encoder-decoder", "json-formatter", "regex-tester"],
  },

  "hash-generator": {
    intro:
      "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes side-by-side from any text input. Hashes recompute as you type so you can compare digests across algorithms in real time. Useful for backend developers building stable cache keys and content fingerprints, security engineers comparing files against known IOCs during incident response, and data engineers creating deterministic IDs in ETL pipelines. Toggle uppercase output for tools and integrations that expect capital hex characters. Hashing happens entirely in your browser using the Web Crypto API.",
    howItWorks: [
      { title: "Type Your Input", description: "Paste or type any text into the input area. Hashes are computed instantly as you type - no button to click." },
      { title: "Compare Algorithms", description: "Output appears for MD5, SHA-1, SHA-256, SHA-384, and SHA-512 in parallel so you can compare digests at a glance." },
      { title: "Copy and Use", description: "Click Copy next to any algorithm to grab its hash. Toggle uppercase output for tools and integrations that expect capital hex characters." },
    ],
    useCases: [
      { title: "Backend Developers", description: "Generate stable cache keys, content fingerprints, and integrity hashes for files served from a CDN - verify uploads against an expected SHA-256." },
      { title: "Security Engineers", description: "Compute hashes during incident response to compare against known IOCs (indicators of compromise) and confirm file authenticity." },
      { title: "Data Engineers", description: "Hash row identifiers for deduplication, generate partition keys, and create deterministic IDs in ETL pipelines." },
    ],
    relatedSlugs: ["password-generator", "base64-encoder-decoder", "json-formatter"],
  },

  "regex-tester": {
    intro:
      "Build, test, and debug regular expressions live in your browser. Type a pattern, paste sample text, and watch matches highlight in real time as you refine the regex. Toggle flags (g, i, m, s, u, y), preview replacements with capture group references like $1 and $2, and inspect every match's index and named groups in detail. Useful for crafting form validators, parsing log lines, building URL routes, and writing alert filters before deploying to production. Free, instant, with no usage limits.",
    howItWorks: [
      { title: "Write Your Pattern", description: "Type a regular expression in the pattern box. The tester compiles it instantly and shows any syntax errors right below." },
      { title: "Toggle Flags & Add Test Text", description: "Click flag chips to enable g, i, m, s, u, or y. Paste sample text and watch matches highlight live as you adjust the pattern." },
      { title: "Test Replace & Capture Groups", description: "Enable Replace mode to preview substitutions with $1, $2 group references. Expand Match details to inspect every match's index and captures." },
    ],
    useCases: [
      { title: "Frontend & Backend Developers", description: "Build form-field validators, parse log lines, and craft URL routing patterns confidently before pasting into your codebase." },
      { title: "Data & Content Teams", description: "Find-and-replace across text content, extract data from semi-structured strings, and clean up imported CSV or JSON values." },
      { title: "QA & Site Reliability Engineers", description: "Write log-search filters and alert patterns, and verify they match real production samples without deploying to test." },
    ],
    relatedSlugs: ["json-formatter", "url-encoder-decoder", "word-counter"],
  },

  "color-converter": {
    intro:
      "Convert colours between HEX, RGB, RGBA, HSL, and HSLA formats with a live preview swatch and HSL sliders for fine-tuning. Paste a designer's HEX value and instantly see RGB and HSL equivalents - handy for translating Figma colours into CSS variables, building systematic light and dark variations, and designing accessible overlays with alpha. Copy any format with one click, including a ready-to-paste CSS variable snippet for your design system. Free, with no signup, no limits, and the alpha checkerboard preview shows transparency clearly.",
    howItWorks: [
      { title: "Pick or Type a Colour", description: "Use the native colour picker, paste a HEX value, or tweak R/G/B/A inputs. Every other format (RGB, HSL, RGBA, HSLA) updates instantly." },
      { title: "Adjust HSL Sliders", description: "Drag hue, saturation, and lightness sliders to fine-tune the colour. The live preview swatch shows alpha against a checkerboard background." },
      { title: "Copy Any Format", description: "Click Copy on the format you need - HEX, RGB(A), HSL(A), or a ready-to-paste CSS variable snippet." },
    ],
    useCases: [
      { title: "Frontend Developers", description: "Convert designer-supplied HEX colours to HSL for systematic light/dark variations, or to RGBA for overlays and shadows." },
      { title: "UI / UX Designers", description: "Translate values between Figma, Sketch, and CSS without leaving the browser - keep HSL for colour systems and HEX for handoff." },
      { title: "Brand & Marketing Teams", description: "Match brand colours across email templates, social graphics, and ad creatives by exporting consistent HEX/RGB values." },
    ],
    relatedSlugs: ["meta-tag-checker", "qr-code-generator", "regex-tester"],
  },

  "pomodoro-timer": {
    intro:
      "Run focused 25-minute work sprints with automatic break cycles, browser notifications, and a session counter that builds streaks. Customise focus length, short break, long break, and how often a long break occurs to match your personal workflow. The timer runs in your browser tab - no install, no account - and a chime plus desktop notification announces every transition between focus and rest. Useful for students breaking up study, remote workers structuring deep-work blocks, and writers building creative momentum. Completely free.",
    howItWorks: [
      { title: "Pick a Focus Length", description: "Use the default 25-minute focus block or open Settings to customise focus, short break, long break, and how often a long break occurs." },
      { title: "Press Start", description: "The timer counts down with a coloured progress bar. When focus ends, it auto-rolls into a break, plays a chime, and shows a browser notification." },
      { title: "Build a Streak", description: "Each completed focus block increments your session counter. Every Nth round triggers a longer break so you don't burn out." },
    ],
    useCases: [
      { title: "Students & Self-Learners", description: "Break long study sessions into manageable focus sprints - proven to improve retention and reduce procrastination." },
      { title: "Remote Workers", description: "Structure deep work and meetings throughout the day. Use long breaks for stretching, hydration, or stepping away from the screen." },
      { title: "Writers & Designers", description: "Create momentum on creative work by committing to a single 25-minute block. Most people produce more in two focused Pomodoros than four scattered hours." },
    ],
    relatedSlugs: ["world-clock", "unit-converter", "word-counter"],
  },

  "world-clock": {
    intro:
      "See the current time in multiple cities side-by-side with day/night colour cues, UTC offsets, and live updates every second. Start with Mumbai, London, New York, and Tokyo or add any IANA timezone city you care about - search by city, country, or zone name. Useful for distributed teams scheduling stand-ups, remote workers tracking client and home timezones, traders watching market open and close times across exchanges, and digital nomads planning meetings around overlapping working hours. Runs entirely in your browser, free.",
    howItWorks: [
      { title: "See Default Cities", description: "The clock starts with Mumbai, London, New York, and Tokyo. Each card shows live local time, date, and timezone offset (UTC±)." },
      { title: "Add Cities You Care About", description: "Click 'Add city' and search by city, country, or IANA timezone. The list covers every major hub across continents." },
      { title: "Read Day vs. Night Instantly", description: "Cards glow warm during local daytime and cool at night, so you can scan availability without doing math in your head." },
    ],
    useCases: [
      { title: "Distributed Teams", description: "Coordinate stand-ups, releases, and retros across continents - see at a glance whether your colleague is awake before scheduling a call." },
      { title: "Remote Workers & Digital Nomads", description: "Track home, client, and current-location timezones together. Plan calls around overlapping working hours without spreadsheet gymnastics." },
      { title: "Trading & Operations Desks", description: "Watch market open/close times across major exchanges (Mumbai, London, New York, Tokyo, Hong Kong) on one screen." },
    ],
    relatedSlugs: ["pomodoro-timer", "unit-converter", "cron-builder"],
  },

  "unit-converter": {
    intro:
      "Convert between units across length, weight, temperature, volume, area, speed, time, and data sizes in one place. Pick a category, choose source and target units, type any number, and the conversion appears instantly with up to four-decimal precision. Useful for engineers translating SI and imperial values, travellers comparing metric weights and distances on the go, and bakers scaling international recipes between cups and millilitres. Includes data-size conversions like KB vs KiB that confuse most generic converters online. Completely free, with no usage caps.",
    howItWorks: [
      { title: "Pick a Category", description: "Choose length, weight, temperature, volume, area, speed, time, or data size from the chip row at the top." },
      { title: "Pick From / To Units", description: "Select the units in the From and To dropdowns. Use the swap button to flip the direction in one click." },
      { title: "Type Any Value", description: "Enter a number and the conversion appears live. Copy the result to your clipboard with one click." },
    ],
    useCases: [
      { title: "Engineers & Scientists", description: "Convert between SI and imperial units, switch temperature scales, and translate between data-size standards (KB vs KiB) without context-switching to a spreadsheet." },
      { title: "Travellers & Shoppers", description: "Compare metric vs imperial heights, weights, and distances when shopping, packing, or comparing fitness goals." },
      { title: "Cooks & Bakers", description: "Convert between teaspoons, tablespoons, cups, and millilitres for international recipes - accurate to four decimal places." },
    ],
    relatedSlugs: ["world-clock", "pomodoro-timer", "color-converter"],
  },

  "markdown-editor": {
    intro:
      "Write GitHub-flavoured Markdown with a live, side-by-side preview rendered in real time as you type. Switch between Editor, Split, and Preview views to optimise for writing on desktop, reviewing on widescreen, or reading on mobile. One click copies the source or rendered HTML, and you can download the document as a .md file ready to commit. Useful for drafting README, CONTRIBUTING, and CHANGELOG files, composing blog posts before pasting into a CMS like Ghost or Hashnode, or iterating on technical docs without local tooling.",
    howItWorks: [
      { title: "Type or Paste Markdown", description: "Use the editor pane on the left for source. The right pane shows a live, GitHub-flavoured rendering as you type." },
      { title: "Switch Views", description: "Tap Editor, Split, or Preview to optimise for writing or reviewing. Split mode is great on desktop; Preview mode is best on mobile." },
      { title: "Copy or Download", description: "One click copies the markdown source or the rendered HTML. Download as a .md file when you're ready to paste into your repo or CMS." },
    ],
    useCases: [
      { title: "Open-Source Maintainers", description: "Draft README, CONTRIBUTING, and CHANGELOG files with confidence - see exactly how they'll render on GitHub before committing." },
      { title: "Bloggers & Content Writers", description: "Compose long-form posts in markdown then paste straight into Ghost, Hashnode, dev.to, or any markdown-friendly CMS." },
      { title: "Documentation Teams", description: "Iterate on docs, runbooks, and ADRs without spinning up a local docs server." },
    ],
    relatedSlugs: ["word-counter", "lorem-ipsum", "json-formatter"],
  },

  "cron-builder": {
    intro:
      "Build, validate, and translate cron expressions in plain English. Pick a preset like 'every 5 minutes' or 'every Monday at 9am', or type a 5-field expression directly - the tool parses each field, validates it against the allowed range, and shows the next five run timestamps in your local timezone. Useful for crontab, GitHub Actions schedules, AWS EventBridge rules, Kubernetes CronJobs, dbt scheduled runs, and Airflow DAGs. Catches invalid ranges and step values before you push them to production. Free and instant.",
    howItWorks: [
      { title: "Start From a Preset or Type", description: "Pick a common schedule (every 5 minutes, every Monday at 9am) or write your own 5-field cron expression directly." },
      { title: "Read the Plain-English Description", description: "Each field is parsed and shown with its valid range. The Schedule card translates the expression into clear English." },
      { title: "Verify the Next 5 Runs", description: "Confirm your cron is correct by checking the actual upcoming run timestamps in your local timezone." },
    ],
    useCases: [
      { title: "Backend & DevOps Engineers", description: "Build crontab entries, GitHub Actions schedules, AWS EventBridge rules, and Kubernetes CronJobs without guessing." },
      { title: "Data Engineers", description: "Schedule ETL jobs, Airflow DAGs, and dbt runs. Verify edge cases like 'every 15 minutes between 9 and 5 weekdays' actually fire when expected." },
      { title: "Site Reliability Teams", description: "Confirm alert silences, backup windows, and report deliveries trigger at the right times across timezones." },
    ],
    relatedSlugs: ["world-clock", "regex-tester", "json-formatter"],
  },

  "lorem-ipsum": {
    intro:
      "Generate placeholder Lorem Ipsum text by paragraph, sentence, word, or exact byte count. Toggle the canonical 'Lorem ipsum dolor sit amet' opening on or off, set how many you need, and copy or regenerate with one click. Useful for filling design mockups with realistic-length placeholder copy, stress-testing components with very long titles or fixed-byte fields, and laying out brochures and editorial pages while you wait for the real client copy to arrive. Free, instant, with no signup and no limits on output size.",
    howItWorks: [
      { title: "Choose Mode and Count", description: "Switch between paragraphs, sentences, words, or exact byte/character counts. Set how many you need." },
      { title: "Optionally Start with 'Lorem ipsum'", description: "Designers traditionally expect the canonical opening - keep the toggle on for that, off for randomised starts." },
      { title: "Copy or Regenerate", description: "Hit Copy to grab the result, or Regenerate to roll a fresh batch with the same settings." },
    ],
    useCases: [
      { title: "UI / UX Designers", description: "Fill mockups, hero banners, and card layouts with realistic-length placeholder text in seconds." },
      { title: "Frontend Developers", description: "Test how components handle long titles, multi-paragraph blurbs, or fixed-byte fields without writing your own filler." },
      { title: "Print & Editorial Designers", description: "Lay out brochures, magazines, and book pages with classic Lorem Ipsum to evaluate typography before client copy arrives." },
    ],
    relatedSlugs: ["markdown-editor", "word-counter", "color-converter"],
  },

  "jwt-decoder": {
    intro:
      "Decode and inspect JSON Web Tokens (JWTs) entirely in your browser. Paste any eyJ-prefixed token and the tool splits it on the dots, parses the header and payload as syntax-highlighted JSON, and renders standard claims like exp, iat, and nbf as human-readable timestamps. A green Active or red Expired pill tells you token status at a glance - no manual epoch math required. Useful for backend devs debugging auth flows, QA engineers triaging support tickets, and security reviewers auditing JWTs from logs and network captures.",
    howItWorks: [
      { title: "Paste Your Token", description: "Drop any JWT (eyJ...) into the textarea. The decoder splits it on the dots and parses each segment instantly." },
      { title: "Inspect Header & Payload", description: "Decoded JSON appears in syntax-highlighted blocks with copy buttons. Standard claims like exp, iat, and nbf are surfaced as human-readable timestamps." },
      { title: "Check Expiry at a Glance", description: "A green 'Active' or red 'Expired' pill tells you the token's status without doing math on the exp claim." },
    ],
    useCases: [
      { title: "Backend & Full-Stack Developers", description: "Debug auth flows fast - see what claims your identity provider is actually issuing without spinning up a script." },
      { title: "QA & Support Engineers", description: "Inspect tokens from bug reports to verify expiry, audience, and roles before escalating." },
      { title: "Security Reviewers", description: "Quickly audit JWTs from network captures or logs for sensitive claims that shouldn't be exposed client-side." },
    ],
    relatedSlugs: ["base64-encoder-decoder", "hash-generator", "uuid-generator"],
  },

  "sql-formatter": {
    intro:
      "Format SQL queries - minified, single-line, or auto-generated - into clean, readable code in seconds. Choose 2- or 4-space indentation or tabs, toggle UPPERCASE keywords on or off to match team conventions, and copy the formatted result with one click. A Minify button strips whitespace down to a single line for embedding queries inside code or config. Useful for cleaning up ORM-generated queries before commits, sharing readable joins in Slack code reviews, and embedding nicely formatted SQL examples in technical documentation. Free, with no signup.",
    howItWorks: [
      { title: "Paste Your Query", description: "Drop any SQL - single-line, minified, or messy auto-generated output. Comments and string literals are preserved." },
      { title: "Pick Your Style", description: "Choose 2 / 4-space indent or tabs, and toggle UPPERCASE keywords on or off to match your team's convention." },
      { title: "Copy or Minify", description: "Copy the formatted result, or use the Minify button to strip whitespace down to a single line - useful for embedding in code." },
    ],
    useCases: [
      { title: "Backend Developers", description: "Clean up auto-generated ORM queries before committing them to Git or pasting into PR descriptions." },
      { title: "Data Analysts & DBAs", description: "Make complex CTEs and joins readable when reviewing a teammate's query in Slack or a spreadsheet." },
      { title: "Documentation Writers", description: "Embed beautifully formatted SQL examples in your docs without a separate VS Code session." },
    ],
    relatedSlugs: ["json-formatter", "regex-tester", "jwt-decoder"],
  },

  "image-to-base64": {
    intro:
      "Convert images to Base64 data URIs entirely in your browser. Drop in a PNG, JPEG, GIF, SVG, WebP, or AVIF up to 10 MB and the tool shows the original byte size next to the encoded size so you can decide whether inlining is worth the size penalty. One-click copy supports raw Base64, full data URL, ready-to-paste img tag, or CSS background rule. Useful for inlining email logos, eliminating HTTP requests for tiny icons, and building self-contained Storybook examples that don't depend on external assets.",
    howItWorks: [
      { title: "Drop or Pick an Image", description: "Drag a file onto the dropzone or click to choose one. PNG, JPG, GIF, SVG, WebP, and AVIF are supported up to 10 MB." },
      { title: "See Live Stats", description: "The tool shows the original byte size next to the encoded base64 size so you can decide whether inlining is worth it." },
      { title: "Copy in the Format You Need", description: "One-click copy as raw base64, full data URL, ready-to-paste <img> tag, or CSS background rule." },
    ],
    useCases: [
      { title: "Email & Newsletter Designers", description: "Inline logos and decorative icons directly into HTML emails to bypass image-blocking and broken image links." },
      { title: "Frontend Developers", description: "Embed tiny icons and signatures into CSS to eliminate extra HTTP requests for above-the-fold assets." },
      { title: "Documentation & Storybook Authors", description: "Bake assets into Markdown and Storybook stories so examples remain self-contained and don't depend on external URLs." },
    ],
    relatedSlugs: ["image-compressor", "image-converter", "favicon-generator"],
  },

  "css-gradient-generator": {
    intro:
      "Build linear, radial, and conic CSS gradients with a live preview, draggable colour stops, and angle controls. Add as many stops as you want, fine-tune positions on the slider, and watch the gradient update instantly without a single page refresh. Three outputs are ready to copy: the raw CSS value, a full background rule, and a Tailwind arbitrary class for v3 and v4 projects. Useful for hero sections, button fills, badge surfaces, and brand iteration without bouncing between Figma and a sandbox file.",
    howItWorks: [
      { title: "Pick a Type", description: "Choose linear, radial, or conic. The live preview updates instantly so you can compare options without committing to one." },
      { title: "Adjust Stops & Angle", description: "Add as many color stops as you like, drag positions on the slider, and rotate the angle for linear and conic gradients." },
      { title: "Copy CSS or Tailwind", description: "Three outputs are ready to copy: the CSS value, the full background rule, and a Tailwind arbitrary class for v3 / v4 projects." },
    ],
    useCases: [
      { title: "Web Designers", description: "Mock up hero backgrounds, button fills, and badge surfaces in the browser instead of bouncing between Figma and a sandbox." },
      { title: "Frontend Developers", description: "Generate pixel-perfect CSS without memorising linear-gradient syntax - paste directly into your stylesheet or Tailwind class." },
      { title: "Brand & Marketing Teams", description: "Iterate on landing-page accent gradients with the rest of the team in real time, then ship the exact CSS to engineering." },
    ],
    relatedSlugs: ["color-converter", "favicon-generator", "image-to-base64"],
  },

  "slug-generator": {
    intro:
      "Convert any list of titles, product names, or strings into clean, SEO-friendly URL slugs in one paste. Choose your separator (-, _, .), set a max length, lowercase the output, and optionally remove common stop words like 'the' and 'and' for shorter, punchier slugs. Each result has a one-click copy, and 'Copy all' gives you newline-separated text ready for spreadsheets and CSV imports. Useful for editorial calendars, e-commerce catalog imports into Shopify or WooCommerce, and migration scripts where deterministic output matters.",
    howItWorks: [
      { title: "Paste Titles, One Per Line", description: "Drop a list of blog post titles, product names, or any human-readable strings into the input box." },
      { title: "Tune the Output", description: "Choose your separator (-, _, .), max length, lowercase mode, and whether to remove common stop words." },
      { title: "Copy Individually or All at Once", description: "Each slug has a one-click copy. Use 'Copy all' to grab the whole list as newline-separated text - perfect for spreadsheets and CSV imports." },
    ],
    useCases: [
      { title: "Content Marketers & Bloggers", description: "Convert an editorial calendar of titles into clean, SEO-friendly URLs in one paste - no manual cleanup." },
      { title: "E-commerce Operators", description: "Bulk-generate product slugs from SKU titles for catalog imports into Shopify, WooCommerce, or custom storefronts." },
      { title: "Developers", description: "Slugify dynamic content before saving it to a URL field, with deterministic output that's safe for migrations." },
    ],
    relatedSlugs: ["seo-analyzer", "meta-tag-checker", "lorem-ipsum"],
  },

  "favicon-generator": {
    intro:
      "Generate a complete favicon bundle from text, an emoji, or your own image - without opening Figma or installing anything. Type up to three letters, pick an emoji, or upload an image; choose foreground and background colours, shape (square, rounded, or circle), and a font weight that reads well even at 16×16 pixels. Download all the required PNG sizes (16, 32, 48, 64, 128, 180, 192, 512) in one click and copy the matching link snippet for your HTML head. Useful for indie makers, side-projects, and quick agency mockups.",
    howItWorks: [
      { title: "Pick Text, Emoji, or Upload", description: "Type up to three letters, choose an emoji, or upload your own image - the tool renders it to every required favicon size simultaneously." },
      { title: "Style the Background", description: "Pick foreground and background colors, choose square / rounded / circle shape, and select a font weight that reads well even at 16×16." },
      { title: "Download the Bundle", description: "One click downloads the full set of PNGs (16, 32, 48, 64, 128, 180, 192, 512). Copy the matching <link> snippet for your <head>." },
    ],
    useCases: [
      { title: "Indie Makers", description: "Ship a polished-looking site without opening Figma - pick a letter and a color, paste the link tags, and you're done." },
      { title: "Side-Project Developers", description: "Test brand directions for a new product with multiple favicons in minutes, not hours." },
      { title: "Agency Teams", description: "Prototype client favicons in client meetings - show 5 directions live without exporting from a design tool." },
    ],
    relatedSlugs: ["image-to-base64", "css-gradient-generator", "image-converter"],
  },

  "uuid-generator": {
    intro:
      "Generate UUID v4 (random) or UUID v7 (time-ordered) identifiers - up to 1000 at a time. Toggle uppercase, strip hyphens, or wrap with braces for Microsoft GUID style, and combine any of these options together. Each UUID has a per-row copy button, and 'Copy all' grabs the whole list as newline-separated text - ideal for seeding databases, generating test fixtures for parametrised tests, and building deployment markers during incident response. Generated entirely in your browser, so the values are never logged, transmitted, or shared. Free, with no usage caps.",
    howItWorks: [
      { title: "Choose Version & Count", description: "Pick UUID v4 (random) or UUID v7 (time-ordered), and set how many you need - up to 1000 in one click." },
      { title: "Tune the Format", description: "Toggle uppercase, strip hyphens, or wrap with braces (Microsoft GUID style) - combine any options." },
      { title: "Copy Individually or in Bulk", description: "Each UUID has a per-row copy button. 'Copy all' grabs the whole list as newline-separated text - ideal for seeding databases and tests." },
    ],
    useCases: [
      { title: "Backend Developers", description: "Seed databases, generate test fixtures, or grab a quick stable identifier without writing a one-off script." },
      { title: "QA Engineers", description: "Create predictable test data for parametrised tests where unique IDs are needed but specific values aren't." },
      { title: "DevOps & SREs", description: "Generate request IDs, deployment IDs, or migration markers ad-hoc during incident response and runbook execution." },
    ],
    relatedSlugs: ["hash-generator", "jwt-decoder", "password-generator"],
  },

  "ai-note-summarizer": {
    intro:
      "Turn dense lecture notes, textbook chapters, or essay extracts into clear, structured study material in seconds. Paste up to 5,000 characters of raw notes and the AI condenses them into bullet-point summaries, highlighted key terms, ready-to-use flashcards, or a self-check quiz - whichever format fits your revision style. Built for college and university students in the US, UK, Canada, Australia, and India who need to review material faster without re-reading everything from scratch. Files and text are processed and discarded immediately - nothing is stored. Free with no account for the first uses each day.",
    howItWorks: [
      { title: "Paste Your Study Material", description: "Copy your lecture notes, a textbook chapter, or any study text and paste it into the input area. Up to 5,000 characters is supported per submission." },
      { title: "Choose an Output Format", description: "Select the format you need: bullet-point summary for fast review, key terms for definition drills, flashcards for active recall, or a self-check quiz to test retention." },
      { title: "Copy and Add to Your Notes", description: "Click Copy to paste the generated content into your revision document, learning management system, or Notion page." },
    ],
    useCases: [
      { title: "Exam Revision", description: "Convert a week's worth of lecture notes into a tight bullet-point summary or a set of flashcards in minutes - stop re-reading full transcripts the night before an exam." },
      { title: "Lecture Catch-Up", description: "If you missed a class or zoned out, paste the shared slides or a classmate's notes and get the essential points without spending an hour reading manually." },
      { title: "Textbook Deep Dives", description: "Drop in a dense textbook chapter and extract a hierarchy of key terms and concepts to build a mental map before writing an essay or sitting an assignment." },
    ],
    relatedSlugs: ["ai-flashcard-generator", "ai-essay-outliner", "word-counter"],
  },

  "ai-flashcard-generator": {
    intro:
      "Generate up to 50 study flashcards on any topic or from any pasted text in seconds. Type a subject like 'mitosis' or 'the French Revolution', or paste a full chapter of notes, and the AI creates front-and-back question-and-answer pairs covering key facts, definitions, dates, and concepts. Export directly to Anki-compatible CSV or JSON for spaced-repetition practice, or copy individual cards into your preferred study app. Free for students in the US, UK, Canada, Australia, and India - no account needed for the first uses each day.",
    howItWorks: [
      { title: "Enter a Topic or Paste Text", description: "Type a specific subject - the more precise, the better (e.g. 'ATP synthesis steps' rather than 'biology') - or paste a passage from your lecture notes or textbook." },
      { title: "Set the Number of Cards", description: "Choose how many flashcards to generate, up to 50. Start with 20-25 for a focused set on a single concept, or go to 50 for a comprehensive topic sweep." },
      { title: "Export to Anki or Copy", description: "Download the flashcards as Anki-compatible CSV to import directly into your Anki deck, or copy individual question-answer pairs into Quizlet, Notion, or any note-taking tool." },
    ],
    useCases: [
      { title: "Science and Medical Students", description: "Generate anatomy, physiology, pharmacology, or biochemistry flashcards from lecture slides - the same technique used by USMLE and MCAT top scorers without paying for premium Anki decks." },
      { title: "History and Humanities", description: "Convert essay prompts, timelines, and source analyses into flashcards that test date recall, key figures, causation, and historical significance." },
      { title: "Language Learning", description: "Paste a vocabulary list or a reading passage in your target language and generate definition, translation, and usage-example cards for active recall practice." },
    ],
    relatedSlugs: ["ai-note-summarizer", "ai-essay-outliner", "ats-resume-checker"],
  },

  "ai-essay-outliner": {
    intro:
      "Build a fully structured essay outline in seconds - thesis statement, hook, sectioned arguments with word-count targets, evidence cues, and suggested source types - all from a single essay question. Choose your citation style (APA 7th, MLA 9th, Chicago, or Harvard), set your target word count, and the AI tailors the structure accordingly. Works for argumentative, analytical, compare-and-contrast, and research essays at college and university level in the US, UK, Canada, Australia, and India. Free with no account for the first uses each day.",
    howItWorks: [
      { title: "Enter Your Essay Question", description: "Paste the exact question or write a clear description of your essay topic and any required angle or argument." },
      { title: "Choose Citation Style and Word Target", description: "Select APA, MLA, Chicago, or Harvard and enter your word count target so the AI splits the body sections proportionally." },
      { title: "Copy the Outline and Start Writing", description: "Review the thesis statement, hook, argument sections, and evidence cues - then copy the outline to your word processor and start filling in the content." },
    ],
    useCases: [
      { title: "College Essay Assignments", description: "Break a broad prompt into a clear structure before writing - the outline keeps your argument focused and ensures you hit word count targets across introduction, body, and conclusion." },
      { title: "Research Papers", description: "Map out a multi-section paper with literature review, methodology, and discussion sections before committing to a single direction - restructure the outline in seconds if your argument evolves." },
      { title: "Dissertation Chapters", description: "Scaffold individual dissertation chapters with properly weighted argument sections, evidence requirements, and transition notes to maintain academic coherence across a long document." },
    ],
    relatedSlugs: ["ai-note-summarizer", "ai-paraphraser", "ai-citation-generator"],
  },

  "ai-citation-generator": {
    intro:
      "Generate accurate, properly formatted citations in APA 7th Edition, MLA 9th Edition, Chicago (Author-Date and Notes-Bibliography), Harvard, or IEEE style from a URL, DOI, ISBN, or manually entered source details. Returns both the full reference-list entry and the shortened in-text citation so you can paste both directly into your paper. Useful for students, researchers, and content writers who need correct references without memorising each style guide's exact formatting rules. No account needed for the first uses each day.",
    howItWorks: [
      { title: "Select a Citation Style and Source Type", description: "Choose your required citation format (APA, MLA, Chicago, Harvard, or IEEE) and the type of source - web page, journal article, book, or manual entry." },
      { title: "Enter the Source Reference", description: "Paste the URL for web pages, the DOI for journal articles, or the ISBN for books. The tool fetches metadata automatically. For other source types, fill in the details manually." },
      { title: "Copy Both Citations", description: "Get the full bibliography entry and the shortened in-text citation in one step - copy each separately and paste into your reference list and body text." },
    ],
    useCases: [
      { title: "Research and Academic Papers", description: "Generate accurate citations for every web source, journal article, and book in your reference list without manually checking formatting rules for commas, italics, and capitalisation." },
      { title: "Dissertation and Thesis Writing", description: "Maintain consistent citation style across a long document by generating every reference in the same format - especially useful when switching between sources mid-chapter." },
      { title: "Content Writing and Journalism", description: "Quickly cite sources in articles, blog posts, and reports where in-text attribution is required - supports both APA and Chicago's author-date style for non-academic content." },
    ],
    relatedSlugs: ["ai-essay-outliner", "ai-paraphraser", "meta-tag-checker"],
  },

  "ai-paraphraser": {
    intro:
      "Rewrite any paragraph in Academic, Formal, or Casual tone using AI - preserving the original meaning while changing sentence structure, vocabulary, and phrasing. Paste a section of text and receive three alternative versions side by side so you can pick the one that fits your context best. Useful for students avoiding unintentional plagiarism when paraphrasing sources, professionals adapting content for different audiences, and writers varying their prose to avoid repetition. Free with no account for the first uses each day.",
    howItWorks: [
      { title: "Paste the Text You Want to Rewrite", description: "Copy a paragraph from your essay, a quote you need to paraphrase, or any passage you want to rephrase and paste it into the input box." },
      { title: "Select a Tone", description: "Choose Academic for formal scholarly language with hedging phrases, Formal for professional business-appropriate prose, or Casual for plain, conversational phrasing." },
      { title: "Review All Three Versions and Copy", description: "Three rewritten alternatives appear side by side - compare them, pick the version that fits best in context, and click Copy." },
    ],
    useCases: [
      { title: "Academic Writing and Essays", description: "Paraphrase quoted evidence and source material into your own words for essays and research papers - use the Academic tone to maintain the scholarly register expected by markers." },
      { title: "Professional Communications", description: "Rework internal reports, client emails, or proposal sections to match a different audience's expectations without rewriting from scratch." },
      { title: "Content Repurposing", description: "Adapt a section from a long-form blog post into a concise LinkedIn caption, or transform a formal press release into a casual social media announcement, using the Casual tone." },
    ],
    relatedSlugs: ["word-counter", "ai-essay-outliner", "ai-cover-letter"],
  },

  "ai-cover-letter": {
    intro:
      "Generate a personalised, job-specific cover letter from your resume and a job description in under 30 seconds. Paste both and choose a tone - Professional (neutral and competent), Enthusiastic (energetic and driven), or Concise (short and direct) - and the AI maps your experience to the role's requirements, writes a tailored opening, body, and closing, and keeps the letter within professional length (250-400 words). Designed for students, fresh graduates, and career changers who need to apply to many roles without writing each letter from scratch. Free with no account for the first uses each day.",
    howItWorks: [
      { title: "Paste Your Resume", description: "Copy your resume text - plain text works best. The AI extracts your experience, skills, and achievements to match against the role." },
      { title: "Paste the Job Description and Choose a Tone", description: "Copy the full job posting and select Professional, Enthusiastic, or Concise depending on the company culture and how formal the role is." },
      { title: "Review, Edit, and Send", description: "Read the generated letter, personalise any details the AI could not infer (like the hiring manager's name), and paste it directly into your application." },
    ],
    useCases: [
      { title: "Internship and Graduate Applications", description: "Apply to multiple internship postings in a single session - each letter is tailored to that specific role rather than a generic 'please consider my application' template." },
      { title: "Career Changers", description: "Frame transferable skills from a previous career in language that resonates with a new industry - the AI maps what you have done to what the new employer needs." },
      { title: "High-Volume Job Searches", description: "Maintain quality across a large number of applications without spending 45 minutes per letter - generate a strong first draft, make two or three personal edits, and move on." },
    ],
    relatedSlugs: ["ats-resume-checker", "viral-linkedin-post-generator", "ai-paraphraser"],
  },
};

export function getToolContent(slug: string): ToolContent | null {
  return toolContent[slug] ?? null;
}

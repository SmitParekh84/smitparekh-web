export interface ToolHowItWorksStep {
  title: string;
  description: string;
}

export interface ToolUseCase {
  title: string;
  description: string;
}

export interface ToolContent {
  howItWorks: ToolHowItWorksStep[];
  useCases: ToolUseCase[];
  relatedSlugs: string[];
}

export const toolContent: Record<string, ToolContent> = {
  "password-generator": {
    howItWorks: [
      { title: "Choose Your Settings", description: "Set the desired length (4–64 characters) and toggle uppercase, lowercase, numbers, and symbols on or off." },
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
    howItWorks: [
      { title: "Upload Your Image", description: "Drag and drop or click to upload any JPEG, PNG, or WebP image. Preview appears immediately." },
      { title: "Choose Format and Quality", description: "Select the output format (JPEG, PNG, WebP) and adjust the quality slider to balance file size vs visual fidelity." },
      { title: "Convert and Download", description: "Click Convert - the browser processes the image entirely locally using the Canvas API - then download your file instantly." },
    ],
    useCases: [
      { title: "Web Developers", description: "Convert legacy JPEG images to WebP for 25–35% smaller file sizes and faster Core Web Vitals scores without losing visible quality." },
      { title: "Content Creators", description: "Convert screenshots and design assets between formats to meet platform-specific upload requirements in seconds." },
      { title: "E-commerce Teams", description: "Batch-prepare product images in the right format before uploading to Shopify, WooCommerce, or Amazon - no Photoshop needed." },
    ],
    relatedSlugs: ["background-remover", "image-compressor", "qr-code-generator"],
  },

  "qr-code-generator": {
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
    howItWorks: [
      { title: "Upload Your Image", description: "Drag and drop or click to select a JPEG, PNG, or WebP image. A preview of the original appears immediately." },
      { title: "Set Quality and Format", description: "Choose your output format and drag the quality slider - 75–80% is the sweet spot for most web images." },
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
    relatedSlugs: ["viral-linkedin-post-generator", "word-counter", "linkedin-media-downloader"],
  },

  "meta-tag-checker": {
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
    howItWorks: [
      { title: "Paste the YouTube URL", description: "Copy the link from any YouTube video, Short, or embed and paste it into the input field. Bare 11-character video IDs also work." },
      { title: "Get All Thumbnail Sizes", description: "Click 'Get Thumbnails' and the tool instantly fetches all available quality levels — from Max Resolution (1280×720) down to Standard — using YouTube's public CDN." },
      { title: "Download Your Chosen Quality", description: "Click Download next to the quality you need. The image saves to your device as a JPG. Use the external link icon to open the thumbnail in a new tab." },
    ],
    useCases: [
      { title: "Content Creators", description: "Download your own thumbnails for repurposing on other platforms, archiving before reuploading, or recreating a lost thumbnail file without redoing the design." },
      { title: "Marketers & Researchers", description: "Study competitor thumbnails and high-performing video cover art to improve your own click-through rates and A/B test design styles." },
      { title: "Developers & Designers", description: "Grab thumbnail images for mockups, UI prototypes, or testing your apps with real YouTube cover art — no manual screenshotting needed." },
    ],
    relatedSlugs: ["image-compressor", "background-remover", "image-converter"],
  },

  "json-formatter": {
    howItWorks: [
      { title: "Paste Your JSON", description: "Copy raw JSON from an API response, config file, or database export and paste it into the input area. Formatting updates in real time as you type." },
      { title: "Choose Beautify or Minify", description: "Switch to Beautify for indented, human-readable JSON — choose 2 or 4-space indent. Switch to Minify to collapse everything into a single line for production or storage." },
      { title: "Copy the Output", description: "Click Copy next to the output panel to grab the formatted or minified JSON and paste it directly into your code editor, API client, or config file." },
    ],
    useCases: [
      { title: "API Developers", description: "Quickly inspect minified API responses during debugging without setting up a local environment — paste the raw response and read it instantly." },
      { title: "Frontend Engineers", description: "Validate JSON config files and environment schemas before deploying to catch syntax errors early — misplaced commas and unquoted keys are highlighted immediately." },
      { title: "DevOps & Backend Teams", description: "Minify JSON payloads before storing in databases or sending over the wire to reduce size, then beautify again when you need to read or edit them." },
    ],
    relatedSlugs: ["base64-encoder-decoder", "meta-tag-checker", "password-generator"],
  },

  "base64-encoder-decoder": {
    howItWorks: [
      { title: "Choose Encode or Decode", description: "Select Encode to convert plain text or a file to Base64. Select Decode to convert a Base64 string back to readable text. Switch modes with the toggle buttons." },
      { title: "Enter Text or Upload a File", description: "Type or paste text into the input area for instant encoding or decoding. To encode a file (image, PDF, binary), click 'Encode File' and select it from your device." },
      { title: "Copy the Result", description: "The output updates instantly. Click Copy to grab the result, or use the Swap button to flip the output back into the input for chained operations." },
    ],
    useCases: [
      { title: "Web Developers", description: "Encode images and fonts to Base64 data URIs to embed them directly in CSS or HTML — eliminating extra HTTP requests for small assets like icons and loading spinners." },
      { title: "API & Auth Engineers", description: "Encode credentials for HTTP Basic Authentication headers, decode JWT payload sections for inspection, and encode binary blobs for JSON transmission." },
      { title: "Security Researchers", description: "Decode Base64-encoded strings found in config files, log files, or network traffic to inspect payloads during security audits and penetration tests." },
    ],
    relatedSlugs: ["json-formatter", "password-generator", "meta-tag-checker"],
  },
};

export function getToolContent(slug: string): ToolContent | null {
  return toolContent[slug] ?? null;
}

export interface ToolFAQItem {
  question: string;
  answer: string;
}

export const toolFAQs: Record<string, ToolFAQItem[]> = {
  "password-generator": [
    {
      question: "Is this password generator truly random?",
      answer:
        "Yes. The tool uses the Web Crypto API (crypto.getRandomValues), a cryptographically secure random number generator built into every modern browser. It produces passwords that are statistically unpredictable and cannot be reproduced.",
    },
    {
      question: "Are my passwords stored or sent to a server?",
      answer:
        "No. Every password is generated entirely in your browser using JavaScript. Nothing is ever sent to a server, stored, or logged. Your passwords are 100% private.",
    },
    {
      question: "How long should my password be?",
      answer:
        "Security experts recommend at least 16 characters for important accounts. Longer passwords are exponentially harder to crack. For critical accounts like banking or email, use 20+ characters with all character types enabled.",
    },
    {
      question: "Should I include symbols in my password?",
      answer:
        "Yes, whenever the website allows it. A 12-character password with symbols is roughly 1,000× harder to crack than one with only letters and numbers at the same length.",
    },
    {
      question: "What makes a password 'Strong' in the strength meter?",
      answer:
        "The strength meter rates a password as Strong when it is at least 16 characters long and includes all four character types: uppercase letters, lowercase letters, numbers, and symbols. Each additional factor increments the score from Weak → Fair → Good → Strong.",
    },
    {
      question: "How do I use strong passwords safely?",
      answer:
        "Use a password manager (like Bitwarden, 1Password, or KeePass) to store and auto-fill your generated passwords. Never reuse the same password across multiple sites.",
    },
    {
      question: "Is this password generator free?",
      answer:
        "Yes - completely free, no account required, no usage limits. The generator runs entirely in your browser so no data is ever sent anywhere.",
    },
  ],

  "word-counter": [
    {
      question: "How does the word counter work?",
      answer:
        "The word counter analyses your text in real time as you type or paste it. It splits the text into words using standard word-boundary rules and counts each token instantly, with no server needed.",
    },
    {
      question: "How is reading time calculated?",
      answer:
        "Reading time is estimated at 238 words per minute - the average adult silent reading speed per research. The estimate always rounds up to the nearest minute.",
    },
    {
      question: "What is keyword density and why does it matter for SEO?",
      answer:
        "Keyword density is the percentage of times a specific word appears relative to the total word count. For SEO, a density of 1–3% for your primary keyword is considered natural. Higher than 3% may look like keyword stuffing to search engines and hurt rankings.",
    },
    {
      question: "Is my text stored or shared?",
      answer:
        "No. All analysis happens entirely in your browser. Your text is never sent to any server, stored, or shared. It is 100% private.",
    },
    {
      question: "Can I use this tool to check Twitter, LinkedIn, or Instagram limits?",
      answer:
        "Yes. The character count is shown in real time. Twitter allows 280 characters, LinkedIn posts up to 3,000, and Instagram captions up to 2,200.",
    },
    {
      question: "Is there a character limit?",
      answer:
        "The tool handles standard document lengths without issue. For very large documents, performance depends on your device - most modern computers handle up to 100,000 characters smoothly.",
    },
    {
      question: "Is the word counter free?",
      answer:
        "Yes - 100% free, no sign-up, no usage limits, works entirely in your browser.",
    },
  ],

  "image-converter": [
    {
      question: "What image formats can I convert?",
      answer:
        "You can convert between JPEG, PNG, and WebP. JPEG is best for photos, PNG for images with transparency, and WebP offers superior compression for web use with excellent quality.",
    },
    {
      question: "Will my image lose quality during conversion?",
      answer:
        "Converting between lossy formats (e.g., PNG to JPEG) reduces some quality. You control the quality slider - higher values preserve more visual fidelity but produce larger files. WebP at 85% is usually indistinguishable from the original.",
    },
    {
      question: "Which format is best for websites?",
      answer:
        "WebP is the best choice for web images in 2025. It provides 25–35% smaller file sizes than JPEG at equivalent quality. All modern browsers support it. Use PNG only when you need transparency.",
    },
    {
      question: "Is my data secure? Are images stored?",
      answer:
        "No images are stored or uploaded. The entire conversion happens in your browser using the Canvas API. Your images never leave your device.",
    },
    {
      question: "Is the image converter free to use?",
      answer:
        "Yes - completely free, no account, no upload limit. Since conversion happens in your browser, there are no server costs and the tool will always be free.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer:
        "Currently, the tool converts one image at a time. Upload a new image after downloading the previous conversion.",
    },
  ],

  "qr-code-generator": [
    {
      question: "What information can I encode in a QR code?",
      answer:
        "You can encode website URLs, plain text, email addresses, phone numbers, SMS messages, and any other text-based content. Just enter the information and generate instantly.",
    },
    {
      question: "What format will my QR code be downloaded in?",
      answer:
        "QR codes are downloaded as high-resolution PNG images, suitable for both digital and print materials.",
    },
    {
      question: "Will my QR codes expire?",
      answer:
        "No. QR codes generated by this tool are static and will not expire. However, if the content they link to (e.g., a URL) becomes unavailable, the QR code will no longer lead to the intended destination.",
    },
    {
      question: "Do I need an account to generate QR codes?",
      answer:
        "No account, no sign-up, no registration required. Generate as many QR codes as you need for free.",
    },
    {
      question: "Can I use the QR codes commercially?",
      answer:
        "Yes. You are free to use the generated QR codes for personal and commercial purposes without restriction.",
    },
    {
      question: "How do I test if my QR code works?",
      answer:
        "After generating, scan it with your smartphone camera or any QR code app. Most modern smartphones have built-in QR scanning in the native camera app - just point and tap.",
    },
    {
      question: "Is the QR code generator free?",
      answer:
        "Yes - completely free, unlimited use, no account required.",
    },
  ],

  "background-remover": [
    {
      question: "What is the Free Background Remover?",
      answer:
        "An AI-powered tool that automatically detects and removes the background from any photo. It outputs a transparent PNG in seconds - ideal for product images, profile photos, logos, and graphic design projects.",
    },
    {
      question: "What types of images work best?",
      answer:
        "The tool works best on photos with clear separation between the subject and background - portraits, product shots, animals, and objects on plain backgrounds. Busy, cluttered backgrounds may require manual touch-up in an editor.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "You can upload JPEG, PNG, and WebP images. The result is always delivered as a transparent PNG.",
    },
    {
      question: "Are there limits on how many images I can process?",
      answer:
        "No hard limits - you can process as many images as you need. Each image is processed and immediately discarded from the server.",
    },
    {
      question: "Is my image stored on a server?",
      answer:
        "Images are sent to the AI model for processing and immediately deleted afterwards. We do not store, share, or use your images for any purpose.",
    },
    {
      question: "What if the result has rough edges?",
      answer:
        "For best edge quality, use high-resolution images with good lighting and strong contrast between subject and background. You can further refine edges in any image editor like Photoshop or GIMP.",
    },
    {
      question: "Is the background remover free?",
      answer:
        "Yes - completely free, no sign-up, no watermarks added to your output.",
    },
  ],

  "image-compressor": [
    {
      question: "How does the image compressor work?",
      answer:
        "The tool reduces file size by re-encoding your image at the specified quality level. Higher quality = larger file, lower quality = smaller file. A setting of 75–85% typically cuts file size by 50–70% with minimal visible quality loss.",
    },
    {
      question: "What is the best quality setting?",
      answer:
        "For web images, 75–80% provides an excellent balance between quality and file size. For print or archival purposes, use 90% or higher. For social media thumbnails, 65–70% is usually fine.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "JPEG, PNG, and WebP are supported. Note that compressing a PNG with JPEG output removes transparency - use PNG output to preserve it.",
    },
    {
      question: "Is my image stored on a server after compression?",
      answer:
        "Images are temporarily processed on the server and immediately deleted after you download the result. No permanent storage.",
    },
    {
      question: "Will the compression add a watermark?",
      answer:
        "No. Compressed images are returned clean - no watermarks, no branding, no modifications beyond the compression itself.",
    },
    {
      question: "Is the image compressor free?",
      answer:
        "Yes - completely free with no usage limits, no account required.",
    },
  ],

  "viral-linkedin-post-generator": [
    {
      question: "What is the LinkedIn Post Generator?",
      answer:
        "An AI-powered tool that writes high-engagement LinkedIn posts based on your topic, preferred tone (Professional, Casual, Inspirational, Story, Educational), and target audience. It handles structure, hook, and formatting so you can focus on publishing.",
    },
    {
      question: "Will the generated posts actually get engagement?",
      answer:
        "The AI is trained on high-performing LinkedIn content patterns - strong hooks, concise paragraphs, calls to action, and appropriate length. While no tool guarantees virality, the output follows formats consistently shown to outperform generic posts.",
    },
    {
      question: "Can I edit the generated post before publishing?",
      answer:
        "Yes - and you should. The generated post is a strong starting point. Personalise it with your own experience, data points, or anecdotes before posting. Authentic personal detail is what makes LinkedIn content resonate.",
    },
    {
      question: "What is the LinkedIn character limit?",
      answer:
        "LinkedIn allows up to 3,000 characters per post. The generator stays within this limit by default. Posts that are 800–1,500 characters (about 150–280 words) tend to perform best.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes - completely free, no account required, unlimited generations.",
    },
    {
      question: "What tones can I choose from?",
      answer:
        "You can choose from Professional, Casual, Inspirational, Story, and Educational. Each tone produces a distinctly different structure and voice - experiment to find what resonates with your audience.",
    },
  ],

  "ats-resume-checker": [
    {
      question: "What is an ATS score?",
      answer:
        "An ATS (Applicant Tracking System) score measures how well your resume is structured and keyword-matched for automated parsing. Most companies use ATS software to filter resumes before a human ever reads them. A higher score means your resume is more likely to pass the initial filter.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "You can upload PDF or DOCX files. These are the two formats most commonly accepted by ATS systems - using any other format is itself an ATS red flag.",
    },
    {
      question: "Is my resume data stored or shared?",
      answer:
        "No. Your resume text is sent to the AI model for analysis and immediately discarded. We do not store, share, or use your resume data for any other purpose.",
    },
    {
      question: "Do I need to provide a job description?",
      answer:
        "No - the tool analyses your resume against general ATS best practices without a job description. However, tailoring your resume to a specific job description is the most effective way to improve your score for that role.",
    },
    {
      question: "How do I improve a low ATS score?",
      answer:
        "The most common fixes are: use a clean, single-column layout; include keywords from the job posting; use standard headings (Experience, Education, Skills); avoid tables, graphics, and headers/footers; and save as PDF from Word (not Google Docs PDF).",
    },
    {
      question: "Is the ATS resume checker free?",
      answer:
        "Yes - completely free, no account, no sign-up, unlimited analyses.",
    },
  ],

  "meta-tag-checker": [
    {
      question: "What are meta tags and why do they matter for SEO?",
      answer:
        "Meta tags are HTML elements that tell search engines and social platforms what your page is about. The title and meta description directly affect your click-through rate from search results. Open Graph tags control how your content looks when shared on LinkedIn, Facebook, and WhatsApp. Missing or poorly written meta tags are one of the most common on-page SEO mistakes.",
    },
    {
      question: "What meta tags does the checker analyse?",
      answer:
        "Title, meta description, canonical URL, Open Graph tags (og:title, og:description, og:image, og:url), Twitter Card tags, robots directives, and viewport tag - all the elements that affect search visibility and social sharing.",
    },
    {
      question: "What is the ideal length for title and description tags?",
      answer:
        "Title tags: 50–60 characters. Meta descriptions: 150–160 characters. Going over these limits doesn't cause penalties, but Google will truncate the display in search results, which can reduce click-through rates.",
    },
    {
      question: "What are Open Graph tags?",
      answer:
        "Open Graph tags (og:*) control how your content appears when shared on social media. Without them, platforms pick random text and images from your page - usually resulting in poor-looking shares with low engagement.",
    },
    {
      question: "How often should I check my meta tags?",
      answer:
        "Check after any significant content update, when launching new pages, and quarterly as part of routine SEO maintenance. For pages where you notice dropping click-through rates in Google Search Console, check immediately.",
    },
    {
      question: "Is the meta tag checker free?",
      answer:
        "Yes - completely free, no account required, unlimited URL checks.",
    },
  ],

  "seo-analyzer": [
    {
      question: "What does the SEO Analyzer check?",
      answer:
        "The tool audits key on-page SEO factors including title tags, meta descriptions, heading structure (H1–H3), image alt text, canonical tags, internal and external links, page load signals, mobile-friendliness indicators, and structured data - all in one report.",
    },
    {
      question: "How accurate is the SEO score?",
      answer:
        "The score reflects best practices aligned with Google's 2025 ranking guidelines. It is a solid indicator of your page's SEO health, but should be used alongside Google Search Console data for a complete picture of real-world performance.",
    },
    {
      question: "How often should I run an SEO audit?",
      answer:
        "Run an audit after any significant content changes, when you notice ranking drops, when launching new pages, and at least monthly for important landing pages. Regular auditing catches regressions early.",
    },
    {
      question: "Will fixing these issues improve my Google rankings?",
      answer:
        "Yes - implementing the recommendations addresses specific signals Google uses to evaluate pages. Users typically see measurable improvements within 4–12 weeks, depending on the competitiveness of their keywords and how many issues were fixed.",
    },
    {
      question: "Is the SEO Analyzer free?",
      answer:
        "Yes - 100% free, no account required, no usage limits.",
    },
    {
      question: "Can I get the report sent to my email?",
      answer:
        "Yes. Enter your email address in the optional field before running the analysis and a copy of the report will be sent to you.",
    },
  ],

  "linkedin-media-downloader": [
    {
      question: "Is it legal to download LinkedIn videos and images?",
      answer:
        "Downloading content for personal reference is generally accepted, but redistributing, re-uploading, or using others' content commercially without permission may violate LinkedIn's Terms of Service and copyright law. Always respect content ownership.",
    },
    {
      question: "Why can't I download some LinkedIn videos?",
      answer:
        "This tool only works with public LinkedIn posts that anyone can view without logging in. Private posts, posts from private profiles, or content behind a login wall cannot be downloaded.",
    },
    {
      question: "What format are downloaded videos saved in?",
      answer:
        "LinkedIn videos are typically saved in MP4 format, which is compatible with virtually all video players, phones, and editing software.",
    },
    {
      question: "Are downloaded files stored on your server?",
      answer:
        "No. The tool fetches the media URL from LinkedIn and delivers it directly to you. No copies are saved on our servers.",
    },
    {
      question: "How do I get the correct LinkedIn post URL?",
      answer:
        "On LinkedIn, click the three-dot menu (⋯) on the post and select 'Copy link to post'. Paste that URL into the tool. The URL should look like linkedin.com/posts/… or linkedin.com/feed/update/…",
    },
    {
      question: "Is the LinkedIn Media Downloader free?",
      answer:
        "Yes - completely free, no account, no sign-up required.",
    },
  ],

  "youtube-thumbnail-downloader": [
    {
      question: "How do I download a YouTube thumbnail?",
      answer: "Paste the YouTube video URL (or the 11-character video ID) into the input field and click 'Get Thumbnails'. All available quality levels appear instantly. Click Download next to the quality you want.",
    },
    {
      question: "What thumbnail qualities are available?",
      answer: "Max Resolution (1280×720), High Quality (480×360), Medium Quality (320×180), and Standard (640×480). Max Resolution is available on most videos uploaded after 2013.",
    },
    {
      question: "Does this work for YouTube Shorts?",
      answer: "Yes. Paste the full Shorts URL (youtube.com/shorts/ID) and the tool extracts the video ID and fetches the thumbnail automatically.",
    },
    {
      question: "Is downloading YouTube thumbnails legal?",
      answer: "Thumbnails are publicly accessible images. Downloading them for personal use or reference is generally acceptable. Always respect the creator's copyright if you intend to republish or use commercially.",
    },
    {
      question: "Why is the Max Resolution thumbnail missing?",
      answer: "Older videos may not have a maxresdefault thumbnail. The tool hides quality options that do not exist for a given video — use High Quality as the next best option.",
    },
  ],

  "json-formatter": [
    {
      question: "How do I format JSON online?",
      answer: "Paste your JSON into the input box. The formatter validates and beautifies it instantly as you type. If there is a syntax error, the error message shows exactly what is wrong.",
    },
    {
      question: "What is the difference between Beautify and Minify?",
      answer: "Beautify adds indentation and line breaks to make JSON human-readable. Minify removes all whitespace to produce the smallest possible string — useful for API responses and reducing file size.",
    },
    {
      question: "Does this tool validate JSON?",
      answer: "Yes. It uses the browser's native JSON.parse(), which catches all standard syntax errors including missing commas, unquoted keys, trailing commas, and mismatched brackets.",
    },
    {
      question: "Is my JSON data sent to a server?",
      answer: "No. The entire tool runs in your browser. Your JSON never leaves your device — it is not transmitted or stored anywhere.",
    },
    {
      question: "Can I change the indentation level?",
      answer: "Yes. Switch between 2-space and 4-space indentation using the indent buttons in Beautify mode. 2 spaces is most common for web APIs; 4 spaces is preferred in many enterprise codebases.",
    },
  ],

  "base64-encoder-decoder": [
    {
      question: "How do I encode text to Base64?",
      answer: "Select 'Encode' mode, type or paste your text into the input box, and the Base64 output appears instantly. Click Copy to grab the result.",
    },
    {
      question: "How do I decode a Base64 string?",
      answer: "Select 'Decode' mode, paste your Base64 string into the input, and the decoded plain text appears immediately. Use the Swap button to flip input and output.",
    },
    {
      question: "Can I encode a file to Base64?",
      answer: "Yes. Click 'Encode File', select any file from your device, and the tool converts it to a Base64 string. This is useful for embedding images or binary files in JSON, HTML, or CSS.",
    },
    {
      question: "What is Base64 used for?",
      answer: "Base64 is used to safely transmit binary data over text-only channels like JSON APIs, email attachments, data URIs in HTML/CSS, and HTTP Authorization headers.",
    },
    {
      question: "Is Base64 the same as encryption?",
      answer: "No. Base64 is encoding, not encryption — it is fully reversible by anyone and provides no security. Never use it to protect sensitive data. Use it only to convert binary data into a text-safe format.",
    },
  ],
};

export function getToolFAQ(slug: string): ToolFAQItem[] {
  return toolFAQs[slug] ?? [];
}

export interface ToolFAQItem {
  question: string;
  answer: string;
}

export const toolFAQs: Record<string, ToolFAQItem[]> = {
  "audio-to-text": [
    {
      question: "Is this audio-to-text tool free?",
      answer:
        "Yes, transcription is completely free. There's no signup required for casual use, though a generous daily limit applies and signing in raises it. No watermarks, no credit card.",
    },
    {
      question: "What audio formats are supported?",
      answer:
        "MP3, WAV, M4A, AAC, FLAC, OGG, and WebM are all supported, up to 10 MB per file (roughly 5-7 minutes of audio). Most voice notes, interview clips, and meeting snippets fit comfortably.",
    },
    {
      question: "How accurate is the transcription?",
      answer:
        "It uses OpenAI's Whisper model (via faster-whisper), which is highly accurate for clear speech across many languages. Accuracy drops with heavy background noise, overlapping speakers, or very strong accents - clean audio gives the best results.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "Whisper supports 90+ languages and detects the spoken language automatically, showing it as a label above the transcript. You don't need to select a language manually.",
    },
    {
      question: "Is my audio stored or shared?",
      answer:
        "No. Your file is sent securely to the transcription service, processed in memory, and not saved or shared. The transcript stays in your browser until you copy or download it.",
    },
    {
      question: "Why does transcription sometimes take a while?",
      answer:
        "Transcription runs on a free CPU server, so processing time scales with audio length - longer clips take longer. The very first request after a period of inactivity can also be slower while the service wakes up.",
    },
  ],
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
        "Keyword density is the percentage of times a specific word appears relative to the total word count. For SEO, a density of 1-3% for your primary keyword is considered natural. Higher than 3% may look like keyword stuffing to search engines and hurt rankings.",
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
        "WebP is the best choice for web images in 2025. It provides 25-35% smaller file sizes than JPEG at equivalent quality. All modern browsers support it. Use PNG only when you need transparency.",
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
        "The tool reduces file size by re-encoding your image at the specified quality level. Higher quality = larger file, lower quality = smaller file. A setting of 75-85% typically cuts file size by 50-70% with minimal visible quality loss.",
    },
    {
      question: "What is the best quality setting?",
      answer:
        "For web images, 75-80% provides an excellent balance between quality and file size. For print or archival purposes, use 90% or higher. For social media thumbnails, 65-70% is usually fine.",
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
        "LinkedIn allows up to 3,000 characters per post. The generator stays within this limit by default. Posts that are 800-1,500 characters (about 150-280 words) tend to perform best.",
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
        "Title tags: 50-60 characters. Meta descriptions: 150-160 characters. Going over these limits doesn't cause penalties, but Google will truncate the display in search results, which can reduce click-through rates.",
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
        "The tool audits key on-page SEO factors including title tags, meta descriptions, heading structure (H1-H3), image alt text, canonical tags, internal and external links, page load signals, mobile-friendliness indicators, and structured data - all in one report.",
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
        "Yes - implementing the recommendations addresses specific signals Google uses to evaluate pages. Users typically see measurable improvements within 4-12 weeks, depending on the competitiveness of their keywords and how many issues were fixed.",
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
      answer: "Older videos may not have a maxresdefault thumbnail. The tool hides quality options that do not exist for a given video - use High Quality as the next best option.",
    },
  ],

  "json-formatter": [
    {
      question: "How do I format JSON online?",
      answer: "Paste your JSON into the input box. The formatter validates and beautifies it instantly as you type. If there is a syntax error, the error message shows exactly what is wrong.",
    },
    {
      question: "What is the difference between Beautify and Minify?",
      answer: "Beautify adds indentation and line breaks to make JSON human-readable. Minify removes all whitespace to produce the smallest possible string - useful for API responses and reducing file size.",
    },
    {
      question: "Does this tool validate JSON?",
      answer: "Yes. It uses the browser's native JSON.parse(), which catches all standard syntax errors including missing commas, unquoted keys, trailing commas, and mismatched brackets.",
    },
    {
      question: "Is my JSON data sent to a server?",
      answer: "No. The entire tool runs in your browser. Your JSON never leaves your device - it is not transmitted or stored anywhere.",
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
      answer: "No. Base64 is encoding, not encryption - it is fully reversible by anyone and provides no security. Never use it to protect sensitive data. Use it only to convert binary data into a text-safe format.",
    },
  ],

  "url-encoder-decoder": [
    {
      question: "When should I use URL encoding?",
      answer: "Whenever you put text inside a URL - query parameter values, path segments with special characters, or anchor fragments. Characters like spaces, &, =, ?, /, #, and non-ASCII letters must be percent-encoded so the URL is parsed correctly.",
    },
    {
      question: "What is the difference between Component and Full URL mode?",
      answer: "Component mode (encodeURIComponent) escapes everything that isn't a safe character - including ?, &, =, /, # - so it's safe to embed inside another URL as a parameter value. Full URL mode (encodeURI) preserves URL structure characters and is meant for encoding an entire URL once.",
    },
    {
      question: "Is my input sent to a server?",
      answer: "No. The encoder runs entirely in your browser using built-in JavaScript functions. Your text never leaves your device.",
    },
    {
      question: "Why am I getting 'Invalid URL-encoded string'?",
      answer: "The decoder expects valid percent-encoded sequences (%20, %3D, etc.). If you see that error, your input contains a malformed % followed by non-hex characters. Check that every % is followed by exactly two hex digits.",
    },
  ],

  "hash-generator": [
    {
      question: "Which hash algorithm should I use?",
      answer: "Use SHA-256 or SHA-512 for security-related hashing (file integrity, fingerprints, content addressing). Use MD5 only for non-security checksums or compatibility with legacy systems - it is broken for cryptographic purposes.",
    },
    {
      question: "Is my text sent to a server?",
      answer: "No. All hashes are computed locally in your browser using the Web Crypto API (and a pure-JS implementation for MD5). Your input never leaves your device.",
    },
    {
      question: "Can hashes be reversed?",
      answer: "No. Cryptographic hashes are one-way functions. There is no algorithm to recover the original text from a hash. 'Cracking' a hash means trying many guesses until one produces the same hash, which is only feasible for short, common, or weakly-hashed inputs.",
    },
    {
      question: "Are MD5 and SHA-1 still safe?",
      answer: "Not for security. Both have practical collision attacks. They are still fine for non-security checksums (file deduplication, cache keys), but never use them for password hashing, signatures, or anything an attacker might attack.",
    },
  ],

  "regex-tester": [
    {
      question: "Which regex flavour does this tester use?",
      answer: "JavaScript / ECMAScript regex - the same engine used in browsers and Node.js. Most patterns from PCRE, Python, and Ruby work, but some advanced features (e.g., lookbehind in older engines, possessive quantifiers, named recursion) may differ.",
    },
    {
      question: "What does each flag do?",
      answer: "g = find all matches, i = case-insensitive, m = ^ and $ match at line breaks, s = dot matches newlines, u = full Unicode matching, y = sticky matching from lastIndex.",
    },
    {
      question: "How do capture groups work in replace mode?",
      answer: "Use $1, $2, etc. in the replacement string to reference parenthesised groups in the pattern. For named groups (?<name>...), use $<name>. Use $$ for a literal dollar sign.",
    },
    {
      question: "Is my regex pattern stored or sent to a server?",
      answer: "No. The tester runs entirely in your browser. Nothing is logged, sent, or stored.",
    },
  ],

  "color-converter": [
    {
      question: "Which colour formats does this tool support?",
      answer: "HEX (3, 4, 6, 8 digit), RGB, RGBA, HSL, HSLA, and a CSS variable snippet. Edit any field and the others update instantly.",
    },
    {
      question: "How does the alpha channel work in HEX?",
      answer: "8-digit HEX adds two extra hex characters at the end representing alpha (00 = fully transparent, FF = fully opaque). For example, #3B82F680 is the standard blue at 50% opacity.",
    },
    {
      question: "Why does HSL hue go from 0-360?",
      answer: "Hue is measured as a position on the colour wheel in degrees. 0° is red, 120° is green, 240° is blue, and the wheel wraps back to red at 360°.",
    },
    {
      question: "Is my colour data stored anywhere?",
      answer: "No. The converter runs entirely in your browser. Nothing is uploaded.",
    },
  ],

  "pomodoro-timer": [
    {
      question: "What is the Pomodoro Technique?",
      answer: "A time-management method created by Francesco Cirillo in the late 1980s. You work for a focused interval (traditionally 25 minutes), then take a 5-minute break. Every 4 sessions, you take a longer 15-30 minute break. The structure trains your brain to sustain attention and recover.",
    },
    {
      question: "Can I customise the focus and break lengths?",
      answer: "Yes. Open Settings to set focus duration, short break, long break, and how often a long break occurs. Some people prefer 50/10 or 90/20 cycles - the timer supports anything from 1 to 90 minutes.",
    },
    {
      question: "Will it work if I switch tabs or minimise the browser?",
      answer: "Yes. The timer keeps running in the background. When a phase completes, you'll get a sound and a browser notification (if you allow notifications). The tab can stay pinned in the corner.",
    },
    {
      question: "Are my session stats saved?",
      answer: "Sessions are tracked in memory for the page lifetime so you can see how many rounds you've completed today. Nothing is sent to a server.",
    },
  ],

  "world-clock": [
    {
      question: "How accurate is the time shown?",
      answer: "It uses your device clock and the browser's IANA timezone database, so it's as accurate as your system clock. The display refreshes every second.",
    },
    {
      question: "Can I add any city in the world?",
      answer: "You can add any city from the built-in list, which covers the most-used IANA timezones across all continents. Cities sharing the same zone (e.g., Mumbai and Delhi both use Asia/Kolkata) show identical times.",
    },
    {
      question: "Why do some cities glow warm and others cool?",
      answer: "Cards switch between a warm (daytime) and cool (nighttime) gradient based on local hour at that timezone, so you can see at a glance whether it's a reasonable hour to call a colleague.",
    },
    {
      question: "Does it handle daylight saving time?",
      answer: "Yes. Because we use the Intl API and IANA zones, DST transitions are handled automatically - no manual adjustment needed.",
    },
  ],

  "unit-converter": [
    {
      question: "Which unit categories are supported?",
      answer: "Length, weight (mass), temperature, volume, area, speed, time, and digital data sizes (with both decimal KB/MB/GB and binary KiB/MiB/GiB).",
    },
    {
      question: "Why are KB and KiB shown separately?",
      answer: "KB / MB / GB / TB use base-1000 (decimal), while KiB / MiB / GiB / TiB use base-1024 (binary). Storage manufacturers usually advertise in decimal; operating systems often display in binary. Showing both avoids confusion.",
    },
    {
      question: "How precise are the conversions?",
      answer: "Conversions use double-precision floating-point math and standard SI/imperial conversion factors. Results show up to 8 significant digits and switch to scientific notation for very small or very large values.",
    },
    {
      question: "Can I convert temperatures below absolute zero?",
      answer: "The converter does not block it, but physically you can't go below 0 K (-273.15 °C / -459.67 °F). Values below that are still mathematically valid for unit-test cases but have no physical meaning.",
    },
  ],

  "markdown-editor": [
    {
      question: "Which markdown flavour does the editor support?",
      answer: "Standard CommonMark plus most GitHub-flavoured Markdown features rendered through react-markdown. Headings, lists, links, images, code blocks with fences, blockquotes, and inline HTML all work.",
    },
    {
      question: "Can I export the rendered output as HTML?",
      answer: "Yes. Click 'HTML' to copy the rendered HTML to your clipboard, or 'Markdown' to copy the source. Use '.md' to download the document as a Markdown file.",
    },
    {
      question: "Does it autosave my work?",
      answer: "No. To keep the tool 100% private, nothing is stored on a server. If you close the tab, the content is lost - download the .md file before leaving.",
    },
    {
      question: "Is this safe for confidential documents?",
      answer: "Yes. The editor never sends your text to any server. All preview rendering happens in-browser using JavaScript.",
    },
  ],

  "cron-builder": [
    {
      question: "Which cron format does this builder use?",
      answer: "Standard 5-field Unix / Linux cron: minute, hour, day-of-month, month, day-of-week. Names like Mon, Tue, Jan, Feb work as well as numbers. Step (*/5), range (1-5), and list (1,15,30) syntax is fully supported.",
    },
    {
      question: "How are 'next runs' calculated?",
      answer: "The tool simulates each upcoming minute against your expression and lists the first 5 matches in your local timezone. It correctly handles cases where day-of-month and day-of-week both narrow the schedule.",
    },
    {
      question: "Can I use this for AWS / Vercel / GitHub Actions cron?",
      answer: "Yes. Most platforms (AWS EventBridge, GitHub Actions, Vercel, Kubernetes CronJobs) accept the same 5-field syntax. AWS adds a 6-field 'year' variant - for that, just paste the 5-field equivalent here to validate.",
    },
    {
      question: "Why does my expression say 'invalid'?",
      answer: "Common causes: missing a field (you need exactly 5 separated by spaces), an out-of-range number (e.g., minute 60), an inverted range (5-1), or an unknown name. The error message tells you which field failed.",
    },
  ],

  "lorem-ipsum": [
    {
      question: "What is Lorem Ipsum and why is it used?",
      answer: "Lorem Ipsum is scrambled Latin filler text used since the 1500s by typesetters and designers to demonstrate how a layout looks without distracting readers with real content. It's the industry-standard placeholder.",
    },
    {
      question: "Can I generate a specific number of words or characters?",
      answer: "Yes. Switch the 'Generate' dropdown to Paragraphs, Sentences, Words, or Bytes (characters) and set the count. Useful for filling design mocks to an exact length.",
    },
    {
      question: "Should the text always start with 'Lorem ipsum'?",
      answer: "By default, yes - that's the convention designers expect. Uncheck the option to start with random Lorem-style words instead, which is closer to a real-world variability test.",
    },
    {
      question: "Is it safe to use Lorem Ipsum in production?",
      answer: "No. Lorem Ipsum is for design previews only. Always replace it with real copy before shipping - leftover Lorem Ipsum is a common cause of embarrassing production bugs.",
    },
  ],

  "jwt-decoder": [
    {
      question: "Is decoding a JWT the same as verifying it?",
      answer: "No. Decoding only reads the base64url-encoded header and payload, which are not encrypted. Verifying a JWT requires checking the signature against the issuer's secret or public key - a server-side step that this tool intentionally does not perform.",
    },
    {
      question: "Is it safe to paste my real production JWT here?",
      answer: "Yes. The decoder runs entirely in your browser - your token is never sent to any server, logged, or stored. That said, treat any JWT as a credential and avoid sharing it through screenshots or chat.",
    },
    {
      question: "Why does the tool say my token is expired?",
      answer: "Standard JWTs include an 'exp' claim with a Unix timestamp. We compare it to your computer's current time. If your clock is wrong or the token is genuinely expired, the badge will turn red.",
    },
    {
      question: "Which JWT algorithms are supported?",
      answer: "All of them - the decoder treats the algorithm as informational only. HS256, RS256, ES256, EdDSA, and others all decode the same way because the header/payload encoding is identical across algorithms.",
    },
  ],

  "sql-formatter": [
    {
      question: "Which SQL dialects does the formatter support?",
      answer: "It works for ANSI-style SQL used by PostgreSQL, MySQL, MariaDB, SQLite, SQL Server, BigQuery, Snowflake, and Redshift. Vendor-specific keywords are kept as-is and won't be reformatted incorrectly.",
    },
    {
      question: "Does it preserve my comments?",
      answer: "Yes. Both line comments (-- ...) and block comments (/* ... */) are preserved on their own lines in the output.",
    },
    {
      question: "Will it break complex CTEs and subqueries?",
      answer: "No. Parentheses are tracked and indentation increases for each nested level, so CTEs (WITH ... AS (...)) and subqueries stay readable.",
    },
    {
      question: "Is my SQL sent to a server?",
      answer: "Never. Formatting happens entirely in your browser using JavaScript - safe for confidential queries containing internal table names or business logic.",
    },
  ],

  "image-to-base64": [
    {
      question: "Are my images uploaded anywhere?",
      answer: "No. The conversion happens in your browser using the FileReader API. The file never leaves your device, making this safe for confidential or unreleased images.",
    },
    {
      question: "When should I actually use a base64 image?",
      answer: "Inline base64 is ideal for tiny icons, transactional emails, or eliminating an extra HTTP request for above-the-fold images. For anything larger than ~10 KB it's usually better to keep the file external - base64 inflates size by ~33%.",
    },
    {
      question: "Does it work with SVG?",
      answer: "Yes. SVGs are encoded as data URLs with the image/svg+xml MIME type and can be used directly in CSS background-image or <img> src.",
    },
    {
      question: "What is the max file size?",
      answer: "10 MB. Larger files are blocked because base64 strings become unmanageable and most email and CSS contexts have lower practical limits anyway.",
    },
  ],

  "css-gradient-generator": [
    {
      question: "What's the difference between linear, radial, and conic gradients?",
      answer: "Linear gradients transition along a straight line at a chosen angle. Radial gradients radiate outward from a center point. Conic gradients sweep around a center point like a clock face - perfect for pie-chart effects.",
    },
    {
      question: "Are conic gradients supported in all browsers?",
      answer: "Yes - conic-gradient() is supported in every evergreen browser (Chrome 69+, Edge 79+, Safari 12.1+, Firefox 83+). For very old browsers, fall back to a linear gradient.",
    },
    {
      question: "Can I copy the result as Tailwind?",
      answer: "Yes. The 'Tailwind arbitrary' output gives you a class like bg-[linear-gradient(135deg,#3b82f6_0%,#06b6d4_100%)] you can paste into any Tailwind project (v3 or v4).",
    },
    {
      question: "How many color stops can I add?",
      answer: "As many as you want - the generator supports unlimited stops with individual position controls. For practical use, 2-4 stops is usually best for crisp, fast-rendering gradients.",
    },
  ],

  "slug-generator": [
    {
      question: "What characters get stripped from a slug?",
      answer: "Anything that isn't ASCII alphanumeric. Spaces, punctuation, emoji, and special characters become separators. Accented characters (é, ü, ñ, etc.) are normalised to their ASCII equivalent (e, u, n).",
    },
    {
      question: "Why use slugs instead of raw titles in URLs?",
      answer: "Search engines and humans both prefer URLs that are short, lowercase, hyphenated, and free of percent-encoded characters. Slugs improve click-through rate, shareability, and SEO.",
    },
    {
      question: "Should I remove stop words?",
      answer: "For SEO, often yes - words like 'a', 'the', 'and' rarely add ranking value and shorter URLs perform better. For navigation breadcrumbs or human-readability, leave them in.",
    },
    {
      question: "Will the same input always produce the same slug?",
      answer: "Yes. The transformation is purely deterministic - given the same input and options, you'll always get the same slug. That makes it safe to use for permalinks and migration scripts.",
    },
  ],

  "favicon-generator": [
    {
      question: "Which favicon sizes do I actually need?",
      answer: "At minimum: 16×16 (browser tab), 32×32 (high-DPI tabs), 180×180 (Apple touch icon), 192×192 and 512×512 (Android / PWA manifest). The tool emits all of these plus 48, 64, and 128 for completeness.",
    },
    {
      question: "Can I use an emoji as my favicon?",
      answer: "Yes - switch to the Emoji tab and pick any emoji. It's rendered to canvas at every size, so you get crisp PNGs ready to upload to your /public folder.",
    },
    {
      question: "Why a square / rounded / circle background?",
      answer: "Modern operating systems (iOS, Android) display favicons inside their own shape masks. Picking 'rounded' or 'circle' here lets you preview how the icon will look on a home screen versus a browser tab.",
    },
    {
      question: "Where do I install the favicon files?",
      answer: "Put each PNG into your site's /public (or web root) folder, then paste the generated <link> tags into your <head>. The tool gives you the exact snippet to copy.",
    },
  ],

  "uuid-generator": [
    {
      question: "What's the difference between UUID v4 and v7?",
      answer: "UUID v4 is fully random and unsorted. UUID v7 is time-ordered - it includes a Unix-millisecond timestamp at the start, which makes it index- and sort-friendly for databases. v7 is the modern recommendation for new systems.",
    },
    {
      question: "Are these UUIDs safe to use as primary keys?",
      answer: "Yes. They are generated using the Web Crypto API (crypto.randomUUID), which is cryptographically secure. Collisions are mathematically negligible - you would need ~2.71 quintillion v4 UUIDs to have a 50% chance of one duplicate.",
    },
    {
      question: "What's the NIL UUID for?",
      answer: "The NIL UUID (00000000-0000-0000-0000-000000000000) is a special placeholder defined by RFC 4122 and used as a sentinel for 'no UUID yet' in databases, fixtures, and tests. The MAX UUID (all f's) is its opposite, used in test bounds.",
    },
    {
      question: "How many can I generate at once?",
      answer: "Up to 1000 per click. They're generated locally - no rate limits, no signup, no captcha.",
    },
  ],

  "ai-note-summarizer": [
    {
      question: "How does the AI summarize my notes?",
      answer: "The tool sends your pasted text to a language model that identifies the most important concepts, definitions, relationships, and facts, then restructures them into your chosen output format - bullet summary, key terms, flashcards, or quiz. The original text is not stored after processing.",
    },
    {
      question: "How long can my notes be?",
      answer: "Up to 5,000 characters per submission for guest users. That's roughly 800-1,000 words - about a standard lecture transcript. Sign in free with Google to unlock higher limits.",
    },
    {
      question: "Can it summarize a PDF or scanned textbook?",
      answer: "The tool works with pasted plain text only. For PDFs, copy the text first (most PDF viewers support text selection), then paste it in. Scanned images and handwritten notes need an OCR step before they can be pasted.",
    },
    {
      question: "Is my study material stored or used for AI training?",
      answer: "No. Your text is sent to the AI model for the current session only and discarded immediately after. Nothing is stored on our servers or used for model training.",
    },
    {
      question: "Which output format is best for exam revision?",
      answer: "Flashcards and self-check quizzes force active recall, which research consistently shows leads to stronger long-term retention than re-reading. Use bullet summaries for a quick first pass, then switch to flashcards for the material you need to lock in.",
    },
    {
      question: "Is the AI Note Summarizer free?",
      answer: "Yes - free for the first uses each day without an account. Sign in free with Google to unlock higher daily usage limits.",
    },
  ],

  "ai-flashcard-generator": [
    {
      question: "How many flashcards can I generate at once?",
      answer: "Up to 50 per batch. For most topics, 20-30 cards cover the essential content without becoming overwhelming. Generate a second batch for the same topic to go deeper.",
    },
    {
      question: "What is the Anki CSV export for?",
      answer: "Anki is a free, open-source spaced-repetition app used by medical students, law students, and language learners worldwide. Importing a CSV file adds all your generated cards to a new Anki deck in one step - no manual card creation needed.",
    },
    {
      question: "How should I phrase my topic for the best results?",
      answer: "Specific is better than general. 'ATP synthesis steps in cellular respiration' generates more useful cards than 'biology'. If you have notes or a passage, paste that in instead of a topic title - the AI extracts cards from real content rather than general knowledge.",
    },
    {
      question: "Can I generate flashcards in a language other than English?",
      answer: "Yes. Paste study material in French, Spanish, German, or any other language and the cards are generated in the same language. Useful for language-learning vocabulary sets.",
    },
    {
      question: "Is my content stored or shared?",
      answer: "No. Your input and the generated flashcards exist only for the duration of your session. Nothing is stored on our servers or used for model training.",
    },
    {
      question: "Is the AI Flashcard Generator free?",
      answer: "Yes - free for the first uses each day without an account. Sign in free with Google for higher daily limits.",
    },
  ],

  "ai-essay-outliner": [
    {
      question: "Which citation styles does the essay outliner support?",
      answer: "APA 7th Edition, MLA 9th Edition, Chicago (both Notes-Bibliography and Author-Date systems), and Harvard. The outline uses the correct in-text citation notation and reference formatting cues for the selected style.",
    },
    {
      question: "Can I use this for a dissertation or thesis?",
      answer: "Yes, though the tool works best for individual chapters rather than an entire dissertation at once. Outline each chapter separately and combine them in your word processor. The word-count targeting helps ensure each chapter section is proportionally weighted.",
    },
    {
      question: "Does it write the essay for me?",
      answer: "No - it generates a structured outline only: a thesis statement, a hook, section headings with argument previews, word-count targets per section, and evidence/source cues. You do the writing. This keeps academic integrity intact while eliminating the blank-page problem.",
    },
    {
      question: "How accurate are the APA / MLA formatting suggestions?",
      answer: "The style suggestions follow current published guidelines, but every institution has its own house style. Always cross-check the generated outline against your module handbook or your institution's style guide before submitting.",
    },
    {
      question: "What essay types work best with this tool?",
      answer: "Argumentative, analytical, compare-and-contrast, and cause-and-effect essays all work well. Highly technical or scientific papers with a fixed IMRaD structure (Introduction, Methods, Results, Discussion) may need manual adjustments to the generated outline.",
    },
    {
      question: "Is the AI Essay Outliner free?",
      answer: "Yes - free for the first uses each day without an account. Sign in free with Google for higher daily limits.",
    },
  ],

  "ai-citation-generator": [
    {
      question: "Which citation styles are supported?",
      answer: "APA 7th Edition, MLA 9th Edition, Chicago (Notes-Bibliography and Author-Date), Harvard, and IEEE. These cover the vast majority of undergraduate, graduate, and professional academic citation requirements worldwide.",
    },
    {
      question: "What types of sources can I cite?",
      answer: "Web pages (paste the URL), journal articles (paste the DOI), books (paste the ISBN), and other source types (enter details manually - author, title, publisher, year, etc.).",
    },
    {
      question: "How accurate are the generated citations?",
      answer: "Very accurate for clean DOIs (journal articles) and ISBNs (books), where metadata is standardised. URL-based citations depend on the page's own metadata markup - some websites have incomplete or incorrect titles and dates, so always verify the key fields before submitting.",
    },
    {
      question: "Should I always double-check the citation before using it?",
      answer: "Yes. Treat the generated citation as a well-formatted first draft. Verify the author names, publication year, and title against the actual source. For graded academic work, cross-check against your institution's style guide.",
    },
    {
      question: "What is an in-text citation?",
      answer: "An in-text citation is the shortened reference that appears inside the body of your essay immediately after quoted or paraphrased material - for example, (Smith, 2023) in APA or (Smith 45) in MLA. The tool generates both the full reference-list entry and the in-text version.",
    },
    {
      question: "Is the AI Citation Generator free?",
      answer: "Yes - free for the first uses each day without an account. Sign in free with Google for higher daily limits.",
    },
  ],

  "ai-paraphraser": [
    {
      question: "How many tone options are available?",
      answer: "Three: Academic (formal, hedged scholarly language - suited for essays and research papers), Formal (professional, business-appropriate prose), and Casual (plain, conversational language - suited for social media, blogs, and informal writing).",
    },
    {
      question: "What is the maximum input length?",
      answer: "Up to 1,000 characters per submission for guest users - about 150-200 words, which is the typical length of a quoted passage or evidence paragraph. Sign in free with Google to unlock longer inputs.",
    },
    {
      question: "Does paraphrasing with this tool count as plagiarism?",
      answer: "Paraphrasing itself is an expected academic skill - putting source material into your own words with proper citation. Using an AI tool to help rephrase is similar to using a thesaurus. Always add the citation for the original source, even when the wording has changed.",
    },
    {
      question: "Why are three versions generated instead of one?",
      answer: "No single paraphrase is perfect for every context. Giving you three alternatives lets you choose the version that fits the surrounding sentences best, rather than forcing you to accept the first output.",
    },
    {
      question: "Is my text sent to or stored on a server?",
      answer: "Your text is sent to the AI model for the current session and discarded immediately after. Nothing is stored on our servers or used for training.",
    },
    {
      question: "Is the AI Paraphraser free?",
      answer: "Yes - free for the first uses each day without an account. Sign in free with Google for higher daily limits.",
    },
  ],

  "ai-cover-letter": [
    {
      question: "Does the generated cover letter actually reference the job description?",
      answer: "Yes. The AI reads both your resume and the job description, identifies the role's key requirements, and maps your specific experience and skills to those requirements - producing a tailored letter rather than a generic template.",
    },
    {
      question: "How long is the generated cover letter?",
      answer: "Typically 250-400 words - the standard professional length that hiring managers prefer. It includes an opening that names the role, two body paragraphs mapping your experience to the job, and a clear call-to-action closing.",
    },
    {
      question: "What tone options are available?",
      answer: "Professional (measured, competent, appropriate for corporate and traditional employers), Enthusiastic (energetic and driven - suited for startups, creative roles, and cultures that value culture fit), and Concise (short and direct - suited for busy tech companies and roles where brevity is valued).",
    },
    {
      question: "Should I edit the letter before sending?",
      answer: "Yes, always. Add the hiring manager's name if you know it, verify that any facts the AI inferred are accurate, and add one personal detail - a specific project, a company reason you want to join - that the AI could not know. Ten minutes of editing lifts the letter significantly.",
    },
    {
      question: "What if I don't have a resume yet?",
      answer: "Paste a bullet-point summary of your education, relevant experience, and key skills - it doesn't need to be a formatted resume. The AI extracts the relevant details from whatever you provide.",
    },
    {
      question: "Is the AI Cover Letter Generator free?",
      answer: "Yes - free for the first uses each day without an account. Sign in free with Google for higher daily limits.",
    },
  ],
};

export function getToolFAQ(slug: string): ToolFAQItem[] {
  return toolFAQs[slug] ?? [];
}

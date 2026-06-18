export interface HowToStep {
  name: string;
  text: string;
}

export const toolHowToSteps: Record<string, HowToStep[]> = {
  "audio-to-text": [
    { name: "Upload your audio", text: "Drag and drop or click to upload an MP3, WAV, M4A, AAC, FLAC, OGG, or WebM file up to 10 MB." },
    { name: "Transcribe with AI", text: "Click Transcribe - the Whisper AI model converts the speech to text and auto-detects the language." },
    { name: "Copy or download", text: "Copy the transcript to your clipboard or download it as a .txt file." },
  ],
  "background-remover": [
    { name: "Upload your image", text: "Click the upload area or drag and drop a photo, logo, or product image." },
    { name: "Wait for AI processing", text: "The AI removes the background automatically - no manual selection needed." },
    { name: "Download the result", text: "Click Download to save the image with a transparent background as PNG." },
  ],
  "viral-linkedin-post-generator": [
    { name: "Choose a post type", text: "Select the style of LinkedIn post you want - story, tips, opinion, or carousel hook." },
    { name: "Enter your topic or idea", text: "Type a brief description of what your post is about." },
    { name: "Generate and copy", text: "Click Generate, review the output, and copy it directly to LinkedIn." },
  ],
  "ats-resume-checker": [
    { name: "Paste your resume text", text: "Copy the full text of your resume and paste it into the input area." },
    { name: "Optionally add a job description", text: "Paste the target job description to get keyword-matched suggestions." },
    { name: "Review your ATS score", text: "Read your score, keyword gaps, and actionable suggestions to improve shortlisting chances." },
  ],
  "meta-tag-checker": [
    { name: "Enter a URL", text: "Type or paste the full URL of the page you want to inspect." },
    { name: "Click Analyse", text: "The tool fetches the page and extracts all meta tags, OG tags, and Twitter cards." },
    { name: "Review the results", text: "Check title length, meta description, Open Graph image, and Twitter card status - fix any flagged issues." },
  ],
  "qr-code-generator": [
    { name: "Choose content type", text: "Select URL, plain text, email address, or phone number." },
    { name: "Enter your content", text: "Type or paste the value you want encoded into the QR code." },
    { name: "Download your QR code", text: "Click Download to save the QR code as a high-resolution PNG." },
  ],
  "word-counter": [
    { name: "Paste or type your text", text: "Enter any text into the editor - articles, essays, captions, or scripts." },
    { name: "View counts instantly", text: "See word count, character count (with and without spaces), sentence count, and paragraph count update live." },
    { name: "Check reading time and keyword density", text: "Scroll down to see estimated reading time and the top keywords by frequency." },
  ],
  "image-compressor": [
    { name: "Upload your image", text: "Drag and drop or click to upload a JPEG, PNG, or WebP file." },
    { name: "Adjust quality if needed", text: "Use the quality slider to balance file size and visual fidelity." },
    { name: "Download the compressed image", text: "Click Download to save the smaller file - no watermark, no account needed." },
  ],
  "image-converter": [
    { name: "Upload your image", text: "Click to upload or drag and drop the source image file." },
    { name: "Choose the output format", text: "Select JPEG, PNG, or WebP as the target format." },
    { name: "Download the converted file", text: "Click Convert then Download - the file is processed entirely in your browser." },
  ],
  "linkedin-media-downloader": [
    { name: "Copy a LinkedIn post URL", text: "Right-click a LinkedIn post and copy the link, or grab it from the browser address bar." },
    { name: "Paste the URL and click Download", text: "Paste the post URL into the input and click the Download button." },
    { name: "Save the file", text: "The video or image downloads directly to your device - no login required." },
  ],
  "seo-analyzer": [
    { name: "Enter a webpage URL", text: "Type or paste the full URL of the page you want to audit." },
    { name: "Click Analyse", text: "The tool fetches the page and checks title tags, headings, meta description, links, and performance signals." },
    { name: "Review the SEO report", text: "Read each section - fix any red or amber items first for the fastest ranking improvement." },
  ],
  "password-generator": [
    { name: "Set your length and character options", text: "Choose password length and toggle uppercase, lowercase, numbers, and symbols." },
    { name: "Click Generate", text: "A cryptographically random password is created instantly in your browser." },
    { name: "Copy your password", text: "Click Copy - the password is never sent to any server." },
  ],
  "youtube-thumbnail-downloader": [
    { name: "Paste a YouTube video URL", text: "Copy the URL from any YouTube video page or Shorts URL and paste it into the input." },
    { name: "Choose your resolution", text: "Select Max Resolution, HD (480p), or Standard (default) quality." },
    { name: "Download the thumbnail", text: "Click the download button to save the thumbnail image to your device." },
  ],
  "json-formatter": [
    { name: "Paste your JSON", text: "Paste raw or minified JSON into the input area." },
    { name: "Format or minify", text: "Click Beautify for readable indented output, or Minify to compress it." },
    { name: "Copy the result", text: "Click Copy to get the formatted JSON - syntax errors are highlighted in red." },
  ],
  "base64-encoder-decoder": [
    { name: "Choose a mode", text: "Select Encode to convert text to Base64, or Decode to convert Base64 back to plain text." },
    { name: "Enter your input", text: "Paste your text or Base64 string into the input area." },
    { name: "Copy the output", text: "The result appears instantly - click Copy to use it." },
  ],
  "url-encoder-decoder": [
    { name: "Choose a mode", text: "Select Encode to percent-encode a URL, or Decode to convert an encoded string back to readable text." },
    { name: "Paste your input", text: "Enter the URL or encoded string you want to convert." },
    { name: "Copy the result", text: "Click Copy - you can switch between full URL encoding and component encoding." },
  ],
  "hash-generator": [
    { name: "Choose a hash algorithm", text: "Select MD5, SHA-1, SHA-256, SHA-384, or SHA-512." },
    { name: "Type or paste your input", text: "Enter the text you want to hash - the hash updates as you type." },
    { name: "Copy the hash", text: "Click Copy to use the hash - everything runs client-side, nothing is sent to a server." },
  ],
  "regex-tester": [
    { name: "Enter your regex pattern", text: "Type your regular expression in the pattern field and set any flags (g, i, m, s)." },
    { name: "Paste your test string", text: "Add the text you want to match against in the test string area." },
    { name: "View matches and groups", text: "Matches are highlighted in the test string and capture groups appear in a list below." },
  ],
  "pomodoro-timer": [
    { name: "Set focus and break durations", text: "Adjust the focus session length (default 25 min) and short/long break durations." },
    { name: "Click Start", text: "The timer counts down - browser notifications alert you when a session ends." },
    { name: "Work through sessions", text: "Complete four focus sessions to earn a long break - your session count is tracked automatically." },
  ],
  "world-clock": [
    { name: "Search for and add cities", text: "Type a city name in the search box and click Add to display its current time." },
    { name: "Compare time zones side by side", text: "All added cities show live time with day/night status and UTC offset." },
    { name: "Remove cities you no longer need", text: "Click the X on any city card to remove it from your view." },
  ],
  "unit-converter": [
    { name: "Choose a category", text: "Select length, weight, temperature, area, volume, speed, time, or data size." },
    { name: "Enter a value and select the input unit", text: "Type the number and pick the unit you're converting from." },
    { name: "Read instant conversions", text: "All equivalent values in every unit for that category update instantly below." },
  ],
  "markdown-editor": [
    { name: "Type or paste Markdown", text: "Write or paste Markdown content into the left editor pane." },
    { name: "Preview the rendered output", text: "The right pane shows a live HTML preview - GitHub-flavoured Markdown is fully supported." },
    { name: "Export your content", text: "Click Copy as HTML to get the rendered markup, or Download to save the .md file." },
  ],
  "cron-builder": [
    { name: "Choose a preset or configure fields", text: "Pick a common schedule from the presets dropdown, or set minute, hour, day, month, and weekday fields manually." },
    { name: "Read the human-readable description", text: "The tool explains the schedule in plain English as you build it." },
    { name: "Copy the expression and check next runs", text: "Copy your cron expression and review the next five scheduled run times." },
  ],
  "lorem-ipsum": [
    { name: "Choose output type and count", text: "Select paragraphs, sentences, or words and set how many you need." },
    { name: "Click Generate", text: "The placeholder text is generated instantly." },
    { name: "Copy the text", text: "Click Copy to use the Lorem Ipsum in your design or document." },
  ],
  "jwt-decoder": [
    { name: "Paste your JWT token", text: "Copy a JSON Web Token from your app or API response and paste it into the input." },
    { name: "View decoded sections", text: "The header, payload, and signature are decoded and displayed in readable JSON." },
    { name: "Check expiry and claims", text: "Expiry time, issued-at, and standard claims are highlighted - your token never leaves your browser." },
  ],
  "sql-formatter": [
    { name: "Paste your SQL query", text: "Copy raw or minified SQL and paste it into the input area." },
    { name: "Choose Beautify or Minify", text: "Click Beautify for auto-indented, keyword-uppercased output, or Minify to compress." },
    { name: "Copy the formatted SQL", text: "Click Copy to use the result - works for MySQL, PostgreSQL, SQLite, and SQL Server." },
  ],
  "image-to-base64": [
    { name: "Upload your image", text: "Click to upload a PNG, JPG, GIF, SVG, or WebP file - it never leaves your browser." },
    { name: "Choose output format", text: "Select Data URL, CSS background, img tag, or raw Base64." },
    { name: "Copy the result", text: "Click Copy to use the encoded string directly in your HTML or CSS." },
  ],
  "css-gradient-generator": [
    { name: "Choose gradient type", text: "Select Linear, Radial, or Conic gradient." },
    { name: "Add color stops and adjust settings", text: "Pick colors for each stop, drag to reorder, and set angle or position." },
    { name: "Copy your CSS", text: "Click Copy CSS or Copy Tailwind to get the value ready to paste into your code." },
  ],
  "slug-generator": [
    { name: "Paste your titles", text: "Enter one title per line - paste a full list for bulk conversion." },
    { name: "Configure options", text: "Choose separator (hyphen or underscore), max length, and whether to strip stop words." },
    { name: "Copy the slugs", text: "Click Copy All to get all slugs at once, or copy individual ones from the list." },
  ],
  "favicon-generator": [
    { name: "Choose a source", text: "Select Text (enter 1-2 characters), Emoji (pick from the selector), or Image (upload your own)." },
    { name: "Preview across sizes", text: "See your favicon rendered at 16, 32, 48, 64, 128, 180, 192, and 512px." },
    { name: "Download and install", text: "Download the PNG files and copy the HTML link tags to add them to your site's head." },
  ],
  "uuid-generator": [
    { name: "Choose version and quantity", text: "Select UUID v4 (random) or v7 (time-ordered) and set how many to generate (up to 1000)." },
    { name: "Configure format", text: "Toggle uppercase, no-hyphens, or brace-wrapped output as needed." },
    { name: "Copy or download", text: "Click Copy All to get the UUIDs, or Download to save them as a text file." },
  ],
  "color-converter": [
    { name: "Enter a color value", text: "Type a HEX, RGB, HSL, RGBA, or HSLA value in any format, or use the color picker." },
    { name: "View instant conversions", text: "All equivalent color formats update instantly as you type." },
    { name: "Copy the format you need", text: "Click Copy next to any format to grab the value for your CSS or design tool." },
  ],
  "ai-note-summarizer": [
    { name: "Paste your notes", text: "Copy lecture notes, a textbook chapter, or any study material and paste it into the input." },
    { name: "Choose output type", text: "Select bullet summary, key terms, flashcards, or self-check quiz." },
    { name: "Copy or save the output", text: "Review the generated content and copy it to your note-taking app or revision document." },
  ],
  "ai-flashcard-generator": [
    { name: "Enter a topic or study material", text: "Type a subject like 'photosynthesis' or paste a passage of text." },
    { name: "Set the number of cards", text: "Choose how many flashcards to generate (up to 50)." },
    { name: "Export to Anki", text: "Download your flashcards as Anki-compatible CSV or JSON for spaced repetition practice." },
  ],
  "ai-essay-outliner": [
    { name: "Enter your essay topic and style", text: "Type your essay question and choose APA, MLA, Chicago, or Harvard citation style." },
    { name: "Click Generate outline", text: "The AI creates a structured outline with thesis, hook, sectioned arguments, and word targets." },
    { name: "Copy your plan", text: "Copy the full outline to start writing - evidence ideas and source suggestions are included." },
  ],
  "ai-citation-generator": [
    { name: "Paste a URL, DOI, or ISBN", text: "Enter the source reference - URL for web pages, DOI for journal articles, or ISBN for books." },
    { name: "Choose your citation format", text: "Select APA, MLA, Chicago, Harvard, or IEEE." },
    { name: "Copy the citation", text: "Get both the full reference entry and the in-text citation version in one click." },
  ],
  "ai-paraphraser": [
    { name: "Paste the text you want to rewrite", text: "Copy a paragraph from your essay, article, or notes and paste it in." },
    { name: "Choose a tone", text: "Select Academic (formal scholarly language), Formal (professional), or Casual (plain and conversational)." },
    { name: "Copy your preferred version", text: "Three rewritten alternatives are generated - copy the one that fits best." },
  ],
  "ai-cover-letter": [
    { name: "Paste your resume and the job description", text: "Copy your resume text and the full job posting into their respective input areas." },
    { name: "Choose a letter tone", text: "Select Professional, Enthusiastic, or Concise depending on the company culture." },
    { name: "Copy the cover letter", text: "Review the tailored output and copy it directly into your job application." },
  ],
};

export function getToolHowToSteps(slug: string): HowToStep[] {
  return toolHowToSteps[slug] ?? [];
}

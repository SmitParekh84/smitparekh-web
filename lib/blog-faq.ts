/**
 * Extracts FAQ question/answer pairs from a blog post's markdown content.
 *
 * Posts written via the blog-generation prompt include a "## FAQ" section with
 * "### Q: … / A: …" pairs. That content is rendered visible on the page (only
 * the Key Takeaways block is stripped before render), so deriving FAQPage
 * JSON-LD from it is Google-compliant — no hidden/markup-only FAQ.
 *
 * Returns [] when there is no confident FAQ section (fewer than 2 clean pairs),
 * so the caller can skip emitting FAQPage schema for posts without one.
 */
export function extractBlogFaqs(content: string): { q: string; a: string }[] {
  if (!content) return [];
  const lines = content.split(/\r?\n/);

  // Find the FAQ section heading ("## FAQ", "### FAQs", "## Frequently Asked Questions").
  const startIdx = lines.findIndex((l) =>
    /^#{2,3}\s*(?:FAQs?|Frequently\s+Asked\s+Questions)\b/i.test(l.trim())
  );
  if (startIdx === -1) return [];

  // Collect lines until the next H2 (questions are H3, so an H2 ends the FAQ).
  const body: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (/^##\s+(?!#)/.test(lines[i])) break;
    body.push(lines[i]);
  }

  const faqs: { q: string; a: string }[] = [];
  let q: string | null = null;
  let a: string[] = [];

  const flush = () => {
    if (q && a.length) {
      const question = cleanup(q);
      const answer = cleanup(a.join(" "));
      if (question && answer) faqs.push({ q: question, a: answer });
    }
    q = null;
    a = [];
  };

  for (const raw of body) {
    const line = raw.trim();
    if (!line) continue;

    const aInline = line.match(/^(?:\*\*)?A[:.]\s*(?:\*\*)?\s*(.+)$/i);
    if (aInline) {
      a.push(aInline[1]);
      continue;
    }

    // Inline question: "Q: …", "**Q:** …", "**Q1: …**", "Q2. …" (number optional).
    const qInline = line.match(/^(?:\*\*)?Q\d*\s*[:.]\s*(.+)$/i);
    if (qInline) {
      flush();
      q = qInline[1];
      continue;
    }

    // Heading-style question: "### Q: …", "### Q1: …", or "### How do I …?"
    const heading = line.match(/^#{2,4}\s+(.+?)\s*$/);
    if (heading) {
      flush();
      q = heading[1].replace(/^(?:\*\*)?Q\d*\s*[:.]\s*(?:\*\*)?\s*/i, "");
      continue;
    }

    // Otherwise it's a continuation line of the current answer.
    if (q) a.push(line);
  }
  flush();

  return faqs.length >= 2 ? dedupe(faqs) : [];
}

function cleanup(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/\*\*/g, "")
    .replace(/^["'“”]+|["'“”]+$/g, "")
    .trim();
}

function dedupe(faqs: { q: string; a: string }[]): { q: string; a: string }[] {
  const seen = new Set<string>();
  return faqs.filter((f) => {
    const key = f.q.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

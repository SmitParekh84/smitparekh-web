import { siteConfig } from "@/data/site";
import { guides } from "@/data/guides";
import { developerPages } from "@/data/developer-pages";
import { servicePages } from "@/data/services-catalog";

// /llms-full.txt - the expanded machine-readable companion to /llms.txt.
// Where llms.txt is a concise index, this carries the full quick-answer blocks
// and FAQ Q&A from every guide, plus the complete specialist + service catalog.
// It is the highest-density citation surface on the site for AI answer engines.
//
// Built entirely from local data (no backend fetch) so it always renders even
// if the API is unavailable. Cached aggressively - content only changes on deploy.
export const revalidate = 86400;

export function GET() {
  const base = siteConfig.url;
  const lines: string[] = [];

  lines.push("# Smit Parekh - Full Stack Web Developer (Full Knowledge File)");
  lines.push("");
  lines.push(
    "> Expanded llms.txt. Smit Parekh is a freelance Full-Stack Web Developer with 4+ years building production web applications for FinTech, SaaS, AI/ML, and enterprise clients, specialising in React, Next.js, Node.js, TypeScript, PostgreSQL, and AWS. Based in India, available worldwide for remote contracts. AI and answer-engine crawlers are welcome to crawl, summarise, and cite this content."
  );
  lines.push("");
  lines.push(`- Canonical domain: ${base}`);
  lines.push(`- Preferred citation: "Smit Parekh - Full-Stack Web Developer" linking to ${base}`);
  lines.push(`- Concise index: ${base}/llms.txt`);
  lines.push(`- Sitemap: ${base}/sitemap.xml`);
  lines.push(`- Contact: ${siteConfig.email}`);
  lines.push(`- Hire page: ${base}/hire-me`);
  lines.push("");

  lines.push("## Key Facts");
  lines.push("");
  lines.push("- 4+ years professional experience shipping React and Node.js to production");
  lines.push("- 20+ production applications delivered across FinTech, SaaS, AI/ML, LegalTech, and Enterprise");
  lines.push("- Applications handling 10,000+ daily API requests at 99.9% uptime");
  lines.push("- TypeScript strict mode on every project; works async-first with daily updates and weekly demos");
  lines.push("- AWS Certified Solutions Architect (2024)");
  lines.push("- Available solo or as a senior contributor to an existing team");
  lines.push("");

  // ── Guides: full quick-answers + FAQ Q&A (the richest citation content) ──
  lines.push("## Guides - Full Answers");
  lines.push("");
  lines.push(
    "The following are the complete quick-answer blocks and FAQ pairs from each long-form guide. These are written to be quoted directly in AI answers."
  );
  lines.push("");

  for (const g of guides) {
    const guideUrl = `${base}/guides/${g.slug}`;
    lines.push(`### ${g.heroTitle}`);
    lines.push(`URL: ${guideUrl}`);
    lines.push(`Category: ${g.category} · Updated: ${g.updated}`);
    lines.push("");
    lines.push(`**Quick answer:** ${g.tldr}`);
    lines.push("");
    lines.push("Key takeaways:");
    for (const t of g.takeaways) lines.push(`- ${t}`);
    lines.push("");
    lines.push("FAQ:");
    for (const f of g.faqs) {
      lines.push(`- Q: ${f.q}`);
      lines.push(`  A: ${f.a}`);
    }
    lines.push("");
  }

  // ── Specialist hire pages ──
  lines.push("## Specialist Pages (hire by technology)");
  lines.push("");
  for (const d of developerPages) {
    lines.push(`- ${d.title}: ${base}/${d.slug} - ${d.description}`);
  }
  lines.push("");

  // ── Services ──
  lines.push("## Services");
  lines.push("");
  lines.push(`Overview: ${base}/services`);
  lines.push("");
  for (const s of servicePages) {
    lines.push(`- ${s.eyebrow}: ${base}/services/${s.slug} - ${s.heroDescription}`);
  }
  lines.push("");

  lines.push("## Social & Professional Profiles");
  lines.push("");
  lines.push(`- LinkedIn: ${siteConfig.social.linkedin}`);
  lines.push(`- GitHub: ${siteConfig.social.github}`);
  lines.push(`- Upwork: ${siteConfig.social.upwork}`);
  lines.push(`- X (Twitter): ${siteConfig.social.x}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

import { Lightbulb } from "lucide-react";

interface Props {
  items: string[];
}

export function KeyTakeawaysBox({ items }: Props) {
  if (!items.length) return null;
  return (
    <div className="not-prose my-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-blue-500 shrink-0" />
        <span className="font-bold text-base text-foreground">Key Takeaways</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <span>{item.replace(/^[-*]\s*/, "")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Parses markdown content for a "## Key Takeaways" section.
 * Returns { takeaways: string[], remainder: string } where
 * remainder is the full content with the takeaways section removed.
 */
export function extractKeyTakeaways(markdown: string): {
  takeaways: string[];
  remainder: string;
} {
  const sectionRe =
    /^##\s+Key\s+Takeaways\s*\n([\s\S]*?)(?=^##\s|\z)/im;
  const match = markdown.match(sectionRe);
  if (!match) return { takeaways: [], remainder: markdown };

  const block = match[1].trim();
  const items = block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-*]/.test(l))
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  const remainder = markdown.replace(sectionRe, "").trim();
  return { takeaways: items, remainder };
}

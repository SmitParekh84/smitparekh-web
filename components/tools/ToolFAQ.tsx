import type { ToolFAQItem } from "@/data/tools-faq";

interface Props {
  faqs: ToolFAQItem[];
  toolName: string;
}

export default function ToolFAQ({ faqs, toolName }: Props) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">FAQ</p>
          <h2 className="text-2xl font-bold tracking-tight">
            {toolName} — Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Everything you need to know before you start.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((item, i) => (
            <details
              key={i}
              open={i === 0}
              className="group rounded-xl border border-border bg-card open:border-blue-500/40 transition-colors"
            >
              <summary className="flex items-center justify-between w-full px-5 py-4 cursor-pointer list-none select-none hover:text-blue-500 transition-colors">
                <span className="font-medium text-sm pr-4 leading-snug">{item.question}</span>
                <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-open:rotate-45"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { ToolContent } from "@/data/tools-content";

interface Props {
  content: ToolContent;
  toolName: string;
}

export default function ToolHowItWorks({ content, toolName }: Props) {
  return (
    <section className="page-container pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
            How It Works
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Using {toolName} in 3 Steps
          </h2>
        </div>

        <div className="space-y-4">
          {content.howItWorks.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-blue-500/30 transition-colors"
            >
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 font-bold text-sm mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
              Use Cases
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Who Uses {toolName}?
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {content.useCases.map((uc, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 hover:border-blue-500/30 transition-colors"
              >
                <p className="font-semibold text-sm mb-2">{uc.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

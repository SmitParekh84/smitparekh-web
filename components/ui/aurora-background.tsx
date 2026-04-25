import { cn } from "@/lib/utils";

type AuroraTag = "div" | "section" | "article" | "main";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  as?: AuroraTag;
}

export function AuroraBackground({
  children,
  className,
  as: Tag = "div",
}: AuroraBackgroundProps) {
  return (
    <Tag className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Primary blob — electric blue */}
        <div
          className="absolute -top-[10%] -left-[15%] h-[min(50vh,520px)] w-[min(60vw,720px)] rounded-full bg-blue-500 opacity-20 blur-[90px] dark:opacity-[0.28]"
          style={{ animation: "aurora-float 20s ease-in-out infinite alternate" }}
        />
        {/* Secondary blob — aqua cyan */}
        <div
          className="absolute -bottom-[15%] -right-[10%] h-[min(45vh,460px)] w-[min(55vw,620px)] rounded-full bg-cyan-400 opacity-[0.14] blur-[80px] dark:opacity-[0.20]"
          style={{
            animation: "aurora-float 25s ease-in-out infinite alternate-reverse",
          }}
        />
        {/* Tertiary blob — material blue */}
        <div
          className="absolute top-[30%] left-[35%] h-[min(40vh,360px)] w-[min(40vw,460px)] rounded-full bg-sky-500 opacity-10 blur-[100px] dark:opacity-[0.16]"
          style={{
            animation: "aurora-float 18s ease-in-out infinite alternate",
            animationDelay: "-8s",
          }}
        />
      </div>
      {children}
    </Tag>
  );
}

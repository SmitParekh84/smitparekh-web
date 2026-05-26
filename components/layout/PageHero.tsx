import { Sparkles, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon = Sparkles,
  align = "left",
  children,
}: PageHeroProps) {
  const isCenter = align === "center";
  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      {/* Soft glow accents */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div
        className={
          "page-container relative " +
          (isCenter ? "text-center max-w-3xl mx-auto" : "")
        }
      >
        <Badge
          variant="secondary"
          className="bg-white/15 text-white border-white/30 backdrop-blur-sm mb-4"
        >
          <Icon className="w-3 h-3 mr-1" /> {eyebrow}
        </Badge>
        <h1
          className={
            "text-3xl sm:text-5xl font-bold tracking-tight " +
            (isCenter ? "mx-auto max-w-3xl" : "max-w-3xl")
          }
        >
          {title}
        </h1>
        {description && (
          <p
            className={
              "mt-4 text-base sm:text-lg text-white/85 leading-relaxed " +
              (isCenter ? "mx-auto max-w-2xl" : "max-w-2xl")
            }
          >
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export default PageHero;

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonials, type Testimonial } from "@/data/testimonials";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 w-[300px] sm:w-[360px] shrink-0">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < t.rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>

      <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-5">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-2 border-t border-border">
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br text-white text-xs font-bold shrink-0",
            t.avatarColor
          )}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  return (
    <div
      className="flex w-max"
      style={{
        animation: `${reverse ? "marquee-reverse" : "marquee"} 80s linear infinite`,
        willChange: "transform",
      }}
    >
      <ul className="flex shrink-0 gap-4 sm:gap-5 pr-4 sm:pr-5 list-none m-0 p-0">
        {items.map((t) => (
          <li key={`a-${t.id}`}>
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
      <ul
        aria-hidden="true"
        className="flex shrink-0 gap-4 sm:gap-5 pr-4 sm:pr-5 list-none m-0 p-0"
      >
        {items.map((t) => (
          <li key={`b-${t.id}`}>
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <section className="page-section overflow-hidden">
      <div className="page-container">
        <SectionHeader
          label="Client Results"
          title="Trusted by Founders & Teams"
          description="Hear directly from the businesses I've partnered with."
        />

        <div
          className="flex flex-col gap-5 hover:[&>div>div]:[animation-play-state:paused]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <TestimonialRow items={row1} />
          <TestimonialRow items={row2} reverse />
        </div>
      </div>
    </section>
  );
}

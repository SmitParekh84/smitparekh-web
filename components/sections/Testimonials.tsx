import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="page-section">
      <div className="page-container">
        <SectionHeader
          label="Client Results"
          title="Trusted by Founders & Teams"
          description="Hear directly from the businesses I've partnered with."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>

              <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br text-white text-xs font-bold shrink-0",
                    testimonial.avatarColor
                  )}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

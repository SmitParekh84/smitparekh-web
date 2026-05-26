import type { Metadata } from "next";
import { CalendarClock, Clock, Video, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { InlineCalEmbed } from "@/components/cal/InlineCalEmbed";
import { siteConfig } from "@/data/site";
import { CAL } from "@/lib/cal";

export const metadata: Metadata = {
  title: "Book a 15-min call",
  description:
    "Pick a 15-minute slot to discuss your project — scope, timeline, and tech recommendations. No commitment, free of charge.",
  alternates: { canonical: `${siteConfig.url}/book` },
  openGraph: {
    title: "Book a 15-min call with Smit Parekh",
    description:
      "Pick a 15-minute slot to discuss your project — scope, timeline, and tech recommendations.",
    url: `${siteConfig.url}/book`,
  },
  robots: { index: true, follow: true },
};

const perks = [
  { icon: Clock, label: "15 minutes", sub: "Short and focused" },
  { icon: Video, label: "Cal Video", sub: "Auto-generated link" },
  { icon: ShieldCheck, label: "No commitment", sub: "Free discovery call" },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Schedule a Call"
        icon={CalendarClock}
        title={<>Book a 15-min discovery call</>}
        description="Pick a slot that works for you. We'll talk through your project goals, timeline and tech choices — no commitment, no sales pitch."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <InlineCalEmbed />
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Trouble with the embed?{" "}
            <a
              href={CAL.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Open the booking page directly
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

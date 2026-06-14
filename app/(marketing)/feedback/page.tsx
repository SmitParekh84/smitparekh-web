import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import FeedbackClientPage from "./_client";

export const metadata: Metadata = {
  title: "Feedback & Bug Reports",
  description:
    "Share your feedback or report a bug on Smit Parekh's portfolio tools. All submissions are reviewed personally.",
  alternates: { canonical: `${siteConfig.url}/feedback` },
  openGraph: {
    title: "Feedback & Bug Reports | Smit Parekh",
    description:
      "Help improve the tools — share feedback or report a bug. No login required.",
    url: `${siteConfig.url}/feedback`,
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-feedback.png`,
        width: 1200,
        height: 630,
        alt: "Feedback & Bug Reports — Smit Parekh",
      },
    ],
  },
};

export default function FeedbackPage() {
  return (
    <>
      <PageHero
        eyebrow="Feedback & Bug Reports"
        title="Help make the site better"
        description="Share ideas, report bugs, or rate your experience. Every submission is read personally — no bots, no filters."
        icon={MessageSquare}
        align="center"
      />
      <FeedbackClientPage />
    </>
  );
}

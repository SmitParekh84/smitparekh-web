import type { Metadata } from "next";
import ResumeViewer from "@/components/sections/ResumeViewer";
import { siteConfig } from "@/data/site";

const RESUME_PDF_PATH = "/Smit_Parekh_FullStack.pdf";
const RESUME_FILE_NAME = "Smit_Parekh_FullStack.pdf";

export const metadata: Metadata = {
  title: "Resume - Smit Parekh",
  description:
    "View the resume of Smit Parekh - Full Stack Developer. React, Node.js, TypeScript, AWS.",
  alternates: { canonical: `${siteConfig.url}/resume` },
  openGraph: {
    title: "Resume - Smit Parekh",
    description:
      "View the resume of Smit Parekh - Full Stack Developer. React, Node.js, TypeScript, AWS.",
    type: "profile",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-resume.png`,
        width: 1200,
        height: 630,
        alt: "Resume — Smit Parekh, Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Smit Parekh",
    description:
      "View the resume of Smit Parekh - Full Stack Developer. React, Node.js, TypeScript, AWS.",
    images: [`${siteConfig.url}/images/smit-parekh-resume.png`],
  },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-20">
      <ResumeViewer pdfPath={RESUME_PDF_PATH} fileName={RESUME_FILE_NAME} />
    </main>
  );
}

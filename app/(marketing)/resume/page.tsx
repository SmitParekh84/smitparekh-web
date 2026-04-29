import type { Metadata } from "next";
import ResumeViewer from "@/components/sections/ResumeViewer";

const RESUME_PDF_PATH = "/Smit_Parekh_FullStack.pdf";
const RESUME_FILE_NAME = "Smit_Parekh_FullStack.pdf";

export const metadata: Metadata = {
  title: "Resume - Smit Parekh",
  description:
    "View the resume of Smit Parekh - Full Stack Developer. React, Node.js, TypeScript, AWS.",
  openGraph: {
    title: "Resume - Smit Parekh",
    description:
      "View the resume of Smit Parekh - Full Stack Developer. React, Node.js, TypeScript, AWS.",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Resume - Smit Parekh",
    description:
      "View the resume of Smit Parekh - Full Stack Developer. React, Node.js, TypeScript, AWS.",
  },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-20">
      <ResumeViewer pdfPath={RESUME_PDF_PATH} fileName={RESUME_FILE_NAME} />
    </main>
  );
}

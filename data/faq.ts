export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "I offer full-stack web development (React + Node.js + TypeScript), database design, cloud deployment on AWS, technical SEO, and digital marketing strategy. Whether you need a complete application, API, or growth support - I can deliver end-to-end.",
  },
  {
    question: "Are the free tools really free?",
    answer:
      "Yes - 100% free. No account, no subscription, no hidden fees. Every tool on this site is available to anyone, instantly, with no limits on usage.",
  },
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "I typically respond within 24 hours on business days. For urgent matters, mention it in your message and I will prioritise your request.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. I work with clients globally and adapt to different time zones for meetings and collaboration. Geographic location is never a barrier.",
  },
  {
    question: "What is your project process like?",
    answer:
      "Initial consultation → proposal → planning → development → review cycles → final delivery with support options. Every step is collaborative and you are kept updated throughout.",
  },
  {
    question: "What happens to data uploaded to your tools?",
    answer:
      "Your data is processed securely and never stored permanently on our servers. Files are deleted immediately after processing. Privacy is a core principle of every tool we build.",
  },
];

import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";

const LAST_UPDATED = "April 28, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy - Smit Parekh",
  description:
    "How Smit Parekh collects, uses, and protects your data on smitparekh.co.in - including contact form submissions, free tools usage, and analytics.",
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/privacy-policy`,
    title: "Privacy Policy - Smit Parekh",
    description:
      "How Smit Parekh collects, uses, and protects your data on smitparekh.co.in - including contact form submissions, free tools usage, and analytics.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Privacy Policy - Smit Parekh",
    description:
      "How Smit Parekh collects, uses, and protects your data on smitparekh.co.in - including contact form submissions, free tools usage, and analytics.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - Full Stack Developer",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        icon={ShieldCheck}
        title="Privacy Policy"
        description={`How I handle your data on ${siteConfig.url.replace("https://", "")}. Last updated: ${LAST_UPDATED}.`}
      />

      <section className="page-section">
        <div className="page-container max-w-3xl">
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-blue-500 hover:prose-a:underline">
            <p>
              This Privacy Policy describes how Smit Parekh (&quot;I&quot;,
              &quot;me&quot;) collects, uses, and protects information when you
              visit{" "}
              <a href={siteConfig.url} target="_blank" rel="noopener noreferrer">
                {siteConfig.url}
              </a>{" "}
              (the &quot;Site&quot;) or use the free tools and contact features
              provided.
            </p>

            <h2>1. Information I Collect</h2>
            <h3>Information you provide</h3>
            <ul>
              <li>
                <strong>Contact form:</strong> name, email address, subject, and
                the message you write.
              </li>
              <li>
                <strong>Newsletter / blog:</strong> if you subscribe, your email
                address.
              </li>
              <li>
                <strong>Free tools:</strong> some tools (e.g. background
                remover, resume checker) accept files or text you upload. These
                are processed to deliver the result and are not retained beyond
                the request unless explicitly stated.
              </li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Usage data:</strong> pages visited, referrer, approximate
                location (country/region), device type, browser, and timestamps.
              </li>
              <li>
                <strong>Cookies &amp; similar technologies:</strong> for
                essential session state, preference storage (e.g. theme), and
                privacy-friendly analytics.
              </li>
            </ul>

            <h2>2. How I Use Information</h2>
            <ul>
              <li>To respond to enquiries you submit through the contact form.</li>
              <li>To deliver requested results from the free tools.</li>
              <li>To improve the Site, fix bugs, and understand which content is useful.</li>
              <li>To prevent abuse, spam, and malicious activity.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h2>3. Legal Basis (GDPR)</h2>
            <p>
              If you are in the European Economic Area or the UK, the legal
              basis for processing your data is one of: your consent, the
              performance of a service you requested, my legitimate interest in
              operating the Site, or compliance with a legal obligation.
            </p>

            <h2>4. Sharing &amp; Third Parties</h2>
            <p>
              I do not sell your personal data. I share data only with service
              providers who help operate the Site, including:
            </p>
            <ul>
              <li>Hosting and CDN providers (e.g. Vercel, Render, AWS).</li>
              <li>Email delivery providers used for contact-form replies.</li>
              <li>Image storage and transformation (e.g. Cloudinary).</li>
              <li>Privacy-friendly analytics.</li>
              <li>AI providers used by certain free tools (input is processed only to return the result).</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              Contact-form messages are retained as long as needed to respond
              and follow up on the project, then archived or deleted. Files you
              upload to free tools are processed in-memory or in temporary
              storage and removed once the result is returned.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on where you live, you may have the right to access,
              correct, export, or delete the personal data I hold about you, and
              to object to or restrict certain processing. To exercise any of
              these rights, email{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>7. Cookies</h2>
            <p>
              The Site uses a small number of cookies for essential
              functionality (e.g. theme preference, anti-spam) and aggregate
              analytics. You can disable cookies in your browser settings; some
              features may not work as expected.
            </p>

            <h2>8. Security</h2>
            <p>
              I use industry-standard measures (HTTPS, hashed credentials,
              least-privilege access) to protect your data. No method of
              transmission over the internet is 100% secure, and I cannot
              guarantee absolute security.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              The Site is not directed at children under 13, and I do not
              knowingly collect personal data from them.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time. Material
              changes will be reflected by updating the &quot;Last updated&quot;
              date at the top of this page.
            </p>

            <h2>11. Contact</h2>
            <p>
              Questions about this policy? Reach me at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or
              via the{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </article>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-blue-500/10">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Privacy questions?</p>
                <p className="text-xs text-muted-foreground">
                  I usually reply within 24 hours.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

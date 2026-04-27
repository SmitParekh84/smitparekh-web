import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";

const LAST_UPDATED = "April 28, 2026";

export const metadata: Metadata = {
  title: "Terms of Service — Smit Parekh",
  description:
    "Terms governing your use of smitparekh.co.in, including the free tools, blog, and contact features.",
  alternates: { canonical: `${siteConfig.url}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        icon={ScrollText}
        title="Terms of Service"
        description={`The rules that apply when you use ${siteConfig.url.replace("https://", "")}. Last updated: ${LAST_UPDATED}.`}
      />

      <section className="page-section">
        <div className="page-container max-w-3xl">
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-blue-500 hover:prose-a:underline">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to
              and use of{" "}
              <a href={siteConfig.url} target="_blank" rel="noopener noreferrer">
                {siteConfig.url}
              </a>{" "}
              (the &quot;Site&quot;), operated by Smit Parekh. By using the
              Site, you agree to these Terms. If you do not agree, please do not
              use the Site.
            </p>

            <h2>1. Use of the Site</h2>
            <p>
              You may use the Site for lawful, personal, and business purposes.
              You agree not to:
            </p>
            <ul>
              <li>Use the Site in a way that violates any applicable law or regulation.</li>
              <li>Attempt to gain unauthorised access to any part of the Site, its servers, or related infrastructure.</li>
              <li>Interfere with or disrupt the Site, including by sending automated requests at unreasonable rates, scraping content, or running denial-of-service attacks.</li>
              <li>Upload content that is illegal, harmful, infringing, or that you do not have the right to share.</li>
              <li>Reverse-engineer, decompile, or otherwise attempt to extract the source code of the Site or its tools beyond what is permitted by law.</li>
            </ul>

            <h2>2. Free Tools</h2>
            <p>
              The Site offers free browser-based tools (e.g. background remover,
              QR code generator, resume checker). These tools are provided
              &quot;as is&quot; without warranty of any kind. You are
              responsible for the content you upload, and you confirm that you
              have the right to process it.
            </p>
            <p>
              Some tools may use third-party AI providers to generate output. By
              using them, you accept that your input may be transmitted to those
              providers solely to produce the result.
            </p>

            <h2>3. Content &amp; Intellectual Property</h2>
            <p>
              All original content on the Site — including blog articles,
              copy, graphics, code samples, and tool interfaces — is owned by
              Smit Parekh and protected by copyright and other intellectual
              property laws.
            </p>
            <ul>
              <li>You may quote short excerpts of blog content with proper attribution and a link back to the original article.</li>
              <li>You may not republish substantial portions of the content without prior written permission.</li>
              <li>Code snippets shared in articles are licensed under the MIT License unless explicitly stated otherwise.</li>
            </ul>

            <h2>4. User Submissions</h2>
            <p>
              When you submit content (e.g. through the contact form, comments
              on tools, or files for processing), you grant me a limited,
              non-exclusive license to use that content solely to deliver the
              service you requested. You retain ownership of your content.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites or services.
              These are provided for convenience only — I do not control and am
              not responsible for the content, policies, or practices of those
              third parties.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              The Site and its tools are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis, without warranties of any kind,
              either express or implied. I do not warrant that the Site will be
              uninterrupted, error-free, secure, or free of viruses or other
              harmful components.
            </p>
            <p>
              Information shared on the blog reflects my opinions and experience
              at the time of writing. It does not constitute professional,
              legal, or financial advice.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Smit Parekh shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, revenue, data, or
              goodwill arising from your use of the Site.
            </p>

            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Smit Parekh from any
              claims, damages, or expenses (including reasonable legal fees)
              arising from your use of the Site, your violation of these Terms,
              or your violation of any rights of a third party.
            </p>

            <h2>9. Termination</h2>
            <p>
              I reserve the right to suspend or terminate your access to the
              Site at any time, without notice, for conduct that I believe
              violates these Terms or is harmful to other users, to me, or to
              third parties.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              I may update these Terms from time to time. Continued use of the
              Site after changes are posted constitutes your acceptance of the
              revised Terms. The &quot;Last updated&quot; date at the top of
              this page reflects the most recent revision.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of India, without regard to its conflict of laws provisions.
              Any dispute arising under these Terms shall be subject to the
              exclusive jurisdiction of the courts located in Gujarat, India.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these Terms? Reach me at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or
              via the <Link href="/contact">contact page</Link>.
            </p>
          </article>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-blue-500/10">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Have a legal question?</p>
                <p className="text-xs text-muted-foreground">
                  Drop me a line — I usually reply within 24 hours.
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

import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";

const LAST_UPDATED = "May 4, 2026";

export const metadata: Metadata = {
  title: "Terms of Service - Smit Parekh",
  description:
    "Terms governing your use of smitparekh.co.in - including the free tools, user accounts, blog, freelance development services, and student project services.",
  alternates: { canonical: `${siteConfig.url}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/terms`,
    title: "Terms of Service - Smit Parekh",
    description:
      "Terms governing your use of smitparekh.co.in - including free tools, user accounts, blog, freelance services, and student project services.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Terms of Service - Smit Parekh",
    description:
      "Terms governing your use of smitparekh.co.in - free tools, user accounts, freelance services, and student project services.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh - Full Stack Developer",
      },
    ],
  },
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
              Site - including the free tools, user account, blog, or any
              enquiry or engagement with my freelance or student project
              services - you agree to these Terms. If you do not agree, please
              do not use the Site.
            </p>

            <h2>1. General Use of the Site</h2>
            <p>
              You may use the Site for lawful personal and business purposes.
              You agree not to:
            </p>
            <ul>
              <li>Use the Site in a way that violates any applicable law or regulation.</li>
              <li>Attempt to gain unauthorised access to any part of the Site, its servers, or related infrastructure.</li>
              <li>Interfere with or disrupt the Site by sending automated requests at unreasonable rates, scraping content at scale, or running denial-of-service attacks.</li>
              <li>Upload content that is illegal, harmful, infringing, or that you do not have the right to share.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
              <li>Circumvent or attempt to circumvent any usage quotas, rate limits, or access controls.</li>
            </ul>

            <h2>2. Free Tools</h2>

            <h3>2.1 Availability and &quot;as is&quot; basis</h3>
            <p>
              The Site provides free browser-based tools including, without
              limitation, a background remover, ATS resume checker, QR code
              generator, JSON formatter, base64 encoder/decoder, and SEO
              analyzer. These tools are provided &quot;as is&quot; and
              &quot;as available&quot; without warranty of any kind. I do not
              guarantee that any tool will be error-free, uninterrupted, or
              produce accurate results in all cases.
            </p>

            <h3>2.2 Usage limits and quotas</h3>
            <p>
              To ensure fair access, tool usage is subject to daily limits:
            </p>
            <ul>
              <li><strong>Guest users (no account):</strong> up to 3 uses per tool per day, tracked via a hashed session identifier.</li>
              <li><strong>Signed-in users:</strong> up to 30 uses per tool per day, tracked by user account.</li>
            </ul>
            <p>
              These limits may be adjusted at any time without prior notice.
              Attempting to circumvent quotas - including by using VPNs, proxy
              services, or creating multiple accounts - is a violation of these
              Terms and may result in access being suspended.
            </p>

            <h3>2.3 Your uploaded content</h3>
            <p>
              You are solely responsible for the content you upload to the
              tools. By uploading content, you confirm that: (a) you have the
              right to process it; (b) the content does not violate any
              applicable law or third-party rights; and (c) the content is not
              obscene, defamatory, or otherwise harmful.
            </p>
            <p>
              Files you upload are processed to generate the requested result
              and are deleted immediately afterwards. They are not stored,
              reviewed, or used for any other purpose.
            </p>

            <h3>2.4 AI-powered tools</h3>
            <p>
              Some tools use AI models to generate output (e.g. background
              removal, ATS resume scoring, LinkedIn post generation). By using
              these tools, you accept that your input may be transmitted to a
              third-party AI provider or a self-hosted AI inference service
              solely to produce the result. Outputs are generated automatically
              and may not always be accurate - treat them as assistance, not as
              professional advice.
            </p>

            <h3>2.5 Use of tool outputs</h3>
            <p>
              Outputs generated by the free tools - including processed images,
              generated text, formatted code, and analysis results - may be
              used freely for both personal and commercial purposes. No
              attribution is required.
            </p>

            <h2>3. User Accounts</h2>

            <h3>3.1 Account creation</h3>
            <p>
              You may create a free account by signing in with Google. By doing
              so, you authorise the Site to receive your Google account email
              address, display name, and unique Google identifier via Supabase
              Auth. You must be at least 13 years old to create an account.
            </p>

            <h3>3.2 Account responsibility</h3>
            <p>
              You are responsible for all activity that occurs under your
              account. If you believe your account has been compromised, contact
              me immediately at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h3>3.3 Account termination</h3>
            <p>
              I reserve the right to suspend or permanently delete your account
              for violation of these Terms, abuse of the free tools, or any
              conduct that is harmful to the Site or to other users. You may
              also request deletion of your account at any time.
            </p>

            <h2>4. Freelance Development Services</h2>

            <h3>4.1 Scope of services</h3>
            <p>
              I offer freelance full-stack web development services including,
              but not limited to, web application development, API development,
              database design, cloud deployment, technical SEO, and technical
              documentation. Submitting an enquiry or project brief through the
              Site does not create a binding contract. A contract is formed only
              when both parties have agreed on scope, price, and timeline in
              writing (typically via email or a signed proposal).
            </p>

            <h3>4.2 Payment</h3>
            <p>
              Payment terms, milestones, and amounts are agreed in writing
              before work begins. Unless otherwise stated in a project proposal:
            </p>
            <ul>
              <li>A deposit is required before development commences.</li>
              <li>Remaining balance is due upon delivery of the agreed deliverables.</li>
              <li>Invoices unpaid within 14 days of the due date may attract a late fee.</li>
            </ul>

            <h3>4.3 Intellectual property and ownership</h3>
            <p>
              Upon receipt of full payment, you receive full ownership of the
              custom code written specifically for your project. This includes
              source code, database schemas, and deployment configuration
              created exclusively for your engagement.
            </p>
            <p>
              This does not include: third-party libraries, frameworks, or
              packages used in the project (which remain subject to their own
              licences); general-purpose utilities or code that I may use across
              multiple client projects (for which you receive a perpetual,
              royalty-free, non-exclusive licence); or any tools or
              infrastructure provided as a service by third parties.
            </p>

            <h3>4.4 Confidentiality</h3>
            <p>
              I treat all project briefs, business information, and proprietary
              details shared during an engagement as confidential. I will not
              disclose your project details to third parties or reference your
              project publicly without your prior written consent. I am happy to
              sign a mutual NDA before any discovery conversations upon request.
            </p>

            <h3>4.5 Warranties and limitations</h3>
            <p>
              I warrant that work delivered will materially conform to the
              agreed specification at the time of delivery. I do not guarantee
              specific business outcomes (e.g. revenue, search rankings, user
              growth) resulting from the work.
            </p>

            <h2>5. Student Project Services</h2>

            <h3>5.1 Scope of student services</h3>
            <p>
              I offer development services tailored to students, including
              building final year project web applications, personal portfolio
              websites, hackathon projects, startup MVPs, university club
              websites, and technical documentation. These are legitimate
              freelance development services - the deliverables are real,
              working software built to your specification.
            </p>

            <h3>5.2 Acceptable use</h3>
            <p>
              Student project services are intended for legitimate use cases:
              building real software products, building your personal portfolio,
              launching a startup idea, or creating tools and websites for
              student organisations.
            </p>
            <p>
              These services must not be used to produce work that you intend to
              submit as your own academic work to any educational institution in
              violation of that institution&apos;s academic integrity or
              academic honesty policies. I do not provide academic essay writing,
              exam assistance, coursework ghostwriting, or any service
              intended to deceive an educational institution. Any enquiry that
              appears to be for this purpose will be declined.
            </p>

            <h3>5.3 Ownership and source code</h3>
            <p>
              Upon receipt of full payment, you receive full ownership of the
              code written for your project, including the right to study,
              modify, and distribute it. The same intellectual property terms in
              Section 4.3 apply.
            </p>

            <h2>6. Content and Intellectual Property</h2>
            <p>
              All original content on the Site - including blog articles, copy,
              graphics, tool interfaces, and code samples - is owned by Smit
              Parekh and protected by copyright and applicable intellectual
              property laws.
            </p>
            <ul>
              <li>You may quote short excerpts of blog content with proper attribution and a link to the original article.</li>
              <li>You may not republish substantial portions of content without prior written permission.</li>
              <li>Code snippets in blog articles are provided under the MIT Licence unless explicitly stated otherwise.</li>
            </ul>

            <h2>7. User Submissions</h2>
            <p>
              When you submit content through the Site (contact form, feedback
              form, or files for tool processing), you grant me a limited,
              non-exclusive, royalty-free licence to use that content solely to
              deliver the service you requested. You retain ownership of all
              content you submit.
            </p>

            <h2>8. Third-Party Links and Services</h2>
            <p>
              The Site may contain links to third-party websites or services.
              These are provided for convenience only. I do not control and am
              not responsible for the content, privacy policies, or practices of
              any third-party site or service.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>
              Except as expressly stated in a written project agreement, the
              Site and all its tools, content, and services are provided on an
              &quot;as is&quot; and &quot;as available&quot; basis. I disclaim
              all warranties, express or implied, including warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p>
              Blog content and tool outputs reflect information available at the
              time of creation and do not constitute professional, legal,
              financial, or academic advice.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Smit Parekh
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits,
              revenue, data, goodwill, or business opportunities arising out of
              or in connection with your use of the Site, the free tools, or
              any freelance or student project engagement, even if advised of
              the possibility of such damages.
            </p>
            <p>
              Where liability cannot be excluded by law, my total liability to
              you shall not exceed the total fees paid by you to me in the three
              months immediately preceding the event giving rise to the claim,
              or £100 (whichever is greater).
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Smit Parekh
              from and against any claims, damages, losses, and expenses
              (including reasonable legal fees) arising from: (a) your use of
              the Site; (b) your violation of these Terms; (c) your violation of
              any third-party rights; or (d) any content you upload or submit.
            </p>

            <h2>12. Suspension and Termination</h2>
            <p>
              I reserve the right to suspend or terminate your access to the
              Site or any of its features at any time, with or without notice,
              for conduct that violates these Terms or that I determine is
              harmful to other users, to the Site, or to third parties.
            </p>

            <h2>13. Changes to These Terms</h2>
            <p>
              I may revise these Terms from time to time. Continued use of the
              Site after revised Terms are posted constitutes your acceptance of
              the revision. The &quot;Last updated&quot; date at the top of this
              page always reflects the most recent version.
            </p>

            <h2>14. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of India. For users in the
              United Kingdom or European Union, mandatory consumer protection
              rights under local law are not affected by this choice of law.
            </p>
            <p>
              Any dispute shall first be attempted to be resolved informally by
              contacting me at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              If informal resolution fails, disputes shall be subject to the
              jurisdiction of the courts of Gujarat, India, except where
              mandatory local law provides otherwise.
            </p>

            <h2>15. Contact</h2>
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
                  Drop me a line - I usually reply within 24 hours.
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

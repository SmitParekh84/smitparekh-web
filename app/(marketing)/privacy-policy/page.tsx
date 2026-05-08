import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";

const LAST_UPDATED = "May 8, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy - Smit Parekh",
  description:
    "How Smit Parekh collects, uses, and protects your data on smitparekh.co.in — including contact form submissions, free tools usage, user accounts, and freelance client communications.",
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/privacy-policy`,
    title: "Privacy Policy - Smit Parekh",
    description:
      "How Smit Parekh collects, uses, and protects your data on smitparekh.co.in — including contact form submissions, free tools usage, user accounts, and freelance client communications.",
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
    title: "Privacy Policy - Smit Parekh",
    description:
      "How Smit Parekh collects, uses, and protects your data on smitparekh.co.in.",
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
              &quot;me&quot;, &quot;my&quot;) collects, uses, and protects
              information when you visit{" "}
              <a href={siteConfig.url} target="_blank" rel="noopener noreferrer">
                {siteConfig.url}
              </a>{" "}
              (the &quot;Site&quot;), use the free browser-based tools, create a
              user account, or enquire about or engage my freelance development
              services.
            </p>

            <h2>1. Information I Collect</h2>

            <h3>Information you provide directly</h3>
            <ul>
              <li>
                <strong>Contact and enquiry form:</strong> name, email address,
                subject, budget or project description, and any message you
                write. This applies to general enquiries, freelance project
                briefs, and student project enquiries.
              </li>
              <li>
                <strong>User account (Google sign-in):</strong> when you sign
                in with Google via the Site, I receive your Google account email
                address, display name, and a unique Google account identifier.
                No password is stored — authentication is delegated entirely to
                Google via Supabase Auth.
              </li>
              <li>
                <strong>Free tools — file and text uploads:</strong> some tools
                (e.g. background remover, ATS resume checker, image compressor)
                accept files or text you provide. These are processed to produce
                the requested result. Files are deleted immediately after the
                result is returned; text inputs are not retained beyond the
                request.
              </li>
              <li>
                <strong>Feedback submissions:</strong> if you submit feedback
                via the feedback page, I receive your name, email (optional),
                and the content of your feedback.
              </li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Usage data:</strong> pages visited, referrer URL,
                approximate location (country and region only), device type,
                browser, operating system, and timestamps — collected via
                privacy-friendly analytics.
              </li>
              <li>
                <strong>Tool usage and quota tracking:</strong> to enforce daily
                usage limits on the free tools, the Site tracks how many times
                each tool is used per session (for guests) or per user account
                (for signed-in users). For guest sessions, your IP address is
                processed through a one-way SHA-256 hash with a server-side
                salt before being stored. The raw IP address is never logged or
                retained.
              </li>
              <li>
                <strong>Cookies and local storage:</strong> a small number of
                cookies and browser storage items are used for essential
                functionality — session state, dark/light mode preference, and
                authentication tokens. Third-party advertising cookies (Google
                AdSense) are also used to display ads that help keep the tools
                free — see Section 8 for details and opt-out options.
              </li>
            </ul>

            <h2>2. How I Use Information</h2>
            <ul>
              <li>To respond to enquiries and project briefs submitted through the contact form.</li>
              <li>To deliver the requested results from the free tools.</li>
              <li>To maintain and enforce per-user and per-session tool usage quotas.</li>
              <li>To manage your user account and provide access to the personal tools dashboard.</li>
              <li>To communicate about freelance or student project engagements, including scoping, updates, delivery, and support.</li>
              <li>To improve the Site, fix bugs, and understand which tools and content are most useful.</li>
              <li>To prevent abuse, spam, and misuse of the free tools.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>

            <h2>3. Freelance and Student Project Enquiries</h2>
            <p>
              When you submit a project brief — whether for freelance development
              or student project work — the information you provide (project
              description, budget, deadlines, and any supporting materials) is
              treated as confidential. I do not share this information with third
              parties, use it to train AI models, or reference it publicly
              without your prior written consent.
            </p>
            <p>
              For ongoing engagements, project-related communications (emails,
              messages, deliverables) are retained for the duration of the
              project and for a reasonable period thereafter for support and
              reference purposes.
            </p>

            <h2>4. Legal Basis for Processing (GDPR / UK GDPR)</h2>
            <p>
              If you are in the European Economic Area, the United Kingdom, or
              another jurisdiction with equivalent data protection law, my legal
              basis for processing your personal data is one or more of the
              following:
            </p>
            <ul>
              <li><strong>Consent</strong> — where you have actively provided information (e.g. contact form, account creation).</li>
              <li><strong>Contract performance</strong> — to deliver a service you have requested or engaged me to perform.</li>
              <li><strong>Legitimate interests</strong> — to operate, secure, and improve the Site and its tools.</li>
              <li><strong>Legal obligation</strong> — where required by applicable law.</li>
            </ul>

            <h2>5. Sharing and Third Parties</h2>
            <p>
              I do not sell your personal data. I share data only with the
              following service providers who help operate the Site, and only to
              the extent necessary:
            </p>
            <ul>
              <li>
                <strong>Vercel</strong> — hosting and edge network for the
                Site.
              </li>
              <li>
                <strong>Supabase</strong> — user authentication (Google OAuth),
                database (usage quotas, account data), and serverless functions.
                Data is stored in Supabase-managed infrastructure. Supabase is
                SOC 2 compliant.
              </li>
              <li>
                <strong>Resend</strong> — transactional email delivery used to
                send contact form confirmation emails and project update
                notifications. Resend receives your email address solely to
                deliver the email.
              </li>
              <li>
                <strong>Cloudinary</strong> — image transformation and storage
                for portfolio images and blog assets. User-uploaded files for
                tools are not sent to Cloudinary.
              </li>
              <li>
                <strong>Hugging Face / Python tools service</strong> — certain
                AI-powered tools (e.g. background remover) use a self-hosted
                inference service deployed on Hugging Face. Files you upload for
                these tools are sent to this service solely to generate the
                result and are not retained.
              </li>
              <li>
                <strong>Google AdSense</strong> — advertising network used to
                display ads on the Site. Google may use cookies (including the
                DoubleClick cookie) to serve ads based on your prior visits to
                this or other websites. This helps keep the tools and content
                free. You can opt out of personalised advertising at{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>{" "}
                or via{" "}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aboutads.info
                </a>
                . See also{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s advertising policies
                </a>
                .
              </li>
              <li>
                <strong>Analytics provider</strong> — privacy-friendly,
                cookie-optional analytics that do not share data with
                advertising networks.
              </li>
            </ul>

            <h2>6. Data Retention</h2>
            <ul>
              <li>
                <strong>Contact form messages and project enquiries:</strong>{" "}
                retained for as long as needed to respond and, for active
                projects, for the duration of the engagement plus a reasonable
                support period.
              </li>
              <li>
                <strong>User accounts:</strong> retained while your account is
                active. You may request deletion at any time.
              </li>
              <li>
                <strong>Tool usage quota records:</strong> hashed IP data and
                session usage counts are retained for up to 24 hours (one daily
                quota cycle) and then purged.
              </li>
              <li>
                <strong>Uploaded files:</strong> processed in-memory or in
                temporary storage and deleted immediately after the result is
                returned. No uploaded file is retained beyond the single
                request.
              </li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>
              Depending on where you live, you may have the right to:
            </p>
            <ul>
              <li>Access the personal data I hold about you.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Request deletion of your data (&quot;right to be forgotten&quot;).</li>
              <li>Request a portable copy of your data.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with
              the subject line &quot;Privacy Request&quot;. I will respond
              within 30 days.
            </p>

            <h2>8. Cookies</h2>
            <p>
              The Site uses cookies and browser storage for the following
              purposes:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> authentication session tokens, CSRF protection, and dark/light mode preference. These cannot be disabled without breaking core functionality.</li>
              <li><strong>Analytics:</strong> privacy-friendly, aggregate-only analytics with no cross-site fingerprinting.</li>
              <li>
                <strong>Advertising cookies (Google AdSense):</strong> Google
                AdSense places cookies — including the DoubleClick cookie — to
                serve ads personalised to your interests based on your browsing
                history on this and other sites. These cookies may track you
                across websites. To opt out of personalised ads, visit{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
                {" "}or the{" "}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NAI opt-out tool
                </a>
                . Opting out means you will see non-personalised ads rather than
                no ads.
              </li>
            </ul>
            <p>
              You can disable cookies in your browser settings. Essential
              cookies (authentication, tool quotas) are required for core
              functionality. Disabling advertising cookies will not affect your
              ability to use any tool on this Site.
            </p>

            <h2>9. Security</h2>
            <p>
              I use industry-standard measures to protect your data: HTTPS on
              all endpoints, hashed credentials, least-privilege database
              access, and one-way IP hashing for quota tracking. No method of
              transmission over the internet is 100% secure, and I cannot
              guarantee absolute security.
            </p>

            <h2>10. International Transfers</h2>
            <p>
              The Site is operated from India and uses infrastructure providers
              (Vercel, Supabase, Resend) that may process data in the United
              States or the European Union. Where such transfers occur, they are
              made subject to appropriate safeguards (e.g. Standard Contractual
              Clauses) or to jurisdictions with an adequacy decision.
            </p>

            <h2>11. Children&apos;s Privacy</h2>
            <p>
              The Site is not directed at children under 13. I do not knowingly
              collect personal data from children. If you believe a child has
              submitted data to the Site, please contact me and I will delete it
              promptly.
            </p>

            <h2>12. Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time. Material
              changes will be reflected by updating the &quot;Last updated&quot;
              date at the top of this page. For significant changes, I may also
              notify signed-in users by email.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about this policy or a data request? Reach me at{" "}
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

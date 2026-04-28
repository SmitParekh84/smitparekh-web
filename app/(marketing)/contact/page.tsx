"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Clock, MapPin, Send, MessageSquare, MessageCircle, ClipboardCheck, Hammer, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import { useSubmitContact } from "@/hooks/api/use-contact";
import { toast } from "@/lib/toast";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "@/components/icons/SocialIcons";
import { siteConfig } from "@/data/site";

const SUBJECTS = [
  "New Project / MVP",
  "Existing Project Help",
  "Technical Consultation",
  "Partnership / Collaboration",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitContact();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error("Missing fields", "Please fill in all required fields.");
      return;
    }
    mutation.mutate(
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        description: form.description,
      },
      {
        onSuccess: () => {
          toast.success("Message sent!", "I'll get back to you within 24 hours.");
          setSubmitted(true);
          setForm({ name: "", email: "", subject: SUBJECTS[0], description: "" });
        },
        onError: () => {
          toast.error("Something went wrong", "Please try again or email me directly.");
        },
      }
    );
  }

  return (
    <>
      {/* Header */}
      <PageHero
        eyebrow="Get in Touch"
        icon={MessageSquare}
        title={<>Let&apos;s Work Together</>}
        description="Tell me about your project. I respond to every enquiry within 24 hours and deliver a scoped proposal within 48."
      />

      {/* Content */}
      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Contact Information</h2>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  {siteConfig.email}
                </a>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  Response within 24 hours
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  India · Available Worldwide
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Connect
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-muted-foreground hover:text-foreground"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-muted-foreground hover:text-foreground"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    aria-label="Email"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-muted-foreground hover:text-foreground"
                  >
                    <MailIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold">
                    Available for New Projects
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Currently accepting new clients for Q2 2025 start dates. Limited
                  spots available - get in touch early.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-border bg-card p-12 gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10">
                    <Send className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                    Thanks for reaching out. I&apos;ll review your message and get
                    back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className={cn(buttonVariants({ variant: "outline" }), "mt-2")}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-7 sm:p-9 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Name <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      What can I help with?
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-colors"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium text-foreground"
                    >
                      Message <span className="text-blue-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={6}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Tell me about your project - what are you building, what's the timeline, and what kind of help do you need?"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full gap-2",
                      mutation.isPending && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {mutation.isPending ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="page-section pt-0">
        <div className="page-container">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">
              What Happens Next
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              From first message to first commit
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              I keep the start of every project deliberately simple. No long
              sales calls, no lock-in contracts before we&apos;ve agreed the
              scope makes sense for both sides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: MessageCircle,
                title: "1 - Reply within 24h",
                description:
                  "I read every message personally and reply with clarifying questions, a rough timeline estimate, and next steps.",
              },
              {
                icon: ClipboardCheck,
                title: "2 - Free scoping call",
                description:
                  "30–45 minutes to walk through the goal, constraints, and tech. You leave with a written scope and fixed-price proposal.",
              },
              {
                icon: Hammer,
                title: "3 - Build in the open",
                description:
                  "Weekly demos, async Loom updates, and a shared Linear board. You always know what's shipped and what's next.",
              },
              {
                icon: Rocket,
                title: "4 - Launch & support",
                description:
                  "Production deploy, monitoring, and docs handover. Optional retainer for ongoing iteration after launch.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 transition-colors"
                >
                  <div className="rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 p-2.5 text-blue-500 inline-flex">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold mt-4">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section pt-0">
        <div className="page-container">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">
              Common Questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Before you reach out
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "What kind of projects do you take on?",
                a: "Production web apps and SaaS products - typically Next.js + Node/Express + Postgres or MongoDB. From MVPs through to scaling existing codebases. I don't take pure WordPress, Shopify customisation, or marketing-only sites.",
              },
              {
                q: "How are you priced?",
                a: "Fixed-price for clearly scoped projects, hourly for ongoing work. After our scoping call you get a written proposal - no hidden fees.",
              },
              {
                q: "How soon can we start?",
                a: "Usually within 1–2 weeks of agreeing the scope. For urgent fixes on existing projects I can often start the same week.",
              },
              {
                q: "Do you work with teams?",
                a: "Yes - I integrate with your existing engineering team, your tooling (Linear/Jira/GitHub), and your deployment pipelines. I'm comfortable as the only engineer or as a senior on a larger team.",
              },
              {
                q: "Can you help us pick the right stack?",
                a: "Absolutely. The free scoping call covers tech recommendations, hosting options, and pragmatic tradeoffs based on your team size, budget, and growth plans.",
              },
              {
                q: "Where are you based?",
                a: "India. I work async with clients across the US, EU, and APAC - overlapping a few hours daily for sync work and demos.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <h3 className="text-sm font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

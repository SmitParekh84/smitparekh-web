import type { Metadata } from "next";
import { OnboardingClient } from "./_client";

export const metadata: Metadata = {
  title: "Set up your account | Smit Parekh",
  description: "Complete your onboarding to access the client portal.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <OnboardingClient token={token} />;
}

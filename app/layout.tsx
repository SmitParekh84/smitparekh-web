import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ConditionalNavbar,
  ConditionalFooter,
} from "@/components/layout/ConditionalNav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeAwareToaster } from "@/components/providers/ThemeAwareToaster";
import { siteConfig } from "@/data/site";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Smit Parekh — Full Stack Developer & Free Web Tools",
    template: `%s | Smit Parekh`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Smit Parekh — Full Stack Developer & Free Web Tools",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        alt: "Smit Parekh — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Smit Parekh — Full Stack Developer & Free Web Tools",
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/Smit-Parekh-Home.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalNavbar />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
            <ThemeAwareToaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

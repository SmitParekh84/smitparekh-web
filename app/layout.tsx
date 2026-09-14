import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ConditionalNavbar,
  ConditionalFooter,
} from "@/components/layout/ConditionalNav";
import { ConditionalChat } from "@/components/chat/ConditionalChat";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeAwareToaster } from "@/components/providers/ThemeAwareToaster";
import { CalProvider } from "@/components/cal/CalProvider";
import { ScrollToTop } from "@/components/providers/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { siteConfig } from "@/data/site";
import { getFeaturedNavTools } from "@/lib/featured-nav-tools";
import { TOOL_COUNT } from "@/data/tools-seo";

const GA_MEASUREMENT_ID = "G-X9NMSPMQPD";
const GTM_ID = "GTM-529BP97T";
const GOOGLE_SANS_HREF =
  "https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Smit Parekh - Full Stack Developer (React, Next.js, Node)",
    // Page titles stand alone - no " | Smit Parekh" suffix, which pushed nearly
    // every page over Google's ~60-char title limit. Brand is carried in the
    // base title text and the OG/Twitter cards instead.
    template: `%s`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Smit Parekh - Full Stack Developer for Hire",
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    title: "Smit Parekh - Full Stack Developer for Hire",
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh - Full Stack Developer",
      },
    ],
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
  // NOTE: no `alternates.canonical` here on purpose. A canonical set in the
  // root layout is inherited by every descendant route that doesn't declare
  // its own, so any page missing a canonical would wrongly self-canonicalize
  // to the homepage. Each indexable page sets its own canonical; the home
  // page does so in app/page.tsx.
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
  other: {
    "google-adsense-account": "ca-pub-9526582197854160",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetched server-side and cached with the 'nav-tools' tag so the navbar
  // never shows a client-side loading state. Admin toggles in /admin/tools
  // call revalidateTag('nav-tools') to invalidate this.
  const featuredNavTools = await getFeaturedNavTools();

  return (
    <html
      lang="en"
      className={`${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/*
          Mark the document as JS-enabled before first paint. The scroll-reveal
          hidden start-state is gated on `html.js`, so sections only start hidden
          when JS can reveal them - no flash, and no-JS users see content.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/*
          Non-render-blocking webfont load. The stylesheet would otherwise block
          first paint until Google Fonts responds (was a major FCP contributor).
          Trick: preload the CSS, attach it as media="print" (ignored for screen
          so it doesn't block render), then a tiny afterInteractive script flips
          it to media="all". With display=swap the fallback paints instantly and
          upgrades to Google Sans once loaded. <noscript> covers JS-off clients.
        */}
        <link rel="preload" as="style" href={GOOGLE_SANS_HREF} />
        <link
          id="google-sans-css"
          rel="stylesheet"
          href={GOOGLE_SANS_HREF}
          media="print"
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_SANS_HREF} />
        </noscript>
        {/*
          GTM is loaded afterInteractive (not beforeInteractive) so it does
          NOT block the critical rendering path. This improves LCP typically
          by 200-500 ms. The trade-off is that very-early sub-second events
          may be missed, which is acceptable for a portfolio site.
        */}
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollToTop />
            <ConditionalNavbar featuredNavTools={featuredNavTools} toolCount={TOOL_COUNT} />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
            <ConditionalChat />
            <ThemeAwareToaster />
            <CalProvider />
          </ThemeProvider>
        </QueryProvider>
        {/* Promote the print-media font stylesheet to screen once parsed. */}
        <Script id="google-sans-swap" strategy="afterInteractive">
          {`(function(){var l=document.getElementById('google-sans-css');if(l)l.media='all';})();`}
        </Script>
        <Analytics />
        <SpeedInsights />
        {/* GTM - afterInteractive keeps it off the critical path */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9526582197854160"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Microsoft Clarity - afterInteractive keeps it off the critical path */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wzak06hwaw");`}
        </Script>
      </body>
    </html>
  );
}

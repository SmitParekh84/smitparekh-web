import type { NextConfig } from "next"
import path from "path"

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://platform.linkedin.com https://badges.linkedin.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://app.cal.com https://cal.com https://embed.cal.com https://checkout.razorpay.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://static.licdn.com",
      "font-src 'self' https://fonts.gstatic.com https://static.licdn.com",
      "img-src 'self' data: blob: https://res.cloudinary.com https://placehold.co https://api.smitparekh.co.in http://localhost:5000 https://img.youtube.com https://media.licdn.com https://dms.licdn.com https://platform.linkedin.com https://badges.linkedin.com https://static.licdn.com https://www.google-analytics.com https://lh3.googleusercontent.com https://*.googleusercontent.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://app.cal.com https://cal.com https://cdn.razorpay.com",
      "connect-src 'self' https://www.smitparekh.co.in https://api.smitparekh.co.in https://*.supabase.co wss://*.supabase.co https://*.hf.space http://localhost:5000 https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://badges.linkedin.com https://platform.linkedin.com https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://*.adtrafficquality.google https://app.cal.com https://cal.com https://embed.cal.com https://api.razorpay.com https://lumberjack.razorpay.com",
      "frame-src 'self' https://badges.linkedin.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://app.cal.com https://cal.com https://api.razorpay.com https://checkout.razorpay.com",
      "frame-ancestors 'self'",
    ].join("; "),
  },
]

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.smitparekh.co.in",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      // Legacy /projects path returns 404 and is linked from an old blog post —
      // 308 to /portfolio so the link equity (and crawl budget) is preserved.
      { source: "/projects", destination: "/portfolio", permanent: true },
      // /project (singular) was indexed by Google as a 5xx — redirect to stop
      // the crawl error and recover any residual link equity.
      { source: "/project", destination: "/portfolio", permanent: true },
    ]
  },
}

export default nextConfig

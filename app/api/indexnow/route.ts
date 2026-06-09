import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { fetchAllCaseStudies } from "@/lib/server/projects";

// Falls back to the production key that's served at /<key>.txt and hardcoded as
// the default in the backend (smitparekh-api/utils/indexnow.js). Keeping the
// same default here means this route never 500s on a missing env var, and the
// key submitted always matches the live key file (IndexNow validates against it).
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "cb7b59c028d84fefb520f83b95862778";

const STATIC_URLS = [
  siteConfig.url,
  `${siteConfig.url}/about`,
  `${siteConfig.url}/portfolio`,
  `${siteConfig.url}/services`,
  `${siteConfig.url}/hire-me`,
  `${siteConfig.url}/contact`,
  `${siteConfig.url}/blog`,
  `${siteConfig.url}/free-tools`,
  ...toolsSEO.map((t) => `${siteConfig.url}/free-tools/${t.slug}`),
];

export async function POST() {
  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const [blogs, caseStudies] = await Promise.all([
    fetchAllBlogs().catch(() => []),
    fetchAllCaseStudies().catch(() => []),
  ]);

  const urlList = [
    ...STATIC_URLS,
    ...blogs.map((b) => `${siteConfig.url}/blog/${b.slug}`),
    ...caseStudies.map((p) => `${siteConfig.url}/portfolio/${p.slug}`),
  ];

  const body = {
    host: new URL(siteConfig.url).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ status: res.status, submitted: urlList.length });
}

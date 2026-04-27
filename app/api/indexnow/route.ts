import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "";

const ALL_URLS = [
  siteConfig.url,
  `${siteConfig.url}/about`,
  `${siteConfig.url}/portfolio`,
  `${siteConfig.url}/services`,
  `${siteConfig.url}/contact`,
  `${siteConfig.url}/free-tools`,
  ...toolsSEO.map((t) => `${siteConfig.url}/free-tools/${t.slug}`),
];

export async function POST() {
  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const body = {
    host: new URL(siteConfig.url).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    urlList: ALL_URLS,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ status: res.status, submitted: ALL_URLS.length });
}

// Geo-targeting landing pages for the four target client markets:
// the Gulf (GCC), the United States, the United Kingdom, and India.
//
// These are English-language, country-targeted hire pages - NOT an i18n locale
// system. There is deliberately no `/en/` or `/ar/` route prefix: adding one
// would force 301s on every existing URL and burn crawl budget for zero gain,
// because these buyers search in English. Each country gets one substantial
// page at /hire-developer/<slug>; the matrix of role×country is intentionally
// avoided to keep pages thick and crawl budget concentrated.

export interface GeoCountry {
  slug: string;          // URL segment → /hire-developer/<slug>
  country: string;       // Full country name
  countryCode: string;   // ISO 3166-1 alpha-2 (for schema areaServed)
  primaryCity: string;   // Highest search-volume city - leads the H1/title
  cities: string[];      // Major cities mentioned in copy + keywords
  demonym: string;       // Adjective form, e.g. "UAE-based"
  currencyCode: string;  // Local currency, mentioned for invoicing
  utcOffset: string;     // e.g. "+4"
  timezoneLabel: string; // Human label
  istGapLabel: string;   // Short timezone-gap chip for the results card, e.g. "1.5h"
  istOverlap: string;    // Working-hours overlap vs India (IST, UTC+5:30)
  intro: string;         // Region context paragraph (hero subline)
}

export const geoCountries: GeoCountry[] = [
  {
    slug: "uae",
    country: "United Arab Emirates",
    countryCode: "AE",
    primaryCity: "Dubai",
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    demonym: "UAE-based",
    currencyCode: "AED",
    utcOffset: "+4",
    timezoneLabel: "Gulf Standard Time (GST)",
    istGapLabel: "1.5h",
    istOverlap: "Just 1.5 hours behind India - a full working-day overlap, not a midnight-standup compromise.",
    intro:
      "From Dubai Internet City startups to Abu Dhabi enterprise teams, I build production web apps for UAE companies - React, Next.js, and Node.js, delivered on a near-identical timezone with same-day communication.",
  },
  {
    slug: "saudi-arabia",
    country: "Saudi Arabia",
    countryCode: "SA",
    primaryCity: "Riyadh",
    cities: ["Riyadh", "Jeddah", "Dammam"],
    demonym: "KSA-based",
    currencyCode: "SAR",
    utcOffset: "+3",
    timezoneLabel: "Arabia Standard Time (AST)",
    istGapLabel: "2.5h",
    istOverlap: "2.5 hours behind India - your afternoon is my afternoon, so reviews and standups happen live.",
    intro:
      "Vision 2030 is moving Saudi business online fast. I help Riyadh and Jeddah companies ship modern, SEO-first web apps and SaaS products - React, Next.js, NestJS, and PostgreSQL, built to scale.",
  },
  {
    slug: "qatar",
    country: "Qatar",
    countryCode: "QA",
    primaryCity: "Doha",
    cities: ["Doha", "Al Rayyan", "Lusail"],
    demonym: "Qatar-based",
    currencyCode: "QAR",
    utcOffset: "+3",
    timezoneLabel: "Arabia Standard Time (AST)",
    istGapLabel: "2.5h",
    istOverlap: "2.5 hours behind India - comfortable overlap for daily collaboration, no off-hours calls.",
    intro:
      "I build production-grade web applications and SaaS platforms for Doha-based businesses - full ownership from database to deploy, with the reliability Qatar's enterprise and finance sector expects.",
  },
  {
    slug: "kuwait",
    country: "Kuwait",
    countryCode: "KW",
    primaryCity: "Kuwait City",
    cities: ["Kuwait City", "Hawalli", "Salmiya"],
    demonym: "Kuwait-based",
    currencyCode: "KWD",
    utcOffset: "+3",
    timezoneLabel: "Arabia Standard Time (AST)",
    istGapLabel: "2.5h",
    istOverlap: "2.5 hours behind India - a wide daytime overlap for live collaboration.",
    intro:
      "From e-commerce to internal business tools, I help Kuwait City companies ship fast, secure, SEO-ready web apps - React, Next.js, and Node.js, owned end-to-end by one engineer.",
  },
  {
    slug: "bahrain",
    country: "Bahrain",
    countryCode: "BH",
    primaryCity: "Manama",
    cities: ["Manama", "Riffa", "Muharraq"],
    demonym: "Bahrain-based",
    currencyCode: "BHD",
    utcOffset: "+3",
    timezoneLabel: "Arabia Standard Time (AST)",
    istGapLabel: "2.5h",
    istOverlap: "2.5 hours behind India - your working day and mine line up almost completely.",
    intro:
      "Bahrain's fintech and startup scene needs developers who ship. I build production React, Next.js, and NestJS applications for Manama-based teams - full-stack ownership, from schema to deploy.",
  },
  {
    slug: "oman",
    country: "Oman",
    countryCode: "OM",
    primaryCity: "Muscat",
    cities: ["Muscat", "Salalah", "Sohar"],
    demonym: "Oman-based",
    currencyCode: "OMR",
    utcOffset: "+4",
    timezoneLabel: "Gulf Standard Time (GST)",
    istGapLabel: "1.5h",
    istOverlap: "1.5 hours behind India - a full shared working day for real-time collaboration.",
    intro:
      "I help Muscat businesses move online with modern, performant web apps - React, Next.js, Node.js, and PostgreSQL - built once, built right, and built to rank.",
  },
  {
    slug: "usa",
    country: "United States",
    countryCode: "US",
    primaryCity: "New York",
    cities: ["New York", "San Francisco", "Austin"],
    demonym: "US-based",
    currencyCode: "USD",
    utcOffset: "-5",
    timezoneLabel: "US Eastern Time (ET)",
    istGapLabel: "AM overlap",
    istOverlap:
      "The US runs 9.5-12.5 hours behind India, so I anchor live calls to your mornings (ET/PT) and keep work moving async while your team is offline - you wake up to shipped progress.",
    intro:
      "From New York SaaS startups to Bay Area product teams, I build production web apps for US companies - React, Next.js, NestJS, and PostgreSQL. Live standups in your morning, async delivery around the clock, and one engineer accountable for the whole stack.",
  },
  {
    slug: "uk",
    country: "United Kingdom",
    countryCode: "GB",
    primaryCity: "London",
    cities: ["London", "Manchester", "Edinburgh"],
    demonym: "UK-based",
    currencyCode: "GBP",
    utcOffset: "+0",
    timezoneLabel: "UK Time (GMT/BST)",
    istGapLabel: "4.5-5.5h",
    istOverlap:
      "India is 4.5-5.5 hours ahead of the UK - your morning is my afternoon, giving a solid half-day overlap for live calls, code reviews, and same-day turnaround.",
    intro:
      "From London fintech to Manchester scale-ups, I build production web apps for UK businesses - React, Next.js, NestJS, and PostgreSQL. A reliable daily overlap, SEO-first delivery, and full-stack ownership from schema to deploy.",
  },
  {
    slug: "india",
    country: "India",
    countryCode: "IN",
    primaryCity: "Bengaluru",
    cities: ["Bengaluru", "Mumbai", "Delhi NCR", "Pune"],
    demonym: "India-based",
    currencyCode: "INR",
    utcOffset: "+5:30",
    timezoneLabel: "India Standard Time (IST)",
    istGapLabel: "Same TZ",
    istOverlap:
      "I'm based in India - same timezone, same working day, with the option to meet in person for teams in Bengaluru, Mumbai, Delhi NCR, or Pune.",
    intro:
      "From Bengaluru SaaS startups to Mumbai enterprises, I build production web apps for Indian businesses - React, Next.js, NestJS, and PostgreSQL. Same-timezone collaboration, invoicing in INR, and full-stack ownership from database to deploy.",
  },
];

export type GeoCountrySlug = (typeof geoCountries)[number]["slug"];

export function getGeoCountry(slug: string): GeoCountry | undefined {
  return geoCountries.find((c) => c.slug === slug);
}

// Country-targeted keyword set, generated so every page stays on-topic for the
// exact "hire X developer <city/country>" queries that win local intent.
export function geoKeywords(c: GeoCountry): string[] {
  const where = [c.country, c.primaryCity, ...c.cities.slice(1)];
  const roles = [
    "full stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "web developer",
    "freelance developer",
    "software developer",
  ];
  const kws: string[] = [];
  for (const role of roles) {
    for (const place of where) {
      kws.push(`hire ${role} ${place}`);
    }
  }
  kws.push(
    `freelance web developer ${c.primaryCity}`,
    `${c.country} web development`,
    `web development company ${c.primaryCity}`,
    `remote developer for hire ${c.country}`,
    `MVP development ${c.primaryCity}`,
    `SaaS developer ${c.country}`,
  );
  return kws;
}

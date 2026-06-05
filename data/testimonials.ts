export interface Testimonial {
  id: number;
  name: string;
  company: string;
  companyUrl?: string;
  quote: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 11,
    name: "Fatima Abdulla",
    company: "Enliven Counselling Center, Dubai",
    companyUrl: "https://www.enlivencounsellingcenter.com",
    quote:
      "Smit took care of our website, SEO, and lead generation end to end. He improved the site, made it faster and easier to find on Google, and the enquiries from clients across Dubai and the UAE grew steadily. He understood what a counselling practice needs and communicated clearly throughout. A reliable partner for any business in the Gulf.",
    rating: 5,
    initials: "FA",
    avatarColor: "from-teal-500 to-emerald-500",
  },
  {
    id: 1,
    name: "Preet Patel",
    company: "Java Heaven Pvt.",
    companyUrl: "https://www.linkedin.com/company/java-heaven/",
    quote:
      "Smit's expertise in web development transformed our online presence. He delivered high-quality work on time and was always available for support. Highly recommended!",
    rating: 4,
    initials: "PP",
    avatarColor: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Dhairya Mehata",
    company: "Techno Hub",
    companyUrl: "https://www.linkedin.com/company/techno-hub/",
    quote:
      "Working with Smit was a game changer for our marketing strategy. His creative insights and attention to detail helped us reach our goals effectively.",
    rating: 4,
    initials: "DM",
    avatarColor: "from-sky-500 to-blue-600",
  },
  {
    id: 3,
    name: "Dhru Patel",
    company: "Tech Innovations",
    quote:
      "Smit consistently goes above and beyond. His ability to understand our needs and deliver tailored solutions made the entire process smooth and enjoyable.",
    rating: 5,
    initials: "DP",
    avatarColor: "from-cyan-400 to-sky-500",
  },
  {
    id: 4,
    name: "Tirth Bhavsar",
    company: "GreenTech Ltd.",
    quote:
      "From the initial consultation to the final product, Smit was professional and communicative. His dedication to excellence truly stands out.",
    rating: 4,
    initials: "TB",
    avatarColor: "from-blue-400 to-cyan-500",
  },
  {
    id: 5,
    name: "Aarav Shah",
    company: "Lumen Labs",
    quote:
      "Shipped a production-ready dashboard in two weeks - clean code, sensible architecture, and zero hand-holding. Felt like hiring a senior, not a freelancer.",
    rating: 5,
    initials: "AS",
    avatarColor: "from-indigo-500 to-blue-600",
  },
  {
    id: 6,
    name: "Riya Kapoor",
    company: "FinFlow",
    companyUrl: "https://www.upwork.com/freelancers/~018877bbeb80ff2d25",
    quote:
      "Our checkout conversion jumped 23% after Smit rebuilt the funnel. He thinks in business outcomes, not just lines of code.",
    rating: 5,
    initials: "RK",
    avatarColor: "from-violet-500 to-purple-500",
  },
  {
    id: 7,
    name: "Karan Mehta",
    company: "ShipStack",
    quote:
      "Migrated our legacy Express API to a clean Node + TypeScript stack with full test coverage. Pull requests were a joy to review.",
    rating: 5,
    initials: "KM",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: 8,
    name: "Neha Verma",
    company: "Studio Nine",
    quote:
      "Took our rough Figma and shipped a pixel-perfect Next.js site with great Lighthouse scores. Async-friendly and unblocked the team daily.",
    rating: 5,
    initials: "NV",
    avatarColor: "from-pink-500 to-rose-500",
  },
  {
    id: 9,
    name: "Vihaan Gupta",
    company: "NorthPeak",
    quote:
      "Smit owned the entire backend - schema, jobs, auth, deploy. Solid engineer who actually cares about edge cases and observability.",
    rating: 5,
    initials: "VG",
    avatarColor: "from-amber-500 to-orange-500",
  },
  {
    id: 10,
    name: "Ishaan Roy",
    company: "Bytewave",
    quote:
      "Rare combo of speed and craftsmanship. Documented everything, set up CI, and left us a codebase we can actually extend.",
    rating: 5,
    initials: "IR",
    avatarColor: "from-fuchsia-500 to-pink-500",
  },
];

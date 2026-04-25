export interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Preet Patel",
    company: "Java Heaven Pvt.",
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
];

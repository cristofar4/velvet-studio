import { pexels } from "./utils";

/* ─────────────────────────────────────────────────────────────
   All imagery and footage is royalty free from Pexels
   (cottonbro studio, RDNE Stock project and peers), hotlinked
   through the Pexels CDN. No placeholders.
   ───────────────────────────────────────────────────────────── */

export const site = {
  name: "Velvet Fade Studio",
  tagline: "Precision Cuts. Timeless Style.",
  phone: "+1 (212) 555 0188",
  phoneHref: "tel:+12125550188",
  email: "concierge@velvetfade.studio",
  address: ["128 Mercer Street", "SoHo, New York, NY 10012"],
  founded: 2012,
  socials: [
    { label: "Instagram", handle: "@velvetfadestudio", href: "https://instagram.com" },
    { label: "TikTok", handle: "@velvetfade", href: "https://tiktok.com" },
    { label: "YouTube", handle: "Velvet Fade TV", href: "https://youtube.com" },
    { label: "X", handle: "@velvetfade", href: "https://x.com" },
  ],
  hours: [
    { days: "Monday to Friday", time: "10:00 to 20:00" },
    { days: "Saturday", time: "09:00 to 21:00" },
    { days: "Sunday", time: "11:00 to 18:00" },
  ],
};

/* Hero footage, cottonbro studio's barbershop series on Pexels.
   Source order is a graceful fallback chain for the video element. */
export const heroVideo = {
  poster: pexels(3998417, 1920),
  sources: [
    "https://videos.pexels.com/video-files/3998508/3998508-uhd_2732_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/3998516/3998516-uhd_2732_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/3998420/3998420-hd_1920_1080_30fps.mp4",
  ],
};

/* Ambient loop behind the booking panel. */
export const ambientVideo = {
  poster: pexels(2035227, 1600),
  sources: [
    "https://videos.pexels.com/video-files/7692859/7692859-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/8867316/8867316-hd_1080_1920_24fps.mp4",
  ],
};

export const stats = [
  { value: 14, suffix: "+", label: "Years of Craft" },
  { value: 28, suffix: "K", label: "Cuts Delivered" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
  { value: 18, suffix: "", label: "Industry Awards" },
];

export const about = {
  eyebrow: "The House",
  title: "Where craft becomes ritual",
  paragraphs: [
    "Velvet Fade Studio was founded in 2012 inside a former SoHo atelier, one chair, one mirror, and an obsession with the perfect gradient. Today it is New York's quiet landmark for men who treat grooming as a discipline, not an errand.",
    "Every appointment is a forty five minute ritual: hot towels pressed by hand, blades honed each morning, lighting tuned like a film set. Our barbers train for years before they touch a guest's hairline, because precision is a promise, not a slogan.",
  ],
  pillars: [
    { title: "Craftsmanship", copy: "Blades honed daily, techniques refined over decades." },
    { title: "Ritual", copy: "Hot towels, slow hands, zero rush. Every visit is theatre." },
    { title: "Experience", copy: "Vinyl on the deck, single origin espresso, velvet chairs." },
  ],
  imagePrimary: { src: pexels(8218487, 1800), alt: "Velvet Fade Studio interior with classic chairs and tall mirrors" },
  imageSecondary: { src: pexels(897262, 1300), alt: "Straight razor passing cleanly along a client's jaw" },
  quote: "A fade should disappear like smoke, you never see where it ends.",
  quoteBy: "Marcus Cole, Founder",
};

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "signature-fade",
    name: "Signature Fade",
    tagline: "Our namesake gradient",
    description:
      "A sculpted skin to scissor fade mapped to your head shape, finished with a straight razor edge up.",
    price: 55,
    duration: "45 min",
    features: ["Consultation and mapping", "Straight razor edge up", "Styling and product lesson"],
    image: pexels(15659486, 1300),
  },
  {
    id: "beard-sculpting",
    name: "Beard Sculpting",
    tagline: "Architecture for the jawline",
    description:
      "Precision shaping with shears and razor, conditioned with warm cedarwood oil and a cold towel close.",
    price: 40,
    duration: "30 min",
    features: ["Line architecture", "Cedarwood oil treatment", "Cold towel finish"],
    image: pexels(6007400, 1300),
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    tagline: "The royal ritual",
    description:
      "Triple hot towel preparation, badger brush lather and a hand honed straight razor, the classic, perfected.",
    price: 65,
    duration: "50 min",
    features: ["Triple towel prep", "Hand honed razor", "Aftershave massage"],
    image: pexels(14034429, 1300),
  },
  {
    id: "wash-styling",
    name: "Hair Wash and Styling",
    tagline: "Reset and refine",
    description:
      "Deep cleansing wash, scalp massage at the basin, then a blow dry and finish tailored to your day.",
    price: 35,
    duration: "30 min",
    features: ["Scalp massage", "Steam infused wash", "Editorial finish"],
    image: pexels(33448217, 1300),
  },
  {
    id: "vip-package",
    name: "VIP Grooming Package",
    tagline: "The full Velvet hour",
    description:
      "Signature fade, beard sculpt, hot towel shave and styling, with espresso, vinyl and the lounge to yourself.",
    price: 150,
    duration: "120 min",
    features: ["All four rituals", "Private lounge seat", "Take home product kit"],
    image: pexels(7518728, 1300),
    featured: true,
  },
];

export type Barber = {
  id: string;
  name: string;
  role: string;
  years: number;
  bio: string;
  specialties: string[];
  image: string;
  socials: { label: "Instagram" | "TikTok" | "X"; href: string }[];
};

export const barbers: Barber[] = [
  {
    id: "marcus-cole",
    name: "Marcus Cole",
    role: "Founder · Master Barber",
    years: 14,
    bio: "Trained in London's Savile Row barber houses before bringing the craft home to SoHo.",
    specialties: ["Skin Fades", "Scissor Work"],
    image: pexels(18483778, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
  {
    id: "dante-rivera",
    name: "Dante “Blade” Rivera",
    role: "Razor Specialist",
    years: 11,
    bio: "Two time national shave champion. His straight razor work is booked out three weeks deep.",
    specialties: ["Royal Shaves", "Beard Design"],
    image: pexels(32037672, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
    ],
  },
  {
    id: "yusuf-kane",
    name: "Yusuf Kane",
    role: "Texture and Pattern Artist",
    years: 9,
    bio: "Sculpts coils, waves and freestyle patterns, the studio's quiet virtuoso of texture.",
    specialties: ["Textured Crops", "Freestyle Design"],
    image: pexels(13345951, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
  {
    id: "leo-fontaine",
    name: "Leo Fontaine",
    role: "Classic Cuts and Grooming",
    years: 8,
    bio: "Old school discipline, editorial eye. Leo finishes every cut like it is headed to a runway.",
    specialties: ["Pompadours", "Executive Cuts"],
    image: pexels(7781848, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
    ],
  },
];

export type GalleryItem = {
  src: string;
  full: string;
  alt: string;
  caption: string;
  ratio: string; // tailwind aspect class
};

const galleryDefs: Array<[number, string, string, string]> = [
  [1805600, "Clipper work mid fade under warm tungsten light", "Mid fade, chair one", "aspect-[3/4]"],
  [3998391, "A barber on the floor between appointments", "The craftsman", "aspect-[4/5]"],
  [18483774, "A master standing beside his reserved chair", "Chair, reserved", "aspect-[4/3]"],
  [1319461, "A hand honed straight razor, folded", "Tools of the house", "aspect-[3/4]"],
  [19028071, "Laughter between barber and client mid cut", "Chair side stories", "aspect-[4/3]"],
  [11793730, "A wall of clippers, every guard in its place", "Instruments", "aspect-[3/4]"],
  [2014808, "A straight razor passing along the jaw", "Clean lines", "aspect-[4/5]"],
  [12706272, "Finished fade and sculpted beard, detail shot", "The finish", "aspect-[3/4]"],
  [2318055, "Guests waiting on the lounge bench", "The lounge", "aspect-[4/3]"],
  [17784004, "Scissor over comb precision at the crown", "Scissor discipline", "aspect-[3/4]"],
];

export const gallery: GalleryItem[] = galleryDefs.map(([id, alt, caption, ratio]) => ({
  src: pexels(id, 1100),
  full: pexels(id, 2000),
  alt,
  caption,
  ratio,
}));

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Julian Mercer",
    title: "Creative Director",
    quote:
      "I've been cut in Milan, Tokyo and London. Nothing touches the Velvet signature fade, it grows out so cleanly I book monthly, not weekly.",
    rating: 5,
    avatar: pexels(8575409, 480),
  },
  {
    name: "Andre Okafor",
    title: "Architect",
    quote:
      "The hot towel shave is the closest thing to meditation I've found in this city. An hour in that chair resets my entire week.",
    rating: 5,
    avatar: pexels(9775683, 480),
  },
  {
    name: "Tomás Herrera",
    title: "Restaurateur",
    quote:
      "Dante shaped a beard I'd given up on into something my wife now defends fiercely. Worth every dollar, twice over.",
    rating: 5,
    avatar: pexels(15361048, 480),
  },
  {
    name: "Sam Whitfield",
    title: "Photographer",
    quote:
      "The lighting, the vinyl, the espresso, it is a film set that happens to give the sharpest fade in SoHo. I shoot half my portfolio here.",
    rating: 4.5,
    avatar: pexels(6724917, 480),
  },
  {
    name: "Elias Branch",
    title: "Founder, Branch and Co.",
    quote:
      "Walked in before my wedding, walked out feeling like the cover of a magazine. The VIP package is the best gift I've ever given myself.",
    rating: 5,
    avatar: pexels(18138952, 480),
  },
];

export const bookingTimes = [
  "10:00", "10:45", "11:30", "12:15", "13:00", "13:45",
  "14:30", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00",
];

export const marqueeItems = [
  "Precision Fades",
  "Royal Shaves",
  "Est. 2012",
  "SoHo · New York",
  "Master Barbers",
  "Hot Towel Ritual",
  "By Appointment",
];

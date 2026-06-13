import { pexels } from "./utils";

/* ─────────────────────────────────────────────────────────────
   CROWN & BLADE
   All imagery and footage is royalty free from Pexels
   (cottonbro studio, RDNE Stock project and peers), hotlinked
   through the Pexels CDN. Every asset is unique. No placeholders.
   ───────────────────────────────────────────────────────────── */

export const site = {
  name: "Crown & Blade",
  short: "C&B",
  tagline: "The art of precision grooming.",
  established: 2014,
  city: "New York",
  phone: "+1 (212) 555 0142",
  phoneHref: "tel:+12125550142",
  email: "atelier@crownandblade.co",
  address: ["41 Greenwich Avenue", "West Village, New York, NY 10014"],
  socials: [
    { label: "Instagram", handle: "@crownandblade", href: "https://instagram.com" },
    { label: "TikTok", handle: "@crownandblade", href: "https://tiktok.com" },
    { label: "YouTube", handle: "Crown & Blade", href: "https://youtube.com" },
    { label: "X", handle: "@crownandblade", href: "https://x.com" },
  ],
  hours: [
    { days: "Tuesday to Friday", time: "10:00 to 20:00" },
    { days: "Saturday", time: "09:00 to 21:00" },
    { days: "Sunday", time: "11:00 to 18:00" },
    { days: "Monday", time: "By appointment" },
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

export const ambientVideo = {
  poster: pexels(2035227, 1600),
  sources: [
    "https://videos.pexels.com/video-files/7692859/7692859-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/8867316/8867316-hd_1080_1920_24fps.mp4",
  ],
};

export const stats = [
  { value: 11, suffix: "", label: "Years of Craft" },
  { value: 32, suffix: "K", label: "Cuts Delivered" },
  { value: 4.9, suffix: "", label: "Guest Rating", decimals: 1 },
  { value: 21, suffix: "", label: "Awards Won" },
];

export const about = {
  eyebrow: "The Atelier",
  title: "A discipline disguised as a haircut",
  lead: "Crown & Blade is not a barbershop. It is a studio where grooming is treated as craft, theatre, and ritual in equal measure.",
  paragraphs: [
    "We opened in 2014 with a single chair on Greenwich Avenue and a conviction that a great cut is engineered, not improvised. Today our artists train for years before they are handed a blade and a mirror of their own.",
    "Every visit is a slow, deliberate ceremony: instruments laid out like surgery, towels pressed by hand, light tuned to the millimetre. You arrive a guest and leave a portrait of yourself.",
  ],
  pillars: [
    { no: "01", title: "Precision", copy: "Lines mapped to bone structure, gradients measured in millimetres." },
    { no: "02", title: "Instruments", copy: "Hand honed steel, Japanese shears, blades retired the moment they dull." },
    { no: "03", title: "Theatre", copy: "Low light, vinyl, a single malt. The chair is a stage and you are the lead." },
  ],
  image: { src: pexels(8218487, 1800), alt: "The Crown & Blade atelier interior in low cinematic light" },
  signature: { src: pexels(897262, 1200), alt: "A straight razor drawn cleanly along the jaw" },
};

export type Service = {
  id: string;
  no: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
};

export const services: Service[] = [
  {
    id: "the-signature",
    no: "01",
    name: "The Signature Cut",
    tagline: "Our namesake gradient",
    description:
      "A sculpted skin to scissor fade engineered to your head shape, closed with a straight razor edge and a styling lesson you can repeat at home.",
    price: 75,
    duration: "50 min",
    features: ["Consultation and mapping", "Straight razor finish", "Styling masterclass"],
    image: pexels(15659486, 1300),
  },
  {
    id: "the-sculpture",
    no: "02",
    name: "Beard Sculpture",
    tagline: "Architecture for the jaw",
    description:
      "Precision shaping with shears and razor, conditioned in warm cedarwood oil and sealed with a cold towel that sets the line.",
    price: 55,
    duration: "35 min",
    features: ["Line architecture", "Cedarwood oil ritual", "Cold towel seal"],
    image: pexels(6007400, 1300),
  },
  {
    id: "the-ceremony",
    no: "03",
    name: "The Royal Shave",
    tagline: "A ceremony in steel",
    description:
      "Triple hot towel preparation, badger brush lather and a hand honed straight razor drawn slow. The oldest ritual we keep, perfected.",
    price: 85,
    duration: "55 min",
    features: ["Triple towel prep", "Hand honed blade", "Aftershave massage"],
    image: pexels(14034429, 1300),
  },
  {
    id: "the-reset",
    no: "04",
    name: "Wash & Restoration",
    tagline: "Reset and refine",
    description:
      "Deep cleansing wash, a long scalp massage at the basin, then a blow out and finish tailored to the day ahead of you.",
    price: 45,
    duration: "30 min",
    features: ["Scalp massage", "Steam infused wash", "Editorial finish"],
    image: pexels(33448217, 1300),
  },
  {
    id: "the-crown",
    no: "05",
    name: "The Full Crown",
    tagline: "The complete coronation",
    description:
      "Signature cut, beard sculpture, royal shave and restoration across two unhurried hours, with the private lounge and the bar to yourself.",
    price: 220,
    duration: "120 min",
    features: ["All four rituals", "Private lounge", "Take home kit"],
    image: pexels(7518728, 1300),
  },
];

export type Artist = {
  id: string;
  name: string;
  alias: string;
  role: string;
  years: number;
  bio: string;
  signature: string;
  specialties: string[];
  image: string;
  socials: { label: "Instagram" | "TikTok" | "X"; href: string }[];
};

export const artists: Artist[] = [
  {
    id: "augustin-royce",
    name: "Augustin Royce",
    alias: "The Founder",
    role: "Founder, Master Barber",
    years: 22,
    bio: "Trained on Savile Row before bringing the discipline to the West Village. Augustin maps a fade like an architect draws a facade.",
    signature: "The disappearing fade",
    specialties: ["Skin Fades", "Scissor Work"],
    image: pexels(18483778, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
  {
    id: "idris-vale",
    name: "Idris Vale",
    alias: "The Blade",
    role: "Razor and Shave Director",
    years: 14,
    bio: "Two time national shave champion. Idris draws a straight razor so slowly the room goes quiet to watch.",
    signature: "The forty minute shave",
    specialties: ["Royal Shaves", "Beard Design"],
    image: pexels(32037672, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
    ],
  },
  {
    id: "mateo-cruz",
    name: "Mateo Cruz",
    alias: "The Architect",
    role: "Texture and Pattern Artist",
    years: 10,
    bio: "Sculpts coils, waves and freehand patterns. Mateo treats a head of hair like a block of marble waiting for the first cut.",
    signature: "Freehand geometry",
    specialties: ["Textured Crops", "Freehand Design"],
    image: pexels(13345951, 1300),
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
  {
    id: "sebastian-lowe",
    name: "Sebastian Lowe",
    alias: "The Editor",
    role: "Classic and Editorial Cuts",
    years: 12,
    bio: "Old world discipline, a magazine eye. Sebastian finishes every cut as though it is walking straight onto a runway.",
    signature: "The editorial pompadour",
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
  title: string;
  category: string;
};

const galleryDefs: Array<[number, string, string, string]> = [
  [1805600, "Clipper work mid fade under warm tungsten light", "Gradient", "Fade Study"],
  [3998391, "A barber on the studio floor between appointments", "The Craftsman", "Portrait"],
  [18483774, "A master standing beside his reserved chair", "Chair No. 1", "Atelier"],
  [1319461, "A hand honed straight razor, folded", "Cold Steel", "Instruments"],
  [19028071, "Laughter between barber and client mid cut", "The Conversation", "Reportage"],
  [11793730, "A wall of clippers, every guard in its place", "The Wall", "Instruments"],
  [2014808, "A straight razor drawn along the jaw", "Clean Line", "Shave"],
  [12706272, "Finished fade and sculpted beard, detail shot", "The Reveal", "Portrait"],
  [2318055, "Guests waiting in the lounge", "The Lounge", "Atelier"],
  [17784004, "Scissor over comb precision at the crown", "Discipline", "Fade Study"],
];

export const gallery: GalleryItem[] = galleryDefs.map(([id, alt, title, category]) => ({
  src: pexels(id, 1300),
  full: pexels(id, 2000),
  alt,
  title,
  category,
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
      "I have been cut in Milan, Tokyo and London. Nothing touches the Crown & Blade signature. It grows out so cleanly I book by the month, never the week.",
    rating: 5,
    avatar: pexels(8575409, 480),
  },
  {
    name: "Andre Okafor",
    title: "Architect",
    quote:
      "The royal shave is the closest thing to meditation I have found in this city. An hour in that chair resets my entire week.",
    rating: 5,
    avatar: pexels(9775683, 480),
  },
  {
    name: "Tomás Herrera",
    title: "Restaurateur",
    quote:
      "Idris shaped a beard I had given up on into something my wife now defends fiercely. Worth every dollar, twice over.",
    rating: 5,
    avatar: pexels(15361048, 480),
  },
  {
    name: "Sam Whitfield",
    title: "Photographer",
    quote:
      "The light, the vinyl, the bar. It is a film set that happens to give the sharpest fade in New York. I shoot half my portfolio here.",
    rating: 5,
    avatar: pexels(6724917, 480),
  },
  {
    name: "Elias Brandt",
    title: "Founder, Brandt and Co.",
    quote:
      "Walked in before my wedding, walked out looking like the cover of a magazine. The Full Crown is the best gift I have given myself.",
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
  "Beard Sculpture",
  "Est. 2014",
  "West Village",
  "By Appointment",
  "The Full Crown",
];

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Booking from "@/components/sections/Booking";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/fx/Marquee";
import { site } from "@/lib/data";
import { pexels } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: site.name,
  description: "An atelier of precision grooming in the West Village, New York. Signature fades, royal shaves and the Full Crown.",
  url: "https://crownandblade.co",
  telephone: site.phone,
  priceRange: "$$$",
  image: pexels(8218487, 1600),
  address: {
    "@type": "PostalAddress",
    streetAddress: "41 Greenwich Avenue",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10014",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "11:00", closes: "18:00" },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Gallery />
      <Team />
      <Booking />
      <Testimonials />
      <Marquee reverse />
      <Contact />
    </main>
  );
}

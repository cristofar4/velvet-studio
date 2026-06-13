import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Barbers from "@/components/sections/Barbers";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Marquee from "@/components/fx/Marquee";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/data";
import { pexels } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: site.name,
  description:
    "Luxury grooming atelier in SoHo, New York, signature fades, hot towel shaves and VIP rituals.",
  url: "https://velvetfade.studio",
  telephone: site.phone,
  priceRange: "$$",
  image: pexels(8218487, 1600),
  address: {
    "@type": "PostalAddress",
    streetAddress: "128 Mercer Street",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10012",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "18:00",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Barbers />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}

import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/components/providers/Intro";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/fx/Cursor";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import { pexels } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velvetfade.studio"),
  title: {
    default: "Velvet Fade Studio · Precision Cuts. Timeless Style.",
    template: "%s · Velvet Fade Studio",
  },
  description:
    "Luxury grooming atelier in SoHo, New York. Signature fades, hot towel shaves, beard sculpting and VIP rituals by master barbers. Est. 2012.",
  keywords: [
    "barbershop",
    "luxury barber",
    "SoHo barbershop",
    "fade haircut",
    "hot towel shave",
    "beard sculpting",
    "New York grooming",
  ],
  openGraph: {
    type: "website",
    title: "Velvet Fade Studio · Precision Cuts. Timeless Style.",
    description:
      "Luxury grooming atelier in SoHo, New York. Master barbers, hot towel rituals, and a chair you will not want to leave.",
    url: "/",
    siteName: "Velvet Fade Studio",
    images: [
      {
        url: pexels(8218487, 1600),
        width: 1600,
        height: 1067,
        alt: "Inside Velvet Fade Studio with leather chairs and warm brass light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Fade Studio · Precision Cuts. Timeless Style.",
    description:
      "Luxury grooming atelier in SoHo, New York. Est. 2012.",
    images: [pexels(8218487, 1600)],
  },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-night text-cream">
        <IntroProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}

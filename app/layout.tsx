import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/components/providers/Intro";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/fx/Cursor";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import { pexels } from "@/lib/utils";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://crownandblade.co"),
  title: {
    default: "Crown & Blade · The Art of Precision Grooming",
    template: "%s · Crown & Blade",
  },
  description:
    "An atelier of precision grooming in the West Village, New York. Master barbers, rare instruments, signature fades, royal shaves and the Full Crown. Est. 2014.",
  keywords: ["luxury barbershop", "New York barber", "West Village grooming", "fade haircut", "royal shave", "beard sculpture", "Crown and Blade"],
  openGraph: {
    type: "website",
    title: "Crown & Blade · The Art of Precision Grooming",
    description: "An atelier of precision grooming in the West Village, New York. Master barbers, rare instruments, the quiet theatre of transformation.",
    url: "/",
    siteName: "Crown & Blade",
    images: [{ url: pexels(8218487, 1600), width: 1600, height: 1067, alt: "Inside the Crown & Blade atelier" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crown & Blade · The Art of Precision Grooming",
    description: "An atelier of precision grooming in the West Village, New York. Est. 2014.",
    images: [pexels(8218487, 1600)],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable} ${mono.variable} antialiased`}>
      <body className="bg-obsidian text-bone">
        <IntroProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </IntroProvider>
        <div className="vignette" aria-hidden />
      </body>
    </html>
  );
}

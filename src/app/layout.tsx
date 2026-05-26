import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Disclaimer } from "@/components/shared/Disclaimer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlareDown — Psoriatic Arthritis Hub",
    template: "%s | FlareDown",
  },
  description:
    "Real people. Real results. Real science. Community-powered protocols and research for living with Psoriatic Arthritis.",
  metadataBase: new URL("https://flaredown.health"),
  openGraph: {
    siteName: "FlareDown",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Disclaimer />
        <Footer />
      </body>
    </html>
  );
}

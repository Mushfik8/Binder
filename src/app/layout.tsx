import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binder — Your smoke break has a social life",
  description:
    "Binder is a social community for adults 18+ who share break-time vibes, pressure memes, and relatable daily chaos. Match by mood, not just by looks. No tobacco sales. Not a dating app.",
  keywords: [
    "Binder",
    "smoke break",
    "social app",
    "Bangladesh",
    "adult community",
    "match by mood",
    "break-time people",
  ],
  authors: [{ name: "Binder Team" }],
  openGraph: {
    title: "Binder — Your smoke break has a social life",
    description:
      "A social community for adults who share break-time vibes and relatable daily chaos. 18+ only.",
    type: "website",
    locale: "bn_BD",
    siteName: "Binder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binder — Your smoke break has a social life",
    description:
      "A social community for adults who share break-time vibes. Match by mood. 18+ only.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0E0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${outfit.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

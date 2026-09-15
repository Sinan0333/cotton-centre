import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const outfitFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cottoncentre.in"),
  alternates: {
    canonical: "/",
  },
  title: "Cotton Centre | Family Clothing Store in Vilayur & Chundambatta",
  description:
    "Shop affordable readymade clothing for women, men, and kids at Cotton Centre, a local family clothing store in Vilayur near Chundambatta, Kerala.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Cotton Centre",
    title: "Cotton Centre | Family Clothing Store in Vilayur & Chundambatta",
    description:
      "Shop affordable readymade clothing for women, men, and kids at Cotton Centre, a local family clothing store in Vilayur near Chundambatta, Kerala.",
    url: "https://cottoncentre.in/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotton Centre | Family Clothing Store in Vilayur & Chundambatta",
    description:
      "Shop affordable readymade clothing for women, men, and kids at Cotton Centre, a local family clothing store in Vilayur near Chundambatta, Kerala.",
  },
  keywords: [
    "Chundambatta",
    "textiles",
    "readymade clothes",
    "budget-friendly",
    "daily wear",
    "Churidar",
    "men",
    "women",
    "kids",
    "Cotton Centre",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/Logo.png?v=1",
    apple: "/Logo.png?v=1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfitFont.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

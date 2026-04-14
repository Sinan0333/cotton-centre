import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const outfitFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Cotton Centre | Premier Clothing Shop in Chundambatta",
  description: "Discover budget-friendly, readymade clothes for men, women, and kids at The Cotton Centre in Chundambatta. Shop daily wear, local, and premium clothing.",
  keywords: ["Chundambatta", "textiles", "readymade clothes", "budget-friendly", "daily wear", "premium clothes", "men", "women", "kids", "The Cotton Centre"],
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
      className={`${outfitFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

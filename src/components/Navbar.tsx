"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Search,
  User,
  Home,
  Share2,
  LayoutGrid,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { InstallButton } from "./InstallButton";

export function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.origin + pathname;
    const title = "Cotton Centre - Premium Fashion Essentials";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log("Failed to copy", err);
      }
    }
  };

  const navLinks = [
    { label: "Shop All", href: "/shop", isShopAll: true },
    { label: "Feed", href: "/feed", isFeed: true },
    {
      label: "Contact",
      href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
      isExternal: true,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300 header-glass">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/Logo.png"
                alt="The Cotton Centre Logo"
                className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-extrabold text-xl md:text-2xl tracking-tighter">
                Cotton Centre
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 pl-10 pr-10">
            {navLinks.map((link) => {
              const isActive =
                (link.isShopAll && pathname === "/shop" && !category) ||
                (link.isFeed && pathname === "/feed");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-gray-100/80 ${isActive ? "text-black font-semibold bg-gray-100" : "text-gray-600 hover:text-black"}`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <InstallButton />
            <button
              onClick={handleShare}
              className={`p-2 rounded-full transition-all relative ${copied ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
              title="Share Website">
              <Share2 className="h-5 w-5" />
              {copied && (
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded-md shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-2">
                  Link copied!
                </span>
              )}
            </button>
            <Link
              href="/shop"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hover:text-black hidden md:block">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hover:text-black hidden md:block">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-3xl p-2 flex justify-around items-center">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${pathname === "/" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}>
          <Home className="mb-1 h-5 w-5" />
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${pathname === "/shop" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}>
          <ShoppingBag className="mb-1 h-5 w-5" />
          <span className="text-[10px] font-bold tracking-tight">Shop</span>
        </Link>

        <Link
          href="/feed"
          className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${pathname === "/feed" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}>
          <LayoutGrid className="mb-1 h-5 w-5" />
          <span className="text-[10px] font-bold tracking-tight">Feed</span>
        </Link>

        <Link
          href="https://wa.me/917736930520"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors text-gray-500 hover:text-black hover:bg-gray-100">
          <MessageCircle className="mb-1 h-5 w-5" />
          <span className="text-[10px] font-bold tracking-tight">Contact</span>
        </Link>

        {isAdmin && (
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${pathname.startsWith("/admin") ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}>
            <User className="mb-1 h-5 w-5" />
            <span className="text-[10px] font-bold tracking-tight">Admin</span>
          </Link>
        )}
      </div>
    </>
  );
}

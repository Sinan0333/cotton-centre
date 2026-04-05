"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, Home, Shirt, Sparkles, Baby } from "lucide-react";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { InstallButton } from "./InstallButton";

export function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const navLinks = [
    { label: "Shop All", href: "/shop", isShopAll: true },
    { label: "Men", href: "/shop?category=Men", checkCategory: "Men" },
    { label: "Women", href: "/shop?category=Women", checkCategory: "Women" },
    { label: "Kids", href: "/shop?category=Kids", checkCategory: "Kids" },
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
              <span className="font-extrabold text-xl md:text-2xl tracking-tighter">The Cotton Centre</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 pl-10 pr-10">
            {navLinks.map((link) => {
              const isActive = (link.isShopAll && pathname === '/shop' && !category) || (link.checkCategory && category === link.checkCategory);
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-gray-100/80 ${isActive ? 'text-black font-semibold bg-gray-100' : 'text-gray-600 hover:text-black'}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <InstallButton />
            <Link href="/shop" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hover:text-black hidden md:block">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
            {isAdmin && (
              <Link href="/admin" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hover:text-black hidden md:block">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-3xl p-2 flex justify-around items-center">
         <Link href="/" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${pathname === '/' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>
           <Home className="mb-1 h-5 w-5" />
           <span className="text-[10px] font-bold tracking-tight">Home</span>
         </Link>
         
         <Link href="/shop" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${(pathname === '/shop' && !category) ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>
           <ShoppingBag className="mb-1 h-5 w-5" />
           <span className="text-[10px] font-bold tracking-tight">Shop</span>
         </Link>

         <Link href="/shop?category=Men" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${(pathname === '/shop' && category === 'Men') ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>
           <Shirt className="mb-1 h-5 w-5" />
           <span className="text-[10px] font-bold tracking-tight">Men</span>
         </Link>

         <Link href="/shop?category=Women" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${(pathname === '/shop' && category === 'Women') ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>
           <Sparkles className="mb-1 h-5 w-5" />
           <span className="text-[10px] font-bold tracking-tight">Women</span>
         </Link>

         <Link href="/shop?category=Kids" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${(pathname === '/shop' && category === 'Kids') ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>
           <Baby className="mb-1 h-5 w-5" />
           <span className="text-[10px] font-bold tracking-tight">Kids</span>
         </Link>
         
         {isAdmin && (
           <Link href="/admin" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${pathname.startsWith('/admin') ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}>
             <User className="mb-1 h-5 w-5" />
             <span className="text-[10px] font-bold tracking-tight">Admin</span>
           </Link>
         )}
      </div>
    </>
  );
}

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 mt-auto border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/Logo.png"
                alt="Logo"
                className="h-8 w-8 object-contain brightness-0 invert"
              />
              <div className="font-extrabold text-2xl tracking-tighter">
                Cotton Centre
              </div>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Premium fashion essentials designed for the modern wardrobe.
              Bringing you unmatched comfort and style everyday.
            </p>
            <div className="flex gap-4 text-sm font-bold tracking-widest">
              <a
                href="#"
                className="py-2 px-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors">
                IN
              </a>
              <a
                href="#"
                className="py-2 px-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors">
                TW
              </a>
              <a
                href="#"
                className="py-2 px-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors">
                FB
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-lg tracking-tight">Shop</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-white transition-colors relative group">
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>{" "}
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Men"
                  className="hover:text-white transition-colors relative group">
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>{" "}
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Women"
                  className="hover:text-white transition-colors relative group">
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>{" "}
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Kids"
                  className="hover:text-white transition-colors relative group">
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>{" "}
                  Kids & Baby
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-lg tracking-tight">Support</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-lg tracking-tight">Need Help?</h4>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
              <p className="text-sm text-gray-400">
                We are here to assist you with any questions or styling advice.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-3 rounded-xl text-sm font-bold transition-transform hover:scale-105">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
          <p>
            © {new Date().getFullYear()} The Cotton Centre. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

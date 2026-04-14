import Image from "next/image";
import Link from "next/link";

import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { ProductGrid } from "@/components/ProductGrid";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function LatestProducts() {
  await connectToDatabase();
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return <ProductGrid products={JSON.parse(JSON.stringify(products))} />;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Space */}
      <BannerCarousel />

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-white selection:bg-black selection:text-white">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
              Explore Collections
            </h2>
            <div className="w-16 h-1 bg-black rounded-full mb-4"></div>
            <p className="text-gray-500 max-w-xl text-lg font-light">
              Find exactly what you're looking for with our budget-friendly readymade clothes for men, women, and kids. From daily wear and local favorites to premium clothing, we offer the best styles at unbeatable prices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Link
              href="/shop?category=Men"
              className="group relative h-72 md:h-96 overflow-hidden rounded-3xl items-center justify-center flex shadow-[0_20px_50px_rgba(0,0,0,0.2)] uppercase">
              <Image
                src="/male.png"
                priority
                alt="Men Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90 z-10"></div>
              <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  Men
                </span>
                <span className="text-sm font-medium text-white/80 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
            <Link
              href="/shop?category=Women"
              className="group relative h-72 md:h-96 overflow-hidden rounded-3xl items-center justify-center flex shadow-[0_20px_50px_rgba(0,0,0,0.2)] uppercase">
              <Image
                src="/women.png"
                priority
                alt="Women Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90 z-10"></div>
              <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  Women
                </span>
                <span className="text-sm font-medium text-white/80 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
            <Link
              href="/shop?category=Kids"
              className="group relative h-72 md:h-96 overflow-hidden rounded-3xl items-center justify-center flex shadow-[0_20px_50px_rgba(0,0,0,0.2)] uppercase">
              <Image
                src="/kid.png"
                priority
                alt="Kids Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90 z-10"></div>
              <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  Kids
                </span>
                <span className="text-sm font-medium text-white/80 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Products Placeholder */}
      <section className="py-20 md:py-28 bg-gray-50 flex-1">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-black mb-4 tracking-widest uppercase">
              New Drop
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
              Latest Arrivals
            </h2>
            <Link
              href="/shop"
              className="text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              Explore Full Collection
            </Link>
          </div>
          <Suspense
            fallback={
              <div className="text-sm text-gray-500 text-center py-24 animate-pulse">
                Curating latest pieces...
              </div>
            }>
            <LatestProducts />
          </Suspense>

          <div className="mt-16 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-10 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-xl hover:shadow-2xl active:scale-95 group">
              Load More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 group-hover:translate-y-1 transition-transform">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

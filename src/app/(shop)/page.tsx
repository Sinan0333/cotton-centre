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
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(4).lean();
  
  return <ProductGrid products={JSON.parse(JSON.stringify(products))} />;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Space */}
      <BannerCarousel />

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/shop?category=Men" className="group relative h-48 md:h-64 overflow-hidden rounded-xl bg-gray-100 items-center justify-center flex transition-transform hover:-translate-y-1 hover:shadow-lg">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10"></div>
               <span className="relative z-20 text-2xl font-bold text-gray-800 bg-white/90 px-6 py-2 rounded-full">Men</span>
            </Link>
            <Link href="/shop?category=Women" className="group relative h-48 md:h-64 overflow-hidden rounded-xl bg-gray-100 items-center justify-center flex transition-transform hover:-translate-y-1 hover:shadow-lg">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10"></div>
               <span className="relative z-20 text-2xl font-bold text-gray-800 bg-white/90 px-6 py-2 rounded-full">Women</span>
            </Link>
            <Link href="/shop?category=Kids" className="group relative h-48 md:h-64 overflow-hidden rounded-xl bg-gray-100 items-center justify-center flex transition-transform hover:-translate-y-1 hover:shadow-lg">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10"></div>
               <span className="relative z-20 text-2xl font-bold text-gray-800 bg-white/90 px-6 py-2 rounded-full">Kids</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Latest Products Placeholder */}
      <section className="py-12 md:py-16 bg-gray-50 flex-1">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold tracking-tight">Latest Arrivals</h2>
             <Link href="/shop" className="text-sm font-medium hover:underline text-gray-600">View All</Link>
          </div>
          <Suspense fallback={<div className="text-sm text-gray-500 text-center py-12">Loading latest products...</div>}>
            <LatestProducts />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

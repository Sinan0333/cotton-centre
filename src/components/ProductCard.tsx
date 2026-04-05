import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/models/Product";
import { ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: Partial<IProduct> & { _id?: string } }) {
  const imageUrl = product.images && product.images.length > 0 
      ? product.images[0] 
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl h-full flex flex-col bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {/* We use a standard img tag with object-cover here or Next Info. Replace with next/image later if hostname is configured */}
          <img
            src={imageUrl}
            alt={product.name || "Product"}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold tracking-wide rounded-full text-gray-800 shadow-sm">
          {product.category}
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex justify-center">
          <Link 
            href={`/product/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full bg-white/95 backdrop-blur-md text-black font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">View Details</span>
          </Link>
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col justify-between bg-white z-10 relative">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-base md:text-lg line-clamp-1 mb-2 group-hover:text-black/70 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <div className="font-extrabold text-lg md:text-xl text-gray-900 tracking-tight">
            ₹{product.price}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

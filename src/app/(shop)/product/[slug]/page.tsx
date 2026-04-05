import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ShareButton } from "@/components/ShareButton";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function ProductContent({ matchSlug }: { matchSlug: string }) {
  await connectToDatabase();
  const product = await Product.findOne({ slug: matchSlug }).lean();

  if (!product) {
    notFound();
  }

  // Fetch related items with identical category but not this item itself
  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id }
  }).limit(4).lean();

  const defaultImage = product.images && product.images.length > 0 
      ? product.images[0] 
      : "https://via.placeholder.com/600x800?text=No+Image";

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const baseUrl = `${protocol}://${host}`;
  const productUrl = `${baseUrl}/product/${product.slug}`;

  const messageText = `Hi, I'm interested in this product: ${product.name} - ₹${product.price}.\nHere is the link: ${productUrl}\n\nCan you share similar products?`;
  const message = encodeURIComponent(messageText);
  
  // Use environment variable for the WhatsApp number, fallback to a placeholder
  const whatsappNumber = process.env.WHATSAPP_NUMBER || "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 bg-white">
      <Link href="/shop" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-100">
            <img 
              src={defaultImage} 
              alt={product.name} 
              className="object-cover w-full h-full"
            />
          </div>
          {/* Thumbnails (Static representation since simple image logic right now) */}
          {(product.images && product.images.length > 1) && (
            <div className="flex gap-2 overflow-x-auto pb-2 shrink-0">
              {product.images.map((img: string, i: number) => (
                <div key={i} className="w-20 h-24 relative rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={img} alt="" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2 uppercase text-xs font-bold tracking-wide text-gray-500">
            {product.category}
          </div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <ShareButton title={product.name} />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-6">
            ₹{product.price?.toFixed(2)}
          </div>
          
          <div className="prose prose-sm text-gray-600 mb-8 whitespace-pre-wrap">
            {product.description}
          </div>

          <div className="space-y-6 mb-8">
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <div key={size} className="border border-gray-200 rounded-md px-4 py-2 text-sm font-medium hover:border-black cursor-pointer">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <div key={color} className="border border-gray-200 rounded-md px-4 py-2 text-sm font-medium hover:border-black cursor-pointer">
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Stock */}
            <div className="flex items-center text-sm font-medium text-green-600">
               <Check className="mr-2 h-4 w-4" /> 
               {product.stock > 0 ? "In Stock" : "Available"}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3 sticky bottom-28 md:bottom-4 z-10">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full h-14 text-lg rounded-xl shadow-lg border-2 border-transparent bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              Shop Now on WhatsApp
            </a>
            <p className="text-xs text-center text-gray-500">Redirects to WhatsApp with pre-filled message</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-20 border-t border-gray-100 pt-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Related Products</h2>
          <ProductGrid products={JSON.parse(JSON.stringify(relatedProducts))} showControls={false} />
        </div>
      )}
    </div>
  );
}

export default async function ProductPage(props: { params: { slug: string } }) {
  const resolvedParams = await Promise.resolve(props.params);

  return (
    <Suspense fallback={<div className="container px-4 py-24 text-center">Loading product...</div>}>
      <ProductContent matchSlug={resolvedParams.slug} />
    </Suspense>
  );
}

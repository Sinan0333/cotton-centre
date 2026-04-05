import { Suspense } from "react";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterDrawer } from "@/components/FilterDrawer";

export const dynamic = "force-dynamic";

async function ShopContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  await connectToDatabase();
  
  // Await the searchParams object
  const resolvedParams = await Promise.resolve(searchParams);
  
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

  const query: any = {};
  if (category) query.category = category;
  if (q) query.name = { $regex: q, $options: "i" };

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();

  return (
    <div className="container px-4 md:px-8 py-12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-8 border-b border-gray-200 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-3">
            {category ? `${category} Collection` : "All Products"}
          </h1>
          <p className="text-lg text-gray-500 font-light">
            {q ? `Search results for "${q}"` : "Discover our complete range of premium clothing designed and crafted for your everyday style."}
          </p>
          <div className="mt-4 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} available
          </div>
        </div>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid 
           products={JSON.parse(JSON.stringify(products))} 
           showControls={true} 
           filterControls={<FilterDrawer />}
        />
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center">
           <h3 className="text-2xl font-bold tracking-tight mb-2">No products found</h3>
           <p className="text-gray-500">We couldn't find anything matching your current filters.</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage(props: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="container px-4 py-24 text-center">Loading products...</div>}>
        <ShopContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

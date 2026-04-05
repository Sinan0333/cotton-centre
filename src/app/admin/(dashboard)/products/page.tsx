import Link from "next/link";
import { Plus } from "lucide-react";

import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { AdminProductGrid } from "@/components/AdminProductGrid";
import { FilterDrawer } from "@/components/FilterDrawer";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage(props: { searchParams: { [key: string]: string | string[] | undefined } }) {
  await connectToDatabase();
  
  // Await search params for Next.js 16
  const resolvedParams = await Promise.resolve(props.searchParams);
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

  const query: any = {};
  if (category) query.category = category;
  if (q) query.name = { $regex: q, $options: "i" };

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold tracking-tight">Products Management</h1>
           <div className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
             {products.length} {products.length === 1 ? 'Product' : 'Products'} found
           </div>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/80">
          <Plus className="h-4 w-4 mr-2"/> Add Product
        </Link>
      </div>

      <AdminProductGrid 
        products={JSON.parse(JSON.stringify(products))} 
        filterControls={<FilterDrawer />}
      />
    </div>
  );
}

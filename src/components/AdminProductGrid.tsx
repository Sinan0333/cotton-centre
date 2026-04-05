"use client";

import { useState } from "react";
import Link from "next/link";
import { IProduct } from "@/models/Product";
import { DeleteProductButton } from "./DeleteProductButton";
import { Edit, PackageOpen } from "lucide-react";

interface AdminProductGridProps {
  products: (Partial<IProduct> & { _id?: string })[];
  filterControls?: React.ReactNode;
}

export function AdminProductGrid({ products, filterControls }: AdminProductGridProps) {
  // Options: 1, 2, 3, or 4 columns
  const [columns, setColumns] = useState<1 | 2 | 3 | 4>(3);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300">
        <PackageOpen className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold tracking-tight mb-2">No products found</h3>
        <p className="text-gray-500">Go ahead and add your first product to get started.</p>
      </div>
    );
  }

  const getGridClass = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2";
      case 3: return "grid-cols-2 sm:grid-cols-2 xl:grid-cols-3";
      case 4: return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
      default: return "grid-cols-2 sm:grid-cols-2 xl:grid-cols-3";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Grid Controls Toolbar */}
      <div className="flex flex-row items-center justify-between mb-4 gap-4">
        <div className="flex items-center justify-start shrink-0">
          {filterControls}
        </div>
        <div className="flex items-center bg-white p-1 rounded-full border border-gray-200 shadow-sm shrink-0">
          <button
            onClick={() => setColumns(1)}
            className={`p-2 rounded-full transition-all ${columns === 1 ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-black'}`}
            aria-label="1 column"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="5" width="18" height="14" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setColumns(2)}
            className={`p-2 rounded-full transition-all ${columns === 2 ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-black'}`}
            aria-label="2 columns"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="18" rx="1" />
              <rect x="14" y="3" width="7" height="18" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setColumns(3)}
            className={`hidden sm:block p-2 rounded-full transition-all ${columns === 3 ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-black'}`}
            aria-label="3 columns"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="3" width="5" height="18" rx="1" />
              <rect x="9.5" y="3" width="5" height="18" rx="1" />
              <rect x="17" y="3" width="5" height="18" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setColumns(4)}
            className={`hidden lg:block p-2 rounded-full transition-all ${columns === 4 ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-black'}`}
            aria-label="4 columns"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
               <rect x="1" y="3" width="4" height="18" rx="0.5" />
               <rect x="6.6" y="3" width="4" height="18" rx="0.5" />
               <rect x="12.2" y="3" width="4" height="18" rx="0.5" />
               <rect x="18" y="3" width="4" height="18" rx="0.5" />
             </svg>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid ${getGridClass()} gap-4 md:gap-6 transition-all duration-500`}>
        {products.map((product) => (
          <div key={product._id} className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image acts as header */}
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
               {product.images && product.images[0] ? (
                 <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
               ) : (
                 <div className="h-full w-full flex items-center justify-center text-gray-400">No Image</div>
               )}
               {/* Stock Badge */}
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                 {product.stock} in stock
               </div>
               <div className="absolute top-3 right-3 bg-black/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                 {product.category}
               </div>
            </div>
            
            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
               <div>
                  <h3 className="font-extrabold text-lg truncate tracking-tight">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-500 text-sm mt-1 mb-4 line-clamp-2">{product.description}</p>
                  )}
               </div>
               
               <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="font-bold text-xl">₹{product.price?.toFixed(2)}</div>
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product._id}/edit`} className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-700 hover:bg-black hover:text-white rounded-xl transition-colors" aria-label="Edit Product">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteProductButton id={product._id as string} />
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

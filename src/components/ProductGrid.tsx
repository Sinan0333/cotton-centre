"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { IProduct } from "@/models/Product";

interface ProductGridProps {
  products: (Partial<IProduct> & { _id?: string })[];
  showControls?: boolean;
  filterControls?: React.ReactNode;
}

export function ProductGrid({ products, showControls = false, filterControls }: ProductGridProps) {
  // Options: 1, 2, 3, or 4 columns
  const [columns, setColumns] = useState<1 | 2 | 3 | 4>(3);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-32 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold tracking-tight mb-2">No products found</h3>
        <p className="text-gray-500">Check back later for new arrivals.</p>
      </div>
    );
  }

  const getGridClass = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2 lg:grid-cols-2";
      case 3: return "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
      case 4: return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default: return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Grid Controls Toolbar */}
      {showControls && (
        <div className="flex flex-row items-center justify-between mb-4 border-b border-gray-100 pb-4 gap-4">
          <div className="flex items-center justify-start shrink-0">
             {filterControls}
          </div>
          <div className="flex items-center justify-center bg-gray-100/80 p-1 rounded-full border border-gray-200 shrink-0">
            <button
              onClick={() => setColumns(1)}
              className={`p-2 rounded-full transition-all ${columns === 1 ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-900'}`}
              aria-label="1 column"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="5" width="18" height="14" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setColumns(2)}
              className={`p-2 rounded-full transition-all ${columns === 2 ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-900'}`}
              aria-label="2 columns"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="3" width="7" height="18" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setColumns(3)}
              className={`hidden md:block p-2 rounded-full transition-all ${columns === 3 ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-900'}`}
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
              className={`hidden lg:block p-2 rounded-full transition-all ${columns === 4 ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-900'}`}
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
      )}

      {/* Grid */}
      <div className={`grid ${getGridClass()} gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 transition-all duration-500`}>
        {products.map((product) => (
          <ProductCard key={product._id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

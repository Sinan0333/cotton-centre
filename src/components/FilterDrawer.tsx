"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORY_STRUCTURE } from "@/lib/constants";

export function FilterDrawer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [open, setOpen] = useState(false);
  
  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("q") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const [category, setCategory] = useState(currentCategory);
  const [search, setSearch] = useState(currentSearch);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("q", search);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    
    router.push(`/shop?${params.toString()}`);
    setOpen(false);
  };

  const clearFilters = () => {
    setCategory("");
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    router.push(`/shop`);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-6 py-3 rounded-full hover:bg-gray-50 transition-all text-sm font-semibold active:scale-95 group">
        <SlidersHorizontal className="h-4 w-4 text-black group-hover:rotate-90 transition-transform duration-300" />
        <span>Filter & Sort</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[450px] overflow-y-auto bg-white/95 backdrop-blur-xl border-l border-white/20 p-8">
        <SheetHeader className="mb-10 text-left border-b border-gray-100 pb-6">
          <SheetTitle className="text-3xl font-extrabold tracking-tighter">Shop Filters</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-10">
          <div className="space-y-4">
            <Label htmlFor="search" className="text-sm font-bold text-gray-800 tracking-wide uppercase">Search Keyword</Label>
            <div className="relative">
              <Input 
                id="search" 
                placeholder="What are you looking for?" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-4 pr-10 py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-black focus-visible:ring-offset-0 text-base shadow-inner"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <Label className="text-sm font-bold text-gray-800 tracking-wide uppercase">Categories</Label>
            <div className="space-y-6">
              {CATEGORY_STRUCTURE.map((mainCat) => (
                <div key={mainCat.value} className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setCategory(category === mainCat.value ? "" : mainCat.value)}
                    className={`text-lg font-extrabold tracking-tight transition-colors hover:text-black ${
                      category === mainCat.value ? "text-black underline underline-offset-4 decoration-2" : "text-gray-400"
                    }`}
                  >
                    {mainCat.label}
                  </button>
                  <div className="flex flex-wrap gap-2">
                    {mainCat.subcategories.map((sub) => (
                      <button
                        key={sub.value}
                        type="button"
                        onClick={() => setCategory(category === sub.value ? "" : sub.value)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                          category === sub.value
                            ? "bg-black text-white shadow-md scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-800 tracking-wide uppercase">Price Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-black focus-visible:ring-offset-0 text-base shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-black focus-visible:ring-offset-0 text-base shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 pt-10 mt-auto sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pb-6">
          <button 
             className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-200 text-gray-800 font-bold hover:bg-gray-50 transition-colors" 
             onClick={clearFilters}
          >
            Clear All
          </button>
          <button 
             className="flex-1 py-4 px-6 rounded-xl bg-black text-white font-bold tracking-wide hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all" 
             onClick={applyFilters}
          >
            Show Results
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

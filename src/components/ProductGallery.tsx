"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "https://via.placeholder.com/600x800?text=No+Image");

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-100">
        <img 
          src="https://via.placeholder.com/600x800?text=No+Image" 
          alt={name} 
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-[3/4] relative rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100 group">
        <img 
          src={activeImage} 
          alt={name} 
          className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative w-20 h-24 rounded-2xl overflow-hidden bg-gray-50 border-2 transition-all duration-300 shrink-0",
                activeImage === img 
                  ? "border-black scale-105 shadow-md" 
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
              )}
            >
              <img src={img} alt={`${name} view ${i + 1}`} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

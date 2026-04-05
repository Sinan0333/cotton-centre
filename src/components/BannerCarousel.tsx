"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2026",
    description: "Discover the latest trends in comfort and style.",
    cta: "Shop Summer",
    link: "/shop?category=Summer",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Premium Essentials",
    description: "Elevate your everyday wardrobe with our new arrivals.",
    cta: "Shop Essentials",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Kids Collection",
    description: "Comfortable and durable clothing for the little ones.",
    cta: "Shop Kids",
    link: "/shop?category=Kids",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2070&auto=format&fit=crop",
  }
];

export function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    // Auto-scroll
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 group" ref={emblaRef}>
      <div className="flex touch-pan-y">
        {slides.map((slide) => (
          <div key={slide.id} className="relative min-w-full flex-none h-[60vh] md:h-[80vh] flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 md:px-12 max-w-4xl mx-auto transform transition-all duration-700 delay-100 translate-y-0 opacity-100">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light drop-shadow-sm">
                {slide.description}
              </p>
              <Link 
                href={slide.link} 
                className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-10 py-4 text-lg font-medium text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex 
                ? "w-8 h-2 bg-white" 
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

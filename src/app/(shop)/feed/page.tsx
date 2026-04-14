import { LayoutGrid, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FeedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 text-center w-full relative overflow-x-hidden">
      <div className="relative mb-8">
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 bg-black/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
        <div className="relative bg-white p-8 rounded-full shadow-2xl border border-gray-100">
          <LayoutGrid className="h-16 w-16 text-black" />
        </div>
      </div>

      <div className="inline-flex items-center rounded-full bg-black/5 px-4 py-1.5 text-sm font-semibold text-black mb-6 tracking-wider uppercase">
        Coming Soon
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500">
        The Cotton Feed
      </h1>

      <p className="text-gray-500 max-w-lg text-lg md:text-xl font-light mb-12 leading-relaxed">
        We're building a vibrant space to explore the latest fashion trends,
        style stories, and exclusive previews. Stay tuned for a curated
        experience designed for the modern enthusiast.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 group px-8 py-4 bg-black text-white rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95">
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Return Home
      </Link>

      {/* Decorative dots grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-12 gap-12">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-black rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

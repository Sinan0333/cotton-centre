"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${title} at The Cotton Center`,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed
        console.log("Error sharing", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log("Failed to copy", err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className={`p-2 rounded-full border transition-all ${
        copied 
          ? "bg-green-50 border-green-200 text-green-600" 
          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black"
      }`}
      aria-label="Share product"
      title="Share"
    >
      <Share2 className="h-5 w-5" />
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded-md shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
          Link copied!
        </span>
      )}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 px-4 md:px-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <div className="font-bold text-xl md:text-2xl tracking-tighter">Cotton Admin</div>
        </div>
        
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 text-red-600 font-semibold text-sm transition-colors"
        >
          <LogOut className="h-4 w-4" /> 
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

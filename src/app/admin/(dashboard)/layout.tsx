"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, LogOut, LayoutDashboard, Menu, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Logout Confirmation Modal */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300 relative border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl">
                <LogOut className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-center tracking-tight mb-2">Confirm Logout</h3>
            <p className="text-center text-gray-500 mb-8 font-medium">
              Are you sure you want to log out of the admin panel?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white rounded-full py-4 font-bold text-base shadow-md hover:bg-red-700 transition-colors"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="w-full bg-gray-100 text-gray-700 rounded-full py-4 font-bold text-base hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="flex items-center justify-between p-4 px-4 md:px-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src="/Logo.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain" 
          />
          <div className="font-bold text-xl md:text-2xl tracking-tighter">Cotton Centre Admin</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-600 font-semibold text-sm transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">View Store</span>
          </Link>
          
          <button 
            onClick={() => setShowLogoutDialog(true)} 
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 text-red-600 font-semibold text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" /> 
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

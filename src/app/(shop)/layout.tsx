import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  return (
    <>
      <Suspense fallback={
        <div className="sticky top-0 z-50 w-full h-20 bg-white/70 backdrop-blur-xl border-b border-white/20" />
      }>
        <Navbar isAdmin={isAdmin} />
      </Suspense>
      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
      <Footer />
    </>
  );
}

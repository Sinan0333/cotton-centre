import { MetadataRoute } from "next";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Connect to the database using existing logic
  await connectToDatabase();
  
  // Fetch all products, only selecting the fields needed for the sitemap
  const products = await Product.find({}).select("slug updatedAt").lean();

  const baseUrl = "https://cottoncentre.in";

  // Public static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shop/men`,
    },
    {
      url: `${baseUrl}/shop/women`,
    },
    {
      url: `${baseUrl}/shop/kids`,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/feed`,
    },
  ];

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : undefined,
  }));

  return [...routes, ...productRoutes];
}

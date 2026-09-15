import { Suspense } from "react";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterDrawer } from "@/components/FilterDrawer";
import { CATEGORY_STRUCTURE } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const categoryMap: Record<string, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const mappedCategory = categoryMap[resolvedParams.category.toLowerCase()];

  if (!mappedCategory) {
    return {
      title: "Category Not Found | Cotton Centre",
      description: "The requested category could not be found.",
    };
  }

  const titles: Record<string, string> = {
    Men: "Cotton Centre | Men's Clothing in Vilayur & Chundambatta",
    Women: "Cotton Centre | Women's Clothing in Vilayur & Chundambatta",
    Kids: "Cotton Centre | Kids' Clothing in Vilayur & Chundambatta",
  };

  const descriptions: Record<string, string> = {
    Men: "Shop affordable men's readymade clothing at Cotton Centre. Find the best daily wear and local favorites for men in Vilayur and Chundambatta.",
    Women: "Discover budget-friendly women's clothing at Cotton Centre. Shop sarees, kurtis, and daily wear at our local store in Vilayur near Chundambatta.",
    Kids: "Browse our affordable kids' clothing collection at Cotton Centre. We offer comfortable and budget-friendly styles for children in Vilayur and Chundambatta.",
  };

  return {
    title: titles[mappedCategory],
    description: descriptions[mappedCategory],
    alternates: {
      canonical: `/shop/${resolvedParams.category.toLowerCase()}`,
    },
  };
}

async function ShopCategoryContent({
  categoryParam,
  searchParams,
}: {
  categoryParam: string;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await connectToDatabase();

  const resolvedSearchParams = await Promise.resolve(searchParams);
  const mappedCategory = categoryMap[categoryParam.toLowerCase()];

  if (!mappedCategory) {
    notFound();
  }

  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : undefined;
  const minPrice = typeof resolvedSearchParams.minPrice === "string" ? resolvedSearchParams.minPrice : undefined;
  const maxPrice = typeof resolvedSearchParams.maxPrice === "string" ? resolvedSearchParams.maxPrice : undefined;

  const query: any = {};

  const mainCategory = CATEGORY_STRUCTURE.find(
    (c) => c.value === mappedCategory
  );
  
  if (mainCategory) {
    query.category = { $in: mainCategory.subcategories.map((s) => s.value) };
  } else {
    query.category = mappedCategory;
  }

  if (q) query.name = { $regex: q, $options: "i" };

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();

  const categoryLabel = mainCategory ? mainCategory.label : mappedCategory;

  return (
    <div className="container px-4 md:px-8 py-12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-8 border-b border-gray-200 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-3">
            {categoryLabel} Collection
          </h1>
          <p className="text-lg text-gray-500 font-light">
            {q
              ? `Search results for "${q}" in ${categoryLabel}`
              : `Discover our range of budget-friendly ${
                  mappedCategory === "Kids" ? "kids'" : `${mappedCategory.toLowerCase()}'s`
                } readymade clothing in Vilayur & Chundambatta.`}
          </p>
          <div className="mt-4 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
            {products.length} {products.length === 1 ? "Product" : "Products"} available
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductGrid
          products={JSON.parse(JSON.stringify(products))}
          showControls={true}
          filterControls={<FilterDrawer />}
        />
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold tracking-tight mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            We couldn't find anything matching your current filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default async function ShopCategoryPage(props: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolvedParams = await Promise.resolve(props.params);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="container px-4 py-24 text-center">
            Loading products...
          </div>
        }>
        <ShopCategoryContent
          categoryParam={resolvedParams.category}
          searchParams={props.searchParams}
        />
      </Suspense>
    </div>
  );
}

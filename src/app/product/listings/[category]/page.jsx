import ListingCard from "@/components/listingCard/index.jsx";
import { findProductsByCategoryService } from "@/services/product/index.js";
import { headers } from "next/headers";

export default async function CategoryPage() {
  const pathname = headers().get("referer") || "";
  const categoryName = pathname.split("/")[5];

  const products = await findProductsByCategoryService(categoryName);

  return <ListingCard allProducts={products.data} />;
}

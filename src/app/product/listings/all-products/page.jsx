import ListingCard from "@/components/listingCard";
import { getAllAdminProducts } from "@/services/product";
import React from "react";

export default async function AllProducts() {
  const allProducts = await getAllAdminProducts();

  return <ListingCard allProducts={allProducts.data} />;
}

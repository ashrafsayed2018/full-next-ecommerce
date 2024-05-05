import connectToDb from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
connectToDb();
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json({
        success: false,
        message: "the product id is required",
      });
    } else {
      const products = await Product.find({ category: category });

      if (products && products.length) {
        return NextResponse.json({
          success: true,
          data: products,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "no products found",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again",
    });
  }
}

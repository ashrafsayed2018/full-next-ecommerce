import connectToDb from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
connectToDb();
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "the product id is required",
      });
    } else {
      const product = await Product.findById({ _id: productId });

      if (product) {
        return NextResponse.json({
          success: true,
          data: product,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "no product found",
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

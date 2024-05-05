import connectToDb from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

const dynamic = "force-dynamic";
connectToDb();
export async function GET() {
  try {
    const allProducts = await Product.find({}).sort({ createdAt: -1 });

    if (allProducts) {
      return NextResponse.json({
        success: true,
        data: allProducts,
      });
    } else {
      return NextResponse.json({
        success: true,
        status: 204,
        message: "Products not found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again later",
    });
  }
}

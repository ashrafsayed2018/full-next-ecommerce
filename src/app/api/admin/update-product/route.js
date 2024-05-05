import connectToDb from "@/database";
import { AuthUser } from "@/authUser/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
connectToDb();
export async function PUT(req) {
  try {
    const authenticatedUser = await AuthUser(req);
    console.log(`authenticated user: ${authenticatedUser.role}`);
    if (authenticatedUser?.role === "admin") {
      const extractedData = await req.json();
      const {
        _id,
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractedData;
      // update product
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          description,
          price,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        {
          new: true,
        }
      );
      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "product updated successfully",
          data: updatedProduct,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to update product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "sorry you are not allowed to update this product",
      });
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "something went wrong during the update operation",
    });
  }
}

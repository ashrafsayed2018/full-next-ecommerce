import connectToDb from "@/database";
import { AuthUser } from "@/authUser/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();
export async function DELETE(req) {
  try {
    const authenticatedUser = await AuthUser(req);
    if (authenticatedUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "product id is required",
        });
      } else {
        const deletedProduct = await Product.findOneAndDelete(id);
        if (deletedProduct) {
          return NextResponse.json({
            success: true,
            message: "product is deleted successfully",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "failed to delete product",
          });
        }
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "sorry you are not allowed to delete this product",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong during the delete operation",
    });
  }
}

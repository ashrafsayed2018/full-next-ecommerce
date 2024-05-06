import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
connectToDb();
export async function DELETE(req) {
  try {
    const authenticatedUser = await AuthUser(req);
    if (authenticatedUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "cart item not found",
        });
      }
      const deleteCartItem = await Cart.findByIdAndDelete(id);
      if (!deleteCartItem) {
        return NextResponse.json({
          success: false,
          message: "failed to delete cart item",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "cart item deleted successfully",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authenticated",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again",
    });
  }
}

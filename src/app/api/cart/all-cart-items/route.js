import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();
export async function GET(req) {
  try {
    const authenticatedUser = await AuthUser(req);
    if (authenticatedUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "please login first",
        });
      }
      const extractAllCartItems = await Cart.find({ userID: id }).populate(
        "productID"
      );
      if (extractAllCartItems) {
        return NextResponse.json({
          success: true,
          data: extractAllCartItems,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "there is no cart item found",
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

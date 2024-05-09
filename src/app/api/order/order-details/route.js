import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Order from "@/models/order";
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
          message: "product id is required",
        });
      }
      const extractOrder = await Order.findById(id).populate(
        "orderItems.product"
      );
      if (extractOrder) {
        return NextResponse.json({
          success: true,
          data: extractOrder,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to get the order details please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "sorry your are not authenticated",
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

import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();
export async function GET(req) {
  try {
    const authanticatedUser = await AuthUser(req);

    if (authanticatedUser?.role == "admin") {
      const getAllOrders = await Order.find({})
        .populate("orderItems.product")
        .populate("user");
      if (getAllOrders) {
        return NextResponse.json({
          success: true,
          data: getAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to fetch order",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "sorry you are not authanticatedUser",
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

import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();
export async function PUT(req) {
  try {
    const authanticatedUser = await AuthUser(req);

    if (authanticatedUser?.role == "admin") {
      const data = await req.json();

      const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = data;
      const updateOrder = await Order.findOneAndUpdate(
        { _id: _id },
        {
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        {
          new: true,
        }
      );
      if (updateOrder) {
        return NextResponse.json({
          success: true,
          message: "order status updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to update the order status",
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

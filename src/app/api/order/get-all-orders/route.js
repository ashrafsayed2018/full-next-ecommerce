import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Order from "@/models/order";
import mongoose from "mongoose";
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
          message: "user id is required",
        });
      }

      const extractAllOrder = await Order.find({
        user: new mongoose.Types.ObjectId(authenticatedUser),
      }).populate("orderItems.product");
      if (extractAllOrder) {
        return NextResponse.json({
          success: true,
          data: extractAllOrder,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to get all orders please try again",
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

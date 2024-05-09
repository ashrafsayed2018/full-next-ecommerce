import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { getAddress } from "@/services/address";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
connectToDb();
export async function POST(req) {
  try {
    const authenticatedUser = await AuthUser(req);
    if (authenticatedUser) {
      const userAddress = await getAddress(authenticatedUser.id);
      const addressData = userAddress.data;
      const { fullName, country, city, address, postalCode } = addressData;
      const reqData = await req.json();

      const data = {
        ...reqData,
        user: new mongoose.Types.ObjectId(authenticatedUser),
        shippingAddress: { fullName, country, city, address, postalCode },
      };

      const saveNewOrder = await Order.create(data);
      if (saveNewOrder) {
        await Cart.deleteMany({ userID: authenticatedUser.id });
        return NextResponse.json({
          success: true,
          message: "product are on the way",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to create order please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "sorry your are not authenticated ",
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

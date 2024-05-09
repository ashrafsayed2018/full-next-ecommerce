import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const stripe = require("stripe")("sk_test_0gCS2wDOsTWp0XEiTpWAPewe00VQyZUeOP");
connectToDb();
export async function POST(req) {
  try {
    const isAuthenticatedUser = await AuthUser(req);
    if (isAuthenticatedUser) {
      const response = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: response,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        status: 204,
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "you are not authUser. Please login",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "something went wrong please try again",
    });
  }
}

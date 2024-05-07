import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "sorry you are not authenticated",
      });
    }
    const authenticatedUser = AuthUser(req);
    if (!authenticatedUser) {
      return NextResponse.json({
        success: false,
        message: "sorry you are not authenticated",
      });
    } else {
      const address = await Address.find({ userID: id });
      if (address) {
        return NextResponse.json({
          success: true,
          data: address,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to fetch address please try again later",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong during getting the address",
    });
  }
}

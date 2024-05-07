import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();

export async function PUT(req) {
  try {
    const data = await req.json();
    const { _id, fullName, country, city, address, postalCode } = data;

    const authenticatedUser = AuthUser(req);
    if (!authenticatedUser) {
      return NextResponse.json({
        success: false,
        message: "sorry you are not authenticated",
      });
    } else {
      const updatedAdress = await Address.findOneAndUpdate(
        { _id: _id },
        { fullName, country, city, address, postalCode },
        { new: true }
      );
      if (updatedAdress) {
        return NextResponse.json({
          success: true,
          message: "address updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to update address please try again later",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong during updating the address",
    });
  }
}

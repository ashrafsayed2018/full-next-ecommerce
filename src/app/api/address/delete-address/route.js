import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connectToDb();

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "sorry address id is required",
      });
    }
    const authenticatedUser = AuthUser(req);
    if (!authenticatedUser) {
      return NextResponse.json({
        success: false,
        message: "sorry you are not authenticated",
      });
    } else {
      const deleteAddress = await Address.findByIdAndDelete(id);
      if (deleteAddress) {
        return NextResponse.json({
          success: true,
          message: "address is deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete address please try again later",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong during deleting the address",
    });
  }
}

import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const addNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});
connectToDb();
export async function POST(req) {
  try {
    const authenticatedUser = await AuthUser(req);

    if (authenticatedUser) {
      const data = await req.json();

      const { fullName, address, country, city, postalCode, userID } = data;
      const { error } = addNewAddress.validate({
        fullName,
        address,
        country,
        city,
        postalCode,
        userID,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      // add new address
      const newAddress = await Address.create(data);
      if (newAddress) {
        return NextResponse.json({
          success: true,
          message: "address added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add address please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "sorry your are not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong during adding new address",
    });
  }
}

import { AuthUser } from "@/authUser/AuthUser";
import connectToDb from "@/database";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});
connectToDb();
export async function POST(req) {
  try {
    const authenticatedUser = await AuthUser(req);
    if (authenticatedUser) {
      const data = await req.json();

      const userID = authenticatedUser.id;

      const { productID } = data;
      const finalData = { ...data, userID };
      const { error } = AddToCart.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isCurrentCartItemExists = await Cart.find({ productID, userID });
      if (isCurrentCartItemExists.length > 0) {
        return NextResponse.json({
          success: false,
          message:
            "this product already exists in the cart please add different product to the cart",
        });
      }
      const saveProductToCart = await Cart.create(finalData);
      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "the product is added to the cart successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add the product to the cart",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authenticated",
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

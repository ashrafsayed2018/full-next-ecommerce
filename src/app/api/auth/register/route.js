import connectToDb from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

// joi package for input validation
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic"; // components will be rendered and data fetched on every incoming request to the server

// Initialize the database connection
connectToDb();
// post api request
export async function POST(req) {
  const { name, password, email, role } = await req.json();
  //   validate the schema
  const { error } = schema.validate({ name, password, email, role });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  //   save the user to the database

  try {
    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: "User is already exists please try with different email",
      });
    } else {
      const hashPassword = await hash(password, 12);
      const createNewUser = await User.create({
        name,
        password: hashPassword,
        email,
        role,
      });
      // check if user created successfully
      if (createNewUser) {
        return NextResponse.json({
          success: true,
          message: "account created successfully",
        });
      }
    }
  } catch (error) {
    console.log(`error in user registration: ${error.message}`);
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again",
    });
  }
}

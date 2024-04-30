import connectToDb from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

// joi package for input validation
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic"; // components will be rendered and data fetched on every incoming request to the server

// post api request
export async function Post(req) {
  await connectToDb();
  const { name, password, email, role } = req.json();

  //   validate the schema
  const { error } = schema.validate(name, password, email, role);

  if (error) {
    return NextResponse({
      success: false,
      message: error.message,
    });
  }

  //   save the user to the database

  try {
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse({
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
      if (createNewUser) {
        return NextResponse({
          success: true,
          message: "account created successfully",
        });
      }
    }
  } catch (error) {
    console.log(`error in user registration: ${error.message}`);
    return NextResponse({
      success: false,
      message: "something went wrong please try again",
    });
  }
}

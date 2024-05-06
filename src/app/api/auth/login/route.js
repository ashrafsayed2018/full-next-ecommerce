import connectToDb from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// joi package for input validation
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic"; // components will be rendered and data fetched on every incoming request to the server

// Initialize the database connection
connectToDb();
// post api request
export async function POST(req) {
  const { email, password } = await req.json();
  // validate the schema
  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // check if user already exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json({
        success: false,
        message: "there is no account with that email",
      });
    }
    // check the password
    const checkPassword = await compare(password, userExists.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "incorrect password",
      });
    }

    // the user now is authenticated then will create jwt token
    const token = jwt.sign(
      {
        id: userExists?._id,
        email: userExists?.email,
        role: userExists?.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );

    const decodedToken = jwt.decode(token); // Decode the token to access its payload

    if (decodedToken && decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000); // Convert the expiration timestamp to a Date object
    }

    const userData = {
      token,
      user: {
        id: userExists?._id,
        name: userExists?.name,
        email: userExists?.email,
        role: userExists?.role,
      },
    };
    return NextResponse.json({
      success: true,
      message: "login successful",
      data: userData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again",
    });
  }
}

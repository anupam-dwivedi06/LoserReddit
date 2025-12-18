import dbConnect from "@/lib/db/Mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import User from "../../../../lib/schema/UserSchema";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
// import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          msg: "Email and Password is required",
        },
        { status: 500 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          msg: "Login Crediancial is wrong",
        },
        { status: 404}
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          msg: "Password is wrong",
        },
        { status: 501 }
      );
    }

    // Now genrate the tokens and cookies
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }

    const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // use secure in Production (HTTPS)
      maxAge: 60 * 60,
      path: "/",
      sameSite: "strict", // critical scrf defence
    });


    return NextResponse.json(
      {
        msg: "Login successfully",
        user: {
          user: user._id,
          email: user.email,
        },
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": serialized,
          
        },
      }
    );
    
  } catch (error) {
    console.log("Login fail: ", error);
    return NextResponse(
      {
        msg: "Error during the Login",
      },
      {
        status: 500,
      }
    );
  }
}

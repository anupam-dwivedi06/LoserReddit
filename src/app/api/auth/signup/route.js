import dbConnect from "@/lib/db/Mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../lib/schema/UserSchema"

// 1. Connect to the database (if not already connected)
// 2. Extract and Validate the Request Body
// 3. Check if the user already exists
// 4. Hash the Password
// 5. Create and Save the New User
// 6. Respond Successfully

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { email, username, password } = body;

    const isUserExits = await User.findOne({ email });

    if (isUserExits) {
      return NextResponse.json(
        { msg: "User already exits || Try with another Email" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return NextResponse.json(
      {
        msg: "User Created successfully",
        user: {
          userId: newUser._id,
          email: newUser.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log("SignUp error : " , err);
    return NextResponse.json({
        msg:"Error occurs during SignUp"
    },
    {
        status:500
    }
)
  }
}

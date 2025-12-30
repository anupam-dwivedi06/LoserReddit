import User from "../../../../lib/schema/UserSchema";
import dbConnect from "@/lib/db/Mongodb";
import { NextResponse } from "next/server";
import {getAuthenticatedUser} from "../../../../lib/userDetailsToken/getUserToken";

export async function PATCH(req) {
  await dbConnect();

  try {
    const user = await getAuthenticatedUser();

    const { username } = await req.json();

    const updateUser = await User.findByIdAndUpdate(
      user.id,
      { username },
      { new: true }
    );
    return NextResponse.json(
      {
        msg: "User update is done",
        success: true,
        user: updateUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Unauthorized ! User not found",
      },
      { status: 404 }
    );
  }
}



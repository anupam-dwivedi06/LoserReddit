import dbConnect from "@/lib/db/Mongodb";
import Stroy from "@/lib/schema/StorySchema";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();

    // Combined populate for author and comment users
    const post = await Stroy.findById(id)
      .populate("auther", "username")
      .populate("comments.user", "username");

    if (!post) {
      return NextResponse.json({ msg: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        post,
        currentUserId: user ? user.id : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Fail to fetch story" }, { status: 500 });
  }
}

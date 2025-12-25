import getAuthenticatedUser from "@/lib/userDetailsToken/getUserToken";
import Story from "@/lib/schema/StorySchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          msg: "Unothrized",
        },
        { status: 401 }
      );
    }

    const likeposts = await Story.find({ like: user.id });

    if (!likeposts || likeposts.length === 0) {
      return NextResponse.json(
        { msg: "No liked stories found", likeposts: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        likeposts,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Fail to find liked posts",
      },
      { status: 500 }
    );
  }
}

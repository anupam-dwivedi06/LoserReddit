import dbConnect from "@/lib/db/Mongodb";
import Story from "@/lib/schema/StorySchema";
import User from "@/lib/schema/UserSchema";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}) {
  await dbConnect();

  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          msg: "No user found in storydelete route",
        },
        { status: 404 }
      );
    }
    const userId = await user.id;
    // console.log("user id comes from the delete server", userId)
    const {id: storyid} = await params;
    // console.log("Story id comes from the delete server", storyid);

    if (!storyid) {
      return NextResponse.json(
        {
          msg: "There is no story id",
        },
        { status: 404 }
      );
    }

    const storytodelete = await Story.findById(storyid);
    // console.log("story comes fromt the delete server", storytodelete);
    if(!storytodelete){
        return NextResponse.json({
            msd: "There is no story belongs to storyid"
        }, {status:404})
    }

    if (storytodelete.auther.toString() !== user.id) {
        return NextResponse.json({
            msg:"You are not authentic person to delete the post",
        }, {status: 401})
    }

    await Story.findByIdAndDelete(storytodelete);

    await User.findByIdAndUpdate(userId, {
      $pull: { posts: storyid },
    });

    return NextResponse.json(
      {
        msg: "Story delete Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Fail to delete Story",
      },
      { status: 501 }
    );
  }
}
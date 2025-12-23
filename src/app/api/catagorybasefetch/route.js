import dbConnect from "@/lib/db/Mongodb";
import Story from "@/lib/schema/StorySchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } =  new URL(req.url);
    const category = searchParams.get("category");

    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const stories = await Story.find(query)
      .populate("auther", "username")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        stories,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Fail to fetch the stories based on category",
      },
      { status: 500 }
    );
  }
}

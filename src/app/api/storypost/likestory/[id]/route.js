import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";
import Story from "@/lib/schema/StorySchema";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/Mongodb"; // Don't forget this!

export async function POST(req, { params }) {
    await dbConnect();

    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }

        const userId = user.id;
        const { id: storyid } = await params;

        const story = await Story.findById(storyid);
        if (!story) {
            return NextResponse.json({ msg: "Story not found" }, { status: 404 });
        }

        const isLike = story.like.includes(userId);
        
        // 1. Declare the variable outside so it's accessible everywhere
        let updatelikestory;
    

        if (isLike) {
            updatelikestory = await Story.findByIdAndUpdate(
                storyid, 
                { $pull: { like: userId } }, 
                { new: true }
            );
        } else {
            updatelikestory = await Story.findByIdAndUpdate(
                storyid, 
                { $addToSet: { like: userId } }, 
                { new: true }
            );
        }

        // 2. Return the updated array
        return NextResponse.json({
            success: true,
            like: updatelikestory.like // Match this to what your frontend expects
        }, { status: 200 });

    } catch (error) {
        console.error("Like Error:", error);
        return NextResponse.json({
            msg: "fail to like Post"
        }, { status: 500 });
    }
}
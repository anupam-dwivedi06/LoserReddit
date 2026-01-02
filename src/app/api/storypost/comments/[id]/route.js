import User from "@/lib/schema/UserSchema";
import Story from "@/lib/schema/StorySchema";
import dbConnect from "@/lib/db/Mongodb";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        await dbConnect();

        const user = await getAuthenticatedUser();
        if (!user) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }

        const userId = user.id;
        const { comment } = await req.json(); // Use this variable name below

        if (!comment || comment.trim() === "") {
            return NextResponse.json({ msg: "Comment text is required" }, { status: 400 });
        }

        const { id: storyid } = await params;

        const updatedStory = await Story.findByIdAndUpdate(
            storyid,
            {
                $push: {
                    comments: {
                        user: userId,
                        text: comment, // Match the variable from req.json()
                        createdAt: new Date()
                    }
                }
            },
            { new: true }
        ).populate("comments.user", "username"); // Highly recommended so the UI shows the name immediately

        return NextResponse.json({
            success: true,
            comments: updatedStory.comments 
        }, { status: 201 });

    } catch (error) {
        console.error("Comment Error:", error);
        return NextResponse.json({
            msg: "Fail to add comment"
        }, { status: 500 });
    }
}
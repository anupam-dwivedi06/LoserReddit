import User from "@/lib/schema/UserSchema"
import Story from "@/lib/schema/StorySchema"
import dbConnect from "@/lib/db/Mongodb"
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken"
import { NextResponse } from "next/server";


export async function DELETE(req, {params}) {
    await dbConnect();

    try {
        const {id: storyid} = await params;
        const {commentid} = await req.json();

        if(!storyid || !commentid){
            return NextResponse.json({ msg: "There is no Storyid or commentId" }, {status: 500})
        }
        const user = await getAuthenticatedUser();
        if(!user){
            return NextResponse.json({ msg: "There is no user" }, {status: 500})    
        }

        const story = await Story.findById(storyid);
        if(!story){
            return NextResponse.json({ msg: "There is no Story" }, {status: 500})    
        }

        const comment = story.comments.id(commentid);
        if(!comment){
            return NextResponse.json({msg: "There is no comment id found"}, {status: 404})
        }

        if(comment.user.ToString() === user.id){
            const updatecommentlist = await Story.findByIdAndUpdate(
                storyid,
                {$pull: {comments: {_id: commentid}}},
                { new: true }
            ).populate("comments.user", "username");
        }

        return NextResponse.json({
            msg: "Comment is deleted",
            comments: updatecommentlist.comments,
        }, {status: 200})

    } catch (error) {   
        return NextResponse.json({
            msg: "Fail to delete Comment"
        }, {status: 404})
    }
}


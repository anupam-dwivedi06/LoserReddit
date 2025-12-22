import {getAuthenticatedUser} from "@/lib/userDetailsToken/getUserToken";
import Story from "@/lib/schema/StorySchema";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/Mongodb";

export async function GET(req) {
    await dbConnect();

   try {
     const user = await getAuthenticatedUser();
    if(!user){
        return NextResponse.json({
            msg:"There is no user found in the myallpost route"
        }, {status:401})
    }

    const userId = user.id;
    console.log("UserId comes from the MY All Posts Route",userId);

    const AllStories = await Story.find({auther: userId}).sort({createdAt: -1});
    console.log(AllStories);

    return NextResponse.json({
        success: true,
        posts: AllStories
    }, {status:200})
   } catch (error) {
    return NextResponse.json({
        msg: "Fail to fetch posts",
        error: error.msg
    }, {status:500})    
   }
}

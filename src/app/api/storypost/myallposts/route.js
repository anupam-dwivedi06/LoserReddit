import {getAuthenticatedUser} from "@/lib/userDetailsToken/getUserToken";
import Story from "@/lib/schema/StorySchema";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/Mongodb";

export default async function GET(req) {
    await dbConnect();

   try {
     const user = await getAuthenticatedUser();
    if(!user){
        return NextResponse.json({
            msg:"There is no user found in the myallpost route"
        }, {status:500})
    }

    const userId = user.id;

    const AllStories = Story.find({auther: userId}).sort({createdAt: -1});

    return NextResponse.json({
        success: true,
        AllStories
    }, {status:200})
   } catch (error) {
    return NextResponse.json({
        msg: "Fail to fetch posts",
        error: error.msg
    }, {status:500})    
   }
}

import dbConnect from '@/lib/db/Mongodb';
// import getAuthenticatedUser from "../../../../lib/userDetailsToken/getUserToken"
import {getAuthenticatedUser} from "@/lib/userDetailsToken/getUserToken"
import User from '@/lib/schema/UserSchema';
import Story from "@/lib/schema/StorySchema"
import { NextResponse } from 'next/server';

export default async function POST(req) {

    await dbConnect();
    try {
        
    const user = getAuthenticatedUser();
    if(!user){
        return NextResponse.json({
            msg:"There is no user login ! error comes from the StoryPost route"
        }, {status:500})
    }
    const userId = user.id;
    const {title, story, category} = req.json();

    const newStory  = await Story.create({
        title: title,
        story: story,
        category: category,
        auther: userId,
    })

    // update the user

    await User.findByIdAndUpdate(userId,{
        $push: {posts: newStory._id}
    })

    return NextResponse.json({
        success: true,
        newStory,
    })
    } catch (error) {
        return NextResponse.json({
            msg: "Fail to add new story"
        }, {status:500})
    }
}
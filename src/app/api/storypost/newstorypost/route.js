import dbConnect from '@/lib/db/Mongodb';
// import getAuthenticatedUser from "../../../../lib/userDetailsToken/getUserToken"
import {getAuthenticatedUser} from "@/lib/userDetailsToken/getUserToken"
import User from '@/lib/schema/UserSchema';
import Story from "@/lib/schema/StorySchema"
import { NextResponse } from 'next/server';

export async function POST(req) {

    await dbConnect();
    try {
        
    const user = await getAuthenticatedUser();
    // console.log(user);
    if(!user){
        return NextResponse.json({
            msg:"There is no user login ! error comes from the StoryPost route"
        }, {status:401})
    }
    const userId = user.id;
    console.log(userId);
    const {title, story, category} = await req.json();

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
    }, {status:200})

    }
     catch (error) {
        return NextResponse.json({
            msg: "Fail to add new story"
        }, {status:500})
    }
}
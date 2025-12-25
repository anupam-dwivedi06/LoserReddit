import dbConnect from "@/lib/db/Mongodb";
import Stroy from "@/lib/schema/StorySchema"
import { NextResponse } from "next/server";
import {getAuthenticatedUser} from "@/lib/userDetailsToken/getUserToken"


export async function GET(req, {params}) {
  await dbConnect();

  try {
    const { id } = await params;
  const post = await Stroy.findById(id).populate("auther", "username");
  const user = await getAuthenticatedUser();

  if(!post){
    return NextResponse.json({
        msg: "There is Story find by this id"
    },{status:404})
  }

  return NextResponse.json({
    post,
    currentUserId: user ? user.id : null,
  }, {status:200})
  
  } catch (error) {
    return NextResponse.json({
        msg: "Fail to fetch specific id Story"
    }, {status: 404})
  }
     
}
import dbConnect from "@/lib/db/Mongodb";
import Stroy from "@/lib/schema/StorySchema"
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
  await dbConnect();

  try {
    const { id } = await params;
  const post = await Stroy.findById(id).populate("auther", "username");

  if(!post){
    return NextResponse.json({
        msg: "There is Story find by this id"
    },{status:404})
  }

  return NextResponse.json({
    post
  }, {status:200})
  
  } catch (error) {
    return NextResponse.json({
        msg: "Fail to fetch specific id Story"
    }, {status: 404})
  }
     
}
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/Mongodb";
import Chatbot from "@/lib/schema/ChatbotSchema";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";

export async function GET() {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ messages: [] });

    const chatData = await Chatbot.findOne({ userId: user.id });
    return NextResponse.json({ messages: chatData ? chatData.messages : [] });
  } catch (error) {
    return NextResponse.json({ error: "Fetch Error" }, { status: 500 });
  }
}
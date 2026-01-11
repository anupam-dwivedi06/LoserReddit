// import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/Mongodb";
import Chatbot from "@/lib/schema/ChatbotSchema";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";

export async function DELETE() {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();
    if (!user) return NextResponse.json({ success: false }, { status: 401 });

    await Chatbot.findOneAndDelete({ userId: user.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete Error" }, { status: 500 });
  }
}
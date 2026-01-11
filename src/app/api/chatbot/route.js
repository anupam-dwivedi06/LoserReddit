import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/Mongodb";
import Chatbot from "@/lib/schema/ChatbotSchema";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";

// 1. INITIALIZE genAI HERE (Global scope)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  await dbConnect();
  try {
    const { message } = await req.json();
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. INITIALIZE the model inside the function
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    const aiResponse = result.response.text();

    // 3. Save to MongoDB
    await Chatbot.findOneAndUpdate(
      { userId: user.id },
      { 
        $push: { 
          messages: [
            { role: "user", text: message },
            { role: "ai", text: aiResponse }
          ] 
        } 
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "AI failed to respond" }, { status: 500 });
  }
}
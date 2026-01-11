import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Force the runtime to NodeJS to avoid Edge function fetch issues
export const runtime = "nodejs"; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Use the 2026 Stable Model ID
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return NextResponse.json({ reply: response.text() });
  } catch (error) {
    console.error("Gemini Error:", error);
    
    // Check if it's a network issue
    if (error.message.includes("fetch failed")) {
      return NextResponse.json({ 
        error: "Connection to Google AI failed. Please check your internet or VPN." 
      }, { status: 500 });
    }

    return NextResponse.json({ error: "AI response failed." }, { status: 500 });
  }
}
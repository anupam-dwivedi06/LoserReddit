import mongoose from "mongoose";

const ChatbotSchema = new mongoose.Schema({
    // Changed from 'user' to 'userId' to match your Route
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // Changed from 'message' to 'messages' (plural is better for arrays)
    messages: [
       {
         role: { type: String, enum: ["user", "ai"], required: true },
         text: { type: String, required: true },
         timestamp: { type: Date, default: Date.now },
       }
    ]
});

// Important: This handles the model compilation correctly in Next.js
export default mongoose.models.Chatbot || mongoose.model("Chatbot", ChatbotSchema);
import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    auther:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        }
    ]

}, {timestamp: true})

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
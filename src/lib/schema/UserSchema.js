import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Story"
      }
    ],

    likestore:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Story",
      }
    ]
  },
  
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

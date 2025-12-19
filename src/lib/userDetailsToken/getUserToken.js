import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../schema/UserSchema";
import dbConnect from "../db/Mongodb";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT secret not found");

    const decode = jwt.verify(token, secret);

    await dbConnect();

    // FIX 1: Use findOne for email and FIX 2: Add await
    const user = await User.findOne({ email: decode.email }).select("-password");
    console.log("User from the getAuthToken : ", user);

    if (!user) {
      console.log("There is no user in getUserToken");
      return null; 
    }

    
    return {
      username: user.username,
      email: user.email,
      id: user._id.toString(), //you can't access it , because you not added id in token then how can you extract it
    };
  } catch (error) {
    console.error("Authentication check failed!", error.message);
    return null;
  }
}
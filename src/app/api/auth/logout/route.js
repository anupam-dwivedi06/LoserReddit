import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookiesStore = await cookies();
    console.log("hii before deleting the token")


    cookiesStore.delete("token");
    console.log("hii after deleting the token")
    return NextResponse.json({
        msg:"You logged out",
    }, {status:209})
  } catch (error) {
    return NextResponse.json({
        msg:"Log out fail"
    }, {status: 500})
  }
}

import dbConnect from "@/lib/db/Mongodb";
import User from "@/lib/schema/UserSchema";
import { getAuthenticatedUser } from "@/lib/userDetailsToken/getUserToken";
import Story from "@/lib/schema/StorySchema"
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const user = await getAuthenticatedUser();
    console.log(user.username);

    if (!user) {
      return NextResponse.json(
        {
          msg: "Unothrised",
        },
        { status: 500 }
      );
    }

    // const userlikestory = await User.find({ likestore: user.id }); here you will get null , because you are now find user first kyuki like stories ki id to uske likestore me hai aur tum whole user object ko doondh rhe ho , now what to do , find the user by there user.id then populate it whith path , model and if you want field too so  use select
    const userlikestories = await User.findById(user.id).populate({
      path: "likestore", // id's store
      model: "Story", // id's house , where path id's are store , vaise to likestore me ref hota hai but good to write the model
      // select: "title story like"
    });

    if (!userlikestories) {
      return NextResponse.json(
        {
          msg: "Fail to get user like stories",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      mestorylike: userlikestories.likestore || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Fail to User Like Stories",
      },
      { status: 404 }
    );
  }
}















// import getAuthenticatedUser from "@/lib/userDetailsToken/getUserToken";
// import Story from "@/lib/schema/StorySchema";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     const user = await getAuthenticatedUser();
//     if (!user) {
//       return NextResponse.json(
//         {
//           msg: "Unothrized",
//         },
//         { status: 401 }
//       );
//     }

//     const likeposts = await Story.find({ like: user.id });

//     if (!likeposts || likeposts.length === 0) {
//       return NextResponse.json(
//         { msg: "No liked stories found", likeposts: [] },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         likeposts,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         msg: "Fail to find liked posts",
//       },
//       { status: 500 }
//     );
//   }
// }

/* The uppe side of the code is fetch the like sotries by triversing the each story and check the user is present or not is user od is present then it fetch and show us , this is wrong because if you have 2000 stories you can't get response earlier , so the flow is whenever user like the sotry , just append the story id in user so , we can fetch these specific id's of story  */

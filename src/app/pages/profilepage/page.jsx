import React from "react";
import { getAuthenticatedUser } from "../../../lib/userDetailsToken/getUserToken";

const page = async () => {
  const user = await getAuthenticatedUser();
  // console.log("User from the profilepage", user.username);
  return (
    <div className="flex items-center w-screen h-[80vh]">
      <div className="mx-auto w-4/5 bg-red-600 p-12 rounded-2xl">
        <h1 className="text-center text-white text-4xl md:text-4xl font-bold">
          Welcome {user.username}
        </h1>
        <div className="p-8 mt-8 flex flex-col gap-8">
          <div className="flex text-white">
            <span calssName="font-semibold">email : </span> <p> {user.email}</p>
          </div>
          <div className="flex text-white">
            <span calssName="font-semibold">username : </span>{" "}
            <p>{user.username}</p>
          </div>
          <div className="flex text-white">
            <span calssName="font-semibold">UserId : </span> <p>{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

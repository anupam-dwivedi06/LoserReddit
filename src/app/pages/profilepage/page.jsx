import React from 'react'
import {getAuthenticatedUser} from "../../../lib/userDetailsToken/getUserToken"

const page = async () => {
    const user = await getAuthenticatedUser();
    // console.log("User from the profilepage", user.username);
  return (
    <div className='flex items-center w-screen h-[80vh]'>
        <div className='mx-auto w-4/5 bg-amber-200 p-4 rounded-2xl'>
            <h1 className='text-center text-white text-4xl md:text-4xl font-bold'>Welcome {user.username}</h1>
            <div>
                <div>
                    <span>email : </span> <p>{user.email}</p>
                </div>
                <div>
                    <span>username : </span> <p>{user.username}</p>
                </div>
                <div>
                    <span>userId : </span> <p>{user._id}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
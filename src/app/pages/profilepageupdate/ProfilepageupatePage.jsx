"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const profilepageupatePage = ({user}) => {
    const [username, setusername] = useState(user.username);
    const router = useRouter();

    const handlesubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch("/api/auth/updateuser",{
            method:"PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username}),
        })

        if(res.ok){
            console.log("User Updated Successfully");
            router.push("/pages/profilepage");
            router.refresh();
        } else{
            console.log("update fail");
        }
    }
  return (
  <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center p-4">
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      <p className="text-gray-500 text-sm">Update your public profile information</p>
    </div>

    <form onSubmit={handlesubmit} className="space-y-6">
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="username" 
          className="text-sm font-semibold text-gray-700 ml-1"
        >
          Username
        </label>
        <input 
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}    
          onChange={(e) => setusername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]"
      >
        Update Profile
      </button>
    </form>
  </div>
</div>
  )
}

export default profilepageupatePage
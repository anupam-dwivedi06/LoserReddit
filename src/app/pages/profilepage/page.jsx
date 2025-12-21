import React from "react";
import { getAuthenticatedUser } from "../../../lib/userDetailsToken/getUserToken";
import Link from "next/link";
import { User, Mail, Fingerprint, Settings2 } from "lucide-react"; // Optional: icons make it look much better

const ProfilePage = async () => {
  const user = await getAuthenticatedUser();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/50">
            <span className="text-4xl text-white font-bold uppercase">
              {user.username?.charAt(0)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome, {user.username}
          </h1>
          <p className="text-blue-100 mt-2">Personal Profile Overview</p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          <div className="grid gap-6">
            
            {/* Email Field */}
            <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="bg-blue-100 p-3 rounded-xl mr-4 text-blue-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-gray-700 font-medium">{user.email}</p>
              </div>
            </div>

            {/* Username Field */}
            <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4 text-indigo-600">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Username</p>
                <p className="text-gray-700 font-medium">{user.username}</p>
              </div>
            </div>

            {/* User ID Field */}
            <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="bg-purple-100 p-3 rounded-xl mr-4 text-purple-600">
                <Fingerprint size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">User ID</p>
                <p className="text-gray-700 font-mono text-sm text-gray-500">{user.id}</p>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="mt-10">
            <Link href="/pages/profilepageupdate">
              <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]">
                <Settings2 size={18} />
                Update Profile Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
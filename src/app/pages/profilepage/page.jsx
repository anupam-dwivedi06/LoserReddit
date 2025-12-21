import React from "react";
import { getAuthenticatedUser } from "../../../lib/userDetailsToken/getUserToken";
import Link from "next/link";
import { User, Mail, Fingerprint, Settings2, ShieldCheck } from "lucide-react";

const ProfilePage = async () => {
  const user = await getAuthenticatedUser();

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 pt-24">
      <div className="max-w-2xl w-full bg-[#11141B] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
        
        {/* Header Section: Dark Gradient & Brand Accent */}
        <div className="relative bg-gradient-to-br from-[#1A1D23] to-[#0B0E14] p-12 text-center border-b border-white/5">
          {/* Red Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full"></div>
          
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-tr from-red-600 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-900/20 border-4 border-[#11141B]">
              <span className="text-5xl text-white font-black uppercase">
                {user.username?.charAt(0)}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              {user.username}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <ShieldCheck size={16} className="text-red-500" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Verified Member</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 bg-[#11141B]">
          <div className="grid gap-4">
            
            {/* Email Field */}
            <div className="group flex items-center p-5 bg-[#1A1D23] rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 p-3.5 rounded-2xl mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Mail size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Email Address</p>
                <p className="text-gray-200 font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Username Field */}
            <div className="group flex items-center p-5 bg-[#1A1D23] rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 p-3.5 rounded-2xl mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <User size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Display Name</p>
                <p className="text-gray-200 font-semibold">@{user.username}</p>
              </div>
            </div>

            {/* User ID Field */}
            <div className="group flex items-center p-5 bg-[#1A1D23] rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 p-3.5 rounded-2xl mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Fingerprint size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Identity Token</p>
                <p className="text-gray-400 font-mono text-xs truncate max-w-[200px]">{user.id}</p>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="mt-12">
            <Link href="/pages/profilepageupdate">
              <button className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-3xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.97] group">
                <Settings2 size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                Edit Profile Settings
              </button>
            </Link>
            
            <p className="text-center text-gray-600 text-[11px] mt-6 font-medium uppercase tracking-tighter">
              LoseReddit Security Protocol Enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
import React from "react";
import { getAuthenticatedUser } from "../../../lib/userDetailsToken/getUserToken";
import Link from "next/link";
import { User, Mail, Fingerprint, Settings2, ShieldCheck } from "lucide-react";

const ProfilePage = async () => {
  const user = await getAuthenticatedUser();

  return (
    // Reduced outer padding on mobile (p-4 instead of p-6)
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4 md:p-6 pt-24 pb-12">
      
      {/* Adjusted rounding for mobile: rounded-3xl vs rounded-[2.5rem] */}
      <div className="max-w-2xl w-full bg-[#11141B] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-[#1A1D23] to-[#0B0E14] p-8 md:p-12 text-center border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full"></div>
          
          <div className="relative">
            {/* Scaled profile icon for mobile */}
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-tr from-red-600 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl shadow-red-900/20 border-4 border-[#11141B]">
              <span className="text-3xl md:text-5xl text-white font-black uppercase">
                {user.username?.charAt(0)}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter truncate px-2">
              {user.username}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <ShieldCheck size={16} className="text-red-500" />
              <p className="text-gray-400 text-[10px] md:text-sm font-medium uppercase tracking-widest">Verified Member</p>
            </div>
          </div>
        </div>

        {/* Content Section: Scaled padding for mobile */}
        <div className="p-5 md:p-12 bg-[#11141B]">
          <div className="grid gap-3 md:gap-4">
            
            {/* Email Field */}
            <div className="group flex items-center p-4 md:p-5 bg-[#1A1D23] rounded-2xl md:rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 p-3 md:p-3.5 rounded-xl md:rounded-2xl mr-4 md:mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Email Address</p>
                <p className="text-gray-200 font-semibold text-sm md:text-base truncate">{user.email}</p>
              </div>
            </div>

            {/* Username Field */}
            <div className="group flex items-center p-4 md:p-5 bg-[#1A1D23] rounded-2xl md:rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 p-3 md:p-3.5 rounded-xl md:rounded-2xl mr-4 md:mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Display Name</p>
                <p className="text-gray-200 font-semibold text-sm md:text-base truncate">@{user.username}</p>
              </div>
            </div>

            {/* User ID Field */}
            <div className="group flex items-center p-4 md:p-5 bg-[#1A1D23] rounded-2xl md:rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 p-3 md:p-3.5 rounded-xl md:rounded-2xl mr-4 md:mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Fingerprint size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Identity Token</p>
                <p className="text-gray-400 font-mono text-[10px] md:text-xs truncate">{user.id}</p>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="mt-8 md:mt-12">
            <Link href="/pages/profilepageupdate">
              <button className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 md:py-5 rounded-2xl md:rounded-3xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.97] group text-sm md:text-base">
                <Settings2 size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                Edit Profile Settings
              </button>
            </Link>
            
            <p className="text-center text-gray-600 text-[9px] md:text-[11px] mt-6 font-medium uppercase tracking-tighter">
              LoseReddit Security Protocol Enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, CheckCircle2, ArrowLeft, Loader2, Sparkles } from "lucide-react";

const ProfilePageUpdatePage = ({ user }) => {
  const [username, setusername] = useState(user.username);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const res = await fetch("/api/auth/updateuser", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        router.push("/pages/profilepage");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.msg || "Update failed");
      }
    } catch (error) {
      console.error("Update fail", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 pt-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative">
        {/* Back Link */}
        <Link 
          href="/pages/profilepage" 
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 text-sm font-bold group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Link>

        {/* Update Card */}
        <div className="bg-[#11141B] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="text-center mb-10">
            <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500">
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter">Change Handle</h2>
            <p className="text-gray-500 mt-2 font-medium text-sm">Pick a unique name for the community</p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-8">
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1"
              >
                New Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                <input 
                  type="text"
                  id="username"
                  placeholder="e.g. anonymous_soul"
                  value={username}    
                  onChange={(e) => setusername(e.target.value)}
                  className="w-full bg-[#1A1D23] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-600 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button 
                type="submit"
                disabled={isUpdating || username === user.username}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/10 active:scale-[0.98]"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Confirm Changes
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-gray-600 uppercase tracking-tighter font-medium px-4">
                Username changes are reflected immediately across all your posts.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageUpdatePage;
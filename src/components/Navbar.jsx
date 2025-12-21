"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, LogOut, Menu, X, Layers, LayoutGrid } from "lucide-react";

const Navbar = ({ user }) => {
  const [isOpen, setisOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/");
  };

  return (
    <nav className="w-full bg-[#0B0E14] border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Layers size={18} className="text-white" />
            </div>
            <h2 className="text-white font-bold text-xl tracking-tighter">
              Lose<span className="text-red-500">Reddit</span>
            </h2>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/popular" className="hover:text-white transition-colors">Popular</Link>
            <Link href="/pages/post" className="hover:text-white transition-colors font-bold text-red-500">Create Post</Link>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search LoseReddit"
              className="w-full bg-[#1A1D23] border border-transparent focus:border-red-500/50 focus:bg-[#22252C] text-gray-200 text-sm rounded-full py-2 pl-10 pr-4 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4">
          
          {/* All Posts Option */}
          <Link 
            href="/pages/getAllPostsMe" 
            className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all text-sm font-medium border border-white/5"
          >
            <LayoutGrid size={16} />
            <span>All Posts</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Profile Trigger */}
              <Link href="/pages/profilepage" className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-full border border-white/10 transition-all">
                <div className="w-7 h-7 bg-gradient-to-tr from-red-500 to-orange-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block text-left leading-tight">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Member</p>
                  <p className="text-xs text-gray-200 font-bold">{user.username}</p>
                </div>
              </Link>

              <button 
                onClick={handleLogout} 
                className="hidden sm:flex p-2 text-gray-500 hover:text-red-500 rounded-full transition-colors"
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="text-sm font-bold text-gray-400 hover:text-white px-4 py-2">
                Log In
              </Link>
              <Link href="/auth/signup" className="text-sm font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-all">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setisOpen(!isOpen)} className="md:hidden p-2 text-gray-400">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0E14] border-t border-white/5 p-6 space-y-6 animate-in slide-in-from-top-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#1A1D23] rounded-xl p-3 pl-10 text-sm text-white outline-none"
            />
          </div>
          <div className="flex flex-col gap-5 text-gray-400 font-bold text-sm uppercase tracking-widest">
            <Link href="/" onClick={() => setisOpen(false)}>Home</Link>
            <Link href="/pages/allpostme" onClick={() => setisOpen(false)} className="flex items-center gap-2 text-white">
              <LayoutGrid size={18} /> All Posts
            </Link>
            <Link href="/pages/post" onClick={() => setisOpen(false)}>Create Post</Link>
            {user && (
              <button onClick={handleLogout} className="text-red-500 text-left">Logout Account</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
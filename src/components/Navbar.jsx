"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ user }) => {
  const [isOpen, setisOpen] = useState(false);
  const router = useRouter();

  // Function to handle Logout
  const handleLogout = async () => {
    try {
      // We call an API route to clear the cookie
      await fetch("/api/auth/logout", { method: "POST" });
      setisOpen(false);
      router.refresh(); // Refresh the page to update the Server Component (layout.js)
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-5 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <Link href="/">
          <h2 className="text-xl font-bold">Data Fetch</h2>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center">
          <ul className="flex gap-6 items-center">
            <Link href="/"><li>Home</li></Link>
            <Link href="/second"><li>Second</li></Link>

            {user && user.username ? (
              <div className="flex items-center gap-4">
                <Link href="/pages/profilepage">
                <span className="bg-blue-700 px-3 py-1 rounded-full text-sm">
                  Welcome, {user.username}
                </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-1 rounded font-medium">
                Login
              </Link>
            )}
          </ul>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setisOpen(!isOpen)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-500 border-t border-blue-400 p-5 shadow-lg">
            <ul className="flex flex-col gap-5 items-center">
              <Link href="/" onClick={() => setisOpen(false)}><li>Home</li></Link>
              
              {user && user.username ? (
                <>
                  <span className="text-blue-100 italic">Welcome {user.username}</span>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500 p-2 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setisOpen(false)}>
                  <li className="bg-white text-blue-600 px-6 py-2 rounded">Login</li>
                </Link>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
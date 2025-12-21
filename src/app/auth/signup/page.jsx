"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2, Layers, AlertCircle } from "lucide-react";

function SignUp() {
  const router = useRouter();

  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || `Sign up failed: ${response.status}`);
      }

      router.push("/auth/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 pt-24">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="bg-red-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/20">
            <Layers size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Join <span className="text-red-500">LoseReddit</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Create an account to start sharing.</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#11141B] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={handlesubmit} className="space-y-5">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formdata.username}
                  onChange={handlechange}
                  className="w-full bg-[#1A1D23] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formdata.email}
                  onChange={handlechange}
                  className="w-full bg-[#1A1D23] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formdata.password}
                  onChange={handlechange}
                  className="w-full bg-[#1A1D23] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] mt-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Already a member?{" "}
            <Link 
              href="/auth/login" 
              className="text-red-500 font-bold hover:text-red-400 transition-colors"
            >
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
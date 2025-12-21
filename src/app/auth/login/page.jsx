"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, Layers } from "lucide-react";

function Login() { // Capitalized component name (React standard)
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const respond = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (!respond.ok) {
        const errorData = await respond.json();
        throw new Error(errorData.msg || `Login fail: ${respond.status}`);
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      alert(error.message); // Simple error feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-6 pt-24">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="bg-red-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/20">
            <Layers size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Welcome Back to <span className="text-red-500">LoseReddit</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Please enter your details to sign in.</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#11141B] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={handleForm} className="space-y-6">
            
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
                  onChange={handlechange}
                  className="w-full bg-[#1A1D23] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link 
              href="/auth/signup" 
              className="text-red-500 font-bold hover:text-red-400 transition-colors"
            >
              Join the community
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
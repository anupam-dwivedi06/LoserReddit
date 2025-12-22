"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PenTool, Send, ChevronDown, AlignLeft, type, Type } from "lucide-react";

const CreateStoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    title: "",
    story: "",
    category: "", 
  });

  const handlechange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleform = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/storypost/newstorypost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Story shared successfully!");
        router.push("/pages/getAllPostsMe");
        router.refresh();
      } else {
        alert(data.msg || "Post failed");
      }
    } catch (error) {
      console.error("Error posting story:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 pt-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-600/10 p-2 rounded-lg text-red-500">
              <PenTool size={24} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              Create a <span className="text-red-500">Post</span>
            </h1>
          </div>
          <p className="text-gray-400">Share your thoughts, feelings, or secrets with the community.</p>
        </header>

        <form onSubmit={handleform} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">
              Title of the incidence
            </label>
            <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500" size={18} />
              <input
                type="text"
                name="title"
                placeholder="What happened?"
                value={value.title}
                onChange={handlechange}
                required
                className="w-full bg-[#11141B] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-600 font-bold text-lg"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">
              Select Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={value.category}
                onChange={handlechange}
                required
                className="w-full bg-[#11141B] border border-white/5 focus:border-red-500/50 text-white rounded-2xl py-4 px-4 outline-none appearance-none transition-all cursor-pointer font-medium"
              >
                <option value="" disabled className="bg-[#11141B]">Choose a mood...</option>
                <option value="Feeling Low" className="bg-[#11141B]">Feeling Low</option>
                <option value="Funny" className="bg-[#11141B]">Funny / Embarrassing</option>
                <option value="Advice" className="bg-[#11141B]">Question / Advice</option>
                <option value="Rant" className="bg-[#11141B]">Rant / Vent</option>
                <option value="Confession" className="bg-[#11141B]">Confession</option>
                <option value="Anything" className="bg-[#11141B]">Anything</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Story Textarea */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">
              Your Story
            </label>
            <div className="relative group">
              <AlignLeft className="absolute left-4 top-6 text-gray-500 group-focus-within:text-red-500" size={18} />
              <textarea
                name="story"
                rows="8"
                placeholder="Type your feelings here..."
                value={value.story}
                onChange={handlechange}
                required
                className="w-full bg-[#11141B] border border-white/5 focus:border-red-500/50 text-white rounded-[2rem] py-5 pl-12 pr-6 outline-none transition-all placeholder:text-gray-600 resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-800 text-white font-bold py-4 px-10 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]"
            >
              {loading ? "Posting..." : (
                <>
                  Post to LoseReddit <Send size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryPage;
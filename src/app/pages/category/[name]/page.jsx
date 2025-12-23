"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, MessageSquare, Clock, User } from "lucide-react";

const CategoryPage = () => {
  const { name } = useParams(); // Gets the category name from the URL
  const decodedName = decodeURIComponent(name);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Calling your API with the category filter
        const res = await fetch(`/api/catagorybasefetch?category=${name}`);
        console.log("res comes from the cetegory {name}", res)
        const data = await res.json();
        setStories(data.stories || []);
      } catch (err) {
        console.error("Error fetching category stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [name]);

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 transition-colors font-bold text-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-baseline gap-3">
            <h1 className="text-5xl font-black text-white tracking-tighter capitalize">
              {decodedName}
            </h1>
            <span className="text-red-500 font-bold text-xl tracking-tighter">Feed</span>
          </div>
          <p className="text-gray-500 mt-2 text-lg">Browsing all stories tagged as {decodedName}.</p>
        </div>

        {/* Stories List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
            <p className="text-gray-500 font-bold animate-pulse">Loading stories...</p>
          </div>
        ) : stories.length > 0 ? (
          <div className="grid gap-6">
            {stories.map((story) => (
              <Link 
                href={`/pages/idpostuser/${story._id}`} 
                key={story._id}
                className="block bg-[#11141B] border border-white/5 p-8 rounded-[2rem] hover:border-red-500/30 transition-all group shadow-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                  {story.title}
                </h2>
                <p className="text-gray-400 leading-relaxed line-clamp-3 mb-6 font-medium">
                  {story.story}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-red-600" />
                      {story.author?.username || "Anonymous"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-red-600" />
                      {new Date(story.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-red-500 font-black text-xs group-hover:translate-x-1 transition-transform">
                    READ MORE →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#11141B] rounded-[3rem] border border-white/5">
            <p className="text-gray-400 text-xl font-bold mb-4">No stories found here yet.</p>
            <Link href="/pages/post" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all inline-block">
              Share the first story
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
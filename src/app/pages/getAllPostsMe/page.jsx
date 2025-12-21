"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Calendar, MessageSquare, ChevronRight, Loader2, Ghost, Megaphone, Lock, Frown, Laugh, Coffee } from "lucide-react";

const GetAllPostsMe = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get the correct icon/color for categories
  const getCategoryStyles = (category) => {
    switch (category) {
      case "Feeling Low": return { icon: <Frown size={14}/>, color: "text-blue-400 bg-blue-400/10 border-blue-400/20" };
      case "Rant": return { icon: <Megaphone size={14}/>, color: "text-red-400 bg-red-400/10 border-red-400/20" };
      case "Confession": return { icon: <Lock size={14}/>, color: "text-purple-400 bg-purple-400/10 border-purple-400/20" };
      case "Funny": return { icon: <Laugh size={14}/>, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" };
      default: return { icon: <Coffee size={14}/>, color: "text-gray-400 bg-gray-400/10 border-gray-400/20" };
    }
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await fetch("/api/storypost/myposts");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <Loader2 className="text-red-600 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              My <span className="text-red-500 font-black">Stories</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium">Manage and view all your shared moments.</p>
          </div>
          <Link href="/pages/post" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-red-900/20 w-fit">
            + New Story
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => {
              const style = getCategoryStyles(post.category);
              return (
                <div key={post._id} className="bg-[#11141B] border border-white/5 rounded-[2rem] p-6 md:p-8 hover:border-red-500/30 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      {/* Badge */}
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border w-fit mb-4 text-[10px] font-black uppercase tracking-widest ${style.color}`}>
                        {style.icon} {post.category}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 leading-relaxed line-clamp-3 mb-6">
                        {post.story}
                      </p>

                      {/* Footer Info */}
                      <div className="flex items-center gap-6 text-gray-500 text-xs font-bold uppercase tracking-tighter">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare size={14} />
                          0 Comments
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <Link href={`/pages/post/${post._id}`} className="p-4 bg-white/5 rounded-2xl text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#11141B] rounded-[3rem] border border-dashed border-white/10">
            <Ghost className="mx-auto text-gray-700 mb-4" size={60} />
            <h3 className="text-xl font-bold text-gray-400">No stories yet</h3>
            <p className="text-gray-600 mb-8">Your shared moments will appear here.</p>
            <Link href="/pages/post" className="text-red-500 font-black hover:underline">
              Start your first story
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllPostsMe;
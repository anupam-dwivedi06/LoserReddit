"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  Loader2, 
  Heart, 
  Megaphone, 
  Lock, 
  Frown, 
  Laugh, 
  Coffee,
  Bookmark
} from "lucide-react";

const UserLikePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchMyLikePosts = async () => {
      try {
        const res = await fetch("/api/storypost/likestore", {
          credentials: "include",
        });
        const data = await res.json();
        // FIXED: Using 'mestorylike' to match your GET route return
        setPosts(data.mestorylike || []);
      } catch (err) {
        console.error("Failed to load liked posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyLikePosts();
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
            <div className="flex items-center gap-2 text-red-500 font-bold text-sm uppercase tracking-[0.2em] mb-2">
              <Bookmark size={16} /> Favorite Collection
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              Stories You <span className="text-red-500">Liked</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              A curated list of moments that resonated with you.
            </p>
          </div>
          
          <div className="bg-[#11141B] border border-white/5 px-6 py-3 rounded-2xl">
            <span className="text-gray-500 text-xs font-black uppercase block">Total Saved</span>
            <span className="text-white text-2xl font-black">{posts.length}</span>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => {
              if (!post) return null; // Safety check if a liked story was deleted
              const style = getCategoryStyles(post.category);
              
              return (
                <div key={post._id} className="bg-[#11141B] border border-white/5 rounded-[2rem] p-6 md:p-8 hover:border-red-500/30 transition-all group relative overflow-hidden">
                  {/* Decorative Heart Background Blur */}
                  <div className="absolute -right-4 -top-4 text-red-500/5 group-hover:text-red-500/10 transition-colors">
                    <Heart size={120} fill="currentColor" />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 relative z-10">
                    <div className="flex-1">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border w-fit mb-4 text-[10px] font-black uppercase tracking-widest ${style.color}`}>
                        {style.icon} {post.category}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 leading-relaxed line-clamp-2 mb-6 max-w-2xl">
                        {post.story}
                      </p>

                      <div className="flex items-center gap-6 text-gray-500 text-xs font-bold uppercase tracking-tighter">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={14} className="text-red-500" fill="currentColor" />
                          Liked by You
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <Link href={`/pages/idpostuser/${post._id}`} className="flex items-center gap-2 pl-6 pr-4 py-3 bg-white/5 rounded-2xl text-gray-400 hover:bg-red-600 hover:text-white transition-all font-bold text-sm group/btn">
                        Read Story
                        <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-[#11141B] rounded-[3.5rem] border border-dashed border-white/10">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-red-500/40" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No liked stories yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
              Start exploring the feed and heart the stories that move you.
            </p>
            <Link href="/pages/explore" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-2xl transition-all">
              Go to Feed
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLikePage;
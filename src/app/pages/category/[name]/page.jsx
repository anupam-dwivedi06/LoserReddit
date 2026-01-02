"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`/api/catagorybasefetch?category=${name}`);
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
    <div className="min-h-screen bg-[#0B0E14] px-4 md:px-6 pt-24 pb-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8 md:mb-12"
        >
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 transition-colors font-bold text-sm group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter capitalize">
              {decodedName}
            </h1>
            <span className="text-red-500 font-black text-lg md:text-xl tracking-tighter uppercase italic">Feed</span>
          </div>
          <p className="text-gray-500 mt-2 text-base md:text-lg">Browsing all stories tagged as {decodedName}.</p>
        </motion.div>

        {/* Stories List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
            <p className="text-gray-500 font-bold animate-pulse">Loading stories...</p>
          </div>
        ) : stories.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:gap-6"
          >
            {stories.map((story) => (
              <motion.div key={story._id} variants={cardVariants}>
                <Link 
                  href={`/pages/idpostuser/${story._id}`} 
                  className="block bg-[#11141B] border border-white/5 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-red-500/30 transition-all group shadow-xl active:scale-[0.98]"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-red-500 transition-colors line-clamp-2">
                    {story.title}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-5 md:mb-6 font-medium">
                    {story.story}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 md:pt-6 border-t border-white/5">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-red-600" />
                        <span className="truncate max-w-[80px] md:max-w-none">
                          {story.author?.username || "Anonymous"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-red-600" />
                        {new Date(story.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-red-500 font-black text-[10px] md:text-xs flex items-center gap-1 flex-shrink-0">
                      READ <span className="hidden xs:inline">MORE</span> <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 md:py-20 bg-[#11141B] rounded-[2rem] md:rounded-[3rem] border border-white/5 px-6"
          >
            <p className="text-gray-400 text-lg md:text-xl font-bold mb-6">No stories found here yet.</p>
            <Link href="/pages/post" className="bg-red-600 text-white px-6 md:px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all inline-block hover:scale-105 active:scale-95 text-sm md:text-base">
              Share the first story
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
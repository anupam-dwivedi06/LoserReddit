"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  Tag,
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  Send,
  User as UserIcon,
} from "lucide-react";

const SingleStoryPageUser = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [animate, setAnimate] = useState(false);
  
  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const router = useRouter();
  const isLiked = post?.like?.includes(currentUserId);

  useEffect(() => {
    if (!id) return;
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/storypost/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          setPost(null);
          return;
        }
        const data = await res.json();
        setPost(data.post);
        setcurrentUserId(data.currentUserId);
      } catch (error) {
        console.error("Fail to fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  const handleLike = async () => {
    if (isLiking || !currentUserId) return;
    setIsLiking(true);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    try {
      const res = await fetch(`/api/storypost/likestory/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setPost((prev) => ({
          ...prev,
          like: data.like,
        }));
      }
    } catch (error) {
      console.error("Fail to like", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/storypost/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: commentInput }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setPost((prev) => ({
          ...prev,
          comments: data.comments,
        }));
        setCommentInput("");
      }
    } catch (error) {
      console.error("Error posting comment", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  if (!post) return <div className="text-white text-center mt-20 font-bold">Story not found.</div>;

  return (
    <div className="min-h-screen bg-[#0B0E14] px-4 py-6 md:p-6 pt-24 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 md:mb-8 font-bold text-sm transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Stories
        </motion.button>

        {/* Main Article */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#11141B] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl mb-8"
        >
          <div className="h-2 bg-gradient-to-r from-red-600 to-red-900" />
          <div className="p-5 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
              <span className="px-3 py-1 bg-red-600/10 border border-red-500/20 text-red-500 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} /> {post.category}
              </span>
              <span className="text-gray-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl md:text-5xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tighter">{post.title}</h1>
            <p className="text-gray-300 text-base md:text-xl whitespace-pre-wrap leading-relaxed mb-8 md:mb-12 font-medium opacity-90">{post.story}</p>

            {/* Interaction Bar */}
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/5 gap-4">
              <div className="flex items-center gap-2 md:gap-3">
                <button onClick={handleLike} disabled={isLiking} className={`group flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 font-bold text-xs md:text-sm border active:scale-95 ${isLiked ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30" : "bg-[#1A1D26] border-white/5 text-gray-400 hover:border-red-500/50 hover:text-white"}`}>
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={`transition-all duration-300 ${animate ? "scale-[1.4] rotate-12" : "scale-100 rotate-0"} ${isLiked ? "text-white" : "text-red-500 group-hover:scale-110"}`} />
                  <span>{post?.like?.length || 0} <span className="hidden sm:inline ml-1">Likes</span></span>
                </button>

                <div className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-[#1A1D26] border border-white/5 text-gray-400 font-bold text-xs md:text-sm">
                  <MessageSquare size={18} className="text-blue-500" />
                  <span>{post?.comments?.length || 0} <span className="hidden sm:inline ml-1">Comments</span></span>
                </div>
              </div>
              <button className="p-2.5 text-gray-600 hover:text-white hover:bg-white/5 rounded-xl transition-all"><Share2 size={18} /></button>
            </div>
          </div>
        </motion.article>

        {/* Comment Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#11141B] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10"
        >
          <h3 className="text-lg md:text-xl font-black text-white mb-6 md:mb-8 tracking-tight">Discussion</h3>
          
          <form onSubmit={handleCommentSubmit} className="relative mb-8 md:mb-10 group">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-5 pr-14 text-gray-300 text-sm md:text-base outline-none focus:border-red-500/50 transition-all resize-none min-h-[80px] md:min-h-[100px]"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmittingComment || !commentInput.trim()}
              className="absolute right-3 bottom-3 p-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl transition-all shadow-lg"
            >
              {isSubmittingComment ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </motion.button>
          </form>

          <div className="space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {post?.comments?.length > 0 ? (
                [...post.comments].reverse().map((c, index) => (
                  <motion.div 
                    key={c._id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-3 md:gap-4 p-4 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                      <UserIcon size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <span className="text-xs md:text-sm font-black text-white truncate">
                          {c.user?.username || "Anonymous"}
                        </span>
                        <span className="text-[9px] md:text-[10px] text-gray-600 font-bold uppercase flex-shrink-0">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed break-words">{c.text}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 md:py-10">
                  <p className="text-gray-600 font-bold text-xs md:text-sm italic">No comments yet.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SingleStoryPageUser;
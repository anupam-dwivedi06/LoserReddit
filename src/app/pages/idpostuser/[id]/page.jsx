"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
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
  
  // NEW: Comment States
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

  // NEW: Handle Comment Submission
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
          comments: data.comments, // Update the comments array with new data
        }));
        setCommentInput(""); // Clear input
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
    <div className="min-h-screen bg-[#0B0E14] p-6 pt-24 pb-20">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 font-bold text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Stories
        </button>

        <article className="bg-[#11141B] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl mb-8">
          <div className="h-2 bg-gradient-to-r from-red-600 to-red-900" />
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} /> {post.category}
              </span>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">{post.title}</h1>
            <p className="text-gray-300 text-lg md:text-xl whitespace-pre-wrap leading-relaxed mb-12 font-medium opacity-90">{post.story}</p>

            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <button onClick={handleLike} disabled={isLiking} className={`group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 font-bold text-sm border active:scale-95 ${isLiked ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30" : "bg-[#1A1D26] border-white/5 text-gray-400 hover:border-red-500/50 hover:text-white"}`}>
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={`transition-all duration-300 ${animate ? "scale-[1.4] rotate-12" : "scale-100 rotate-0"} ${isLiked ? "text-white" : "text-red-500 group-hover:scale-110"}`} />
                  <span>{post?.like?.length || 0} <span className="hidden sm:inline ml-1">Likes</span></span>
                </button>

                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#1A1D26] border border-white/5 text-gray-400 font-bold text-sm">
                  <MessageSquare size={20} className="text-blue-500" />
                  <span>{post?.comments?.length || 0} <span className="hidden sm:inline ml-1">Comments</span></span>
                </div>
              </div>
              <button className="p-3 text-gray-600 hover:text-white hover:bg-white/5 rounded-2xl transition-all"><Share2 size={20} /></button>
            </div>
          </div>
        </article>

        {/* NEW: COMMENT SECTION UI */}
        <section className="bg-[#11141B] border border-white/5 rounded-[2.5rem] p-8 md:p-10">
          <h3 className="text-xl font-black text-white mb-8 tracking-tight">Discussion</h3>
          
          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="relative mb-10 group">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full bg-[#0B0E14] border border-white/5 rounded-3xl p-5 pr-16 text-gray-300 outline-none focus:border-red-500/50 transition-all resize-none min-h-[100px]"
            />
            <button 
              type="submit"
              disabled={isSubmittingComment || !commentInput.trim()}
              className="absolute right-4 bottom-4 p-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-2xl transition-all"
            >
              {isSubmittingComment ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {post?.comments?.length > 0 ? (
              post.comments.map((c, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                    <UserIcon size={18} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-white">Anonymous</span>
                      <span className="text-[10px] text-gray-600 font-bold uppercase">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
                  </div>
                </div>
              )).reverse() // Show newest comments first
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 font-bold text-sm italic">No comments yet. Be the first to start the conversation!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleStoryPageUser;
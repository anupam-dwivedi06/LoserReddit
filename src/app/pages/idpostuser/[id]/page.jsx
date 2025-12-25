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
} from "lucide-react";

const SingleStoryPageUser = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [animate, setAnimate] = useState(false); // For the pop effect
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

    // 1. Instant UI Feedback (The "Pop")
    setIsLiking(true);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    try {
      const res = await fetch(`/api/storypost/likestory/${id}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json(); // Fixed: Added await

      console.log(data);

      if (res.ok) {
        // 2. Update local state with fresh data from DB
        setPost((prev) => ({
          ...prev,
          like: data.like, // Ensure your API returns 'likes'
        }));
      } else {
        console.error("Fail to like story", data.msg);
      }
    } catch (error) {
      console.error("Fail to like this post", error);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );

  if (!post)
    return (
      <div className="text-white text-center mt-20 font-bold">
        Story not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/pages/getAllPostsMe"
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to My Stories
        </Link>

        <article className="bg-[#11141B] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="h-2 bg-gradient-to-r from-red-600 to-red-900" />

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} /> {post.category}
              </span>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">
              {post.title}
            </h1>

            <p className="text-gray-300 text-lg md:text-xl whitespace-pre-wrap leading-relaxed mb-12 font-medium opacity-90">
              {post.story}
            </p>

            {/* ACTION BAR */}
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                {/* Premium Like Button with Pop Animation */}
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 font-bold text-sm border active:scale-95 ${
                    isLiked
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30"
                      : "bg-[#1A1D26] border-white/5 text-gray-400 hover:border-red-500/50 hover:text-white"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isLiked ? "currentColor" : "none"}
                    className={`transition-all duration-300 ${
                      animate ? "scale-[1.4] rotate-12" : "scale-100 rotate-0"
                    } ${
                      isLiked
                        ? "text-white"
                        : "text-red-500 group-hover:scale-110"
                    }`}
                  />
                  <span>
                    {post?.like?.length || 0}
                    <span className="hidden sm:inline ml-1">Likes</span>
                  </span>
                </button>

                {/* Premium Comment Button */}
                <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#1A1D26] border border-white/5 text-gray-400 hover:border-blue-500/50 hover:text-white transition-all duration-300 font-bold text-sm">
                  <MessageSquare
                    size={20}
                    className="group-hover:scale-110 transition-transform text-blue-500"
                  />
                  <span>Comment</span>
                </button>
              </div>

              <button className="p-3 text-gray-600 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SingleStoryPageUser;

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Tag, Calendar, Trash2 } from "lucide-react";

const SingleStoryPageUser = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

      } catch (error) {
        console.error("Fail to fetch story", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handledelete = async () =>{
    try {
      const res = await fetch(`/api/storypost/storydelete/${id}`,{
        method: "DELETE" 
      }, {credentials:"include"});
      // console.log("res comes from the handledelte", res)
      const data = await res.json();
      // console.log("Data comes from the delete route",data);
      if(!res.ok){
        throw new Error("Fail to fetch storydelete route", data.msg);
      }

      router.push("/pages/getAllPostsMe");
      router.refresh();
      console.log(data);
    } catch (error) {
      console.log("Fail to delete story from the fetch story delete", error.msg);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-white text-center mt-20">
        Story not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/pages/getAllPostsMe"
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 font-bold text-sm"
        >
          <ArrowLeft size={16} /> Back to My Stories
        </Link>

        <article className="bg-[#11141B] border border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="h-3 bg-red-600" />

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 text-red-500 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} /> {post.category}
              </span>
              <span className="text-gray-600 text-xs font-bold uppercase flex items-center gap-2">
                <Calendar size={12} />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-4xl font-black text-white mb-8">
              {post.title}
            </h1>

            <p className="text-gray-300 text-lg whitespace-pre-wrap">
              {post.story}
            </p>
          </div>
        </article>
        <div className="mt-8 flex justify-end">
          {/* <button 
            onClick={handledelete}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 px-6 py-3 rounded-2xl transition-all font-bold text-sm border border-transparent hover:border-red-500/20"
          >
            <Trash2 size={18} />
            Delete Story
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SingleStoryPageUser;

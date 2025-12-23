"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Frown, Laugh, MessageCircleQuestion, Megaphone, Lock, Coffee } from 'lucide-react'

const Home = () => {
  const router = useRouter();

  const categories = [
    { 
      id: 1, 
      name: "Feeling Low", 
      icon: <Frown />, 
      color: "from-blue-900/80 to-slate-900", 
      description: "Find support and a listening ear." 
    },
    { 
      id: 2, 
      name: "Funny", 
      icon: <Laugh />, 
      color: "from-yellow-600 to-orange-700", 
      description: "Share your best 'can't believe that happened' moments." 
    },
    { 
      id: 3, 
      name: "Advice", 
      icon: <MessageCircleQuestion />, 
      color: "from-emerald-600 to-teal-900", 
      description: "Seek wisdom or ask the community anything." 
    },
    { 
      id: 4, 
      name: "Rant", 
      icon: <Megaphone />, 
      color: "from-red-700 to-red-950", 
      description: "Let it all out. We are listening." 
    },
    { 
      id: 5, 
      name: "Confession", 
      icon: <Lock />, 
      color: "from-purple-800 to-indigo-950", 
      description: "Offload your secrets anonymously." 
    },
    { 
      id: 6, 
      name: "Anything", 
      icon: <Coffee />, 
      color: "from-gray-700 to-slate-900", 
      description: "Casual talk, hobbies, and random thoughts." 
    },
  ]

  const handleCategoryClick = (name) => {
    // Navigates to the dynamic category page
    router.push(`/pages/category/${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-l-4 border-red-600 pl-6">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            How are you <span className="text-red-500">really</span> feeling?
          </h1>
          <p className="text-gray-400 text-lg">Choose a category to start browsing or sharing.</p>
        </header>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => handleCategoryClick(category.name)}
              className={`relative group overflow-hidden rounded-3xl border border-white/5 p-8 bg-gradient-to-br ${category.color} cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10`}
            >
              {/* Giant Background Icon for Texture */}
              <div className="absolute right-[-5%] bottom-[-5%] text-white/5 group-hover:text-white/10 transition-all duration-700 scale-[4] rotate-12 pointer-events-none">
                {category.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                <div className="bg-white/10 w-fit p-4 rounded-2xl backdrop-blur-xl text-white group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  {React.cloneElement(category.icon, { size: 28 })}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-300/80 text-sm mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;  
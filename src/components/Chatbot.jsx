"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Typing Animation Component
const Typewriter = ({ text, speed = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // 1. Load chat history from LocalStorage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem("lose_reddit_chat");
    if (savedChat) {
      // Mark all saved messages as NOT new so they don't re-animate
      const parsed = JSON.parse(savedChat).map(msg => ({ ...msg, isNew: false }));
      setMessages(parsed);
    }
  }, []);

  // 2. Save chat history to LocalStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("lose_reddit_chat", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input, isNew: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      // Mark AI message as IS NEW so it types out
      setMessages((prev) => [...prev, { role: "ai", text: data.reply, isNew: true }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Error connecting to AI.", isNew: false }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("lose_reddit_chat");
  };

  const markAsDone = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isNew: false } : msg))
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0B0E14] border border-white/10 w-[90vw] md:w-[380px] h-[550px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-red-600 p-5 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-black text-xs uppercase tracking-tighter">LoseReddit AI Assistant</span>
              </div>
              <div className="flex gap-3">
                <button onClick={clearChat} title="Clear Chat">
                  <Trash2 size={18} className="text-white/80 hover:text-white transition-colors" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#0B0E14]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === "user" 
                      ? "bg-red-600 text-white rounded-tr-none" 
                      : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none"
                  }`}>
                    <div className="prose prose-sm prose-invert max-w-none">
                      {m.role === "ai" && m.isNew ? (
                        <Typewriter text={m.text} onComplete={() => markAsDone(i)} />
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#11141B] border-t border-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
              />
              <button 
                onClick={handleSend} 
                disabled={loading}
                className="bg-red-600 p-3 rounded-xl text-white hover:bg-red-700 disabled:opacity-50 transition-all shadow-md active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all group relative"
      >
        <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20 group-hover:hidden" />
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default Chatbot;
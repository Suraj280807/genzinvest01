"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

export default function ChatBot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            parts: [{ text: "Yo! I'm GenZ Bot 🤖. Ask me anything about money, stocks, or how not to stay broke!" }],
        },
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", parts: [{ text: input }] };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages.slice(1), // Send history excluding welcome msg if needed, or include all
                }),
            });

            const data = await res.json();
            const botMsg: Message = { role: "model", parts: [{ text: data.text }] };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = { role: "model", parts: [{ text: "Oof, network error. Try again!" }] };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isLogin = pathname === '/login';
    if (isLogin) return null;

    return (
        <>
            <div className={`fixed bottom-6 right-6 z-50 ${isLogin ? 'hidden' : ''}`}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="absolute bottom-16 right-0 w-[90vw] md:w-[400px] h-[500px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-primary/20 rounded-full">
                                        <Bot size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">GenZ Advisor</h3>
                                        <p className="text-xs text-green-400 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                                ? "bg-primary text-black font-medium rounded-tr-none"
                                                : "bg-surface-highlight border border-white/10 text-gray-200 rounded-tl-none"
                                                }`}
                                        >
                                            {msg.parts[0].text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-surface-highlight border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-white/5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Ask about SIP, Crypto, Stocks..."
                                        className="w-full bg-black/50 border border-white/20 rounded-full py-3 pl-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || loading}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-full text-black hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                                    >
                                        <Send size={16} fill="black" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.4)] border-2 border-transparent hover:border-white transition-all group"
                >
                    {isOpen ? (
                        <X size={28} className="text-black" />
                    ) : (
                        <MessageSquare size={28} className="text-black group-hover:rotate-12 transition-transform" />
                    )}
                </motion.button>
            </div>
        </>
    );
}

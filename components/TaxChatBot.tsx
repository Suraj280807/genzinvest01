"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Calculator, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

export default function TaxChatBot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            parts: [{ text: "Namaste! 🙏 I'm your digital CA. Want to know how to maximize your 80C, or confused between the Old vs New Tax Regime? Ask away!" }],
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
            const res = await fetch("/api/tax-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages.slice(1),
                }),
            });

            const data = await res.json();
            const botMsg: Message = { role: "model", parts: [{ text: data.text }] };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = { role: "model", parts: [{ text: "Network error. Even the e-filing portal goes down sometimes! Please try again." }] };
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

    return (
        <div className="w-full max-w-2xl mx-auto h-[500px] border border-white/20 rounded-3xl bg-surface/50 backdrop-blur-md flex flex-col overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                        <Calculator className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">AI Tax Advisor</h3>
                        <p className="text-xs text-blue-300">Powered by Groq</p>
                    </div>
                </div>
                <div className="flex bg-orange-500/20 border border-orange-500/30 px-3 py-1 rounded-full items-center gap-2">
                    <AlertTriangle size={14} className="text-orange-400" />
                    <span className="text-xs text-orange-400">Educational Use Only</span>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${msg.role === "user"
                                    ? "bg-blue-600 text-white font-medium rounded-tr-none"
                                    : "bg-white/10 border border-white/10 text-gray-200 rounded-tl-none"
                                }`}
                        >
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-[52px]">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="E.g., What is Section 80D?"
                        className="w-full bg-black/50 border border-white/20 rounded-full py-4 pl-5 pr-14 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="absolute right-2 p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 disabled:opacity-50 transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
